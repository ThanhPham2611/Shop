import Follower from '../../../model/follower';
import Shop from '../../../model/shop';
import Product from '../../../model/product';
import Rate from '../../../model/rate';
import { userModel } from '../../../model/user';

export const get_info_shop = async (req, res) => {
  try {
    const { productId } = req.params;

    const shopInfoID = await Product.findOne({ productId }, 'shopId');

    const followerInfo = await Follower.find({ followerId: shopInfoID.shopId }, 'followerId');
    const productInfo = await Product.find({ shopId: shopInfoID.shopId });
    const rateInfo = await Rate.find({ shopId: shopInfoID.shopId });

    const shopInfo = await Shop.findOne({ _id: shopInfoID.shopId });

    const userInfo = await userModel.findOne({ _id: shopInfo.owner._id }, '-_id status lastLogin')

    return res.status(200).send({ followerInfo: followerInfo.length, shopInfo, productInfo: productInfo.length, rateInfo: rateInfo.length, userInfo });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}