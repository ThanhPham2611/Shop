import Product from '../../../model/product';

export const get_product_detail = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({ _id: id });
    return res.status(201).send({ item: product })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}