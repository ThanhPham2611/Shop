import Card from '../../../model/card';
import jwt from 'jsonwebtoken';

export const get_card = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  const { _id } = jwt.decode(token, { complete: true }).payload;

  const cardInfo = await Card.findOne({ userId: _id }, '-_id -userId');

  return res.status(200).send({ cardInfo });
}