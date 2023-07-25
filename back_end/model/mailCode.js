import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const mailSchema = mongoose.Schema(
  {
    idUser: ObjectId,
    code: String,
    type: Number,
    flag: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("code_mail", mailSchema);