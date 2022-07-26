const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  published_at: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
