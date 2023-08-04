import { userModel } from '../../../model/user';

export const login_social = async (req, res) => {
  try {

    const { email } = req.body;

    const existEmail = await userModel.findOne({ email });

    if (existEmail) {
      return res.status(404).send({ message: 'Not found' })
    }

    const accessToken = jwt.sign(
      JSON.parse(JSON.stringify(email._id)),
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );

    if (existEmail.linkedFb || existEmail.linkedGG) {
      return res.status(200).send({ accessToken });
    } else {
      return res.status(404).send({ message: "Not linked" });
    }
  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}