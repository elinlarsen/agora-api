const mongoose=require('mongoose')
const Schema=mongoose.Schema

const agoraSchema=new Schema({
  name : {type : String, required: true, unique : true}, 
  description: {type : String}, 
  picture : {type: Array},
  address : {type : String},
  city: {type: String},
  zipcode: {type: String},
  members : [{type: Schema.Types.ObjectId , ref: "userModel"}],
  projects : [{type: Schema.Types.ObjectId , ref: "projectModel"}],
  admin : {type: Schema.Types.ObjectId , ref: "userModel"},

})

const agoraModel = mongoose.model("agoraModel", agoraSchema); 
module.exports=agoraModel; 