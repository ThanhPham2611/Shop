import User from '../../../model/user';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login_user = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('userName', username)

    const checkUser = await User.findOne({ username }, 'password isActive')

    if (!checkUser) {
      return res.status(404).send({ message: 'Not found' })
    }

    if (!checkUser.isActive) {
      return res.status(401).send({ message: 'Account not active' })
    }

    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (!checkPassword) {
      return res.status(402).send({ message: "Email or password is wrong" });
    }

    const user = await User.findOne({
      username
    }, 'firstName lastName')

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(user)),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );

    return res.status(200).json({
      accessToken,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Not found' })
  }
}