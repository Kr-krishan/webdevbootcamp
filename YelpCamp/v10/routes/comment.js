var express=require("express");
var router=express.Router({mergeParams: true});
var passport=require("passport");
var Campground=require("../models/campground");
var User=require("../models/user");
var Comment=require("../models/comment");
var middleware=require("../middleware");


// new Comment
router.get("/new",middleware.isLoggedIn,function(req,res){
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
router.post("/",middleware.isLoggedIn,function(req,res){
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

// EDIT COMMENT
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip,function(req,res){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				console.log(err);
				res.redirect("back");
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});	
				}else{
					res.redirect("back");
				}
			}
		})
	}else{
		res.redirect("/login");
	}
})
// UPDATE COMMENT
router.put("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})
// DESTROY COMMENT
router.delete("/:comment_id",middleware.checkCommentOwnerShip,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
})


module.exports=router;