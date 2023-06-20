import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const userSchema = mongoose.Schema(
  {
    shopId: {
      type: ObjectId,
      require: true,
    },
    title: {
      require: true,
      type: String
    },
    listImage: Array,
    showSale: {
      type: Boolean,
      default: false
    },
    flashSale: {
      type: Boolean,
      default: false
    },
    timeEndSale: Date,
    salePercent: Number,
    ticketTag: Array,
    price: {
      type: Number,
      require: true
    },
    amount: {
      type: Number,
      require: true
    },
    ticketTag: Array,
    typeProduct: [
      {
        image: {
          type: String,
          require: true
        }, title: {
          type: String,
          require: true
        }, price: {
          type: Number,
          require: true
        }, amount: {
          type: Number,
          require: true
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", userSchema);
