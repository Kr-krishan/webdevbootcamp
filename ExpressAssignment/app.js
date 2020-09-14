var express=require("express");
var app=express();
var port=8000;

app.get("/",function(req,res){
	res.send("Hi There,welcome to my Assignment!!!");
})


app.get("/speak/:animalName",function(req,res){
	var animalName=req.params.animalName.toLowerCase();
	var sounds={
		cow:"oink",
		dog:"bhaw bhaw",
		pig:"Moo",
		cat:"Meow Meow"
	}
	var sound=sounds[animalName];
	res.send(sound);
	
})


app.get("/repeat/:word/:times",function(req,res){
	var word=req.params.word;
	var times=req.params.times;
	var arr="";
	
	if(times>=0){
		for(var i=0;i<times;i++){
			arr=arr+" "+word;
		}
		res.send(arr);
	}else{
		res.send("inside Repeat!!  Sorry!! Page Not found, what are u doing with ur life?");
		// res.send("");
	}
	
})

app.get("*",function(req,res){
	res.send("Sorry!! Page Not found, what are u doing with ur life?");
})


app.listen(port,function(){
	console.log(`app listening at http://localhost:${port}`);
})