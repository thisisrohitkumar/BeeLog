const express = require("express");
const router = express.Router();
const multer = require("multer");
const { checkIfUserLoggedIn } = require("../middlewares/checkAuthenticity");
const {
  createNewBlog,
  getAllBlogs,
  getBlogById,
  handleDeleteBlog,
} = require("../controllers/blog.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.delete("/:id", checkIfUserLoggedIn, handleDeleteBlog);
router.post(
  "/",
  checkIfUserLoggedIn,
  upload.single("thumbnail"),
  createNewBlog
);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

module.exports = router;
