const mongoose = require("mongoose")
const joi =require("joi")
const jwt = require("jsonwebtoken")


const userschema = mongoose.Schema({
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
    },
    isadmin:Boolean,
    cart:{
        type:[{}],
        default:undefined
    },
    price:{
        type:Number
    }
    
})

userschema.methods.gentoken=function () {
    const token=jwt.sign({id:this._id,admin:this.isadmin},"idkey")
    return token
}


const User=mongoose.model('auth',userschema)

function signvalidation(user) {
    const schema=joi.object({
        fullname:joi.string().min(3).max(44).required(),
        email:joi.string().min(3).max(255).required().email(),
        password:joi.string().min(8).max(1024).required(),
    })
    return schema.validate(user)
}
function loginvalidation(user) {
    const schema=joi.object({
        email:joi.string().min(3).max(255).required().email(),
        password:joi.string().min(8).max(1024).required(),
    })
    return schema.validate(user)
}

exports.User=User;
exports.signvalidation = signvalidation ;
exports.loginvalidation = loginvalidation ;