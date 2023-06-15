import mongoose from "mongoose";

const mailSchema = mongoose.Schema(
  {
    idUser: String,
    code: String
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("code_mail", mailSchema);