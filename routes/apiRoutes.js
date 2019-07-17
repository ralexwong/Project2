console.log("running");

var db = require("../models");
var axios = require("axios");

// require("dotenv").config();
// var keys = require("..//keys");

//I need to get the hide file to work for the API, so until then we need to enter it and pull it out before pushing the code to GitHub
var Guidebox = require("guidebox")("eebe5906010bcf88573d887c308bd62a53db60ca");

//Only pulls the top 10 movies, you can change the limit to show more
// Guidebox.movies
//   .list({ limit: 10 })
//   .then(function(res) {
//     var jsonData = res;
//     console.log(jsonData.results[0].title);
//     for (var i = 0; i < jsonData.results.length; i++) {
//       console.log(
//         "\nTitle: " +
//           jsonData.results[i].title +
//           "\nYear Released: " +
//           jsonData.results[i].release_year +
//           "\nRating: " +
//           jsonData.results[i].rating +
//           "\nImage: " +
//           jsonData.results[i].poster_120x171
//       );
//     }
//     console.log(res);
//   })
//   .catch(function(e) {
//     console.log(e);
//   });

module.exports = function(app) {
  app.get("/api/query", function(req, res) {

    console.log("search: " + req);
    Guidebox.search.
      movies({ query: req.body })
      .then(function(res) {

      })
    .catch(function(e) {
      console.log(e);
    });
  });

  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/movie", function(req, res) { //movie?query=xxxx

    var query = req.query.q;

    // call first API to grab the ID of the movie
    var url = 'https://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=movie&field=title&query=' + query;
    
    axios.get(url, {
      type: "GET"
    }).then(function(resMovie) {
      var movie = resMovie.data.results;      
      console.log(movie);

      var movieArray = [];
      for (var i = 0; i < 5; i++) {
        movieArray.push(movie[i])
      }
      console.log(movieArray);
      res.json(movieArray);
    })
  });

  app.get("/api/tv", function(req, res) {

    var query = req.query.q;

    var url = "https://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=show&field=title&query=" + query;
    // call first API to grab the ID of the movie
    axios.get(url, {
      type: "GET"
    }).then(function(resTv) {
      var tv = resTv.data.results
      console.log(tv);

      var tvArray = [];
      for (var i = 0; i < 5; i++) {
        tvArray.push(tv[i])
      }
      res.json(tvArray);
    });
  });


  // will have to call the api's twice
  // when they click on the image/link it will initilize the api on the backend
  // 
  app.get("/api/:id", function(req, res) {

    var id = req.params.id;

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

