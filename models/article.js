const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true },
  published_at: { type: Date, required: true },
  url: { type: String, required: true },
  source: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

articleSchema.virtual("pageUrl").get(function () {
  return "/articles/" + this._id;
});

module.exports = mongoose.model("Article", articleSchema);
