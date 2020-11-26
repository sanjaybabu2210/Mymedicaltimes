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
        type:String,
        default:'0'
    },
    writenews:{
        type:Boolean,
        default:false
    }
});
var options = {
    errorMessages: {
        UserExistsError: 'An account already exists with the given Email Id',
        IncorrectUsernameError: 'Email does not exist',
    }
};
UserSchema.plugin(passportLocalMongoose,options);
module.exports=mongoose.model("User",UserSchema);