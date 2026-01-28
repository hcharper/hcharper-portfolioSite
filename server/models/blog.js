const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  // keep original fields for the existing views
  snippet: { type: String },
  body: { type: String },
  // API-friendly content field (optional, can be used instead of body)
  content: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;