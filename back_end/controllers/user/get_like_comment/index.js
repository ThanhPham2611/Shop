import Like from '../../../model/like';
import jwt from 'jsonwebtoken';

export const get_like_comment = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const { _id } = jwt.decode(token, { complete: true }).payload;
      const { productId } = req.params;
      const dataUserLike = await Like.find({ userId: _id });

      const likeInfo = await Like.find({ productId });

      return res.status(200).send({ dataUserLike, likeInfo })
    } else {
      const { productId } = req.params;
      const arrayLike = await Like.find({ productId });

      const likeInfo = arrayLike?.map((items) => {
        return { ...items._doc, isLike: false }
      })

      return res.status(200).send({ likeInfo })
    }

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}