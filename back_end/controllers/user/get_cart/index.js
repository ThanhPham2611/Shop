import Cart from '../../../model/cart';
import jwt from 'jsonwebtoken';

export const get_cart = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const cartInfo = await Cart.find({ userId: _id }).sort({ createdAt: -1 }).limit(10);

    return res.status(200).send({ cartInfo });

  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}