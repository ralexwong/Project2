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
  app.get("/info/", function(req, res) {


    console.log(id);
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
      res.render("favorite", {
        msg: "Welcome!",
    });
  });

  // channel routes
  app.get("/channel", function(req, res) {
    res.render("channel", {
      msg: "Welcome!",
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
