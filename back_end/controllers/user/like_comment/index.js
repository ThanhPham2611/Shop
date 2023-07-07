import { userModel } from '../../../model/user';
import Like from '../../../model/like';

import jwt from 'jsonwebtoken';

export const like_comment = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const userInfo = await userModel.findOne({ _id }, '-password');

    if (!userInfo.isActive) {
      return res.status(404).send({ message: 'Not active' });
    }

    const { commentId, isLike, productId } = req.body;

    const likeInfo = await Like.findOne({ userId: _id, commentId, productId });

    if (likeInfo) {
      await Like.updateOne({ userId: _id }, { isLike });
      return res.status(200).send({ message: 'Complete' });
    } else {
      await Like.create({
        ...req.body,
        userId: _id
      })
      return res.status(200).send({ message: 'Complete' });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' })
  }
}