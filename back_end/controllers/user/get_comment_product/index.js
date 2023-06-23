import Comment from '../../../model/comment';
import { userModel } from '../../../model/user';

export const get_comment_product = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({ productId: id }, '-__v');

    const user = await userModel.findOne({ _id: comment.ownerId }, 'username avatarUrl');

    const { ownerId, productId, ...dataComment } = comment;

    const hiddenName = user.username.slice(0, 1) + '****' + user.username.slice(-1);

    const objUser = {
      ...user,
      username: hiddenName
    }

    // console.log(objUser.username);


    if (comment.isHidden) {
      return res.status(200).send({ comment, objUser });
    } else {
      return res.status(200).send(dataComment, user);
    }

  } catch (err) {
    return res.status(500).send({ message: 'Not found' })
  }
}