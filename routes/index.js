const express = require("express");
const router = express.Router();
const parser = require("../config/cloudinary");

const models = [
  { name: "users", model: require("../models/User.js") },
  { name: "agoras", model: require("../models/Agora.js") },
  { name: "projects", model: require("../models/Project.js") },
  { name: "messages", model: require("../models/Message.js") }
];

const dbHandler = require("../dbHandler.js");
const modelsHandlers = models.map(item => new dbHandler(item.model));
const getCollectionEndpoints = models.map(model => "/" + model.name);
const getOneByIdEndpoints = models.map(model => "/" + model.name + "/:id");
const getOneByIdEndpointsWithoutPicture = models.map(
  model => "/" + model.name + "/newwithoutpicture/:id"
);
const createEndpoints = models.map(model => "/" + model.name + "/new");
const createEndpointsWithoutPicture = models.map(
  model => "/" + model.name + "/newwithoutpicture"
);
const updateEndpoints = models.map(model => "/" + model.name + "/update/:id");
const deleteEndpoints = models.map(model => "/" + model.name + "/delete/:id");

/* GET routes */

router.get("/", (req, res, next) => {
  introductionText =
    "Welcome to the Agora REST API. It supports basic CRUD Operations on " +
    models.length +
    " collections: " +
    models.map(item => item.name) +
    "." +
    " Below are the available endpoints:";

  endpoints = [
    getCollectionEndpoints,
    getOneByIdEndpoints,
    createEndpoints,
    createEndpointsWithoutPicture
    //updateEndpoints,
    //deleteEndpoints
  ];

  ImportantNotesText1 =
    'Single word endpoints can be queried with string to get a collection extract. E.g., users/?last_name="Crockford" returns all the users with last name Crockford';

  ImportantNotesText2 =
    'You can also choose to populate specific fields in a collection using /?expand = fields to populate (with expand repeated as many time as you need). For example, if you would like to populate the fields "likes" and "project" for the messages collection, just query /messages/?expand = likes & expand = project';

  ImportantNotesText3 =
    " Editing and deleting specific documents can be done through endpoints with ID";

  data = {
    introduction: introductionText,
    endpoints: endpoints,
    importantNotes: [
      ImportantNotesText1,
      ImportantNotesText2,
      ImportantNotesText3
    ]
  };
  res.send(data);
});

router.get(getCollectionEndpoints, (req, res, next) => {
  let queryExpand = Object.assign({}, req.query);
  let queryObject = Object.assign({}, req.query);
  delete queryObject.expand;
  console.log("Query Object is ");
  console.log(queryObject);
  console.log("Fields to expand are:  ");
  console.log(queryExpand.expand);
  let model = extractModelFromUrlRequest(req);

  model.getCollection(queryObject, queryExpand.expand, dbRes =>
    res.send(dbRes)
  );
});

router.get(getOneByIdEndpoints, (req, res, next) => {
  let queryExpand = Object.assign({}, req.query);
  let queryObject = Object.assign({}, req.query);
  delete queryObject.expand;
  console.log("Query Object is ");
  console.log(queryObject);
  console.log("Fields to expand are:  ");
  console.log(queryExpand.expand);

  let model = extractModelFromUrlRequest(req);
  model.getOneById(req.params.id, queryExpand.expand, dbRes => res.send(dbRes));
});

/* POST routes */

router.post(createEndpoints,  parser.single('picture'),(req, res, next) => {
  var objectToPass=req.body
  if(req.file){objectToPass.picture=[req.file.secure_url]}
  let model = extractModelFromUrlRequest(req);
   model.createOne(objectToPass, dbRes => res.send(dbRes));
});

router.post(
  createEndpointsWithoutPicture,

  (req, res, next) => {
    let model = extractModelFromUrlRequest(req);
    model.createOne(req.body, dbRes => res.send(dbRes));
  }
);

/* PATCH routes */

router.patch(getOneByIdEndpoints, parser.single('picture'), (req, res, next) => {
  var objectToPass=req.body
  if(req.file){objectToPass.picture=[req.file.secure_url]}
  let model = extractModelFromUrlRequest(req);
  model.updateOne({ _id: req.params.id }, objectToPass, dbRes => res.send(dbRes));
});

router.patch(getOneByIdEndpointsWithoutPicture, (req, res, next) => {
  let model = extractModelFromUrlRequest(req);
  model.updateOne({ _id: req.params.id }, req.body, dbRes => res.send(dbRes));
});

/* DELETE routes */

router.delete(getOneByIdEndpoints, (req, res, next) => {
  let model = extractModelFromUrlRequest(req);
  model.deleteOne({ _id: req.params.id }, dbRes => res.send(dbRes));
});

/* Utility function to extract model name from URL */

function extractModelFromUrlRequest(req) {
  let urlWithoutFirstSlash = req.path.substr(1, req.path.length - 1);
  modelToExtract = urlWithoutFirstSlash.substr(0, urlWithoutFirstSlash.index);

  if (urlWithoutFirstSlash.includes("/"))
    modelToExtract = urlWithoutFirstSlash.substr(
      0,
      urlWithoutFirstSlash.indexOf("/")
    );
  else modelToExtract = urlWithoutFirstSlash;

  console.log("model to extract is " + modelToExtract);
  let modelToExtractIndex = models.findIndex(item => {
    return item.name == modelToExtract;
  });

  model = modelsHandlers[modelToExtractIndex];

  return model;
}

module.exports = router;
