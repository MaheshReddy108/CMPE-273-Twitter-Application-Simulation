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
const Tweet = require("../../models/tweet");
// User Model

// Validation
const validateTweetInput = require("../../validation/tweet");
const validateTextInput = require("../../validation/text");

// @route GET api/tweets/test
// @desc Test Tweet route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Tweet works"
  })
);

router.use(bodyParser.json());

// @route GET api/tweets/get_tweets
// @desc Get Tweets
// @access Public
router.get("/get_tweets", (req, res) => {
  console.log("inside tweet");
  var reqMsg = {
    api: "get/tweet",
    reqBody: req.body
  };
  kafka.make_request(TOPIC, reqMsg, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});

module.exports = router;
