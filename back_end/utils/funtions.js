import User from "../model/user";

export const checkActiveUser = async (id) => {
  const checkUser = await User.findOne({ _id: id });

  if (!checkUser.isActive) {
    return false;
  }
};
