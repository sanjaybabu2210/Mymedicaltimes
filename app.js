var express=require("express");
var app =express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var flash=require("connect-flash");
app.locals.moment=require("moment");
var User=require("./models/user");
var path = require('path');
var	methodOverride = require("method-override");

var intern=require("./models/intern");
var review=require("./models/review");
var article=require("./models/article");
var Application=require("./models/application");

// var Disease=require("./models/disease");
// var medicalnews=require("./models/medicalnews");

app.use(methodOverride("_method"));

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });

// destination: function(req, file, callback) {
//     callback(null, './public/audio');
//   },
//   filename: function(req, file, callback) {
//     console.log(file);
//     if(file.originalname.length>6)
//       callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length-6,file.originalname.length));
//     else
//       callback(null, file.fieldname + '-' + Date.now() + file.originalname);

//   }
// });

// const upload = multer({ storage: storage });

app.use(express.static('public'));

//   const fileName = req.body.title;


//   saveAudio(fileName,audioFile.filename,audioGraphic.filename,req.body.artist,function (error,success) {
//     req.flash('success','File Uploaded Successfully')

//     res.redirect('/')
//   });




//mongoose.connect("mongodb://localhost/MMT_v8",{useNewUrlParser: true});
mongoose.connect('mongodb+srv://sanjayAshwat:tecwebsite@cluster1.rbufv.mongodb.net/Blogs?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!!');
}).catch(err => {
	console.log('ERROR:', err.message);
});
var passport=require("passport");
var localStrategy=require("passport-local");
var methodOverride=require("method-override");

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));

app.use(require("express-session")({
    secret:"Medical Times",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
mongoose.set('useCreateIndex', true);
// app.use(express.static(path.join(__dirname, 'public/')));

app.use(function(req,res,next)
//this will pass status of user as log in or log out to every page.
{
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");//for displaying flash message in any page under the name error if required.
    res.locals.success=req.flash("success");
    next();
});

app.get("/",function(req,res){
   res.redirect("/home");
    
});
app.post('/application/:id', upload.fields([{
  name: 'photo', maxCount: 1
}, {
  name: 'resume', maxCount: 1
}]) ,(req, res) => {

  const photo1 = req.files.photo[0];
  const resume1 = req.files.resume[0];

    var photo = photo1.filename;
	var email = req.body.email;
	var fullName = req.body.fullname;
	var country = req.body.country;
    var degree = req.body.degree;
    	var pcode = req.body.pcode;

        	var resume = resume1.filename;

            	var sample = req.body.sample;

                    var hearfrom = req.body.hearfrom;
                    var userid = req.params.id;


	
	 var newapp = {photo:photo,email:email,fullname:fullName,country:country,degree:degree,pcode:pcode,resume:resume,sample:sample,hearfrom:hearfrom,userid : userid }

	//create a new campground and save to db
					Application.create(newapp, function(err,newlyCreated){
						if(err){
                            // req.flash('error', err.message);
                            console.log(err);
							return res.redirect('back');
						}else{
                                            req.flash('success', "Your application has been submited and is being reviewed by our Expert. you will be notified about the same within 5-7 working days.");

                            console.log(newlyCreated);
							res.redirect("/application");
						}
					});
		
		
	});

app.get("/home",function(req,res){
    article.aggregate([{$sort:{createdAt:-1}}],function(err, art) {
        if(err)
        console.log(err);
        else{
           // console.log(art);
           res.render("index.ejs",{art:art});
        }
    });
});
app.get("/home/disease",function(req, res) {
    article.aggregate([{$sort:{createdAt:-1}}],function(err, rev) {
                if(err)
                console.log(err);
                else{
                      res.render("index.ejs",{rev:rev});
                }
          
        });
});

app.get("/privacy-policy",function(req,res){
   res.render("privacy_policy.ejs");
});

app.get("/sitemap",function(req,res){
   res.render("sitemap.ejs");
});
app.get("/cookie-policy",function(req,res){
   res.render("cookie_policy.ejs");
});

app.get("/applyintern",isLoggedIn, function(req,res){
   res.render("applyintern.ejs");
});
app.post("/applyintern",isLoggedIn,function(req,res){
   var name=req.body.name;
   var email=req.body.email;
   var college=req.body.college;
   var question=req.body.hire;
   var applyIntern={name:name,email:email,college:college,question:question,phoneNumber:req.body.phoneNumber};
  intern.create(applyIntern,function(err,ints){
      if(err)
      console.log(err);
      else{
         // console.log(ints);
          req.flash("success","Thank you for showing interest. Your Internship application has been submitted ,Our Recruitment team will connect with you on specified Email");
          res.redirect("/applyintern");
      }
  });
});

app.get("/writereview", isLoggedIn, function(req,res){
   res.render("writereview.ejs");
});
app.post("/writereview",isLoggedIn,function(req,res){
   var gotReview={email:req.body.email,name:req.body.name,college:req.body.college,reviewtxt:req.body.reviewtxt};
   review.create(gotReview,function(err,rev){
       if(err)
       console.log(err);
       else{
          //console.log(rev);
          req.flash("success","Review Submitted, Your review is very valuable to us Thank you!");
          res.redirect("/writereview");
       }
   });
});

app.get("/writearticle",isLoggedIn,function(req,res){
    if(req.user.writearticle=='true'){
   res.render("writearticle.ejs");
}  else if(req.user.writearticle=='0'){
       req.flash("error","You Don't have permission to write Medical Article, Mail us at mymedicaltimes@gmail.com to give you access");
       res.redirect("/home");
    
   }else{
       req.flash("error","Unfortunately now you are not eligible to become a Medical Content Writer on our platform. you can apply for the same after 3 months. Thank you");
       res.redirect("/home");
   }
});

app.get("/writemedicalnews",isLoggedIn,function(req,res){
    if(req.user.writenews=='true')
   res.render("writemedicalnews.ejs");
   else if(req.user.writenews=='0'){
       req.flash("error","You Don't have permission to write Medical Article, Mail us at mymedicaltimes@gmail.com to give you access");
       res.redirect("/home");
    
   }else{
       req.flash("error","You Don't have permission to write Medical Article, Mail us at mymedicaltimes@gmail.com to give you access");
       res.redirect("/home");
   }
});

app.post("/writemedicalnews", upload.single('coverImage') ,function(req,res){

     const image1 = req.file;

    var image = image1.filename;



    var news={title:req.body.title,description:req.body.description,author:req.body.author,coverImage: image,shortDescription:req.body.shortDescription};
   article.create(news,function(err, newss) {
       if(err)
       console.log(err);
       else{
           req.flash("success","Medical News Submitted Successfully, Thank You for your Contribuion");
           //console.log(news);
           res.redirect("/writemedicalnews");
       }
   });
    
});

app.get("/home/medicalNews",function(req, res) {
    article.aggregate([{$sort:{createdAt:-1}}],function(err, md) {
        if(err)
        console.log(err);
        else{
            res.render("homeMedicalNews.ejs",{md:md});
        }
    });
});

app.get("/seeMedicalNews/:id",function(req,res){
    article.findById(req.params.id,function(err, art) {
        if(err)
        console.log(err);
        else{
        res.render("index.ejs",{art:art});     
        }
    });
     
});

app.post("/writearticle",upload.single('cover') ,function(req,res){
     const cover1 = req.file;

    var cover = cover1.filename;

    var art={title:req.body.title,mainHeading:req.body.mainHeading,coverImage:cover,description:req.body.description,shortDescription:req.body.shortDescription,userId:req.user._id,subHeading:req.body.subHeading,author:req.body.author,disease:req.body.topic};
   if(req.body.topic==="notPart"){
       
   article.create(art,function(err, articles) {
       if(err)
       console.log(err);
       else{
          req.flash("success","Article Submitted Successfully, Thank You for your Contribuion");
         res.redirect("/writearticle");
       }
   });
   }
   else{
       article.create(art,function(err, rev) {
           if(err)
           console.log(err);
           else{
             req.flash("success","Disease Article Submitted Successfully, Thank You for your Contribuion");
             res.redirect("/writearticle");  
           }
       });
   }
});
app.delete("/writearticle/:id",function(req,res){
	article.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/seeArticles");
		}else{
			res.redirect("/seeArticles");
		}
	});
});
app.post("/writearticle/:id",function(req,res){
  

    	article.findById(req.params.id,async function(err, adpost){
		if(err){
			req.flash("error", err.message)
			res.redirect("back");
		}else{
            
            

            var articles = req.body.article;
            articles.description = req.body.description;
			article.findByIdAndUpdate(req.params.id, articles, function(err, upadatedArticle){
				if(err){
					req.flash("error", err.message);
					req.redirect("back");
					
				}else{
					req.flash("success", "Successfully Updated")
			res.redirect("/seeArticles");
				}
                })
			
		}
		
	});



});
app.get("/maindisease1",function(req,res){
   res.render("maindisease1.ejs");
});



/*------------------------------PROFILE ROUTES----------------------------*/

app.get("/login",function(req, res) {
    req.flash("error");
    res.render("login.ejs");
});
app.get("/application", isLoggedIn, function(req, res) {

    var user = req.user._id;
    res.render("application.ejs",{userid: user});
});



app.get("/seeapplications",function(req, res) {
     Application.find({},function(err,use){
        if(err)
        console.log(use);
        else{
            console.log(use);
        res.render("viewapplication.ejs",{use:use}); 
        }
    });
});

app.post("/login",passport.authenticate("local",
{
  successReturnToOrRedirect:"/",
  failureRedirect:"/login",
  failureFlash:true,
  successFlash:true
}),function(req, res) {
       delete req.session.returnTo;

});

app.get("/logout",function(req,res){
   req.logout();
   req.flash("success","Successfully logged you out");
   res.redirect("/");
});

 
app.get("/signup",function(req,res){
   res.render("register.ejs");
});

app.get("/profilenav",function(req,res) {
    var userclickedid=req.user._id;
    User.findById(userclickedid,function(err,foundUser){
        if(err)
        {
            console.log(err);
        }
        else{
            
            res.render("profile.ejs",{foundUser:foundUser});/////////////
        }
    });
});

app.put("/profilenav/update",function(req, res) {
    var userId=req.body.userId;
    var username=req.body.email;
    var college=req.body.college;
    var email=req.body.username;
    var fullName=req.body.fullName;
    User.findById(userId,function(err,foundUser)
    {
        if(err)
        console.log(err);
        else{
            //console.log(foundUser);
            foundUser.username=username;///////////////no idea why getting an array//////////
            foundUser.fullName=fullName;
            foundUser.college=college;
            foundUser.email=email;
            foundUser.save();
            req.flash("success","Details Updated Successfully");
            res.redirect("/profilenav");
        }
    });
});

app.post("/register",function(req,res)
{
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,users)
    {
        if(err){
        console.log(err);
        req.flash("error",""+err.message);
        return res.redirect("/signup");
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
            users.college=req.body.college;
            users.nationality=req.body.nationality;
            users.email=req.body.email;
            users.fullName=req.body.fullName;
            if(users.username==='admin@gmail.com'){
            users.writearticle='true';
            users.writenews=true;
            }
            users.save();
            //console.log(users);
           req.flash("success","Welcome "+users.email);
           res.redirect("/home");
       });
        }
    });
});

/*-------------END OF PROFILE ROUTES----------------------------*/


app.get("/contactus",function(req,res){
   res.render("contactus.ejs");
});
// app.get("/maindisease1",function(req,res){
//    res.render("maindisease1.ejs");
// });

app.get("/maindisease2",function(req,res){
   res.render("maindisease2.ejs");
});

app.get("/maindisease3",function(req,res){
   res.render("maindisease3.ejs");
});


app.get("/t&c",function(req,res){
   res.render("t&c.ejs");
});

app.get("/aboutus",function(req,res){
   res.render("about_us.ejs");
});



/* -----------------------------ADMIN ROUTES-------------------------------------------------------*/

app.get("/admin",isNewLoggedIn,function(req, res) {
   res.render("admin.ejs"); 
});
app.get("/admin/login",function(req, res) {
   res.render("admin_login.ejs"); 
});
app.get("/seeUserDetails",isNewLoggedIn,function(req, res) {
    User.find({},function(err,use){
        if(err)
        console.log(use);
        else{
        res.render("seeUserDetails.ejs",{use:use}); 
        }
    });
});
app.get("/seeInternDetails",isNewLoggedIn,function(req, res) {
    intern.find({},function(err,use){
        if(err)
        console.log(err);
        else{
        res.render("seeInternDetails.ejs",{use:use}); 
        }
    });
});
app.get("/seeReviewDetails",isNewLoggedIn,function(req, res) {
    review.find({},function(err,use){
        if(err)
        console.log(err);
        else{
        res.render("seeReview.ejs",{use:use}); 
        }
    });
});
app.post("/admin/login",function(req, res) {
   if(req.body.username=="admin@gmail.com"){
       passport.authenticate("local",
{
  successRedirect:"/admin",
  failureRedirect:"/admin/login",
  failureFlash:true,
  successFlash:true
})(req,res);
   }
   else{
       req.flash("error","You are not an admin!!!");
       res.redirect("/admin/login");
   }
});

app.get("/grantAccess/:appid",function(req, res) {
    var appid=req.params.appid;
  Application.findById(appid,function(err, foundUser) {
        if(err)
        console.log(err);
        else{
            foundUser.access='true';
            foundUser.save();
                                User.findById(foundUser.userid,function(err, foundUser) {
                            if(err)
                            console.log(err);
                            else{
                                foundUser.writearticle='true';
                                foundUser.save();
                            }
                        });
            req.flash("success","Permission Granted");
            res.redirect("/seeapplications");
        }
    });

   
});
app.get("/removeAccess/:userId",function(req, res) {
      var appid=req.params.userId;
  Application.findById(appid,function(err, foundUser) {
        if(err)
        console.log(err);
        else{
            foundUser.access='false';
            foundUser.save();
                                User.findById(foundUser.userid,function(err, foundUser) {
                            if(err)
                            console.log(err);
                            else{
                                foundUser.writearticle='false';
                                foundUser.save();
                            }
                        });
            req.flash("success","Permission Granted");
            res.redirect("/seeapplications");
        }
    });

   
});


app.get("/grantNewsAccess/:userId",function(req, res) {
    var userId=req.params.userId;
    User.findById(userId,function(err, foundUser) {
        if(err)
        console.log(err);
        else{
            foundUser.writenews=true;
            foundUser.save();
            req.flash("success","News Permission Granted");
            res.redirect("/seeapplications");
        }
    });
});
app.get("/removeNewsAccess/:userId",function(req, res) {
    var userId=req.params.userId;
    User.findById(userId,function(err, foundUser) {
        if(err)
        console.log(err);
        else{
            foundUser.writenews=false;
            foundUser.save();
            req.flash("success","News Permission Removed from the User");
            res.redirect("/seeapplications");
        }
    });
});

/* -----------------------------END OF ADMIN ROUTES-------------------------------------------------------*/


app.get("/main_disease/:heading/:subHeading",function(req, res) {
    
     var heading=req.params.heading;
   var subHeading=req.params.subHeading;
   article.find({mainHeading:heading,subHeading:subHeading},function(err, aa) {
       if(err)
       console.log(err);
        else{
            //console.log(aa);
            if(aa.length!=0)
            res.render("seeArticle.ejs",{art:aa[0]});
            else{
                res.render("construction.ejs");
            }
        }
   });
  
});



/* -------------------------------Disease part -----------------------------------*/

app.get("/main_disease/allergic",function(req, res) {
   res.render("allergic.ejs"); 
});
app.get("/main_disease/autoimmune",function(req, res) {
   res.render("autoimmune.ejs"); 
});
app.get("/main_disease/bacterial",function(req, res) {
   res.render("bacterial.ejs"); 
});
app.get("/main_disease/behavioural",function(req, res) {
   res.render("behavioural.ejs"); 
});

app.get("/main_disease/blood",function(req, res) {
   res.render("blood.ejs"); 
});
app.get("/main_disease/chromosome",function(req, res) {
   res.render("chromosome.ejs"); 
});
app.get("/main_disease/connective",function(req, res) {
   res.render("connective.ejs"); 
});

app.get("/main_disease/congential",function(req, res) {
   res.render("congential.ejs"); 
});
app.get("/main_disease/digestive",function(req, res) {
   res.render("digestive.ejs"); 
});
app.get("/main_disease/endocrine",function(req, res) {
   res.render("endocrine.ejs"); 
});

app.get("/main_disease/eye",function(req, res) {
   res.render("eye.ejs"); 
});
app.get("/main_disease/connective",function(req, res) {
   res.render("connective.ejs"); 
});

app.get("/main_disease/heart",function(req, res) {
   res.render("heart.ejs"); 
});
app.get("/main_disease/infectious",function(req, res) {
   res.render("infectious.ejs"); 
});
app.get("/main_disease/newborn",function(req, res) {
   res.render("newborn.ejs"); 
   
});

app.get("/main_disease/nutritional",function(req, res) {
   res.render("nutritional.ejs"); 
});

app.get("/main_disease/parasitic",function(req, res) {
   res.render("parasitic.ejs"); 
});

app.get("/main_disease/rdcrn",function(req, res) {
   res.render("rdcrn.ejs"); 
});
app.get("/main_disease/skin",function(req, res) {
   res.render("skin.ejs"); 
});
app.get("/main_disease/viral",function(req, res) {
   res.render("viral.ejs"); 
});
/*------------------------------------------------------------------------------------*/
app.get("/:id/edit", function(req,res){
    console.log("hifsd");
			article.findById(req.params.id, function(err, foundAd){
				res.render("editArticle.ejs", {art: foundAd} );		});
});

app.get("/:heading/:subHeading",function(req, res) { ////just for knowing the idea
   var heading=req.params.heading;
    heading = heading.charAt(0).toUpperCase() + heading.slice(1);
   var subHeading=req.params.subHeading;
    subHeading = subHeading.charAt(0).toUpperCase() + subHeading.slice(1);
    console.log(heading);
    console.log(subHeading);
   article.find({mainHeading:heading,subHeading:subHeading},function(err, found) {
       if(err)
       console.log(err);
        else{
            //console.log(found);
            res.render("showSubCategories.ejs",{art:found});
        }
   });
});

app.get("/seeArticles",function(req, res) {
    article.find({},function(err, found) {
       if(err)
       console.log(err);
        else{
            //console.log(found);
            res.render("viewArticles.ejs",{use:found});
        }
   });
});


app.get("/:heading/:subHeading/:id",function(req, res) { ////just for knowing the idea
   var heading=req.params.heading;
   var subHeading=req.params.subHeading;
   var id=req.params.id;
   article.findById(id,function(err, found) {
       if(err)
       console.log(err);
        else{
            if(heading===found.mainHeading && subHeading===found.subHeading)
            {
            res.render("seeArticle.ejs",{art:found});
            }
            else
            res.render('construction.ejs');
        }
   });
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {   
        return next();
    }
     req.flash("error","Please login,Don't have an account? Please Sign Up");
    //  req.session.returnTo = req.originalUrl; 
     console.log("fadsf");
    //  console.log(req.session.returnTo);
    res.redirect("/login");
   
}
function isNewLoggedIn(req,res,next){
    if(req.isAuthenticated() && (req.user.username==="admin@gmail.com"))
    {
        return next();
    }
     else{
            req.flash("error","Wrong Password Or You are not an admin");
            res.render("admin_login.ejs");
        }
    }

app.listen(process.env.PORT ||5000,function(){
    console.log("Medical Times has started");
});