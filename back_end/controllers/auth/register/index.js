import User from '../../../model/user';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const saltRounds = 10; // salt password

export const register_user = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(409).send({ message: "User exists !!!" });
    }

    if (!(password === confirmPassword)) {
      return res.status(409).send({ message: 'Not the same confirm password' })
    }

    const hashPassword = bcrypt.hashSync(password, saltRounds);

    await User.create({
      ...req.body,
      password: hashPassword,
    });

    return res.status(201).send({ message: "OK" });
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' })
  }
}