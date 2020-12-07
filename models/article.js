var mongoose=require("mongoose");

var articleSchema=new mongoose.Schema({
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
    coverImage:{
        type: String,
    },
    userId:{
        type:String,
        default:"admin"
    },
    isfeatured:{
        type:Boolean,
        default:false
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

module.exports=mongoose.model("article",articleSchema);