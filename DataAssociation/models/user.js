var mongoose=require("mongoose");

var UserSchema= new mongoose.Schema({
	email:String,
	name:String,
	posts:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"Post"
		}
	] 
});
module.exports=mongoose.model("User",UserSchema);
