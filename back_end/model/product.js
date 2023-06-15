import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    title: {
      require: true,
      type: String
    },
    rate: {
      type: Number,
      default: 0
    },
    listImage: Array,
    evaluate: {
      type: Number,
      default: 0
    },
    sold: {
      type: Number,
      default: 0
    },
    showSale: {
      type: Boolean,
      default: false
    },
    price: {
      type: Number,
      default: 0
    },
    flashSale: {
      type: Boolean,
      default: false
    },
    timeEndSale: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
