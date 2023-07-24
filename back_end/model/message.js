import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const messageSchema = mongoose.Schema(
  {
    from: ObjectId,
    to: ObjectId,
    message: String,
    roomId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
