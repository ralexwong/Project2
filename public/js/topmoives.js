// $(document).ready(function() {
// Getting references to the name input and author container, as well as the table body
var movieSearch = $("#movieInput");
// Adding event listeners to the form to create a new object, and the button to delete
// an Author
module.exports = function(app) {
app.get("/topMovieData", function(req, res) {
  connection.query("SELECT * FROM topMovieData;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { movies: data });
  });
});

app.get("/topMovieData:id", function(req, res) {
  connection.query(
    "SELECT * FROM topMovieData where id = ?",
    [req.params.id],
    function(err, data) {
      if (err) {
        return res.status(500).end();
      }

      console.log(data);
      res.render("movie", data[0]);
    }
  );
});

// Update a quote by an id and then redirect to the root route.
// app.put("/api/quotes/:id", function(req, res) {
app.put("/api/topMovieData/:id", function(req, res) {
  event.preventDefault();
  connection.query(
    "UPDATE moives SET title = ?, image_url = ? WHERE id = ?",
    [req.body.title, req.body.image_url, req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
