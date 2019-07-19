/* eslint-disable camelcase */
console.log("running");

var db = require("../models");
var topMovieID = [];
var topMovieData = [];

// require("dotenv").config();
// var keys = require("..//keys");

//I need to get the hide file to work for the API, so until then we need to enter it and pull it out before pushing the code to GitHub
var Guidebox = require("guidebox")("eebe5906010bcf88573d887c308bd62a53db60ca");

var getTopMoviesData = function(res) {
  topMovieData = [];
  for (var i = 0; i < res.results.length; i++) {
    topMovieData.push({
      // type: type,
      // query: query,
      api_id: res.results[i].id,
      title: res.results[i].title,
      release_year: res.results[i].release_year,
      rating: res.results[i].rating,
      image_url: res.results[i].poster_120x171
    });
  }
  console.log("this is running");
  console.log(topMovieData);
};

// var CheckDbTopMovie = function(
// db.topMovieData.findAll({
//   where:{

//   }
// })
// )

module.exports = function(app) {
  app.get("/api/topMovieData", function(req, res) {
    db.topMovieData.create(req.body).then(function(dbtopMovieData) {
      res.json(dbtopMovieData);
    });
  });

  app.get("/app/topMovieData/:id", function(req, res) {
    db.topMovieData
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbtopMovieData) {
        res.json(dbtopMovieData);
      });
  });

  app.post("/api/topMovieData", function(req, res) {
    db.topMovieData.create(req.body).then(function(dbtopMovieData) {
      res.json(dbtopMovieData);
    });
  });

  app.delete("/api/topMovieData/:id", function(req, res) {
    db.topMovieData
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbtopMovieData) {
        res.json(dbtopMovieData);
      });
  });
};

Guidebox.movies.list({ limit: 10 }).then(function(res) {
  // console.log(res.results[0]);
  topMovieID = [];
  for (var i = 0; i < res.results.length; i++) {
    topMovieID.push(res.results[i].id);
  }
  // console.log(res);
  // console.log(topMovieID);
  getTopMoviesData(res);
});
