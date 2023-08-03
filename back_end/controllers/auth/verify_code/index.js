import { userModel } from '../../../model/user';
import MailCode from '../../../model/mailCode';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import { TYPE_VERIFY_CODE } from '../../../utils/type';

export const verify_code = async (req, res) => {
  try {
    const { codeSubmit, email, type, username } = req.body;

    const usernameInfo = await userModel.findOne({ username });

    const checkCode = await MailCode.findOne({ idUser: usernameInfo._id, type }, '_id code createdAt flag type').sort({ createdAt: -1 });

    if (moment().isBefore(moment(checkCode.createdAt).add(2, 'minutes'))) {
      if (codeSubmit === checkCode.code && !checkCode.flag) {
        await MailCode.updateOne({ _id: checkCode._id }, { flag: true })
        if (checkCode.type === TYPE_VERIFY_CODE.basic) {
          await userModel.updateOne({ _id: usernameInfo._id }, { email, isActive: true });

          const accessToken = jwt.sign(
            JSON.parse(JSON.stringify({ _id: usernameInfo._id })),
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "8h",
            }
          );
          return res.status(201).send({ accessToken, message: 'Complete' })
        } else {
          return res.status(200).send({ message: 'Complete' })
        }
      } else {
        return res.status(401).send({ message: 'Wrong code or code used' });
      }
    } else {
      return res.status(405).send({ message: 'Code expires' })
    }

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: err })
  }
}