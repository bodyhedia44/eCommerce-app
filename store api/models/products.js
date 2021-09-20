const mongoose = require("mongoose")
const joi =require("joi")


const productschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:500,
    },
    price:{
        type:Number,
        required:true,
        maxlength:8,
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        minlength:3,
    },
    
})

const Products=mongoose.model('product',productschema)

function productvalidation(prod) {
    const schema=joi.object({
        name:joi.string().min(3).max(500).required(),
        price:joi.number().max(100000000).required(),
        image:joi.string().required(),
        description:joi.string().min(8).max(1024).required(),
    })
    return schema.validate(prod)
}


exports.Products=Products;
exports.productvalidation = productvalidation ;
