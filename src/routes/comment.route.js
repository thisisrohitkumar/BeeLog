const express = require("express");
const { checkIfUserLoggedIn } = require("../middlewares/checkAuthenticity");
const router = express.Router();
const {
  getAllComments,
  getCommentsByBlogId,
  createNewComment,
} = require("../controllers/comment.controller");

router.get("/", getAllComments);
router.get("/:id", getCommentsByBlogId);
router.post("/", checkIfUserLoggedIn, createNewComment);

module.exports = router;
