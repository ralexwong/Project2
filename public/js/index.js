// http://api-public.guidebox.com/v2/{endpoint}  <---- BASE API URL

// handleFormSubmit is called whenever we submit a new example
var handleFormSubmit = function(event) {
  event.preventDefault();

  $("#movieRow").html('');
  $("#selectedMovie").html('');
  $("#subscription").html('');

  if ($("#movieInput").val()) {

    // capture the users query
    var query = $("#movieInput").val().trim();
    console.log(query);

    $.ajax("/api/movie?q=" + query, {
      type: "GET"
    }).then(function(data) {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        var img = data[i].poster_400x570;
        var id = data[i].id;
        // var link = $("<a href='/movie/" + id + "'>")

        var div = $("<div class='movieList'>");
        var imgDiv = $("<img src='" + img + "'>");
        div.attr("movieID", id);                // might push the movieID attribute to the image in the future
        div.append(imgDiv)                      // so more info can be added such as ratings without having the whole div be a link

        $("#movieRow").append(div);
      }
    })
  }
  
  else if ($("#tvInput").val()) {

    // capture the users query
    var query = $("#tvInput").val().trim();
    console.log(query);

    
    $.ajax("/api/tv?q=" + query, {
      type: "GET"
    }).then(function(data) {
      console.log(data);

      // use for loop to show user images of shows/similar shows of their query
      for (var i = 0; i < data.length; i++) {
        var img = data[i].artwork_608x342;
        var id = data[i].id;
        var link = $("<a href='/tv/" + id + "'>")

        var div = $("<div class='tvList'>");
        var imgDiv = $("<img src='" + img + "'>");
        div.attr("tvID", id);                // might push the tvID attribute to the image in the future
        div.append(imgDiv)                   // so more info can be added such as ratings without having the whole div be a link

        $("#tv").append(div);
      }
    })
    
  }
}
;

$(document).on("click",".tvList", function() {

  var tvId = $(this).attr("tvid");
  console.log(tvId);

  // start the other API when the user clicks on the movie image
  $.ajax("/api/tvTwo?q=" + tvId, {
    data: tvId,
    type: "GET"
  }).then(function(res) {


  })
});

$(document).on("click",".movieList", function() {

  var movieId = $(this).attr("movieid");

  console.log(this);
  $("#selectedMovie").html(this);

  $("#movieRow").html('');

  $.ajax("/api/movieTwo?q=" + movieId, {
    data: movieId,
    type: "GET"
  }).then(function(data) {

    console.log(data);
    var id = data.id;

    if (data.subscription_web_sources.length > 0) {
      $("#subscription").html("Found on: " + data.subscription_web_sources[0].display_name + "!");

      var link = $("<a id='link' href='" + data.subscription_web_sources[0].link + "'>Click here for the link</a>");
      $("#movieLinks").append(link);

      var infoLink = $("<a movieid='" + id + "' infoRouteLink' href='/info/" + id + "'>More info about the movie</a>");
      $("#movieLinks").append(infoLink);
    }
    else {
      $("#subscription").html("Is not found on any subscription website in our database.");
    }
    
  })


  // // start the other API when the user clicks on the movie image
  // $.ajax("https://api-public.guidebox.com/v2/movies/" + movieId + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
  //   data: movieId,
  //   type: "GET"
  // }).then(function(res) {
  //   console.log(res);

  //   var director = res.directors[0].name;
  //   var length = (res.duration * 60) + " minutes";
  //   var metacritic = res.metacritic;
  //   var overview = res.overview;
  //   var poster = res.poster_400x570;
  //   var rating = res.rating;
  //   var subcription = res.subscription_web_sources[0].display_name;
  //   var subcriptionLink = res.subscription_web_sources[0].link;
  //   var title = res.title;
  //   var trailer = res.trailers.web[0].link;
    
  //   var cast = [];
  //   var genres = [];



  //   // append all the relavant json data to the div to send to the next page

  // })
});

$(document).on("click","#infoRouteLink", function() {
  
  console.log(this);
  var id = this.movieid;

  $.ajax("/api/info/" + id, {
    data: id,
    type: "GET"
  })

});

// Add event listeners to the submit and delete buttons
$("#submit").on("click", handleFormSubmit);

