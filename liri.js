require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var selection = process.argv[2];
var searchQuery = process.argv[3];

switch(selection) {
    case 'spotify-this-song':
        if(searchQuery === undefined) { 
            searchQuery = 'The Sign, Ace of Base'; 
        };
        spotify.search({ type: 'track', query: searchQuery}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("----------\n" +
                        "Artist: " + data.tracks.items[0].artists[0].name + 
                        "\nSong Name: " + data.tracks.items[0].name + 
                        "\nLink: " + data.tracks.items[0].external_urls.spotify + 
                        "\nAlbum: " + data.tracks.items[0].album.name +
                        "\n----------");
        });
    break;

    case 'my-tweets': 
        console.log('\nYour tweets:\n')
        var params = {screen_name: '_fernandarojasc'};
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (i = 0; i < 3; i++) { 
                    var date = tweets[i].created_at;
                    console.log("[" + date.substring(0,10) + "]  " + tweets[i].text +
                                "\n----------");
                }
            };
        });
    break;

    case 'movie-this':
        var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error,response, body) { 
        
            if (!error && response.statusCode === 200) { 
                console.log("Movie Title: " + JSON.parse(body).Title +
                            "\nYear: " + JSON.parse(body).Year +
                            "\nRatings: " + JSON.parse(body).imdbRating +
                            "\nRotten Tomatoes: " + JSON.parse(body).Ratings[1].Value +
                            "\nCountry: " + JSON.parse(body).Country +
                            "\nLanguage: " + JSON.parse(body).Language +
                            "\nPlot: " + JSON.parse(body).Plot + 
                            "\nActors: " + JSON.parse(body).Actors + 
                            JSON.parse(body).Actors);
        }
});
    break;
};
