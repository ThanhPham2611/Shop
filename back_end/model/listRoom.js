import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const listRoomSchema = mongoose.Schema(
  {
    from: ObjectId,
    to: ObjectId,
    roomId: {
      unique: true,
      require: true,
      type: String,
    },
    message: String,
    flag: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room", listRoomSchema);
