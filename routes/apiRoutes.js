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

  app.get("/api/movie", function(req, res) { //movie?query=xxxx

    var query = req.query.q;

    // call first API to grab the ID of the movie
    var url = 'https://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=movie&field=title&query=' + query;
    
    axios.get(url, {
      type: "GET"
    }).then(function(resMovie) {
      var movie = resMovie.data.results;      
      // console.log(movie);

      var movieArray = [];
      for (var i = 0; i < 5; i++) {
        movieArray.push(movie[i])
      }
      // console.log(movieArray);
      res.json(movieArray);
    })
  });

  // will have to call the api's twice
  // when they click on the image/link it will initilize the api on the backend
  // 
  app.get("/api/movieTwo", function(req, res) {

    var movieId = req.query.q;

    console.log(movieId);

    // start the other API when the user clicks on the movie image
    axios.get("https://api-public.guidebox.com/v2/movies/" + movieId + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
      data: movieId,
      type: "GET"
    }).then(function(resMovie) {

      var data = resMovie.data
      console.log(data);
      res.json(data);

      var id = data.id;
      var director = data.directors[0].name;
      var length = (data.duration * 60) + " minutes";
      var metacritic = data.metacritic;
      var overview = data.overview;
      var poster = data.poster_400x570;
      var rating = data.rating;
      var subcription = data.subscription_web_sources[0].display_name;
      var subcriptionLink = data.subscription_web_sources[0].link;
      var title = data.title;
      var trailer = data.trailers.web[0].link;
      
      var cast = [];
      var genres = [];

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

  app.get("/api/tvTwo/", function(req, res) {

    var tvId = req.query.q;

    console.log(tvId);

    axios.get("https://api-public.guidebox.com/v1.43/all/eebe5906010bcf88573d887c308bd62a53db60ca/show/" + tvId + "/available_content", {
      data: tvId,
      type: "GET"
    }).then(function(resTv) {
      console.log(resTv);
      var data = resTv.results
      var subcription = "";
      console.log(data.web.episodes.all_sources);
  
      for (var i = 0; i < data.web.episodes.all_sources.length; i++) {
        if (data.web.episodes.all_sources[i].type === "subscription") {
          
          subscription = data.web.episodes.all_sources[i].display_name;
        }
      }
      console.log(subscription);

      
    })
  })

  // Delete an example by id
  app.get("/api/movie/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};

