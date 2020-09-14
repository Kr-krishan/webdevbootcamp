var express=require("express"),
	mongoose=require("mongoose"),
	passport=require("passport"),
	bodyParser=require("body-parser"),
	LocalStrategy=require("passport-local"),
	PassportLocalMongoose=require("passport-local-mongoose");

var port=8003;

var User=require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true, useUnifiedTopology: true});
var app=express();
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"Rusty is overRated!",
	resave:false,
	saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =================
// 	Routes
// =================

app.get("/",function(req,res){
	res.render("home");
})

// (isLoggedIn) middleware
app.get("/secret",isLoggedIn,function(req,res){
	res.render("secret");
});

// Auth Routes 
// ==============
// showing sign up form
app.get("/register",function(req,res){
	res.render("register");
});

// handling user sign up
app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/secret");
		})
	})
})

// ==================
// Login routes
// render the form
app.get("/login",function(req,res){
	res.render("login");
})

// handle the login
// middleware(passport.authenticate)
app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){
	
})

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
})

// custom middleware 
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(port,function(req,res){
	console.log("server is up and running");
})
