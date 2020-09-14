var mongoose=require("mongoose");
// POST SCHEMA
var PostSchema=new mongoose.Schema({
	title:String,
	content:String
});
var Post=mongoose.model("Post",PostSchema);
module.exports=Post;