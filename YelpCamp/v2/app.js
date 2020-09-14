var express=require("express");
var app=express();
var port=8000;
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine","ejs");


// SCHEMA Of DB
var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

var Campground=mongoose.model("Campground",campgroundSchema);

// add camp to db 
// Campground.create(
// 	{
// 		name:"jaipur city",
// 		image:"https://www.holidify.com/images/cmsuploads/compressed/800px-Camping_Tent_at_Doi_Angkhang_Mountain_Chiangmai_Thailand_20190725123430.jpg",
// 		description:"This is jaipur, a UNESCO world heritage site,Enjoy the Heritage!"
// 	},function(err,campground){
// 		if(err){
// 			console.log("error in adding campground",err);
// 		}else{
// 			console.log("Newly added campground",campground);
// 		}
// 	})


app.get("/",function(req,res){
	res.render("landing");
})

// to get index file of all campgrounds
app.get("/campgrounds",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("error in finding all campgrounds",err);
		}else{
// 			send all campgrounds to render in browser
			res.render("index",{campgrounds:allCampgrounds});
		}
	})
	
})

// post new campground and render it to index page
app.post("/campgrounds",function(req,res){
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
app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

// show each campgrounds with details 
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("error in finding campground",err);
		}else{
			res.render("show",{campground:foundCampground});
		}
	})
})



app.listen(port,function(req,res){
	console.log(`YelpCamp server is listening at http://localhost:${port}`);
})