import Cart from '../../../model/cart';
import jwt from 'jsonwebtoken';

export const update_cart = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { shopId, productId, amount, isDelete } = req.body;

    if (isDelete) {
      await Cart.deleteOne({ userId: _id, shopId, productId })
    } else {
      await Cart.updateOne({ userId: _id, shopId, productId }, { amount });
    }

    return res.status(201).send({ message: 'Complete' })

  } catch (err) {
    return res.status(500).send({ message: 'Not found' })
  }
}