import Message from '../../../model/message';
import jwt from 'jsonwebtoken';
import randomString from 'randomstring';

export const room_message = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { to } = req.params;

    const message = await Message.findOne({ from: _id, to }).sort({ createdAt: -1 });

    if (!message) {
      const message = await Message.create({
        from: _id,
        to,
        roomId: randomString.generate()
      })
      return res.status(200).send({ message: message })
    }

    return res.status(200).send({ message: message });
  } catch (err) {
    return res.status(500).send({ message: 'Not found' })
  }
}