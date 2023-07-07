import mongoose from "mongoose";
import { userSchema } from './user'
const shopSchema = mongoose.Schema(
  {
    avatarShop: String,
    shopName: String,
    owner: {
      type: userSchema,
      require: true,
    },
    shopMall: {
      type: Boolean,
      default: false
    },
    watching: Array,
    address: String,
    linkImageBrand: String,
    brandToday: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("shop", shopSchema);