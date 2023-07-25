import { userModel } from '../../../model/user';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const saltRounds = 10; // salt password

export const change_password = async (req, res) => {
  try {
    const { newpassword, repassword, userId } = req.body;

    if (newpassword === repassword) {
      const hashPassword = bcrypt.hashSync(newpassword, saltRounds);

      await userModel.updateOne({ _id: userId }, { password: hashPassword });

      const accessToken = jwt.sign(
        JSON.parse(JSON.stringify({ _id: userId })),
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "8h",
        }
      );

      return res.status(200).send({ accessToken, message: 'Complete' });
    } else {
      return res.status(404).send({ message: 'Not the same password' });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}