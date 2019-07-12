const mongoose=require('mongoose')
const Schema=mongoose.Schema

const messageSchema  = new Schema({
  post_date: {type: Date, require :true, unique : true},
  user : {type: Schema.Types.ObjectId , ref: "userModel", require :true},
  project :{type: Schema.Types.ObjectId , ref: "projectModel", require :true},
  text : {type: String, require :true},
  likes : [{type: Schema.Types.ObjectId , ref: "userModel", require :true}],
  comments : [{
    user : {type: Schema.Types.ObjectId , ref: "userModel", require :true},
    comment : {type: String, require: true}
  }], 
})

const messageModel = mongoose.model("messageModel", messageSchema)
module.exports=messageModel;
