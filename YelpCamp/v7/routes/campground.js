var express=require("express");
var router=express.Router();
var passport=require("passport");
var Campground=require("../models/campground");
var User=require("../models/user");


// to get index file of all campgrounds
router.get("/",function(req,res){
	// console.log(req.user);
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("error in finding all campgrounds",err);
		}else{
// 			send all campgrounds to render in browser
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	})
	
})

// post new campground and render it to index page
router.post("/",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={
		name:name,
		image:image,
		description:desc
	}
	
	// campgrounds.push(newCampground);
	
	Campground.create(newCampground,function(err,campground){
		if(err){
			console.log("error in creating new campground",err);
		}else{
			res.redirect("/campgrounds");   // by default it will look for  get request /campgrounds
		}
	})
	
})

// form to fill new campground
router.get("/new",function(req,res){
	res.render("campgrounds/new");
});

// show each campgrounds with details 
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("error in finding campground",err);
		}else{
			// console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
})

module.exports=router;