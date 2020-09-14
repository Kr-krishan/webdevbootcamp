var express=require("express");
var app=express();
var request=require("request");
var port=8003;

app.set("view engine","ejs");

app.get("/",function(req,res){
	// res.send("WELCOME!!!");
	res.render("search");
})

app.get("/results",function(req,res){
	var searchData= req.query.search;
	var url=`http://www.omdbapi.com/?apikey=thewdb&s=${searchData}`;
	request(url,function(error,response,body){
		var data=JSON.parse(body);
		// res.send(results["Search"][0]);
		res.render("results",{data:data});
	})
})

app.listen(port,function(req,res){
	console.log(`app listening at http://localhost:${port}`);
})