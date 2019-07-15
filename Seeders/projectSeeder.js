require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const projectModel = require("../models/Project.js");

let projectHandler = new dbHandler(projectModel);

let data = {
  name: "A project to make the world great again",
  picture: "../betterWorld.jpg",
  members: ["5d2b1bd1f6ee38466cccbbe7", "5d2b1bd1f6ee38466cccbbe8"],
  tags: ["culture", "environment", "security"],
  type: "open",
  minimum_contribution: 100,
  minimum_total_amount: 500,
  minimum_amount_per_member: 100,
  start_date: new Date("01/01/2020"),
  end_date: new Date("01/01/2021"),
  description: "A wonderful project to make the world great again",
  status: "ideation",
  public: true
  // messages:
};

let seeds = [];

for (let i = 8; i < 10; i++) {
  let item = {
    name: `${data.name}-${i}`,
    picture: data.picture,
    members: data.members,
    tags: data.tags,
    type: data.type,
    minimum_contribution: data.minimum_contribution,
    minimum_total_amount: data.minimum_total_amount,
    minimum_amout_per_member: data.minimum_amount_per_member,
    start_date: data.start_date,
    end_date: data.end_date,
    description: data.description,
    status: data.status,
    public: data.public
  };

  seeds.push(item);
}

seeds.forEach(seed =>
  projectHandler.createOne(seed, dbRes => console.log(dbRes))
);
