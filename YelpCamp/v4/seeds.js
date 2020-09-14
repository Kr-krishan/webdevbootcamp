var mongoose=require("mongoose"),
	Campground=require("./models/campground"),
	Comment=require("./models/comment");

var data=[
	{
		name:"Forest River",
		image:"https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=",
		description:"blah blah blah"
	},
	{
		name:"Sea Front",
		image:"https://thumbs.dreamstime.com/z/sea-front-tent-camping-sea-front-tent-camping-glowing-light-inside-small-modern-tent-campground-outdoor-theme-159856036.jpg",
		description:"blah blah blah"
	},
	{
		name:"Water Mark criss",
		image:"https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1588712249000/photosp/c40576cb-5cc9-4368-9ff9-44720c523b99/stock-photo-camping-tent-summer-campfire-lakes-campsite-canoes-c40576cb-5cc9-4368-9ff9-44720c523b99.jpg",
		description:"blah blah blah"
	}
]

function seedDB(){
// 	remove all campgrounds
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}else{
			console.log("removed all campground");
// 			add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err){
						console.log(err);
					}else{
						console.log("Added Campground");
// 						create a comment
						Comment.create(
							{
								text:"This is a nice camp,but network here is dossy!!",
								author:"HeyMan"
							},function(err,comment){
								if(err){
									console.log(err);
								}else{
									campground.comments.push(comment);
									campground.save();
									console.log("created new comment");
								}	
							}
						)
						
					}
				})
			})
		}
	});

}

module.exports=seedDB;