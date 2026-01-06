const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);
    if (!user) return res.status(404).json("User not found");

    // Delete all posts & comments by this user
    await Post.deleteMany({ userId: id });
    await Comment.deleteMany({ userId: id });

    // Delete user
    await User.findByIdAndDelete(id);

    res.json("User and related posts/comments deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
