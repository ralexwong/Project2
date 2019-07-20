/* eslint-disable camelcase */
console.log("******apiRoutes.js is running********");

var db = require("../models");
var axios = require("axios");
MovieTwoData = []

// require("dotenv").config();
// var keys = require("..//keys");

//I need to get the hide file to work for the API, so until then we need to enter it and pull it out before pushing the code to GitHub
var Guidebox = require("guidebox")("eebe5906010bcf88573d887c308bd62a53db60ca");

var getMoviesTwoData = function(res) {
  MovieTwoData = [];
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
  // console.log(topMovieData);
};



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
      // console.log(data);
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
}

