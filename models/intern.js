var mongoose=require("mongoose");

var internSchema=new mongoose.Schema({
     email:String,
     name:String,
     phoneNumber:String,
    college:String,
    question:String,

});

module.exports=mongoose.model("intern",internSchema);