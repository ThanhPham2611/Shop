import Card from '../../../model/card';
import jwt from 'jsonwebtoken';

export const add_card = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];

  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { objCard } = req.body;

    const cardExist = await Card.findOne({ userId: _id });

    if (cardExist) {
      for (const obj of cardExist.listCard) {
        obj.default = 0
      }
      const updateListCard = [...cardExist.listCard, objCard];
      await Card.updateOne({ userId: _id }, { listCard: updateListCard });
    } else {
      await Card.create({
        userId: _id,
        listCard: [objCard]
      })
    }

    return res.status(200).send({ message: 'Complete' });
  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}