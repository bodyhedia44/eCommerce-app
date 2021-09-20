const express= require("express")
require("express-async-errors")
const _=require("lodash")
const {Products,productvalidation} = require("../models/products")
const auth=require("../middleware/midd")
const admin=require("../middleware/admin")



var router= express.Router()

router.get("/all",async(req,res)=>{
    let prod=await Products.find()
    if (!prod) return res.send("There is no products yet")
    return res.send(prod)
})
router.post("/create",async(req,res)=>{
    const {error}=productvalidation(_.pick(req.body,['name','image','price','description']))
    if(error){
        res.status(404).send(error.details[0].message)
    }
    let prodexsist =await  Products.findOne({name:req.body.name})


    if (prodexsist) return res.status(404).send("This product Is Already Used")

    const product=Products(_.pick(req.body,['name','image','price','description']))
    await product.save()
    return res.send(product)

})

router.get("/:id",async(req,res)=>{
    let prod =await  Products.findOne({_id:req.params.id}).catch((e)=>{
        return res.status(404).send("There is no product")
    })

     if (!prod) return res.status(404).send("There is no product")

    return res.send(prod)
})
router.post("/update/:id",async(req,res)=>{
    const {error}=productvalidation(_.pick(req.body,['name','image','price','description']))
    if(error){
        res.status(404).send(error.details[0].message)
    }
    let prod =await  Products.findOne({_id:req.params.id})


     if (!prod) return res.status(404).send("there is no product with this id")

    prod.name=req.body.name
    prod.price=req.body.price
    prod.image=req.body.image
    prod.description=req.body.description

    prod.save()
    return res.send(prod)

})

router.post("/delete/:id",async(req,res)=>{

    let prod =await  Products.findOne({_id:req.params.id})


     if (!prod) return res.status(404).send("there is no product with this id")

    Products.deleteOne({_id:req.params.id}).then((e)=>{
        return res.send("Product is deleted")
    }).catch((e)=>{
        return res.status(404).send("Error")
    })
})


module.exports=router;