const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    blog_title: { type: String, required: true },
    blog_content: { type: String, required: true },
    date: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('blogs', blogSchema);
