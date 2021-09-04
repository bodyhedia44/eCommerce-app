const mongoose = require("mongoose")
const joi = require("joi")


const User=mongoose.model('auth',mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:44,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:255,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:1024,
    }
    
}))

function uservalidation(user) {
    const schema={
        fullname:joi.string().min(3).max(44).required(),
        email:joi.string().min(3).max(255).required().email(),
        password:joi.string().min(8).max(1024).required(),
    }
    return joi.Validate(user,schema)
}

exports.User=User;
exports.uservalidation = uservalidation ;