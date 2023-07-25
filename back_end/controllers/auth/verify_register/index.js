import { userModel } from '../../../model/user';
import MailCode from '../../../model/mailCode'
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';
import { TYPE_VERIFY_CODE } from '../../../utils/type';

export const verify_register = async (req, res) => {
  try {
    const { email, username, type } = req.body;
    const checkExist = await userModel.findOne({ email })
    if (checkExist) {
      return res.status(409).send({ message: 'conflix' })
    }

    const userInfo = await userModel.findOne({ username }, '_id');

    const code = randomstring.generate({
      charset: 'numeric',
      length: 6
    })

    await MailCode.create({
      idUser: userInfo._id,
      code,
      type
    })

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thanh.pt2611@gmail.com",
        pass: process.env.PASSWORD_MAIL_SECRET,
      },
    });

    await transporter.sendMail({
      from: "shop@gmail.com",
      to: `${email}`,
      subject: "Thông báo xác nhận email",
      html: `Mã code xác nhận email của bạn là: ${code}, hạn sử dụng của code có thời gian là 2 phút.`,
    });

    return res.status(201).send({ id: userInfo._id, message: 'Send email' })
  } catch (err) {
    console.log('err:>', err)
    return res.status(500).send({ message: 'Not server' })
  }
}