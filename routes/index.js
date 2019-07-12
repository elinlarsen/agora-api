const express = require("express");
const router = express.Router();
const models = ["users", "agoras", "projects", "messages"];

const getCollectionEndpoints = models.map(model => "/" + model);
const getOneByIdEndpoints = models.map(model => "/" + model + "/:id");
const createEndpoints = models.map(model => "/" + model + "/new");
const updateEndpoints = models.map(model => "/" + model + "/update");
const deleteEndpoints = models.map(model => "/" + model + "/delete");

/* GET routes */

router.get("/", (req, res, next) => {
  res.send({ data: "helloworld" });
});

router.get(getCollectionEndpoints, (req, res, next) => {
  console.log(req.query.q);

  res.send({
    data: "You have reached " + req.path.substring(1),
    data2: "Would you like a collection of " + req.path.substring(1) + "?"
  });
});

router.get(getOneByIdEndpoints, (req, res, next) => {
  res.send({
    data: "You have reached " + req.path.substring(1),
    data2: "Would you like item " + req.params.id + "?"
  });
});

/* POST routes */

router.post(createEndpoints, (req, res, next) => {
  res.send({
    data: "You have reached " + req.path.substring(1),
    data2: "Would you like to create an item?"
  });
});

/* PATCH routes */

router.patch(updateEndpoints, (req, res, next) => {
  res.send({
    data: "You have reached " + req.path.substring(1),
    data2: "Would you like to update an item?"
  });
});

/* DELETE routes */

router.delete(deleteEndpoints, (req, res, next) => {
  res.send({
    data: "You have reached " + req.path.substring(1),
    data2: "Would you like to delete an item?"
  });
});

module.exports = router;
