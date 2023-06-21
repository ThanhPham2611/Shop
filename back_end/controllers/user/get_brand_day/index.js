import Product from '../../../model/product';
import Shop from '../../../model/shop';

export const get_brand_day = async (req, res) => {
  try {
    const listshop = await Shop.find({ brandToday: true }, '_id linkImageBrand');
    let listByshop = []

    Promise.all(
      listshop.map(async (item) => {
        const arrayProduct = await Product.find({ shopId: item._id })
        listByshop.push({
          linkBanner: item.linkImageBrand,
          items: arrayProduct
        })
        return arrayProduct
      })

    ).then(values => {
      return res.status(200).send({ data: listByshop })
    });


  } catch (err) {
    return res.status(500).send({ message: 'Not server' })
  }
}