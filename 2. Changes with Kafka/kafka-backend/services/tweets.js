const express = require("express");
const passport = require("passport");

const router = express.Router();
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const TOPIC = "tweets";
// const passport = require("passport");

// Tweet Model
const Tweet = require("../../models/Tweet");
// User Model

// Validation
const validateTweetInput = require("../../validation/tweet");
const validateTextInput = require("../../validation/text");


  // @route GET api/tweets/get_tweets
// @desc Get Tweets
// @access Public
function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/register":
router.get("/get_tweets", (req, res) => {
    console.log("inside tweet");
    Tweet.find()
      .sort({ tweeted_date: -1 })
      .then(tweets => res.status(200).json(tweets))
      .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
  });
  // @route POST api/tweets/getTweets by username
  // @desc Get Tweets
  // @access Public
  router.post("/getTweets", (req, res) => {
    // console.log("inside getTweet. Username is..", req.body.username);
    const { username } = req.body;
    Tweet.find({ username: username })
      .sort({ tweeted_date: -1 })
      .then(tweets => res.status(200).json(tweets))
      .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
  });
}
}


  exports.handle_request = handle_request;