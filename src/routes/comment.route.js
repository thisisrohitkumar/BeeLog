const express = require("express");
const { checkIfUserLoggedIn } = require("../middlewares/checkAuthenticity");
const router = express.Router();
const {
  getCommentsByBlogId,
  createNewComment,
} = require("../controllers/comment.controller");

router.get("/:blogId", getCommentsByBlogId);
router.post("/", checkIfUserLoggedIn, createNewComment);

module.exports = router;
