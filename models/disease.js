var mongoose=require("mongoose");

var diseaseSchema=new mongoose.Schema({
    title:String,
    shortDescription:String,
    description:String,
    mainHeading:{
        type:String,
        default:"news"
    },
    subHeading:{
        type:String,
        default:"news"
    },
    userId:{
        type:String,
        default:"admin"
    },
    username:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    disease:{
        type:String,
        default:null
    },
    author:String
});

module.exports=mongoose.model("disease",diseaseSchema);