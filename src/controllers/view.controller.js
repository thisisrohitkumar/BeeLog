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
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
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
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }

  const { blogId } = req.body;
  const user = await verifyToken(token);

  const alreadyBookmarked = await Bookmark.findOne({ userId: user.id, blogId });

  if (alreadyBookmarked) {
    return res.render("home", { user, msg: "Already Bookmarked!" });
  }

  await Bookmark.create({ userId: user.id, blogId });
  return res.render("home", { user, msg: "Successfully Bookmarked!" });
};

const renderProfilePage = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  const userDetails = await User.findOne({ _id: user.id });
  return res.render("profile", { user, userDetails });
};

const renderDashboardPage = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  const blogs = await Blog.find({ author: user.id })
    .populate("author")
    .sort([["createdAt", -1]]);
  return res.render("dashboard", { user, blogs });
};

const renderAddNewBlogPage = async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
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
  getAllCategories,
};
