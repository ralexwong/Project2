// calls api to grab channels
$(document).ready(function() {

    $.ajax("/api/channel", {
        type: "GET"
    }).then(function(data) {
        console.log(data);

        var parentDiv = $("<div class='channels'>");
        var src = data[24].artwork_608x342;
        var img = $("<img class='channelImg' src='" + src + "'>");
        var netflixDiv = $("<a href='www.netflix.com'></a>");
        netflixDiv.append(img);

        parentDiv.append(netflixDiv)
        $("#channelRow").append(parentDiv);
    
        for (var i = 0; i < data.length - 1; i++) {

            var parentDiv = $("<div class='channels'>");
            var div = $("<a href='www." + data[i].name + ".com'></a>");
            var img = $("<img class='channelImg' src='" + data[i].artwork_608x342 + "'>");
            div.append(img);
            parentDiv.append(div)
            $("#channelRow").append(parentDiv);
        };
    });
});

