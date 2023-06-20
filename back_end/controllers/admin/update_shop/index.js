import { userModel } from '../../../model/user';
import Shop from '../../../model/shop';
import jwt from 'jsonwebtoken';

export const update_shop_brand = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const admin = await userModel.findOne({ _id });
    if (admin.role !== 3) {
      return res.status(401).send({ message: 'Not admin' });
    }

    if (!admin.isActive) {
      return res.status(401).send({ message: 'Not active' });
    }

    const { shopIds } = req.body;

    await Shop.updateMany({ _id: { $in: shopIds } }, { brandToday: true });

    return res.status(201).send({ message: 'Complete' })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not server' })
  }
}