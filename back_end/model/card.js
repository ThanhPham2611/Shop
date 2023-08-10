import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const cardSchema = mongoose.Schema(
  {
    userId: ObjectId,
    listCard: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("card", cardSchema);
