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

// require routes
var campgroundRoutes=require("./routes/campground");
var commentRoutes=require("./routes/comment");
var indexRoutes=require("./routes/index");

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

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(port,function(req,res){
	console.log(`YelpCamp server is listening at http://localhost:${port}`);
})