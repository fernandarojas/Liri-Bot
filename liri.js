require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require('fs');

var selection = process.argv[2];
var searchQuery = process.argv[3];

switch(selection) {
    case 'spotify-this-song':
        spotifyFunc(searchQuery);    
    break;

    case 'my-tweets': 
        twitterFunc(searchQuery); 
    break;

    case 'movie-this':
        movieFunc(searchQuery);
    break;

    case 'do-what-it-says': 
        dothisFunc();
    break;
};

function spotifyFunc(searchQuery) { 
    var spotify = new Spotify(keys.spotify);

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
};

function twitterFunc(searchQuery) { 
    var client = new Twitter(keys.twitter);
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
};

function movieFunc(searchQuery) { 
    var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error,response, body) { 
    
        if (!error && response.statusCode === 200) { 
            console.log("Movie Title: " + JSON.parse(body).Title +
                        "\nYear: " + JSON.parse(body).Year +
                        "\nRatings: " + JSON.parse(body).imdbRating +
                        //"\nRotten Tomatoes: " + JSON.parse(body).Ratings[1].Value +
                        "\nCountry: " + JSON.parse(body).Country +
                        "\nLanguage: " + JSON.parse(body).Language +
                        "\nPlot: " + JSON.parse(body).Plot + 
                        "\nActors: " + JSON.parse(body).Actors + 
                        JSON.parse(body).Actors);
        }
    });
};

function dothisFunc() { 
    fs.readFile('random.txt', "utf8", function(error,data) {
        if (error) { 
            return console.log(error); 
        }
        var txt = data.split(","); 
        spotifyFunc(txt[1]);
    });
};