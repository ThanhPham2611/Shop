import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      unique: true,
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: String,
    firstName: String,
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 1,
    },
    birthday: {
      type: Date,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = {
  userSchema: userSchema,
  userModel: mongoose.model("user", userSchema)
};

