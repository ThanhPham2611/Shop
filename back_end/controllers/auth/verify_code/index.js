import User from '../../../model/user';
import MailCode from '../../../model/mailCode';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export const verify_code = async (req, res) => {
  try {
    const { codeSubmit, username, email } = req.body;

    const userInfo = await User.findOne({ username }, '_id');

    const checkCode = await MailCode.findOne({ idUser: userInfo._id }, '_id code createdAt flag type');

    if (moment().isBefore(moment(checkCode.createdAt).add(2, 'minutes'))) {
      if (codeSubmit === checkCode.code && !checkCode.flag) {
        await MailCode.updateOne({ _id: checkCode._id }, { flag: true })
        if (checkCode.type === 1) {
          await User.updateOne({ _id: userInfo._id }, { email, isActive: true });
          const user = await User.findOne({
            username
          }, '_id ')

          const accessToken = jwt.sign(
            JSON.parse(JSON.stringify(user)),
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "8h",
            }
          );
          return res.status(201).send({ accessToken, message: 'Complete' })
        } else {
          return res.status(401).send({ message: 'developing' })
        }
      } else {
        return res.status(401).send({ message: 'Wrong code or code used' });
      }
    } else {
      return res.status(405).send({ message: 'Code expires' })
    }

  } catch (err) {
    return res.status(500).send({ message: err })
  }
}