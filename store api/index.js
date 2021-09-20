const express = require('express')
const mongoose = require('mongoose');
const auth= require("./routes/auth")
const prod= require("./routes/prod")
const cart= require("./routes/cart")
const check= require("./routes/checkout")
const respass= require("./routes/resetpass")
const bodyparser=require("body-parser")
const helmet=require("helmet")
const logger=require("./config/logger")
const cookie=require("cookie-parser")
require("dotenv").config();



mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then((e)=>{
    console.log("done db")
}).catch((e)=>{
    console.log(e)
});
mongoose.set("useCreateIndex",true)

const app = express()

app.use(bodyparser.json())
app.use(express.json())
app.use(cookie())
app.use(helmet())
app.use("/auth",auth)
app.use("/cart",cart)
app.use("/check",check)
app.use("/",prod)
app.use("/password-reset",respass)
 
 
app.listen(2000,()=>{
    console.log("started")
})