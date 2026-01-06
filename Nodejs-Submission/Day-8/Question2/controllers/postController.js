const Post = require("../models/Post");
const Comment = require("../models/Comment");

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.json(post);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const key = req.query.keyword || "";
    const posts = await Post.find({
      $or: [
        { title: new RegExp(key, "i") },
        { content: new RegExp(key, "i") }
      ]
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Delete all comments for this post
    await Comment.deleteMany({ postId });

    // Delete the post
    await Post.findByIdAndDelete(postId);

    res.json("Post and related comments deleted");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
