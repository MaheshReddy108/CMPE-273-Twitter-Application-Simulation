const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Tweet Model
const Tweet = require("../../models/tweet");
// User Model

// Validation
const validateTweetInput = require("../../validation/tweet");

//@route GET api/tweets/test
// @desc Test Tweet route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Tweet works"
  })
);

//@route GET api/tweets/get_tweets
// @desc Get Tweets
// @access Public
router.get("/get_tweets", (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then(tweets => res.status(200).json(tweets))
    .catch(err => res.status(404).json({ error: "No Tweets found" }));
});

//@route GET api/tweets/get_tweet/:id
// @desc Get Tweets by id
// @access Public
router.get("/get_tweet/:id", (req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.status(200).json(tweet))
    .catch(err =>
      res.status(404).json({ error: "No tweet found with that id" })
    );
});

//@route POST api/tweets/create_tweet
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
    avatar: req.body.avatar
  });
  newTweet.save().then(tweet => res.status(200).json(tweet));
});

/* Needs work (integrate with user model for authorization) (video : post api routes,026, from 7 th min)
//@route DELETE api/tweets/delete_tweet/:id
// @desc Delete Tweet
// @access Private */
/*router.post("/delete_tweet/:id", (req, res) => {
  Tweet.findByIdAndRemove({ _id: req.params.id })
    .then(res => {
      res.status(200).json({ success: true });
    })
    .catch(err => res.status(404).json({ error: "Tweet not found" }));
});*/

router.post("/reply", (req, res) => {
    //const { errors, isValid } = validatePostInput(req.body);

    /* if (!isValid) {
      return res.status(400).json(errors);
    } */
    const { _id } = req.body
    Tweet.find({ _id })
      .then(tweet => {
        const newReply = {
          text: req.body.text,
          username: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        tweet.replies.unshift(newReply);
        tweet.save().then(tweet => res.json(tweet));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    });
  }
);

module.exports = router;
