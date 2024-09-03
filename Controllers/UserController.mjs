import User from "../models/userModel.mjs";

const fetchUserInfo = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      userId: userId,
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateConnectWallet = async (req, res) => {
  const {
    user_id,
    wallet_address
  } = req.body;

  try {
    const newUser = await User.findOneAndUpdate(
      { userId: user_id },
      {
        $set: { wallet_address: wallet_address },
        $inc: {
          score: 500
        }
      },
      { new: true }
    );

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

const followTwitter = async (req, res) => {
  const {
    user_id
  } = req.body;

  try {
    const newUser = await User.findOneAndUpdate(
      { userId: user_id },
      {
        $set: {
          twitter_follow: true
        },
        $inc: {
          score: 500
        }
      },
      { new: true }
    );

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

const fetchFriendLists = async (req, res) => {
  const userId = req.params.id;

  try {
    const friends = await User.find({ referrer_userId: userId });

    friends.sort((a, b) => b.score - a.score);

    res.status(200).json(friends);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}

export {
  fetchUserInfo,
  updateConnectWallet,
  followTwitter,
  fetchFriendLists
};
