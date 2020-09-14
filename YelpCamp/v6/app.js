var express           =require("express"),
 	app               =express(),
	mongoose          =require("mongoose"),
	seedDB            =require("./seeds"),
	bodyParser        =require("body-parser"),
	passport          =require("passport"),
	LocalStrategy     =require("passport-local");

var port=8000;

// require models from shemas
var Campground    =require("./models/campground"),
	Comment       =require("./models/comment"),
	User          =require("./models/user");

// CONFIG
mongoose.connect("mongodb://localhost/yelp_camp_6", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
	secret:"once Again Rusty is Overrated",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to use logged in user in eech ejs file
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	return next();
})

// root route
app.get("/",function(req,res){
	res.render("landing");
})

// to get index file of all campgrounds
app.get("/campgrounds",function(req,res){
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
// 		commets routes
// ==================
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("error in finding all campgrounds",err);
		}else{
			res.render("comments/new",{campground:foundCampground});
		}
	})
})

app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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

// =============
// Auth Routes
// =============

// show register form
app.get("/register",function(req,res){
	res.render("register");
})

// handle sign up user
app.post("/register",function(req,res){
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
app.get("/login",function(req,res){
	res.render("login");
});

// handle login using middleware
app.post("/login",passport.authenticate("local",
		{
			successRedirect:"/campgrounds",
			failureRedirect:"/login"
		}), 
	function(req,res){
});

// logout logic
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(port,function(req,res){
	console.log(`YelpCamp server is listening at http://localhost:${port}`);
})