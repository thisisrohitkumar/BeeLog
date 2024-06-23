const Comment = require("../models/comment.model");

const getCommentsByBlogId = async (req, res) => {
  const { blogId } = req.params;
  try {
    const comments = await Comment.find({ blogId });
    return res.send(comments);
  } catch (error) {}
};

const createNewComment = async (req, res) => {
  const { comment, blogId } = req.body;
  const user = req.user;

  try {
    await Comment.create({
        blogId,
        userId: user.id,
        comment,
    })
    return res.redirect(`/blogs/${blogId}`)
  } catch (error) {
    console.log(error)
    return res.send('internal server error')
  }
};

module.exports = {
  getCommentsByBlogId,
  createNewComment,
};
