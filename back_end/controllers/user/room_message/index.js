import ListRoom from "../../../model/listRoom";
import jwt from "jsonwebtoken";
// import randomString from "randomstring";

export const room_message = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { to } = req.params;

    const rooms = await ListRoom.find({
      $or: [{ from: _id }, { to }, { from: to }, { to: _id }],
    }).exec();

    return res.status(200).send({ rooms });
  } catch (err) {
    return res.status(500).send({ message: "Not found" });
  }
};
