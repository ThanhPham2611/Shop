import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const followerSchema = mongoose.Schema(
  {
    userId: ObjectId,
    followerId: ObjectId,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('follower', followerSchema);
