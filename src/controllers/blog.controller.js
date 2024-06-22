const fs = require("fs");
const bucket = require("../config/firebaseConfig");
const path = require("path");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const { verifyToken } = require("../services/auth.service");

const getAllBlogs = async (req, res) => {
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    const query = req.query;
    const blogs = await Blog.find(query)
      .populate("author")
      .sort([["createdAt", -1]]);
    return res.render("blogs", { blogs, user, category: query.category });
  } catch (error) {
    console.log(error);
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    const blog = await Blog.findById({ _id: id }).populate("author");
    const comments = await Comment.find({ blogId: id }).populate("userId");

    if (!blog) {
      return res.send("blog not found");
    } else {
      return res.status(200).render("blogPost", { blog, comments, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const createNewBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const file = req.file;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    const filename = file.filename;
    const tempFilePath = path.join(file.destination, file.filename);

    // Verify the file exists
    if (!fs.existsSync(tempFilePath)) {
      throw new Error("File not found");
    }

    // Upload the thumbnail to Firebase Storage
    await bucket.upload(tempFilePath, {
      destination: `thumbnails/${filename}`,
      public: true,
    });
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/thumbnails/${filename}`;

    const newBlog = await Blog.create({
      title,
      content,
      category,
      thumbnail: fileUrl,
      author: user.id,
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    return res.redirect(`/blogs/${newBlog._id}`);
  } catch (error) {
    console.log(error);
    return res.send("Internal server error");
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createNewBlog,
};
