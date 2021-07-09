const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const winston=require("winston")
const app=express();
require("dotenv").config();
const port=process.env.PORT || 8000 ;
const booksRoute=require("./routes/books")

//middleware
app.use(cors())
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


//listen port
app.listen(port ,()=>{
    console.log(`server started a port ${port}`)
})