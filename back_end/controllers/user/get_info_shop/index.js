import Follower from '../../../model/follower';

export const get_info_shop = async (req, res) => {
  try {
    const { followerId, userId } = req.params;

    const followerInfo = await Follower.find({ followerId }, 'followerId');

    const watchingInfo = await Follower.find({ userId }, 'userId')

    return res.status(200).send({ followerInfo, watchingInfo });
  } catch (err) {
    return res.status(500).send({ message: 'Not found' });
  }
}