const express = require("express");
const Tea = require("../models/Tea");
const jwt = require("jsonwebtoken");

const router = express.Router();

const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

router.post("/", verify, async (req, res) => {
  const tea = await Tea.create({ ...req.body, author: req.user.id });
  res.json(tea);
});

router.get("/", async (req, res) => {
  const teas = await Tea.find().sort({ createdAt: -1 });
  res.json(teas);
});

router.post("/:id/like", async (req, res) => {
  const tea = await Tea.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(tea);
});

router.post("/:id/dislike", async (req, res) => {
  const tea = await Tea.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
  res.json(tea);
});

router.post("/:id/rate", async (req, res) => {
  const tea = await Tea.findByIdAndUpdate(req.params.id, { hotness: req.body.hotness }, { new: true });
  res.json(tea);
});

router.post("/:id/comments", async (req, res) => {
  try {
    const tea = await Tea.findById(req.params.id);
    tea.comments.push({ text: req.body.text });
    await tea.save();
    res.json(tea.comments);
  }
  catch (err) {
    res.status(500).json({ msg: "Error adding comment" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const tea = await Tea.findById(req.params.id);
    res.json(tea?.comments || []);
  } catch {
    res.status(500).json({ msg: "Error fetching comments" });
  }
});
module.exports = router;