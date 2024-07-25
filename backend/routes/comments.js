const express = require("express");
const Comment = require("../models/comment");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/:articleId", async (req, res) => {
  try {
    const comments = await Comment.find({
      article: req.params.articleId,
    }).populate("author");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:articleId", ensureAuth, async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.user.id,
    article: req.params.articleId,
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await comment.remove();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
