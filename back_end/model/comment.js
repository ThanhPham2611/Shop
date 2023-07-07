import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const commentSchema = mongoose.Schema(
  {
    ShopId: ObjectId,
    productId: ObjectId,
    shopId: ObjectId,
    commentOptions: Array,
    description: String,
    options: Array,
    listImage: Array,
    rate: Number,
    isHidden: {
      type: Boolean,
      default: false
    },
    user: {
      _id: ObjectId,
      username: String,
      linkAvatar: String,
    },
    typeName: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('comment', commentSchema);