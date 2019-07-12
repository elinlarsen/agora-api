const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema= new Schema({
  first_name={type: String, require: true},
  last_name= {type : String, require : true}, 
  username={type : String, require : true, unique : true}, 
  email : {type : String, require: true, unique : true}, 
  picture : {type: String, require: true}, 
  bio : {type : String}, 
  agora : [{type: Schema.Types.ObjectId , ref: "agoraModel"}],
  interests: {type : Array, enum: ["culture", "environment", "security", "sport", "mobility", "digital", "education", "solidarity", "health", "cleanliness", "lifestyle", "economy"]}

})

userModel=mongoose.model("userModel", userSchema)
module.exports= userModel;