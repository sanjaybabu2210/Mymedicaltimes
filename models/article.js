var mongoose=require("mongoose");

var articleSchema=new mongoose.Schema({
    title:String,
    shortDescription:String,
    description:String,
    mainHeading:String,
    subHeading:String,
    userId:String,
    username:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    author:String
});

module.exports=mongoose.model("article",articleSchema);