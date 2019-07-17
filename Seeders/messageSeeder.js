require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const messageModel = require("../models/Message.js");
let messageHandler = new dbHandler(messageModel);

let data = {
  post_date: Date("07/14/2020"),
  user: "5d2b484933e4882ce41a993c",
  project: "5d2b4ce0b52a77443c301c1a",
  text: "Another great contribution from a very valuable member",
  likes: ["5d2b484933e4882ce41a993c", "5d2b484933e4882ce41a993d"],
  comments: [
    {
      user: "5d2b484933e4882ce41a993c",
      comment: "Amazing project, I would be really glad to contribute"
    },

    {
      user: "5d2b484933e4882ce41a993d",
      comment: "Hey, what's up my friend"
    }
  ]
};

let seeds = [];

for (let i = 8; i < 9; i++) {
  let item = {
    post_date: data.post_date,
    user: data.user,
    project: data.project,
    text: data.text,
    likes: data.likes,
    comments: data.comments
  };

  seeds.push(item);
}

seeds.forEach(seed =>
  messageHandler.createOne(seed, dbRes => console.log(dbRes))
);
