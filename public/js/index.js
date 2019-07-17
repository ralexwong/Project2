// http://api-public.guidebox.com/v2/{endpoint}  <---- BASE API URL


// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

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

        var div = $("<div class='movieList'>");
        var imgDiv = $("<img src='" + img + "'>");
        div.attr("movieID", id);                // might push the movieID attribute to the image in the future
        div.append(imgDiv)                      // so more info can be added such as ratings without having the whole div be a link

        $("#movie").append(div);
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
  $.ajax("https://api-public.guidebox.com/v1.43/all/eebe5906010bcf88573d887c308bd62a53db60ca/show/" + tvId + "/available_content", {
    data: tvId,
    type: "GET"
  }).then(function(res) {
    console.log(res);

    console.log(res.results.web.episodes.all_sources);

    for (var i = 0; i < res.results.web.episodes.all_sources.length; i++) {
      if (res.results.web.episodes.all_sources[i].type === "subscription") {
        
        var subscription = res.results.web.episodes.all_sources[i].display_name;
        console.log(this);
        console.log(subscription);

        $(this).attr("subcription", subscription);

      }
    }

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

    var director = res.directors[0].name;
    var length = (res.duration * 60) + " minutes";
    var metacritic = res.metacritic;
    var overview = res.overview;
    var poster = res.poster_400x570;
    var rating = res.rating;
    var subcription = res.subscription_web_sources[0].display_name;
    var subcriptionLink = res.subscription_web_sources[0].link;
    var title = res.title;
    var trailer = res.trailers.web[0].link;
    
    var cast = [];
    var genres = [];



    // append all the relavant json data to the div to send to the next page

  })
});

// Add event listeners to the submit and delete buttons
$("#submit").on("click", handleFormSubmit);


