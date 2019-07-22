class dbHandler {
  constructor(model) {
    this.model = model;
  }

  createOne(data, clbk) {
    const schema = this.model["schema"]["obj"];
    const schemaKeys = Object.keys(schema);
    let newDocument = {};
    schemaKeys.forEach(key => {
      newDocument[key] = data[key];
    });

    this.model
      .create(newDocument)
      .then(dbres => {
        console.log(
          "Creating a document seems to be working  Result is " + dbres
        );
        if (clbk) clbk(dbres);
      })
      .catch(err => console.log("Creating a document is not working :", err));
  }

  insertMany(dataArray, clbk) {
    dataArray.forEach(data => this.createOne(data, clbk));
  }

  getOne(data, clbk) {
    this.model
      .findOne(data)
      .then(dbRes => {
        console.log(
          "Extracting a single document seems to be working. Result is " + dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log(err));
  }

  getCollection(data, populateArray, clbk) {
    this.model
      .find(data)
      .populate(populateArray)
      .then(dbRes => {
        console.log(
          "Extrating a collection matching seems to be working. Result is  " +
            dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log(err));
  }

  getOneById(id, populateArray, clbk) {
    this.model
      .findById(id)
      .populate(populateArray)
      .then(dbRes => {
        console.log(
          "Extracting a single document seems to be working. Result is  " +
            dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log("error in getOneById -dbhandler- ", err));
  }

  getAll(clbk) {
    this.model
      .find({})
      .then(dbRes => {
        console.log(
          "Extracting the whole collection seems to be working. Result is  " +
            dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  filter(field, value, clbk) {
    const filterObject = {};
    filterObject[field] = value;
    this.model
      .find(filterObject)
      .then(dbRes => {
        console.log("Filtering seems to be working. Result is  " + dbRes);
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log(err));
  }

  updateOne(filterObject, data, clbk) {
    this.model
      .findOneAndUpdate(filterObject, data)
      .then(dbRes => {
        console.log(
          "Updating one document seems to be working and the results is  " +
            dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log(err));
  }

  deleteOne(filterObject, clbk) {
    console.log(filterObject);
    this.model
      .findOneAndRemove(filterObject)
      .then(dbRes => {
        console.log(
          "Deleting one document seems to be working and the results is  " +
            dbRes
        );
        if (clbk) clbk(dbRes);
      })
      .catch(err => console.log(err));
  }
}

module.exports = dbHandler;
