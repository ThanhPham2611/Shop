import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const listRoomSchema = mongoose.Schema(
  {
    roomId: String,
    message: String,
    flag: Boolean
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("room", listRoomSchema);
