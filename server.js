// -------------------- I. VARIABLES + PACKAGES --------------------

// Global Variables
var str = [];
var textTweet;

// Initialize dotenv
var dotenv = require('dotenv');
dotenv.config();

// Initialize Twitter API
var Twitter = require('twitter');
var util = require('util');
var T = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});
var paramsTwitter = {
    from: 'khloekardashian',
    count: 50
};

// Initialize Watson Personality API
var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
var personality_insights = new PersonalityInsightsV3({
    username: process.env.WATSON_USERNAME,
    password: process.env.WATSON_PASSWORD,
    version_date: '2016-10-20'
});

// Initialize Express
var express = require('express');
var app = express();

// Set port number
var port = process.env.PORT || 8080

// Allows static files with __dirname (goes to folder name)
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.post('/json/:id', function(req, res) {

    var username = {
    from: req.params.id,
    count: 50};
    console.log(req.params.id);

    //Promise Function
    T.get('/search/tweets.json', username)
        .then(function(stageOne) {

            var tweets;
           
            for (var i = 0; i < stageOne.statuses.length; i++) {
             // OPTION 1
                tweets += stageOne.statuses[i].text;
            };
            return textTweet = tweets;
             // OPTION 2
            //     tweets.push(stageOne.statuses[i].text);
            // };
            // return textTweet = tweets.join(' ').toString();
        })
        // Watson Parameters
        .then(function(stageTwo) {
            var paramsWatson = {
                // Get the content items from the JSON file.
                text: stageTwo,
                consumption_preferences: true,
                raw_scores: true,
                headers: {
                    'accept-language': 'en',
                    'accept': 'application/json'
                }
            };
            return paramsWatson;
        })
        .then(function(stageThree) {
            personality_insights.profile(stageThree, function(error, response) {
                if (error) {
                    console.log('WATSON Error:', error);
                }
                else {
                    // console.log(JSON.stringify(response, null, 2));
                    return res.json(response);
                }
            });
        });
});
app.listen(port, function() {
    console.log("app running");
});