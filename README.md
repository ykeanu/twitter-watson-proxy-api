# Proxy API: IBM Watson's Personality Insights API + Twitter API (Back-End for GiftHub)
Working Demo: https://ucla-hackers.github.io/twitter-watson-personality-insights/
Respository: https://github.com/UCLA-Hackers/twitter-watson-personality-insights

## Directions to use proxy API
```
  var twitterHandle = taylorswift13;
  $.post(`https://twitter-watson-proxy-api.herokuapp.com/json/${twitterHandle}`, function(data) {
        // YOUR CODE GOES HERE
  }
```

## Technologies Used
- Node.js
- Express.js
- dot.env
- Heroku
