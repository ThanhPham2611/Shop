import { userModel } from '../../../model/user';
import Shop from '../../../model/shop';
import jwt from 'jsonwebtoken';

export const create_shop = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const vendor = await userModel.findOne({ _id }, 'avatarUrl phone email _id role username');

    const { shopName, address, avatarShop } = req.body;

    if (vendor.role !== 2) {
      return res.status(401).send({ message: 'Not vendor' });
    }

    await Shop.create({
      shopName,
      address,
      owner: vendor,
      avatarShop
    });

    return res.status(201).send({ message: 'Complete' });
  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}