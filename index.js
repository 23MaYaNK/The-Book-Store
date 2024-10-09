const express= require('express');
// const connection  = require('mongoose');
const book=require('./routes/book');
const common=require('./helper/common')
const app=express();
const path=require('path')
const connection=require('./connection');
connection();
common.createadmin();

app.use(express.static(path.join(__dirname,'public')));
app.use(book);
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));




app.listen(3000,(err)=>{
    if(err){ 
        console.log(err);

    }else{
        console.log("server is running on 3000");
    }
})
