import Message from "../../../model/message";
import jwt from "jsonwebtoken";

export const get_message = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { to } = req.params;

    const messageFrom = await Message.find({ from: _id, to })
      .limit(5)
      .sort({ createdAt: -1 });
    const messageTo = await Message.find({ from: to, to: _id })
      .limit(5)
      .sort({ createdAt: -1 });

    const message = [...messageFrom, ...messageTo].sort(
      (a, b) => a.createdAt - b.createdAt
    );

    return res.status(200).send({ message });
  } catch (err) {
    return res.status(500).send({ message: "Not found" });
  }
};
