var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true});

// POST SCHEMA
var PostSchema=new mongoose.Schema({
	title:String,
	content:String
});
var Post=mongoose.model("Post",PostSchema);

// USER SCHEMA
var UserSchema= new mongoose.Schema({
	email:String,
	name:String,
	posts:[PostSchema]  //for this we have to move PostSchema above it
});
var User=mongoose.model("User",UserSchema);

// new user
// var newUser=new User({
// 	email:"k@kumar.edu",
// 	name:"kri kumar"
// });
// newUser.posts.push({
// 	title:"how to learn to dance",
// 	content:"go to a dancing class!!"
// });

// newUser.save(function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// })

// create post
// var newPost=new Post({
// 	title:"reflection on apples",
// 	content:"they are delicious"
// });
// newPost.save(function(err,post){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// })

// find user  (find will give us array but findone will give us one object)
// User.findOne({name:"kri kumar"},function(err,user){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		user.posts.push({
// 			title:"things i hate!!",
// 			content:"me me me !!!"
// 		});	
// 		user.save(function(err,user){
// 			if(err){
// 				console.log(err);
// 			}else{
// 				console.log(user);
// 			}
// 		})
// 	}
// });

// find post
Post.findOne({title:"reflection on apples"},function(err,post){
	if(err){
		console.log(err);
	}else{
		User.findOne({name:"charlie brown"},function(err,user){
			if(err){
				console.log(err);
			}else{
				user.posts.push(post);
				user.save(function(err,user){
					if(err){
						console.log(err);
					}else{
						console.log(user);
					}
				})
			}
		})
	}
})


