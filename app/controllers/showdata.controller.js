const showdata = require("../models/showdata.model.js");

// Create and Save a new showdata
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a showdata
  const showdata = new showdata({
    c: req.body.image,
    title: req.body.title,
    des: req.body.des || false,
    action: req.body.action ,
    stars: req.body.stars,
    date: req.body.date,
    year: req.body.year,
  });

  // Save showdata in the database
  showdata.create(showdata, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the showdata."
      });
    else res.send(data);
  });
};

// Retrieve all showdatas from the database (with condition).
exports.findAll = (req, res) => {
  const image = req.query.image;

  showdata.getAll(image, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving showdatas."
      });
    else res.send(data);
  });
};

// Find a single showdata by Id
exports.findOne = (req, res) => {
  showdata.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found showdata with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving showdata with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published showdatas
exports.findAllPublished = (req, res) => {
  showdata.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving showdatas."
      });
    else res.send(data);
  });
};

// Update a showdata identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  showdata.updateById(
    req.params.id,
    new showdata(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found showdata with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating showdata with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a showdata with the specified id in the request
exports.delete = (req, res) => {
  showdata.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found showdata with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete showdata with id " + req.params.id
        });
      }
    } else res.send({ message: `showdata was deleted successfully!` });
  });
};

// Delete all showdatas from the database.
exports.deleteAll = (req, res) => {
  showdata.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all showdatas."
      });
    else res.send({ message: `All showdatas were deleted successfully!` });
  });
};
