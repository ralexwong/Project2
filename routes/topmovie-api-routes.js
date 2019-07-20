/* eslint-disable camelcase */
console.log("**********topmovie-api-routes.js is running **********");

var db = require("../models");
var Sequelize = require("sequelize");
var topMovieID = [];
var apiMovieData = [];

// require("dotenv").config();
// var keys = require("..//keys");

//I need to get the hide file to work for the API, so until then we need to enter it and pull it out before pushing the code to GitHub
var Guidebox = require("guidebox")("75c3c283088584b71e808e08c6a5af30a76f10c4");

var getTopMoviesData = function(res) {
  apiMovieData = [];
  for (var i = 0; i < res.results.length; i++) {
    apiMovieData.push({
      // type: type,
      // query: query,
      api_id: res.results[i].id,
      title: res.results[i].title,
      release_year: res.results[i].release_year,
      rating: res.results[i].rating,
      image_url: res.results[i].poster_120x171
    });
  }
  console.log("+++++topMovieData push array is running++++++");
  // console.log(topMovieData);
};

// var CheckDbTopMovie = function() {

// }

// function getSQLTopMovieDB () {
//   return topMovieData
//   .findAll()
//   .then(function(topMovieData) {
//     return topMovieData
//   });
// }

var returnTopMovData = function(data) {
  topMovieData.findAll({
    where: {
      api_id: {
        [Op.im]: topMovieID
      }
    }
  }).then(function(data) {
    var results = [];
    for(var i = 0; i < data.length; i++)
    results.push(data[i].dataValues);
  })
}

var getDBTopMovie = function(dbtopMovieData, cb) {
  // var Op = sequelized.Op;
  api_id = [];
  for(var i = 0; i < data.title.items.length; i++) {
    api_id.push(data.title.item[i].id);
  }
  console.log("++++++ api_id: " + api_id + "+++++++++");
}


module.exports = function(app) {
 app.get("/api/topmoviedata", function(req, res) {
   db.topMovieData.findAll({}).then(function(dbtopMovieData) {
     res.json(dbtopMovieData);
   });
 });

 app.post("/api/topmoviedata", function(req, res) {
   console.log(res.body);
   db.topMovieData.create({
     text: req.body.text,
     complete: req.body.complete
   }).then(function(topMovieData) {
     res.json(topMovieData)
   });
 });

   // POST route for saving a new post
   app.post("/api/topmoviedata", function(req, res) {
    db.topMovieData.create(req.body).then(function(dbtopMovieData) {
      res.json(dbtopMovieData);
    });
  });

  app.put("api/topmoviedata", function(req, res) {
    db.topMovieData.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbtopMovieData) {
        res.json(dbtopMovieData);
      });
  });

  app.get("/app/topmoviedata/:id", function(req, res) {
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

  app.delete("/api/topmoviedata/:id", function(req, res) {
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
  // getDBTopMovie()
  // returnTopMovData()
});
