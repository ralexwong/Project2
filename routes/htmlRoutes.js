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
  app.get("/movie", function(req, res) {
    res.render("movie", {
      msg: "Welcome!"
    });
  });
  app.get("/tv", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("tv", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  app.get("/favorite", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("favorite", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
