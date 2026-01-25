const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getCommentsByUser = async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json("Comment deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
