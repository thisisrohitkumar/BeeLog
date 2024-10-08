const express = require("express");
const router = express.Router();
const {
  checkAuthenticity,
  checkIfUserLoggedIn,
} = require("../middlewares/checkAuthenticity");
const {
  renderSignupPage,
  renderVerifyPage,
  renderLoginPage,
  renderProfilePage,
  renderBookmarksPage,
  createNewBookmark,
  deleteBookmark,
  renderDashboardPage,
  renderAddNewBlogPage,
  getAllCategories,
  renderHomePage,
  renderEditBlogPage
} = require("../controllers/view.controller");

router.get("/", renderHomePage);

router.get("/signup", checkAuthenticity, renderSignupPage);

router.get("/verify", checkAuthenticity, renderVerifyPage);

router.get("/login", checkAuthenticity, renderLoginPage);

router.get("/dashboard", checkIfUserLoggedIn, renderDashboardPage);

router.get("/bookmarks", checkIfUserLoggedIn, renderBookmarksPage);

router.post("/bookmarks", checkIfUserLoggedIn, createNewBookmark);

router.delete("/bookmarks/:id", checkIfUserLoggedIn, deleteBookmark);

router.get("/profile", checkIfUserLoggedIn, renderProfilePage);

router.get("/addBlog", checkIfUserLoggedIn, renderAddNewBlogPage);

router.get("/categories", getAllCategories);

router.get('/blogs/:id/edit', checkIfUserLoggedIn, renderEditBlogPage);

module.exports = router;
