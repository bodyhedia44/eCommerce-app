const mongoose = require("mongoose")
const joi =require("joi")


const orderschema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:500,
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    notes:{
        type:String,
    },
    cart:{
        type:[{}],
        default:undefined
    },
    price:{
        type:Number
    }
})

const Order=mongoose.model('order',orderschema)

function ordervalidation(order) {
    const schema=joi.object({
        name:joi.string().min(3).max(500).required(),
        phone:joi.number().required(),
        address:joi.string().required(),
        note:joi.string().max(1024),
    })
    return schema.validate(order)
}


exports.Order=Order;
exports.ordervalidation = ordervalidation ;
