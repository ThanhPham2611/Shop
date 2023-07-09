import Cart from "../../../model/cart";
import { checkActiveUser } from "../../../utils/funtions";

export const add_cart = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    if (checkActiveUser(_id)) {
      return res.status(404).send({ message: "Not active" });
    }

    await Cart.create({
      userId: _id,
      product: {
        ...req.body,
      },
    });

    return res.status(201).send({ message: "Complete" });
  } catch (err) {
    return res.status(500).send({ message: "Not found" });
  }
};
