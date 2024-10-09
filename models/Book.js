const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const timestamps=require('mongoose-timestamps')
const bookSchema=new Schema({

bookTitle:{type:String},
authorName:{type:String},
publisherName:{type:String},
language:{type:String},
pricePerUnit:{type:Number},
noofPages:{type:Number},
isbnNo:{type:String},
originCountry:{type:String},
bookImage:{type:String},
createdAt:Date,
updatedAt:Date

});
bookSchema.plugin(timestamps,{index:true});
module.exports=mongoose.model('Book',bookSchema);