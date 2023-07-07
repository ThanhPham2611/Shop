import Product from '../../../model/product';
import { userModel } from '../../../model/user';
import Comment from '../../../model/comment';
import Shop from '../../../model/shop';
import Rate from '../../../model/rate';
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
    const { productId, isHidden, rate } = req.body;

    const productInfo = await Product.findOne({ _id: productId }, 'shopId _id');

    const shopInfo = await Shop.findOne({ _id: productInfo.shopId });

    if (checkUser._id === shopInfo.owner._id) {
      return res.status(404).send({ message: 'Not comment by product vendor' });
    }

    const userHidden = {
      username: checkUser.username.slice(0, 1) + '****' + checkUser.username.slice(-1),
      linkAvatar: checkUser.avatarUrl
    }

    await Rate.create({
      rate: rate,
      productId: productInfo._id
    })

    if (isHidden) {
      const comment = await Comment.create({
        ...req.body,
        shopId: productInfo.shopId,
        productId: productInfo._id,
        user: {
          ...userHidden
        }
      });
      return res.status(201).send({ comment });
    } else {
      await Comment.create({
        ...req.body,
        shopId: productInfo.shopId,
        productId: productInfo._id,
        user: {
          _id: checkUser._id,
          username: checkUser.username,
          linkAvatar: checkUser.avatarUrl
        }
      })
      return res.status(201).send({ message: 'Complete' });
    }

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}