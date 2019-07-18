require("../config/dbconfig");
const dbHandler = require("../dbHandler.js");
const agoraModel = require("../models/Agora.js");

let agoraHandler = new dbHandler(agoraModel);

let data = {
  id:"5d2f431013767d93a0040b60",
  name: "Paris Cambronne",
  description: "Un quartier de plus en plus sale qu'il faut nettoyer",
  picture: ["https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiQ17GxkbzjAhXj6eAKHVtqBsEQjRx6BAgBEAU&url=https%3A%2F%2Fvalgirardin.fr%2Fle15eme%2Fdepots-alimentaires-sauvages-premiere-cause-de-la-proliferation-des-rats%2F&psig=AOvVaw19YoB4l7ZAOqATjuxNXq8D&ust=1563459154526209"],
  address : "Cambronne",
  city: "Paris",
  zipcode:"75015",
  members: ["5d2b484933e4882ce41a993b", "5d2b484933e4882ce41a993c"],
  projects: ["5d2b4ce0b52a77443c301c1a", "5d2b4ce0b52a77443c301c1b"]
};

data2={
  _id: "5d2f431013767d93a0040b61",
  name: "Paris Chateau Rouge",
  description: "La colline du crack",
  picture: ["https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwimx-GTkbzjAhWjBWMBHdK3DY0QjRx6BAgBEAU&url=http%3A%2F%2Fwww.leparisien.fr%2Fparis-75%2Fparis-75018%2Fparis-pour-lutter-contre-les-sauvettes-a-chateau-rouge-la-ville-avance-des-propositions-03-12-2017-7430421.php&psig=AOvVaw1mA1_hFZYvegRmGJhjEbbJ&ust=1563459095686051"],
  address : "Chateau Rouge",
  city: "Paris",
  zipcode: "75018",
  members: ["5d2b484933e4882ce41a993b", "5d2b484933e4882ce41a993c"],
  projects: ["5d2b4ce0b52a77443c301c1a", "5d2b4ce0b52a77443c301c1c"]
};

data3={"_id":"5d2f2f845ced008b4cba8d4f","picture":["https://res.cloudinary.com/dzlcu5kcg/image/upload/v1563373444/agora/chloe-lam-I4ScSrKsfIg-unsplash.jpg.jpg"],"members":[],"projects":[],"name":"Les Buttes Chaumonts","description":"Make this neighborhood safe and green again","address":"Paris 19","city":"Paris","zipcode":"75019","__v":0}

let seeds = [];

seeds.push(data)
seeds.push(data2)
seeds.push(data3)

seeds.forEach(seed =>
  agoraHandler.createOne(seed, dbRes => console.log(dbRes))
);
