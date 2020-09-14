var express           =require("express"),
 	app               =express(),
	mongoose          =require("mongoose"),
	seedDB            =require("./seeds");

var port=8000;

// require models from shemas
var Campground=require("./models/campground");
var Comment=require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp_5", {useNewUrlParser: true, useUnifiedTopology: true});
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
seedDB();

// root route
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
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
	res.render("campgrounds/new");
});

// show each campgrounds with details 
app.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log("error in finding campground",err);
		}else{
			// console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});
		}
	})
})

// ==================
// 		commets
// ==================
app.get("/campgrounds/:id/comments/new",function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("error in finding all campgrounds",err);
		}else{
			res.render("comments/new",{campground:foundCampground});
		}
	})
})

app.post("/campgrounds/:id/comments",function(req,res){
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
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})

})

app.listen(port,function(req,res){
	console.log(`YelpCamp server is listening at http://localhost:${port}`);
})