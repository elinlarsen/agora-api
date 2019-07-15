require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const userModel = require("../models/User.js");
let userHandler = new dbHandler(userModel);

let data = {
  first_name: "Mike",
  last_name: "The User",
  username: "miketheuser",
  email: "miketheuser@email.com",
  picture: "../images/mike.jpg",
  bio:
    "My name is Mike and I am interested into reducing the global carbon footprint",
  agora: ["5d2b221d6fb15a29f82aee12", "5d2b221d6fb15a29f82aee13"],
  interests: ["culture", "environment", "sport"]
};

let seeds = [];

for (let i = 8; i < 12; i++) {
  let item = {
    first_name: `${data.first_name}-${i}`,
    last_name: `${data.last_name}-${i}`,
    username: `${data.username}-${i}`,
    email: `${data.email}-${i}`,
    picture: `${data.picture}-${i}`,
    bio: data.bio,
    agora: data.agora,
    interests: data.interests
  };
  seeds.push(item);
}

seeds.forEach(seed => userHandler.createOne(seed, dbRes => console.log(dbRes)));
