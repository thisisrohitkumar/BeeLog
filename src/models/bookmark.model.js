const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  { timestamps: true }
);

const Bookmark = model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
