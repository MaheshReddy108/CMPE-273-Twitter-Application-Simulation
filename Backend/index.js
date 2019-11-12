const express = require("express");
const mongoose = require("mongoose");
//Load User Model
const Tweet = require("./models/tweet");

const app = express();

//Mongoose DB config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected from Mongoose"))
  .catch(err => console.log(err));

/*var MongoClient = require("mongodb").MongoClient;
var url = "mongodb+srv://sruthiduvvuri:3690@mongocluster-ou2ug.mongodb.net/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("twitterdb");
  //Find the first document in the customers collection:
  dbo
    .collection("tweet")
    .find({})
    .toArray(function(err, result) {
      if (err) throw err;
      result.forEach(result => {
        console.log(result.tweet_content);
      });
      db.close();
    });
}); */

app.get("/", function(request, response) {
  console.log("Inside Node Home");
  response.send("Node Backend is working");
});

app.get("/getTweets", function(request, response) {
  Tweet.find({})
    .then(tweet => {
      console.log("The tweets are " + tweet);
      return response.status(200).json(tweet);
    })
    .catch(err => response.status(400).json(err));
});

app.post("/postTweet", function(request, response) {
  console.log("the request is " + request);
  var msg = "New tweet test";
  const newTweet = new Tweet({
    tweet_content: msg
  });
  newTweet
    .save()
    .then(tweet => {
      console.log("the tweet inserted is" + tweet._id);
      console.log("the tweet inserted is" + tweet.tweet_content);
      return response.send("tweet inserted successfully");
    })
    .catch(err => console.log("The error is " + err));
});

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
