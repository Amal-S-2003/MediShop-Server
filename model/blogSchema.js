const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    thumbnail: { type: String, required: true }, // Thumbnail Image
    images: { type: [String], default: [] }, // Multiple Images
    videos: { type: [String], default: [] }, // Video URLs
  },
  { timestamps: true }
);

const blogs= mongoose.model("blogs", blogSchema);
module.exports =blogs;
