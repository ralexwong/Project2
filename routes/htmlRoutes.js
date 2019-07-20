var db = require("../models");

module.exports = function(app) {
  // home page
  app.get("/", function(req, res) {
    res.render("home", {
      msg: "Welcome!",
    });
  });

  // movie routes
  app.get("/movie", function(req, res) {
    res.render("movie", {
      msg: "Welcome!"
    });
  });

  app.post("/movie", function(req, res) {
    res.render("movie", {
      msg: "Welcome!"
    });
  });

  // info routes
  app.get("/info/:id", function(req, res) {
    res.render("info", {
      msg: "Welcome!"
    });
  });

  // tv routes
  app.get("/tv", function(req, res) {
      res.render("tv", {
        msg: "Welcome!",
    });
  });

  // favorite routes
  app.get("/favorite", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("favorite", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // channel routes
  app.get("/channel", function(req, res) {
    res.render("channel", {
      msg: "Welcome!",
    });
  });

  //topmovies routes
  app.get("/topmoviedata", function(req, res) {
    res.render("home", {
      meg: "Top Movies!",
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};