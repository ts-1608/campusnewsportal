const express = require("express");
const Article = require("../models/article");
const { ensureAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const articles = await Article.find().populate("author");
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", ensureAuth, async (req, res) => {
  const article = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
  });

  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    if (article.author.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await article.remove();
    res.json({ message: "Article deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", ensureAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    article.archived = true;
    await article.save();
    res.json({ message: "Article archived" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
