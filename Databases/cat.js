var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app",{useNewUrlParser: true, useUnifiedTopology: true});


var catSchema=new mongoose.Schema({
	name:String,
	age:Number,
	temperament:String
});

var Cat=mongoose.model("Cat",catSchema);

// adding a new cat to the database
// var george=new Cat({
// 	name:"Lucy",
// 	age:15,
// 	temperament:"bold"
// });

// george.save(function(err,cat){
// 	if(err){
// 		console.log("something went wrong in saving cat to db");
// 	}else{
// 		console.log("we just saved cat to db",cat);
// // 		george is the var we are saving to the db and cat is the data which is coming from the db after saving
// 	}
// });

// better way to create cats and save them once

// Cat.create({
// 	name:"Lulu",
// 	age:05,
// 	temperament:"bland"
// },function(err,cat){
// 	if(err){
// 		console.log("error in adding cat to db",err);
// 	}else{
// 		console.log("added cat to db",cat);
// 	}
// })

// retieve cats from db and console.log each one
Cat.find({},function(err,cats){
	if(err){
		console.log("Oh no couldnot find cats",err);
	}else{
		console.log("found our cats",cats);
	}
})
