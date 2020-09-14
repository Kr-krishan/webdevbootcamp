var express=require("express");
var app=express();
var port=8000;

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine","ejs");

var campgrounds=[
	{name:"salmon creek",	   image:"https://www.outsideonline.com/sites/default/files/styles/img_850x480/public/2020/06/19/glamping-ventana-california-camping_h.jpg?itok=-y2yk76i"},
		
	{name:"jaipur city",image:"https://www.holidify.com/images/cmsuploads/compressed/800px-Camping_Tent_at_Doi_Angkhang_Mountain_Chiangmai_Thailand_20190725123430.jpg"},
		
	{name:"shimla hills",image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-	quotes-1556677391.jpg?crop=1.00xw:0.855xh;0,0.0384xh&resize=1200:*"},
	
	{name:"manali trench", image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
	
	{name:"kerala modinkutti", image:"https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
	
	{name:"assam garh", image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/car-camping-best-locations-1527193058.jpg?crop=1.00xw:0.834xh;0,0.166xh&resize=480:*"},
	
	{name:"manipuri court", image:"https://www.holidify.com/images/cmsuploads/compressed/camping-1835352_1920_20180627142357.jpg"},
	
	{name:"nepal track",image:"https://static.toiimg.com/photo/63281743.cms"},
	
	{name:"nanital creek",image:"https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"},
	
	{name:"ooti dakkan",image:"https://www.chartandmapshop.com.au/wp/wp-content/uploads/2020/03/free-camping-south-australia.jpg"}
	];

app.get("/",function(req,res){
	res.render("landing");
})

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{
		campgrounds:campgrounds
	});
})

app.post("/campgrounds",function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var newCampground={
		name:name,
		image:image
	}
	
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");   // by default it will look for  get request /campgrounds
})

app.get("/campgrounds/new",function(req,res){
	res.render("new");
})



app.listen(port,function(req,res){
	console.log(`YelpCamp server is listening at http://localhost:${port}`);
})