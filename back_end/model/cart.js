import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const cartSchema = mongoose.Schema(
  {
    userId: ObjectId,
    shopId: ObjectId,
    productId: ObjectId,
    title: String,
    image: String,
    price: Number,
    amount: Number,
    salePercent: Number,
    type: Number,
    typeProductDetail: Object
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
