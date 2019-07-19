// handleFormSubmit is called whenever the user hits submit/enter
var handleFormSubmit = function(event) {
  event.preventDefault();
  
  // check if the user inputted anything
  if ($("#tvInput").val()) {

    // empties the last search results
    $("#tvRow").empty();
    $("#selectedTv").empty();
    $("#tvLinks").empty();

    // capture the users query
    var query = $("#tvInput").val().trim();
    console.log(query);

    // calls first api
    $.ajax("/api/tv?q=" + query, {
      type: "GET"
    }).then(function(data) {
      console.log(data);

      // use for loop to show user images of show and attach id
      for (var i = 0; i < data.length; i++) {
        var img = data[i].artwork_608x342;
        var id = data[i].id;
        var div = $("<div class='tvList'>").attr("tvID", id);
        var imgDiv = $("<img src='" + img + "'>");
                                             // might push the tvID attribute to the image in the future
        div.append(imgDiv)                   // so more info can be added such as ratings without having the whole div be a link
        $("#tvRow").append(div);
      }
    })
  }
};


// initilizes when user clicks on the image
$(document).on("click",".tvList", function() {

  var tvId = $(this).attr("tvid");
  console.log(tvId);

  $("#selectedTv").html(this);
  $("#tvRow").empty();

  // start the other API when the user clicks on the movie image
  $.ajax("/api/tvTwo?q=" + tvId, {
    data: tvId,
    type: "GET"
  }).then(function(data) {

    console.log(data);

    var subscription = "";
    console.log(data.web.episodes.all_sources);

    for (var i = 0; i < data.web.episodes.all_sources.length; i++) {
      if (data.web.episodes.all_sources[i].type === "subscription") {
        
        subscription = data.web.episodes.all_sources[i].display_name;
      }
    }
    console.log(subscription);

    var subscriptionDiv = $("<p id='subscription'>");
    $("#tvLinks").append(subscriptionDiv);

    if (subscription.length > 0) {
      subscriptionDiv.html("Found on: " + subscription + "!");
    }
    else {
      $("#subscription").html("Is not found on any subscription website in our database.");
    }

    var infoLink = $("<button id='tvInfoLink'>More info about the info</button>");
    $("#tvLinks").append(infoLink);

    var favoriteButton = $("<button id='favorite'>Click here to Favorite</button>");
    $("#tvLinks").append(favoriteButton);

  })
});

$(document).on("click","#favorite", function() {
  
});

// Add event listeners to the submit and delete buttons
$("#submit").on("click", handleFormSubmit);

