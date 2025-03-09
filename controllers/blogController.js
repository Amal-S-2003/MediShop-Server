const blogs = require("../model/blogSchema");

// ✅ Add New Blog
exports.addBlog = async (req, res) => {
  console.log("inside add blog");

  try {
    const { title, caption, content, category, tags, videos } = req.body;

    // Handle Images
    const thumbnail = req.files["thumbnail"]
      ? req.files["thumbnail"][0].filename
      : null;
    const images = req.files["images"]
      ? req.files["images"].map((file) => file.filename)
      : [];

    if (!title || !caption || !content || !category || !thumbnail) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled!" });
    }
    console.log(
      "title, caption, content, category, tags, videos",
      title,
      caption,
      content,
      category,
      tags,
      videos
    );

    const newBlog = new blogs({
      title,
      caption,
      content,
      category,
      tags: tags ? tags.split(",") : [],
      thumbnail,
      images,
      videos: videos ? videos.split(",") : [],
    });

    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog added successfully!", blog: newBlog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding blog", error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id; // Get blog ID from URL
    const blog = await blogs.findById({ _id: blogId });
    console.log(blog);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await blogs.find();
    if (!allBlogs) {
      return res.status(404).json({ message: "Blogs not found" });
    }
    console.log(allBlogs);

    res.status(200).json(allBlogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching blog", error: error.message });
  }
};

// ✅ Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    await blogs.findByIdAndDelete({_id:blogId});
    res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};
