// handleFormSubmit is called whenever the user hits submit/enter
var handleFormSubmit = function(event) {
    event.preventDefault();
  
    // checks if they inputted anything
    if ($("#movieInput").val()) {
  
      // empties the last search results
      $("#movieRow").empty();
      $("#selectedMovie").empty();
      $("#movieLinks").empty();
  
      // capture the users query
      var query = $("#movieInput").val().trim();
      console.log(query);
  
      // calls first api
      $.ajax("/api/movie?q=" + query, {
        type: "GET"
      }).then(function(data) {
        console.log(data);
  
        // grabs the id and image from the data 
        for (var i = 0; i < data.length; i++) {
          var img = data[i].poster_400x570;
          var id = data[i].id;
          var div = $("<div class='movieList'>");
          var imgDiv = $("<img src='" + img + "'>");
          div.attr("movieID", id);                // might push the movieID attribute to the image in the future
          div.append(imgDiv)                      // so more info can be added such as ratings without having the whole div be a link
  
          $("#movieRow").append(div);
          // dynamically make the divs
        }
      })
    }
}

// initilizes when user clicks on the image
$(document).on("click",".movieList", function() {

    // grab movieID to use in second API
    var movieId = $(this).attr("movieid");
    console.log(this);

    // move the movie over and empty the rest
    $("#selectedMovie").html(this);
    $("#movieRow").empty();
  
    // call second API
    $.ajax("/api/movieTwo?q=" + movieId, {
      data: movieId,
      type: "GET"
    }).then(function(data) {
  
      console.log(data);
      var id = data.id;
  
      // 
      if (data.subscription_web_sources.length > 0) {
  
        var subscriptionDiv = $("<p id='subscription'>").html("Found on: " + data.subscription_web_sources[0].display_name + "!");
        $("#movieLinks").append(subscriptionDiv);
  
        var link = $("<a id='link' href='" + data.subscription_web_sources[0].link + "'>Click here for the link</a>");
        $("#movieLinks").append(link);
  
        var infoLink = $("<button id='movieInfoLink'>More info about the movie</button>");
        $("#movieLinks").append(infoLink);
      }
      else {
        $("#subscription").html("Is not found on any subscription website in our database.");
      }

      var favoriteButton = $("<button id='favorite'>Click here to Favorite</button>");
      $("#movieLinks").append(favoriteButton);
      
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

$(document).on("click","#favorite", function() {
  
});

// Add event listeners to the submit and delete buttons
$("#submit").on("click", handleFormSubmit);