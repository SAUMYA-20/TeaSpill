const mongoose = require("mongoose");

const teaSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  hotness: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Tea", teaSchema);