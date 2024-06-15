const Blog = require("../models/blog.model");
const { verifyToken } = require("../services/auth.service");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort([["createdAt", -1]]);
    return res.status(200).send(blogs);
  } catch (error) {}
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id });

    if (!blog) {
      return res.send("blog not found");
    } else {
      return res.status(200).send(blog);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const createNewBlog = async (req, res) => {
  const { title, content, thumbnail } = req.body;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);
  try {
    await Blog.create({
      title,
      content,
      thumbnail,
      author: user.id,
    });

    return res.send("Blog created Success");
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
