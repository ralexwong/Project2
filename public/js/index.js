// http://api-public.guidebox.com/v2/{endpoint}  <---- BASE API URL


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();


  if ($("#movieInput").val()) {

    // capture the users query
    var query = $("#movieInput").val().trim();
    console.log(query);

    // call first API to grab the ID of the movie
    $.ajax("http://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=movie&field=title&query=" + query, {
      data: query,
      type: "GET"
    }).then(function(res) {
      console.log(res.results);
      var movieID = res.results[0].id;
      console.log(movieID);

      // use for loop to show user images of movie/similar movies of their query
      for (var i = 0; i < res.results.length; i++) {
        var img = res.results[i].poster_400x570;
        var id = res.results[i].id;

        var div = $("<div class='movieList'>");
        var imgDiv = $("<img src='" + img + "'>");
        div.attr("movieID", id);                // might push the movieID attribute to the image in the future
        div.append(imgDiv)                      // so more info can be added such as ratings without having the whole div be a link

        $("#movie").append(div);
      }

      // $.ajax("https://api-public.guidebox.com/v2/movies/" + movieID + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
      //   data: query,
      //   type: "GET"
      // }).then(function(res) {
      //   console.log(res);

      // })
    })
  } 
  if($("#tvInput").val()) {

    // capture the users query
    var query = $("#tvInput").val().trim();
    console.log(query);

    // call first API to grab the ID of the movie
    $.ajax("http://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=show&field=title&query=" + query, {
      data: query,
      type: "GET"
    }).then(function(res) {
      console.log(res.results);
      var tvID = res.results[0].id;
      console.log(tvID);

      // use for loop to show user images of shows/similar shows of their query
      for (var i = 0; i < res.results.length; i++) {
        var img = res.results[i].artwork_608x342;
        var id = res.results[i].id;

        var div = $("<div class='tvList'>");
        var imgDiv = $("<img src='" + img + "'>");
        div.attr("tvID", id);                // might push the tvID attribute to the image in the future
        div.append(imgDiv)                   // so more info can be added such as ratings without having the whole div be a link

        $("#tv").append(div);
      }
    })

  }
};

$(document).on("click",".tvList", function() {

  var tvID = $(this).attr("tvid");

  // start the other API when the user clicks on the movie image
  $.ajax("https://api-public.guidebox.com/v2/movies/" + tvID + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
    data: tvID,
    type: "GET"
  }).then(function(res) {
    console.log(res);

    // append all the relavant json data to the div to send to the next page

  })
});

$(document).on("click",".movieList", function() {

  var movieID = $(this).attr("movieid");

  // start the other API when the user clicks on the movie image
  $.ajax("https://api-public.guidebox.com/v2/movies/" + movieID + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
    data: movieID,
    type: "GET"
  }).then(function(res) {
    console.log(res);

    // append all the relavant json data to the div to send to the next page

  })
});

// Add event listeners to the submit and delete buttons
$("#submit").on("click", handleFormSubmit);


