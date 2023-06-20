import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    idUser: String,
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