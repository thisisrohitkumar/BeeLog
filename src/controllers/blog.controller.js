const fs = require("fs");
const bucket = require("../config/firebaseConfig");
const path = require("path");
const slugify = require('slugify');
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const Bookmark = require("../models/bookmark.model");

const { verifyToken } = require("../services/auth.service");

const getAllBlogs = async (req, res) => {
  const token = req.cookies["jwt"];
  let user = null;

  if (token) {
    user = await verifyToken(token);
  }

  try {
    const query = req.query;
    const blogs = await Blog.find(query)
      .populate("author")
      .sort([["updatedAt", -1]]);
    return res.render("blogs", { blogs, user, category: query.category });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getBlogById = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies["jwt"];
  let user = null;
  if (token) {
    user = await verifyToken(token);
  }

  try {
    const blog = await Blog.findById({ _id: id });

    if (!blog) {
      return res.render("home", { msg: "~ Blog not found ~" });
    } else {
      return res.redirect(`/blogs/post/${blog.slug}`);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const token = req.cookies["jwt"];
  let user = null;

  if (token) {
    user = await verifyToken(token);
  }

  try {
    // Find the blog post by slug
    const blog = await Blog.findOne({ slug }).populate("author");
    const comments = await Comment.find({ blogId: blog ? blog._id : null }).populate("userId");

    if (!blog) {
      return res.render("home", { msg: "~ Blog not found ~" });
    } else {
      return res.status(200).render("blogPost", { blog, comments, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};

const generateSlug = (title) => {
  return slugify(title, { lower: true, strict: true });
}

const createNewBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const slug = generateSlug(title);
  const file = req.file;
  const user = req.user;
  try {
    const filename = file.filename;
    const tempFilePath = path.join(file.destination, file.filename);

    // Verify the file exists
    if (!fs.existsSync(tempFilePath)) {
      throw new Error("File not found");
    }

    // Upload the thumbnail to Firebase Storage
    await bucket.upload(tempFilePath, {
      destination: `thumbnails/${filename}`,
      public: true,
    });
    const fileUrl = `https://storage.googleapis.com/${bucket.name}/thumbnails/${filename}`;

    const newBlog = await Blog.create({
      title,
      slug,
      content,
      category,
      thumbnail: fileUrl,
      author: user.id,
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    return res.redirect(`/blogs/post/${newBlog.slug}`);
  } catch (error) {
    console.log(error);
    return res.send("Internal server error");
  }
};

const handleDeleteBlog = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {

    const blogPost = await Blog.findById(id);

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Extract the filename from the thumbnail URL
    const thumbnailUrl = blogPost.thumbnail;
    const filename = thumbnailUrl.split("/").pop();

    // Delete all the comments related to this blog
    await Comment.deleteMany({ blogId: id });

    // Delete all the bookmarks related to this blog
    await Bookmark.deleteMany({ blogId: id });

    // Delete the blog post from the database
    await Blog.findByIdAndDelete(id);

    // Delete the thumbnail from Firebase Storage
    await bucket.file(`thumbnails/${filename}`).delete();

    const blogs = await Blog.find({ author: user.id })
    .populate("author")
    .sort([["updatedAt", -1]]);

    return res
      .status(200)
      .render("dashboard", { blogs, user, msg: "~ Blog post deleted successfully! ~" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res
      .status(500)
      .render("home", { user, msg: "Failed to delete blog post" });
  }
};

const handleEditBlog = async (req, res) => {
  const { title, content, category } = req.body;
  const slug = generateSlug(title);
  const file = req.file;
  const user = req.user;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById({ _id: blogId });
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    if (blog.author.toString() !== user.id.toString()) {
      return res.status(403).send("Forbidden");
    }

    let fileUrl = blog.thumbnail;

    if (file) {
      const filename = file.filename;
      const tempFilePath = path.join(file.destination, file.filename);

      // Verify the file exists
      if (!fs.existsSync(tempFilePath)) {
        throw new Error("File not found");
      }

      // Delete the old thumbnail from Firebase Storage if it exists
      if (fileUrl) {
        const oldFilename = fileUrl.split('/').pop();
        await bucket.file(`thumbnails/${oldFilename}`).delete();
      }

      // Upload the new thumbnail to Firebase Storage
      await bucket.upload(tempFilePath, {
        destination: `thumbnails/${filename}`,
        public: true,
      });
      fileUrl = `https://storage.googleapis.com/${bucket.name}/thumbnails/${filename}`;

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    }

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.thumbnail = fileUrl;

    await blog.save();

    return res.redirect(`/blogs/${blog._id}`);
  } catch (error) {
    console.log(error);
    return res.send("Internal server error");
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createNewBlog,
  handleDeleteBlog,
  handleEditBlog,
};
