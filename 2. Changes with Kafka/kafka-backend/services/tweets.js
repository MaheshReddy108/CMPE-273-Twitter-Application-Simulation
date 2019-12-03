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
const Tweet = require("../models/tweet");
// User Model

// Validation
const validateTweetInput = require("../validation/tweet");
const validateTextInput = require("../validation/text");

// @route GET api/tweets/get_tweets
// @desc Get Tweets
// @access Public
function handle_request(msg, callback) {
  switch (msg.api) {
    case "get/tweet":
      router.get("/get_tweets", (req, res) => {
        console.log("inside tweet");
        Tweet.find()
          .sort({ tweeted_date: -1 })
          .then(tweets => {
            data = {
              success: true,
              tweets: tweets
            };
            callback(null, data);
          })
          .catch(err => {
            errors = {};
            errors.error = `No Tweets found ${err}`;
            callback(null, errors);
          });
      });
  }
}

exports.handle_request = handle_request;
