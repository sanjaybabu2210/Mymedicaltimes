var mongoose=require("mongoose");


var reviewSchema=new mongoose.Schema({
    email:String,
    name:String,
    college:String,
    reviewtxt:String
});

module.exports=mongoose.model("review",reviewSchema);