var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true});

// POST SCHEMA
var Post=require("./models/post");

// USER SCHEMA
var User=require("./models/user");


// create user
// User.create({
// 	email:"bob@gmail.com",
// 	name:"bob builder"
// });

// create post
Post.create({
	title:"how to cook the burger pt. 4",
	content:"ASDFGHJKL"
},function(err,post){
	if(err){
		console.log(err);
	}else{
		User.findOne({email:"bob@gmail.com"},function(err,user){
			if(err){
				console.log(err);
			}else{
				user.posts.push(post);
				user.save(function(err,data){
					if(err){
						console.log(err);
					}else{
						console.log(data);
					}
				})
			}
		})
	}
})

// find user
// find all the posts of that user
// User.findOne({email:"bob@gmail.com"}).populate("posts").exec(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

// find user again
// User.findOne({email:"bob@gmail.com"},function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

