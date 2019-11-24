const express = require("express");

const router = express.Router();
// const passport = require("passport");

// Tweet Model
const Tweet = require("../../models/Tweet");
// User Model

// Validation
const validateTweetInput = require("../../validation/tweet");

// @route GET api/tweets/test
// @desc Test Tweet route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Tweet works"
  })
);

// @route GET api/tweets/get_tweets
// @desc Get Tweets
// @access Public
router.get("/get_tweets", (req, res) => {
  console.log("inside tweet");
  Tweet.find()
    .sort({ tweeted_date: -1 })
    .then(tweets => res.status(200).json(tweets))
    .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
});

// @route GET api/tweets/get_tweet/:id
// @desc Get Tweets by id
// @access Public
router.get("/get_tweet/:id", (req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.status(200).json(tweet))
    .catch(err =>
      res.status(404).json({ error: `No tweet found with that id ${err}` })
    );
});

// @route POST api/tweets/create_tweet
// @desc Create Tweet
// @access Private
router.post("/create_tweet", (req, res) => {
  const { errors, isValid } = validateTweetInput(req.body);
  // Check Validaiton
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const newTweet = new Tweet({
    user: req.body.user_id,
    tweet_content: req.body.tweet_content,
    username: req.body.username,
    avatar: req.body.avatar,
    hashtags: req.body.hashtags
  });
  newTweet.save().then(tweet => res.status(200).json(tweet));
});

/* Needs work (integrate with user model for authorization) (video : post api routes,026, from 7 th min)
//@route DELETE api/tweets/delete_tweet/:id
// @desc Delete Tweet
// @access Private */
router.post("/delete_tweet/:id", (req, res) => {
  Tweet.findByIdAndRemove({ _id: req.params.id })
    .then(res => {
      res.status(200).json({ success: true });
    })
    .catch(err => res.status(404).json({ error: `Tweet not found ${err}` }));
});

router.post("/search_topic", (req, res) => {
  console.log("req for search_topic", req);
  topic = req.body.hashtags;
  Tweet.find({ hashtags: new RegExp(topic, "i") }, (err, result) => {
    if (err) {
      res.status(404).json({ error: `Tweet not found ${err}` });
    } else {
      console.log(result);

      res.status(200).json(result);
    }
  });
});

module.exports = router;
