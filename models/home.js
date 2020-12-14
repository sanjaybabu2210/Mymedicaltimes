var mongoose=require("mongoose");


var homeSchema=new mongoose.Schema({
    users:{
        type:String,
        default:"0"
    },
    review:{
        type:String,
        default:"0"
    },
    visitors:{
        type:String,
        default:"0"
    },
    member:{
        type:String,
        default:"0"
    },
});

module.exports=mongoose.model("home",homeSchema);