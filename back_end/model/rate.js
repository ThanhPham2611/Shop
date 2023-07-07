import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const rateSchema = mongoose.Schema(
  {
    rate: {
      type: Number,
      require: true,
    },
    productId: ObjectId
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("rate", rateSchema);