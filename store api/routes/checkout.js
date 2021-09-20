const express= require("express")
require("express-async-errors")
const _=require("lodash")
const {Order,ordervalidation} = require("../models/order")
const {User} = require("../models/users")
const auth=require("../middleware/midd")
const admin=require("../middleware/admin")



var router= express.Router()

router.get("/all",async(req,res)=>{
    let order=await Order.find()
    if (!order) return res.send("There is no order yet")
    return res.send(order)
})

router.post("/",async(req,res)=>{
    let user=await User.findOne({fullname:"RAMY"})
    const {error}=ordervalidation(_.pick(req.body,['name','phone','address','note']))
    if(error){
        return res.status(404).send(error.details[0].message)
    }

    const order=Order(_.pick(req.body,['name','phone','address','note']))
    order.cart=user.cart
    order.price=user.price
    await order.save()
    return res.send(order)

})

module.exports=router;