console.log("running");

var db = require("../models");

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

//Only pulls the top 10 movies, you can change the limit to show more
// Guidebox.movies
//   .list({ limit: 10 })
//   .then(function(res) {
//     var jsonData = res;
//     // console.log(jsonData);
//     for (var i = 0; i < jsonData.results.length; i++) {
//       console.log(
//         "\nApiID: " +
//           jsonData.results[i].id +
//         "\nTitle: " +
//           jsonData.results[i].title +
//           "\nYear Released: " +
//           jsonData.results[i].release_year +
//           ", " +
//           "\nRating: " +
//           jsonData.results[i].rating +
//           "\nImage: " +
//           jsonData.results[i].poster_120x171
//       );
//     }
//   })
//   .catch(function(e) {
//     console.log(e);
//   });




        // var moiveId = jsonData.results[i].id;
      // moiveTitle = jsonData.results[i].title;
      // console.log("1st set: " + moiveTitle);
      // var movieReleaseDate = jsonData.results[i].release_year;
      // var movieRating = jsonData.results[i].rating;
      // var moivePoster = jsonData.results[i].poster_120x171;


//var results = Guidebox.search.movies({field: 'title', query: 'Terminator'});


  // Guidebox.search.
  // movies({ field: 'title', query: 'Pretty Woman', limit: 10 })
  // .then(function(res) {
  //   var jsonData = res;
  //   console.log(jsonData);
  // })
  // .catch(function(e) {
  //   console.log(e);
  // });

  // var related = Guidebox.movies.related(135934);

  // Guidebox.movies.
  // related(26347)
  // .then(function(res) {
  //   var jsonData = res;
  //   // console.log(jsonData);
  //   for (var i = 0; i < jsonData.results.length; i++) {
  //     console.log(
  //       "\nTitle: " +
  //         jsonData.results[i].title +
  //         "\nYear Released: " +
  //         jsonData.results[i].release_year +
  //         ", " +
  //         "\nRating: " +
  //         jsonData.results[i].rating +
  //         "\nImage: " +
  //         jsonData.results[i].poster_120x171
  //     );
  //   }
  // })
  // .catch(function(e) {
  //   console.log(e);
  // });

  // var sources = Guidebox.sources.list({ filter: 'movie', type: 'free' });
  // var movies = Guidebox.movies.list({ sources: 'free' });

    // Guidebox.search.
  // movies({ field: 'title', query: 'Pretty Woman', limit: 10 })

  // Guidebox.moives.
  // // list({ field: 'title', query: 'Pretty Woman', sources: 'free' })
  // list({ limit: 10 })
  // .then(function(res) {
  //   var jsonData = res;
  //   console.log(jsonData);
  // })
  // .catch(function(e) {
  //   console.log(e);
  // });

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

  // Create a new example

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

