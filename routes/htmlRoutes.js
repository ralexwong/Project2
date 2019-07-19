var db = require("../models");

module.exports = function(app) {
  // home page
  app.get("/", function(req, res) {
<<<<<<< HEAD
    db.topMovieData.findAll({}).then(function(dbExamples) {
      res.render("home", {
        msg: "Welcome!",
        // examples: dbExamples
      });
=======
    res.render("home", {
      msg: "Welcome!",
>>>>>>> origin
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
<<<<<<< HEAD
        examples: data
      });
=======
>>>>>>> origin
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
<<<<<<< HEAD
  app.get("/topMovieData", function(req, res) {
    db.topMovieData.findAll({}).then(function(topMovieData) {
      res.render("home", {
        msg: "Welcome!",
        examples: topMovieData
      });
=======

  // channel routes
  app.get("/channel", function(req, res) {
    res.render("channel", {
      msg: "Welcome!",
>>>>>>> origin
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
