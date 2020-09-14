var express    		=require("express"),
	mongoose  		=require("mongoose"),
	methodOverride	=require("method-override"),
	expressSanitizer=require("express-sanitizer"),
	bodyParser 		=require("body-parser"),
	app        		=express();

var	port =3000;

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride('_method'))

// MONGOOSE/MODEL CONFIG
var blogSchema=new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date,default:Date.now}
})
var Blog=mongoose.model("Blog",blogSchema);


// Blog.create({
// 	title:"Test Blog",
// 	image:"https://www.contentualize.com/wp-content/uploads/2018/04/blog-img.jpg",
// 	body:"THIS IS A NEW BLOG FOR TEST PURPOSE!!"
// })

// RESTFUL ROUTES
// ROOT ROUTE
app.get("/",function(req,res){
	res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("error in finding blogs",err);
		}else{
			res.render("index",{blogs:blogs});
		}
	})
})

// NEW ROUTE
app.get("/blogs/new",function(req,res){
	res.render("new");
})

// CREATE ROUTE
app.post("/blogs",function(req,res){
	// console.log(req.body.blog);
	req.body.blog.body=req.sanitize(req.body.blog.body);
	// console.log("==============");
	// console.log(req.body.blog);
	Blog.create(req.body.blog,function(err,newBlog){
		if(err){
			console.log("error in getting form data",err);
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	})
});

// SHOW ROUTE
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("error in showing blog",err);
			res.redirect("/blogs");
		}else{
			res.render("show",{blog:foundBlog});
		}
	})	
});

// EDIT ROUTE
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,foundBlog){
		if(err){
			console.log("error in showing blog",err);
			res.redirect("/blogs");
		}else{
			res.render("edit",{blog:foundBlog});
		}
	})	
})

// UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
	req.body.blog.body=req.sanitize(req.body.blog.body);
// 	it takes 3 arguments (id,data to update,callback)
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
			console.log("error in update",err);
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

// DESTROY ROUTE
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log("error in deleting blog",err);
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs")
		}
	})
});

app.listen(port,function(req,res){
	console.log(`our Restful Blog App is Running at port ${port}`);
})