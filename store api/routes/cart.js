const express= require("express")
require("express-async-errors")
const {User} = require("../models/users")
const {Products} = require("../models/products")
const auth=require("../middleware/midd")
const admin=require("../middleware/admin")

var router= express.Router()


router.post('/add/:id',async(req,res)=>{
let user=await User.findOne({fullname:"RAMY"})
let cart=user.cart
let price=user.price
    let prod=await Products.findOne({_id:req.params.id}).catch((e)=>{
        return res.status(404).send("There is no products with this id")
    })
    if (!prod) return res.status(404).send("There is no products with this id")

if(cart.some(e=>e.name==prod.name)){
    const index = cart.findIndex(e=>e.name==prod.name)
    let quan=cart[index].quantity
  cart.splice(index,1)
  cart.push(    {
    name:prod.name,
    price:prod.price,
    id:prod._id,
    quantity:quan+=1
})
    price+=prod.price
}else{
    cart.push(     
    {
        name:prod.name,
        price:prod.price,
        id:prod._id,
        quantity:1
    })
    price+=prod.price
}
user.cart=cart
user.price=price
user.save()
        return res.send(cart)
}
)

router.post('/del/:id',async(req,res)=>{
let user=await User.findOne({fullname:"RAMY"})
let cart=user.cart
let price=user.price
    let prod=await Products.findOne({_id:req.params.id}).catch((e)=>{
        return res.status(404).send("There is no products with this id")
    })
    if (!prod) return res.status(404).send("There is no products with this id")

    const index = cart.findIndex(e=>e.name==prod.name)
    let quan=cart[index].quantity
    if(quan==1){
  cart.splice(index,1)
  price-=prod.price
    }else{
  cart.splice(index,1)
  cart.push(    {
    name:prod.name,
    price:prod.price,
    id:prod._id,
    quantity:quan-=1
})
price-=prod.price
    }
user.cart=cart
user.price=price
user.save()
        return res.send(cart)
}
)

router.get("/",async(req,res)=>{
    let user=await User.findOne({fullname:"RAMY"})

    return res.send(user.cart)
})
router.post("/clear",async(req,res)=>{
    let user=await User.findOne({fullname:"RAMY"})
    user.cart=[]
    user.price=0
    user.save()
    return res.send(user.cart)
})




module.exports=router;