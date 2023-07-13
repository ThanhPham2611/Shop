import { userModel } from "../model/user";

export const checkActiveUser = async (id) => {
  try {
    const checkUser = await userModel.findOne({ _id: id });

    if (!checkUser.isActive) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
