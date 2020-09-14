var express=require("express");
var router=express.Router();
var passport=require("passport");
var Campground=require("../models/campground");
var User=require("../models/user");

// root route
router.get("/",function(req,res){
	res.render("landing");
})

// =============
// Auth Routes
// =============

// show register form
router.get("/register",function(req,res){
	res.render("register");
})

// handle sign up user
router.post("/register",function(req,res){
	var newUser=new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/campgrounds");
		})
	})
})

// show login form
router.get("/login",function(req,res){
	res.render("login");
});

// handle login using middleware
router.post("/login",passport.authenticate("local",
		{
			successRedirect:"/campgrounds",
			failureRedirect:"/login"
		}), 
	function(req,res){
});

// logout logic
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

module.exports=router;
