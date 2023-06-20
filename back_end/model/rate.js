import mongoose from "mongoose";

const rateSchema = mongoose.Schema(
  {
    rate: {
      type: Number,
      require: true,
    },
    typeProduct: String,
    content: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("rate", rateSchema);