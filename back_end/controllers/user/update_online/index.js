import User from '../../../model/user'

export const update_online = async (req, res) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  )
    token = req.headers.authorization.split(" ")[1];
  try {
    const { _id } = jwt.decode(token, { complete: true }).payload;

    const { isLogin, lastLogin } = req.body;

    await User.updateOne({ _id }, { isLogin, lastLogin });

    return res.status(200).send({ message: 'Complete' });
  } catch (err) {
    return res.status(500).send({ message: 'Not found' })
  }
}