var express=require("express");
var router=express.Router({mergeParams: true});
var passport=require("passport");
var Campground=require("../models/campground");
var User=require("../models/user");
var Comment=require("../models/comment");


// new Comment
router.get("/new",isLoggedIn,function(req,res){
// 	    here req.params.id becomes null coz we broke the url so user mergeParams:true in express.Route()
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("error in finding all campgrounds",err);
		}else{
			res.render("comments/new",{campground:foundCampground});
		}
	})
})

// post comment
router.post("/",isLoggedIn,function(req,res){
// 	find the campground
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					// console.log(req.user);
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
})

// middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports=router;