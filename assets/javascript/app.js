//80s shows for gifs

var topics = [
"a team",
"knight rider",
"alf",
"webster",
"magnum PI",
"miami vice",
"transformers",
"gi joe",
"he-man",
"ghostbusters"];

function displayGifs(){
//searches giphy api for topic in search bar
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uAplEeI1pMEKTa6F4y4V7UbniqfCRnOK&q=" + topic +"&limit=10&offset=0&rating=G&lang=en";

//ajax call for giphy
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    //creates gifs from choices supplied by giphy
    for (var i = 0; i < response.data.length; i++){
("#gif-area").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url +'">');
    }
});

$("#gif-area").empty();

};
//play gifs by swapping static image for gif
$('document').on('click', '.gif', function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
        //stop
        $(this).attr('src', src.replace(/\.giv/i, "_s.gif"))
        $(this).removeClass('playing');
    }else{
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

//function to make buttons based on topics
function renderButtons(){

    //deletes buttons before adding new ones
    $("#button-area").empty();
    //loops through topics array
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic-btn");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#button-area").append(a);
    }
}

//search function to add to topics

$("#search-box").on("click", function(event) {
    //prevents webpage from reloading on enter
    event.preventDefault();
    //gets keywords from text-box
    var topic = $("show-input").val().trim();
    //adds new shows to array
    topics.push(topic);
    renderButtons();
});

$(document).on("click", ".topic-btn", displayGifs);

renderButtons();


//function to display 10 gifs related to topic

//ability to start and stop playback on click

