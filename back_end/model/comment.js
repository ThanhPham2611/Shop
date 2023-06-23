import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const commentSchema = mongoose.Schema(
  {
    ownerId: ObjectId,
    ShopId: ObjectId,
    productId: ObjectId,
    commentOptions: Array,
    description: String,
    options: Array,
    listImage: Array,
    rate: Number,
    isHidden: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('comment', commentSchema);