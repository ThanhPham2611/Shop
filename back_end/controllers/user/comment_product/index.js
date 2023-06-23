import Product from '../../../model/product';
import { userModel } from '../../../model/user';
import Comment from '../../../model/comment';
import jwt from 'jsonwebtoken';

export const comment_product = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const checkUser = await userModel.findOne({ _id });

    if (!checkUser.isActive) {
      return res.status(401).send({ message: 'Not active' });
    }
    const { commentOptions, description, options, listImage, rate, productId } = req.body;


    const productInfo = await Product.findOne({ _id: productId }, 'shopId _id');

    await Comment.create({
      commentOptions, description, options, listImage, rate,
      ownerId: _id,
      shopId: productInfo.shopId,
      productId: productInfo._id
    });

    return res.status(201).send({ message: 'Complete' });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}