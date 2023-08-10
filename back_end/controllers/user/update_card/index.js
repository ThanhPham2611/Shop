import Card from '../../../model/card';
import jwt from 'jsonwebtoken';

export const update_card = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;
    const { idCard, update } = req.body;

    const cardInfo = await Card.findOne({ userId: _id });

    if (update) {
      for (const obj of cardInfo.listCard) {
        if (obj.id === idCard) {
          obj.default = 1;
        } else {
          obj.default = 0;
        }
      }
      await Card.updateOne({ userId: _id }, { listCard: cardInfo.listCard });
    } else {
      const updateArray = cardInfo.listCard?.filter(obj => obj.id !== idCard);
      await Card.updateOne({ userId: _id }, { listCard: updateArray });
    }
    return res.status(200).send({ message: 'Complete' });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}

