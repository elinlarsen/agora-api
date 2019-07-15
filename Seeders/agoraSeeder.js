require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const agoraModel = require("../models/Agora.js");

let agoraHandler = new dbHandler(agoraModel);

let data = {
  name: "Paris Cambronne",
  description: "Un quartier de plus en plus sale qu'il faut netoyer",
  picture: "Cambronne.jpg",
  location: {
    text: "Paris 15",
    city: "Paris",
    country: "France"
  },
  members: ["5d2b484933e4882ce41a993b", "5d2b484933e4882ce41a993c"],
  projects: ["5d2b4ce0b52a77443c301c1a", "5d2b4ce0b52a77443c301c1b"]
};

let seeds = [];

for (let i = 8; i < 10; i++) {
  let item = {
    name: `${data.name}-${i}`,
    description: data.description,
    picture: `${data.picture}-${i}`,
    location: {
      text: data.location.text,
      city: data.location.city,
      country: data.country
    },
    members: data.members,
    projects: data.projects
  };
  seeds.push(item);
}
console.log(seeds);
seeds.forEach(seed =>
  agoraHandler.createOne(seed, dbRes => console.log(dbRes))
);
