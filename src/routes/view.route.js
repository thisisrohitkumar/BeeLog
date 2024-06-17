const express = require("express");
const { checkAuthenticity, checkIfUserLoggedIn } = require("../middlewares/checkAuthenticity");
const { checkAuthority } = require("../middlewares/checkAuthority");
const { verifyToken } = require("../services/auth.service");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.cookies["jwt"];
  if (!token) {
    return res.render("home");
  }
  const user = await verifyToken(token);
  return res.render("home", {user});
});

router.get("/signup", checkAuthenticity, (req, res) => {
  return res.render("signup");
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
    const blogs = await Blog.find({author: user.id}).populate('author').sort([["createdAt", -1]])
    return res.render("dashboard", {user, blogs});
});

router.get("/profile", checkIfUserLoggedIn, async (req, res) => {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.render("home");
    }
    const user = await verifyToken(token);
    const userDetails = await User.findOne({_id: user.id});
    return res.render("profile", {user, userDetails});
});

router.get("/addBlog", checkIfUserLoggedIn, async (req, res) => {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.render("home");
    }
    const user = await verifyToken(token);
    return res.render("addBlog", {user});
});


module.exports = router;
