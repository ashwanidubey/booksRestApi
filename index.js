const express=require("express");
const mongoose=require("mongoose");
const app=express();
require("dotenv").config();
const port=process.env.PORT || 3000 ;

mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull")
}).catch((e)=>{console.log(e)})
app.listen(port ,()=>{
    console.log("server started a port ",port)
})