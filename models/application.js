var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var ApplicationSchema=new mongoose.Schema({
    email:String,
    fullname:String,
    country:String,
    degree:String,
    pcode:String,
    resume:String,
        sample:String,
    hearfrom:String,
    photo:String,
    userid: String

    


});

ApplicationSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Application",ApplicationSchema);