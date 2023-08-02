import { userModel } from '../../../model/user';
import jwt from 'jsonwebtoken';

export const update_profile = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { name, birthday, avatarUrl, gender } = req.body;

    await userModel.updateOne({ _id }, {
      name,
      birthday,
      avatarUrl,
      gender
    })

    return res.status(200).send({ message: 'Complete' });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' })
  }
}