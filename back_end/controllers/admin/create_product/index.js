import User from '../../../model/user';
import Product from '../../../model/product';

export const admin_create_product = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const admin = await User.findOne({ _id });
    if (admin.role !== 3) {
      return res.status(401).send({ message: 'Not admin' });
    }

    if (!admin.isActive) {
      return res.status(401).send({ message: 'Not active' });
    }

    const { title, listImage, price, amount, salePercent, flashSale, timeEndSale, showSale, ticketTag, linkImageBrand, owner } = req.body;



  } catch (err) {
    return res.status(500).send({ message: 'Not found' })
  }
}