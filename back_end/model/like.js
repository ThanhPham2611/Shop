import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const likeSchema = mongoose.Schema(
  {
    userId: ObjectId,
    productId: ObjectId,
    type: {
      type: Number,
      require: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("like", likeSchema);