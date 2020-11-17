var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var UserSchema=new mongoose.Schema({
    email:String,
    username:String,
    password:String,
    fullName:String,
    college:String,
    nationality:String,
    writearticle:{
        type:Boolean,
        default:false
    },
    writenews:{
        type:Boolean,
        default:false
    }
});

UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);