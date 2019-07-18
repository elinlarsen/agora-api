require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const userModel = require("../models/User.js");
let userHandler = new dbHandler(userModel);

let data = {
  _id : "5d2b484933e4882ce41a993b",
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

let data2= {
  _id: "5d2b484933e4882ce41a993c",
  first_name: "Georgia",
  last_name: "The UserG",
  username: "georgiatheuser",
  email: "georgiatheuser@email.com",
  picture: "../images/georgia.jpg",
  bio:
    "My name is Georgia and I am interested into reducing the global carbon footprint",
  agora: ["5d2f3d70aadea391abae199e", "5d2f3d70aadea391abae199d"],
  interests: ["culture", "mobility", "sport"]
}

let seeds = [];

seeds.push(data)
seeds.push(data2)
console.log("seeds----", seeds)

seeds.forEach(seed => userHandler.createOne(seed, dbRes => console.log(dbRes)));
