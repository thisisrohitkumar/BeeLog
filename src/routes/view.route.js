const express = require("express");
const {
  checkAuthenticity,
  checkIfUserLoggedIn,
} = require("../middlewares/checkAuthenticity");
const { checkAuthority } = require("../middlewares/checkAuthority");
const { verifyToken } = require("../services/auth.service");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const Bookmark = require("../models/bookmark.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  return res.render("home", { user });
});

router.get("/signup", checkAuthenticity, (req, res) => {
  return res.render("signup");
});

router.get("/verify", checkAuthenticity, (req, res) => {
  return res.render("verify");
});

router.get("/login", checkAuthenticity, (req, res) => {
  return res.render("login");
});

router.get("/dashboard", checkIfUserLoggedIn, async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  const blogs = await Blog.find({ author: user.id })
    .populate("author")
    .sort([["createdAt", -1]]);
  return res.render("dashboard", { user, blogs });
});

router.get("/bookmarks", checkIfUserLoggedIn, async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  const bookmarks = await Bookmark.find({ userId: user.id })
  .populate({
    path: 'blogId',
    populate: {
      path: 'author',
      model: 'User',
      select: 'name'
    }
  })
    .sort([["createdAt", -1]]);
  return res.render("bookmarks", { user, bookmarks });
});

router.post("/bookmarks", checkIfUserLoggedIn, async (req, res) => {
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
});

router.get("/profile", checkIfUserLoggedIn, async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  const userDetails = await User.findOne({ _id: user.id });
  return res.render("profile", { user, userDetails });
});

router.get("/addBlog", checkIfUserLoggedIn, async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  return res.render("addBlog", { user });
});

module.exports = router;
