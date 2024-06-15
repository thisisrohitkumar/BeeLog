const Comment = require("../models/comment.model");
const { verifyToken } = require("../services/auth.service");

const getAllComments = async (req, res) => {};

const getCommentsByBlogId = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ blogId: id });
    return res.send(comments);
  } catch (error) {}
};

const createNewComment = async (req, res) => {
  const { comment, blogId } = req.body;
  const token = req.cookies["jwt"];
  const user = await verifyToken(token);

  try {
    await Comment.create({
        blogId,
        userId: user.id,
        comment,
    })
    return res.send('comment success')
  } catch (error) {
    console.log(error)
    return res.send('internal server error')
  }
};

module.exports = {
  getAllComments,
  getCommentsByBlogId,
  createNewComment,
};
