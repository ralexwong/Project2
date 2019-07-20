
$(document).ready(function() {
  
var dbMovieData = [];
var $newItemInput = $("input.new-item");
var $imageContainer = $(".image-container");


// $(document).on(click, "button")
getTopMoviesDb();

//resets the top movies displayed from topmoviedata table
// function initializeRows() {
//   $imageContainer.empty();
//   var rowsToAdd = [];
//   for(var i = 0; i < topMovieData.title.length; i++) {
//     rowsToAdd.push(reateNewRow(topMovieData.title[i]));
//   }
//   $imageContainer.prepend(rowsToAdd);
// }

function moviePageInfo(dbMovieData) {
  $.get("/api/topmoviedata", function(dbMovieData) {
    if(dbMovieData.length !== 0) {
      for(var i = 0; i < dbMovieData.length; i++) {

        var row = $("<div>");
        row.addClass("movieList");
        
        row.append("<img src=" + dbMovieData[i].image_url + ">" );
        row.append("<div>" + dbMovieData[i].title + "</div>");
        
        // var img = dbMovieData[i].image_url;
        // var id = dbMovieData[i].api_id;
        // var tit = dbMovieData[i].title
    
        $("#topMovie-area").prepend(row);
      }

    }
  })

}


//Grabs all top movies from the DB and updates page
function getTopMoviesDb() {
  $.get("/api/topmoviedata", function(data) {
    dbMovieData = data;
    console.log(dbMovieData);
    // initializeRows();
    moviePageInfo();
  });
}

// function Update(topMovieData) {
//   $.ajax({
//     method: "PUT",
//     url: "/api/topmoviedata",
//     data: topMovieData
//   }).then(getTopMoviesDb);
// }




// function insertFavMov(event) {
//   event.preventDefault();
//   var fav = {
//     text: $newItemInput.val().trim(),
//     complete: false
//   };

//   $.post(/api/topmoviedata, topMovieData, getTopMoves);
//   $newItemInput.val("")
// }

})

