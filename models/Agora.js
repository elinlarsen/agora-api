const mongoose=require('mongoose')
const Schema=mongoose.Schema

const agoraSchema=new Schema({
  name : {type : String, require: true, unique : true}, 
  description: {type : String}, 
  picture : {type: String},
  location: {
    text: {type : String}, 
    city: {type : String},
    country : {type : String},
  },
  members : [{type: Schema.Types.ObjectId , ref: "userModel"}],
  projects : [{type: Schema.Types.ObjectId , ref: "projectModel"}],

})

const agoraModel = mongoose.model("agoraModel", agoraSchema); 
module.exports=agoraModel; 