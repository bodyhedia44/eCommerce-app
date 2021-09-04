const express = require('express')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://body:123456body@cluster.ulqkc.mongodb.net/storedb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then((e)=>{
    console.log("done db")
}).catch((e)=>{
    console.log("err")
});


const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(2000,()=>{
    console.log("started")
})