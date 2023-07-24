import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import moment from "moment";
// import randomstring from "randomstring";
const stripe = require("stripe")(
  "sk_test_51Mnwu5KxJRj9jA2jTGXyNnWnzmxhokBAkLkVBHwHiBjvXNp24kJUDzb00rLR47619X4QOmyBC768iMyryzWZQZkv00LT1QZq35"
);

//model
import { userModel } from "./model/user";
import Product from "./model/product";
import Message from "./model/message";
import ListRoom from "./model/listRoom";

//router
import user from "./routes/user";
import admin from "./routes/admin";
import vendor from "./routes/vendor";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

//config swagger
const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//config env

//database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connect database successfully"));

//router
app.use("/api", user);
app.use("/api", admin);
app.use("/api", vendor);

//port
const port = process.env.PORT || 8000;

//stripe
app.post("/create-checkout-session", async (req, res) => {
  try {
    const line_items = req.body?.cartItems?.map((item) => {
      return {
        price_data: {
          currency: "VND",
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.title,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price - (item.price * item.salePercent) / 100,
        },
        quantity: item.amount,
      };
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      automatic_tax: {
        enabled: true,
      },
      allow_promotion_codes: true,
      customer: "cus_O2kMgMbCzT0UFp",
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });
    return res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/v1/balance_transactions", async (req, res) => {
  const balanceTransactions = await stripe.balanceTransactions.list({
    limit: 3,
  });
  return res.status(200).json(balanceTransactions);
});

//socket.io
const httpServer = http.createServer(app);
const io = new Server({
  cors: {
    origin: "*",
  },
});

io.attach(httpServer);

let userOnline = [];

io.on("connection", async (socket) => {
  if (socket.handshake.auth.token) {
    const { _id } = jwt.decode(socket.handshake.auth.token);
    const exist = userOnline.findIndex((user) => user.userId === _id);
    if (exist !== -1) {
      userOnline[exist].socketId = socket.id;
    } else {
      userOnline.push({
        socketId: socket.id,
        userId: _id,
      });
    }
    await userModel.findByIdAndUpdate({ _id }, { $set: { status: true } });
  }

  socket.on("login", async (userId) => {
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { status: true } }
    );
  });

  socket.on("disconnect", async () => {
    if (socket.handshake.auth.token) {
      const { _id } = jwt.decode(socket.handshake.auth.token);
      await userModel.findByIdAndUpdate(
        { _id },
        { $set: { status: false, lastLogin: moment().format() } }
      );
      console.log(`disconnect ${socket.id}`);
    }
  });

  socket.on("flashSale", async (id) => {
    await Product.findByIdAndUpdate(
      { _id: id },
      { flashSale: false, salePercent: 0 }
    );
    io.emit("completeFlashSale");
  });

  socket.on("sendMessage", async (data) => {
    if (socket.handshake.auth.token) {
      const { _id } = jwt.decode(socket.handshake.auth.token);
      const { to, message, roomId, from, createdAt, id } = data;
      const socketReceived = userOnline.find((filter) => filter.userId === to);
      const userFrom = await userModel.findOne(
        { _id },
        "-_id username avatarUrl"
      );
      const roomExist = await ListRoom.findOne({ roomId });
      console.log(roomExist);
      if (roomExist) {
        await ListRoom.updateOne({ roomId }, { message });
      } else {
        await ListRoom.create({
          from,
          to,
          roomId,
          message,
          flag: false,
        });
      }
      if (roomId) {
        await Message.create({
          from: _id,
          to,
          message,
          roomId,
        });
        socketReceived &&
          io.to(socketReceived.socketId).emit("received", {
            message,
            roomId,
            username: userFrom.username,
            avatarUrl: userFrom.avatarUrl,
            from,
            createdAt,
            to,
            id,
          });
      }
    }
    return () => {
      socket.off("sendMessage");
    };
  });

  socket.on("like", () => {
    io.emit("likefc");
  });
});

httpServer.listen(port, function () {
  console.log("Start with port: ", port);
});
