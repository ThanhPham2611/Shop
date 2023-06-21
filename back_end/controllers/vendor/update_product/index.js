import Product from '../../../model/product';
import { userModel } from '../../../model/user';
import jwt from 'jsonwebtoken';

export const update_product = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const vendor = await userModel.findOne({ _id });

    if (vendor.role !== 2) {
      return res.status(401).send({ message: 'Not vendor' });
    }

    const { ids } = req.body;

    await Product.updateMany(
      { _id: { $in: ids } },
      { $set: req.body }
    )

    return res.status(201).send({ message: 'Complete' })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' })
  }
}