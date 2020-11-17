var mongoose=require("mongoose");

var medicalnewsSchema=new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    shortDescription:String,
     createdAt:{
         type:Date,
         default:Date.now
     }
});

module.exports=mongoose.model("medicalnews",medicalnewsSchema);