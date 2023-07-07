import Comment from '../../../model/comment';
import Rate from '../../../model/rate';

export const get_comment_product = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, item, rate } = req.query;

    const skip = (page - 1) * item;

    const condition = {
      productId: id
    };

    if (rate && rate !== '0') {
      condition.rate = rate;
    }

    const comments = await Comment.find(condition).skip(skip).limit(item);

    const rates = await Rate.find({ productId: id }, '-_id rate');

    return res.status(200).send({ comments, rates })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Not found' })
  }
}