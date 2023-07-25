import { userModel } from '../../../model/user';
import MailCode from '../../../model/mailCode';
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';

export const forgot_password = async (req, res) => {
  try {
    const { email, type } = req.body;

    const exist = await userModel.findOne({ email });

    if (!exist) {
      return res.status(405).send({ message: 'Not found' });
    };

    const code = randomstring.generate({
      charset: 'numeric',
      length: 6
    });

    await MailCode.create({
      idUser: exist._id,
      code,
      type
    });

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
      subject: "Thông báo đổi mật khẩu",
      html: `Mã code đổi mật khẩu của bạn là: ${code}, hạn sử dụng của code có thời gian là 2 phút.`,
    });

    return res.status(200).send({ id: exist._id, message: 'Complete' });

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' });
  }
}