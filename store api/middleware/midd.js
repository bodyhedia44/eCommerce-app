const jwt = require("jsonwebtoken")



module.exports= function (req,res,next) {
    const token=req.cookies.token
    console.log(token)
    if(!token){
        return res.status(401).send("token rejected")
    }
    try{
        const dtoken=jwt.verify(token,"idkey")
        req.user=dtoken
        next()
    }catch(e){
        return res.status(400).send("wrong token......")
    }
}