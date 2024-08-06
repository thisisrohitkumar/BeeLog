const { verifyToken } = require("../services/auth.service");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");

const renderHomePage = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }

  const user = await verifyToken(token);

  if (!user) {
    return res.render("home", { msg: "~ Invalid Token! ~" });
  }

  return res.render("home", { user });
};

const renderSignupPage = (req, res) => {
  return res.render("signup");
};

const renderVerifyPage = (req, res) => {
  return res.render("verify");
};

const renderLoginPage = (req, res) => {
  return res.render("login");
};

const renderBookmarksPage = async (req, res) => {
  const user = req.user;
  const bookmarks = await Bookmark.find({ userId: user.id })
    .populate({
      path: "blogId",
      populate: {
        path: "author",
        model: "User",
        select: "name",
      },
    })
    .sort([["createdAt", -1]]);
  return res.render("bookmarks", { user, bookmarks });
};

const createNewBookmark = async (req, res) => {
  const { blogId } = req.body;
  const user = req.user;

  try {
    const alreadyBookmarked = await Bookmark.findOne({
      userId: user.id,
      blogId,
    });

    const query = req.query;
    const blogs = await Blog.find(query)
      .populate("author")
      .sort([["createdAt", -1]]);

    if (alreadyBookmarked) {
      return res.render("blogs", { user, blogs,category: query.category, msg: "Already Bookmarked!" });
    }

    await Bookmark.create({ userId: user.id, blogId });
    return res.render("blogs", { user, blogs, category: query.category, msg: "Successfully Bookmarked!" });
  } catch (error) {
    console.log(error);
    return res.render("home", { user, msg: "Failed to Bookmark!" });
  }
};

const deleteBookmark = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const bookmark = await Bookmark.findById(id);

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark does not exists" });
    }

    

    await Bookmark.findByIdAndDelete(id);

    const bookmarks = await Bookmark.find({ userId: user.id })
    .populate({
      path: "blogId",
      populate: {
        path: "author",
        model: "User",
        select: "name",
      },
    })
    .sort([["createdAt", -1]]);

    return res
      .status(200)
      .render("bookmarks", { user, bookmarks, msg: "~ Bookmark deleted successfully ~" });
  } catch (error) {
    console.log(error);
    res.render("home", { user, msg: "~ Failed to delete bookmark ~" });
  }
};

const renderProfilePage = async (req, res) => {
  const user = req.user;
  const userDetails = await User.findOne({ _id: user.id });
  return res.render("profile", { user, userDetails });
};

const renderDashboardPage = async (req, res) => {
  const user = req.user;
  const blogs = await Blog.find({ author: user.id })
    .populate("author")
    .sort([["createdAt", -1]]);
  return res.render("dashboard", { user, blogs });
};

const renderAddNewBlogPage = async (req, res) => {
  const user = req.user;
  return res.render("addBlog", { user });
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const renderEditBlogPage = async (req, res) => {
  const blogId = req.params.id;
  const user = req.user;
  try {
    const blog = await Blog.findById({ _id: blogId }).populate("author");
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    res.render("editBlog", { blog, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  renderHomePage,
  renderSignupPage,
  renderVerifyPage,
  renderLoginPage,
  renderProfilePage,
  renderBookmarksPage,
  renderDashboardPage,
  renderAddNewBlogPage,
  createNewBookmark,
  deleteBookmark,
  getAllCategories,
  renderEditBlogPage,
};
