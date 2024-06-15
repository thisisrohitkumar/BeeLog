const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    comment:{
        type: String,
        required: true
    }
}, { timestamps: true })

const Comment = model('Comment', commentSchema)

module.exports = Comment;