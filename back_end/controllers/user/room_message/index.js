import ListRoom from "../../../model/listRoom";
import jwt from "jsonwebtoken";
import { userModel } from '../../../model/user';

export const room_message = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const rooms = await ListRoom.find({
      $or: [{ from: _id }, { to: _id }],
    }).exec();

    const arrayChat = await Promise.all(rooms?.map(async (room) => {
      let condition
      if (room.from.toString() === _id) {
        condition = { _id: room.to }
      } else {
        condition = { _id: room.from }
      }

      const user = await userModel.findOne(condition, 'username _id avatarUrl')

      return { user, roomId: room.roomId, message: room.message, createdAt: room.updatedAt };
    }))

    return res.status(200).send({ arrayChat })
  } catch (err) {
    return res.status(500).send({ message: "Not found" });
  }
};
