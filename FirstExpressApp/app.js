// console.log("First Express App");
var express=require("express");
var app=express();
var port=3000;


app.get("/",function(req,res){
	res.send("Hi There!");
})

app.get("/dog",function(req,res){
	console.log("U MADE A REQUEST");
	res.send("DOG");
})

app.get("/r/:subName",function(req,res){
	res.send("Inside the subName");
})

app.get("/r/:subName/comments/:id/:title",function(req,res){
	console.log(req.params);
	res.send("You are in comments section");
})


app.get("*",function(req,res){
	res.send("NOTHING FOUND!!");
})


app.listen(port,function(){
	console.log(`app listening at http://localhost:${port}`);
})