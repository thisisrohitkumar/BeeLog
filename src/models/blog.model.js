const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: "/images/default_thumbnail.jpg"
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true})

const Blog = model('Blog', blogSchema)

module.exports = Blog