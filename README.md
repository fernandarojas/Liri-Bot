# Liri-Bot
### Developed a Language Interpretation and Recognition Interface. 
### LIRI is a command line node app that takes in parameters and give you back data based on four commands: 

  * my-tweets
  * spotify-this-song
  * movie-this
  * do-what-it-says

### What each command does

1. node liri.js my-tweets
  * Displays my last 20 tweets and when they were created in terminal/bash window

2. node liri.js spotify-this-song <song name> 
  * Shows the following information about the song in terminal/bash window:
  
    * Artist(s) 
    * Song's name
    * Preview link of the song from Spotify
    * The album of the song 
  
3. node liri.js movie-this <movie name> 
  * Shows the following information in terminal/bash window: 
  
    * Title of the movie 
    * Year the movie came out 
    * IMDB Rating of the movie 
    * Country where the movie was produced 
    * Language of the movie 
    * Plot of the movie 
    * Actions in the movie 
    * Rotten Tomatoes Rating
    * Rotten Tomatoes URL 
  
 4. node liri.js do-what-it-says 
  * Takes the text from random.txt and runs the song through spotify-this-song command.
