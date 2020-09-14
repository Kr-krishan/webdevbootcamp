var express=require("express");
var app=express();
var port=8001;

// to tell the server to look for static files in public folder
app.use(express.static("public"));

// to tell the server that all the files rendered are of ejs type
app.set("view engine","ejs");

app.get("/",function(req,res){
// 	render a ejs file inside the views
	res.render("home");
})
app.get("/fellinlovewith/:thing",function(req,res){
// 	render a ejs file inside the views and send variable 
	var thing=req.params.thing;
	res.render("love",{
		thingVar:thing
	})
})

app.get("/posts",function(req,res){
// 	trying to loop on each post inside the ejs
	var posts=[
		{
			title:"Nokia is better",
			author:"norway"
		},
		{
			title:"I will go with Made in India",
			author:"Indian"
		},
		{
			title:"The benefit of competition is that the cheaper is better",
			author:"Liberandus"
		}
	];
	
	res.render("posts",{
		posts:posts
	})
})


app.listen(port,function(){
	console.log(`app listening at http://localhost:${port}`);
})