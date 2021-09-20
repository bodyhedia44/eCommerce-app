const express= require("express")
require("express-async-errors")
const _=require("lodash")
const {User,signvalidation,loginvalidation} = require("../models/users")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const auth=require("../middleware/midd")
const admin=require("../middleware/admin")
const cookie=require("cookie-parser")




var router= express.Router()

router.post("/signup",async(req,res)=>{
    console.log(req.user)
    const {error}=signvalidation(_.pick(req.body,['fullname','email','password']))
    if(error){
        return res.status(404).send(error.details[0].message)
    }
    let userexsist =await  User.findOne({email:req.body.email})


    if (userexsist) return res.status(404).send("This Email Is Already Used")

    const user=User(_.pick(req.body,['fullname','email','password','isadmin']))
    const saltrounds=10
    const salt = await bcrypt.genSalt(saltrounds)
    user.password=await bcrypt.hash(user.password,salt)
    await user.save()


    
    return res.send(_.pick(user,['fullname','email','_id','isadmin']))
})

router.post("/login",async(req,res)=>{
    const {error}=loginvalidation(_.pick(req.body,['fullname','email','password']))
    if(error){
        res.status(404).send(error.details[0].message)
    }
    let user =await  User.findOne({email:req.body.email})


     if (!user) return res.status(404).send("You Donot have an account")

     const pass= await bcrypt.compare(req.body.password,user.password)

    if(!pass) return res.status(404).send("Your password is invalid")

    const token=user.gentoken()
    res.cookie("token",token,{maxAge:1000*60*60*24*3})
    return res.send(token)
})

router.post("/logout",(req,res)=>{
    return res.clearCookie("token").send("done")
})
router.get("/test",[auth,admin],(req,res)=>{
    return res.send("tr")
})

module.exports=router;