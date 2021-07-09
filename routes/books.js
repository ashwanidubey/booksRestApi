const express=require("express");
const router=express.Router();
const {Book,validateBook}=require("../models/books");

router.post('/',async (req,res)=>{
    const message=await validateBook(req.body)
   if(message)
    {
        //res.status(400).send(message)
        console.log(message)
    }
    //else{
    book=new Book({
        name:req.body.bookName ,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    })
    book.save().then(book=>{res.send(book)}).catch((e)=>{res.status(400).send(e)})//}
})
router.get('/',(req,res)=>{
   
    Book.find().then(book=>{res.send(book)}).catch((e)=>{res.status(400).send(e)})
})
router.get('/:id',(req,res)=>{
   
    Book.findById(req.params.id)
    .then((book)=>{
        if(book)
           res.send(book)
        res.status(400).send("something is wrong")   
    })
    .catch((e)=>{
        res.status(400).send(e)
    })
})
router.put('/:id',(req,res)=>{
   
    Book.findByIdAndUpdate(req.params.id,{
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    },{new:true})
    .then(book=>{
        if(book)
           res.send(book)
        res.status(400).send("book not found")   
    })
    .catch((e)=>{
        res.status(400).send(e)
    })
})
router.delete('/:id',async (req,res)=>{
   const book=await Book.findByIdAndRemove(req.params.id);
   if(!book)
      res.status(404).send("book with id not found")
   res.send(book)   
    
})
module.exports=router