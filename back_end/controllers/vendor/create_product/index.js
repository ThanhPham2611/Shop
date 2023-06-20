import Product from '../../../model/product';
import Shop from '../../../model/shop';
import jwt from 'jsonwebtoken';

export const create_product = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const shop = await Shop.findOne({
      'owner._id': _id
    }, '_id');

    await Product.create({
      ...req.body,
      shopId: shop
    })

    return res.status(200).send({ message: 'Complete' })

  } catch (err) {
    return res.status(500).send({ message: err })
  }

}