import express from "express";
import mongoose from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
const stripe = require("stripe")(
  "sk_test_51Mnwu5KxJRj9jA2jTGXyNnWnzmxhokBAkLkVBHwHiBjvXNp24kJUDzb00rLR47619X4QOmyBC768iMyryzWZQZkv00LT1QZq35"
);

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
          unit_amount: item.price - (item.price * item.salePercent / 100),
        },
        quantity: item.amount,
      };
    });
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      automatic_tax: {
        enabled: true,
      },
      allow_promotion_codes: true,
      customer: 'cus_O2kMgMbCzT0UFp',
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });
    return res.status(200).json(session)
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

io.on("connection", (socket) => {
  // socket.on("connected", () => { });
  // socket.on("disconnect", () => { });
  // socket.on("devices_register", () => {
  //   io.emit("success_form");
  // });
  // socket.on("admin_call", () => {
  //   io.emit("user_claim");
  // });
  socket.on("like", () => {
    io.emit("likefc");
  });
});

httpServer.listen(port, function () {
  console.log("Start with port: ", port);
});
