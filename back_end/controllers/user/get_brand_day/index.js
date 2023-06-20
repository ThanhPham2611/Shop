import Product from '../../../model/product';
import Shop from '../../../model/shop';

export const get_brand_day = async (req, res) => {
  const listByshop = []
  try {
    const listshop = await Shop.find({ brandToday: true }).exec();

    const arrayItem = listshop.forEach(async (item) => {
      console.log('itemm:>', item._id)
      const arrayProduct = await Product.find({ shopId: item._id })
      return arrayProduct
    });

    console.log('dl', arrayItem)

  } catch (err) {
    return res.status(500).send({ message: 'Not server' })
  }
}