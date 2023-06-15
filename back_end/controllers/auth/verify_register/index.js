import User from '../../../model/user';
import MailCode from '../../../model/mailCode'
import randomstring from 'randomstring';

export const verify_register = async (req, res) => {
  try {
    const checkExist = await User.findOne({ email })
    if (checkExist) {
      return res.status(409).send({ message: 'conflix' })
    }

    const code = randomstring.generate({
      charset: 'numeric',
      length: 6
    })

    await MailCode.create({

    })

  } catch (err) {
    console.log('err:>', err)
    return res.status(500).send({ message: 'Not server' })
  }
}