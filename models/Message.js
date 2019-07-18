const mongoose=require('mongoose')
const Schema=mongoose.Schema

const messageSchema  = new Schema({
  post_date: {type: Date, required :true, unique : true},
  user : {type: Schema.Types.ObjectId , ref: "userModel", required :true},
  project :{type: Schema.Types.ObjectId , ref: "projectModel", required :true},
  text : {type: String, require :true},
  likes : [{type: Schema.Types.ObjectId , ref: "userModel", required :true}],
  comments : [{
    user : {type: Schema.Types.ObjectId , ref: "userModel"},
    comment : {type: String}
  }], 
})

const messageModel = mongoose.model("messageModel", messageSchema)
module.exports=messageModel;
