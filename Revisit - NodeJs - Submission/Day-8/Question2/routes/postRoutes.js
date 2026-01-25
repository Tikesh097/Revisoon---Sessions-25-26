const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.createPost);
router.get("/user/:userId", postController.getPostsByUser);
router.get("/search", postController.searchPosts);
router.delete("/:id", postController.deletePost);

module.exports = router;
