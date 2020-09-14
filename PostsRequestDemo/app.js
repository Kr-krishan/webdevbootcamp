var express=require("express");
var app=express();
var port=8002;
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var friends=["Ram","Shayam","Badal","Asam","Asaram"];

app.get("/",function(req,res){
	res.render("home");
});

app.get("/friends",function(req,res){
	res.render("friends",{
		friends:friends
	})
})

app.post("/addfriend",function(req,res){
// 	data of form is inside the body of req with the help of body parser
	var newfriend=req.body.newfriend;
	friends.push(newfriend);
	res.redirect("friends");
})


app.listen(port,function(req,res){
	console.log(`app listening at http://localhost:${port}`);
})