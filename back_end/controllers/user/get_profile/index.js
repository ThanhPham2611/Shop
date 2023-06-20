import User from '../../../model/user';
import jwt from 'jsonwebtoken';

export const get_profile = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];


  const { _id } = jwt.decode(token, { complete: true }).payload;

  const user = await User.findOne({ _id }, '-password -role -_id -isActive');

  return res.status(200).json({ user })
}