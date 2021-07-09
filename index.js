const express=require("express");
const mongoose=require("mongoose");
const winston=require("winston")
const app=express();
require("dotenv").config();
const port=process.env.PORT || 3000 ;
const booksRoute=require("./routes/books")

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//winston
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(
      {
        formate:winston.format.combine(
          winston.format.colorize({all:true})
        )
      }
    ),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

//routes
app.use('/api/books/',booksRoute)

//db connect
mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
   console.log("connection successfull")
}).catch((e)=>{logger.log("error",e)})
app.listen(port ,()=>{
    console.log(`server started a port ${port}`)
})