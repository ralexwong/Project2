var db = require("../models");

module.exports = function(app) {
  // Load home page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("home", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load favorite page and pass in an example by id
  app.get("/home", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("home", {
        example: dbExample
      });
    });
  });
  app.get("/favorite/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("favorite", {
        example: dbExample
      });
    });
  });
  app.get("/tv/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("tv", {
        example: dbExample
      });
    });
  });
  app.get("/movie/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("movie", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
