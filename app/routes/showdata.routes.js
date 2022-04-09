module.exports = app => {
  const showdata = require("../controllers/showdata.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", showdata.create);

  // Retrieve all showdata
  router.get("/", showdata.findAll);

  // Retrieve all published showdata
  router.get("/published", showdata.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", showdata.findOne);

  // Update a Tutorial with id
  router.put("/:id", showdata.update);

  // Delete a Tutorial with id
  router.delete("/:id", showdata.delete);

  // Delete all showdata
  router.delete("/", showdata.deleteAll);

  app.use('/api/showdata', router);
};
