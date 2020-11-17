var mongoose=require("mongoose");

var diseaseSchema=new mongoose.Schema({
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
    disease:{
        type:String
    },
    author:String
});

module.exports=mongoose.model("disease",diseaseSchema);