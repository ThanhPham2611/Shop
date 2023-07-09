import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const cartSchema = mongoose.Schema(
  {
    userId: ObjectId,
    product: {
      shopId: ObjectId,
      title: String,
      image: String,
      price: Number,
      amount: Number,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", cartSchema);
