console.log("running");

var db = require("../models");
var axios = require("axios");

// require("dotenv").config();

//I need to get the hide file to work for the API, so until then we need to enter it and pull it out before pushing the code to GitHub
var Guidebox = require("guidebox")("7fa834e5a7370a8ec3fe04aa238cf1764af06a9a");


module.exports = function(app) {

  app.get("/api/movie", function(req, res) { //movie?query=xxxx

    var query = req.query.q;

    // call first API to grab the ID of the movie
    var url = 'https://api-public.guidebox.com/v2/search?api_key=7fa834e5a7370a8ec3fe04aa238cf1764af06a9a&type=movie&field=title&query=' + query;
    
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

  app.get("/api/movieTwo", function(req, res) {

    var movieId = req.query.q;
    console.log(movieId);
    console.log(req);

    // start the other API when the user clicks on the movie image
    axios.get("https://api-public.guidebox.com/v2/movies/" + movieId + "?api_key=7fa834e5a7370a8ec3fe04aa238cf1764af06a9a", {
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

    var url = "https://api-public.guidebox.com/v2/search?api_key=7fa834e5a7370a8ec3fe04aa238cf1764af06a9a&type=show&field=title&query=" + query;
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

  app.get("/api/tvTwo", function(req, res) {

    var tvId = req.query.q;

    console.log(tvId);

    axios.get("https://api-public.guidebox.com/v1.43/all/7fa834e5a7370a8ec3fe04aa238cf1764af06a9a/show/" + tvId + "/available_content", {
      data: tvId,
      type: "GET"
    }).then(function(resTv) {
      var data = resTv.data.results

      console.log(data);
      res.json(data)

    })
  })

  app.get("/api/info/", function(req, res) {

    var id = req.query.q;

    // axios.get("/api/info/" + id, {
    //   data: id,
    //   type: "GET"
    // })



  });

  app.get("/api/channel", function(req, res) {

    axios.get("http://api-public.guidebox.com/v2/channels?api_key=7fa834e5a7370a8ec3fe04aa238cf1764af06a9a", {
      type: "GET"
    }).then(function(resChannel) {

      // console.log(resChannel.data.results);
      res.json(resChannel.data.results);
    })
  })
};

function insert(table, cols, vals, cb) {
  var queryString = "INSERT INTO " + table;

  queryString += " (";
  queryString += cols.toString();
  queryString += ") ";
  queryString += "VALUES (";
  queryString += printQuestionMarks(vals.length);
  queryString += ") ";

  console.log(queryString);

  connection.query(queryString, vals, function(err, result) {
    if (err) {
      throw err;
    }

    cb(result);
  });
}

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

