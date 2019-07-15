// http://api-public.guidebox.com/v2/{endpoint}  <---- BASE API URL

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "http://api-public.guidebox.com/v2/",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "",
      type: "GET",
      dataType: "json"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var query = $("#example-text").val().trim();

  console.log(query);

  $.ajax("http://api-public.guidebox.com/v2/search?api_key=eebe5906010bcf88573d887c308bd62a53db60ca&type=movie&field=title&query=" + query, {
    data: query,
    type: "GET"
  }).then(function(res) {
    console.log(res.results);
    var movieID = res.results[0].id;
    console.log(movieID);

    for (var i = 0; i < res.results.length; i++) {
      var img = res.results[i].poster_400x570;
      var id = res.results[i].id;

      var div = $("<div class='movieList'>");
      var imgDiv = $("<img src='" + img + "'>");
      imgDiv.attr("movieID", id);
      div.append(imgDiv);
      
    }

    $.ajax("https://api-public.guidebox.com/v2/movies/" + movieID + "?api_key=eebe5906010bcf88573d887c308bd62a53db60ca", {
      data: query,
      type: "GET"
    }).then(function(res) {
      console.log(res);
    })
  })

  // API.saveExample(example).then(function() {
  //   refreshExamples();
  // });

};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


// $("#example-text").on("submit", function(event) {
//   event.preventDefault();

//   var query = $("#example-text").val().trim();

//   console.log(query);

//   $.ajax({
//     url: "/api/query",
//     data: query,
//     type: "GET",
//     dataType: "json"
//   });

// });


