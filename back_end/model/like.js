import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const likeSchema = mongoose.Schema(
  {
    userId: ObjectId,
    productId: ObjectId,
    commentId: ObjectId,
    like: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("like", likeSchema);