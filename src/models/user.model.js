const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    dp:{
        type: String,
        default: "/images/default_dp.png"
    }
}, { timestamps : true})

const User = model('User', userSchema);

module.exports = User;