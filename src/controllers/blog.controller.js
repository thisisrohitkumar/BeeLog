const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const multer = require("multer");

const { verifyToken } = require("../services/auth.service");

const getAllBlogs = async (req, res) => {
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    const blogs = await Blog.find({}).sort([["createdAt", -1]]);
    return res.render("blogs", { blogs, user });
  } catch (error) {}
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    const blog = await Blog.findById({ _id: id });
    const comments = await Comment.find({ blogId: id });

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
  const { title, content } = req.body;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    let thumbnail;
    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }

    await Blog.create({
      title,
      content,
      thumbnail,
      author: user.id,
    });

    return res.render("home", { msg: "blog created success" });
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
