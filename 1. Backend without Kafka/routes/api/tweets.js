const express = require("express");
const passport = require("passport");
const router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');
// const passport = require("passport");

// Tweet Model
const Tweet = require("../../models/Tweet");
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

//Storing documents/Images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads');
  }
  , filename: (req, file, cb) => {
      cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//uplaod-file 

router.post('/upload-file', upload.array('photos', 5), (req, res) => {
  console.log('req.body', req.body);
  res.end();
});

//download-file

router.post('/download-file/:file(*)', (req, res) => {
  console.log('Inside DOwnload File');
  var file = req.params.file;
  var filelocation = path.join(__dirname + '/uploads', file);
  var img = fs.readFileSync(filelocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {
      'Content--type': 'image/jpg'
  });
  res.end(base64img);
});









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
// @route POST api/tweets/getTweets by username
// @desc Get Tweets
// @access Public
router.post("/getTweets", (req, res) => {
  // console.log("inside getTweet. Username is..", req.body.username);
  let username = req.body.username;
  Tweet.find({ username: username })
    .sort({ tweeted_date: -1 })
    .then(tweets => res.status(200).json(tweets))
    .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
});

// @route POST api/tweets/getReTweets by username
// @desc Get Tweets
// @access Public
router.post("/getReTweets", (req, res) => {
  console.log("inside getReTweet. Username is..", req.body.username);
  let username = req.body.username;
  Tweet.find({ username: username, retweeted: true })
    .sort({ tweeted_date: -1 })
    .then(tweets => res.status(200).json(tweets))
    .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
});

// @route POST api/tweets/getLikedTweets by username
// @desc Get Tweets
// @access Public
router.post("/getLikedTweets", (req, res) => {
  console.log("inside getLikedTweet. Username is..", req.body.user_id);
  let user_id = req.body.user_id;
  console.log("user id ", user_id);
  Tweet.find({ "likes.user": user_id })
    .sort({ tweeted_date: -1 })
    .then(tweets => {
      if (!tweets) {
        console.log("no liked tweets");
        return res.status(404).json({ msg: "No liked tweets" });
      } else {
        // console.log("liked tweets are :", tweets);
        res.json(tweets);
      }
    })
    .catch(err => res.status(404).json({ error: `No Tweets found ${err}` }));
});

// @route GET api/tweets/get_tweet/:id
// @desc Get Tweets by id
// @access Public
router.post("/get_tweet", (req, res) => {
  console.log(`Inside get tweet route${req.body.tweet_id}`);

  Tweet.findById(req.body.tweet_id)
    .then(tweet => {
      // console.log("the tweet is" + tweet);
      tweet.view_count += 1;
      tweet.save().then(tweet => res.status(200).json(tweet));
      console.log("tweet_views", tweet.view_count);
      // res.status(200).json(tweet);
    })
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
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    avatar: req.body.avatar,
    hashtags: req.body.hashtag
  });
  //newTweet.hashtags.push(req.body.hashtag)
  newTweet.save().then(tweet => res.status(200).json(tweet));
});

/* Needs work (integrate with user model for authorization) (video : post api routes,026, from 7 th min)
//@route DELETE api/tweets/delete_tweet/:id
// @desc Delete Tweet
// @access Private */
router.delete(
  "/delete_tweet/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Tweet.findById(req.params.id)
        .then(tweet => {
          // Check for tweet owner
          if (tweet.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          tweet.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ tweetnotfound: "No tweet found" })
        );
    });
  }
);

router.post("/search_topic", (req, res) => {
  console.log("req for search_topic", req.body);
  topic = req.body.searchText;
  Tweet.find({ hashtags: new RegExp("^" + topic, "i") }, (err, result) => {
    if (err) {
      res.status(404).json({ error: `Tweet not found ${err}` });
    } else {
      console.log(result);
      if(result.length>0){
         
      res.status(200).json(result);
      }
      else {
        res.status(404).send({error:"Topic Not found"})
      }
    }
  });
});

// @route   Like tweet api/tweets/like/:id
// @desc    Like tweet
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside like request");
    User.findOne({ user: req.user.id }).then(user => {
      Tweet.findById(req.params.id)
        .then(tweet => {
          if (
            tweet.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this Tweet" });
          }

          // Add user id to likes array
          tweet.likes.unshift({ user: req.user.id });
          tweet.likes_count += 1;

          tweet.save().then(tweet => res.json(tweet));
        })
        .catch(err =>
          res.status(404).json({ Tweetnotfound: "No Tweet found" })
        );
    });
  }
);

// @route   POST api/tweets/unlike/:id
// @desc    Unlike Tweet
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Tweet.findById(req.params.id)
        .then(tweet => {
          if (
            tweet.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this tweet" });
          }

          // Get remove index
          const removeIndex = tweet.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          tweet.likes.splice(removeIndex, 1);
          tweet.likes_count -= 1;

          // Save
          tweet.save().then(tweet => res.json(tweet));
        })
        .catch(err =>
          res.status(404).json({ tweetnotfound: "No tweet found" })
        );
    });
  }
);

// @route   POST api/tweets/reply/:id
// @desc   Reply to a tweet
// @access  Private
router.post(
  "/reply/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTextInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Tweet.findById(req.params.id)
      .then(tweet => {
        const newReply = {
          text: req.body.textContent,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        tweet.replies.unshift(newReply);
        tweet.replies_count += 1;

        // Save
        tweet.save().then(tweet => res.json(tweet));
      })
      .catch(err => res.status(404).json({ tweetnotfound: "No tweet found" }));
  }
);

// @route   DELETE api/tweets/reply/:id/:reply_id
// @desc    Remove Reply from tweet
// @access  Private
router.delete(
  "/replies/:id/:reply_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tweet.findById(req.params.id)
      .then(tweet => {
        // Check to see if comment exists
        if (
          tweet.replies.filter(
            reply => reply._id.toString() === req.params.reply_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        // Get remove index
        const removeIndex = tweet.replies
          .map(item => item._id.toString())
          .indexOf(req.params.reply_id);

        // Splice comment out of array
        tweet.replies.splice(removeIndex, 1);

        tweet.save().then(tweet => res.json(tweet));
      })
      .catch(err => res.status(404).json({ tweetnotfound: "No tweet found" }));
  }
);

// @route   RETWEET api/tweets/retweet/:id
// @desc    Retweet
// @access  Private
router.post(
  "/retweet",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      user_id,
      username,
      firstname,
      lastname,
      tweet_content,
      avatar,
      hashtags,
      tweet_id
    } = req.body;
    console.log("check values", req.body);

    Tweet.findById(tweet_id)
      .then(tweet => {
        // Check to see if comment exists
        const org_tweet = tweet;
        console.log(`the orginal tweet${tweet}`);

        const newTweet = new Tweet({
          user: user_id,
          tweet_content,
          firstname,
          lastname,
          username,
          avatar,
          hashtags,
          retweeted_status: org_tweet,
          retweeted: true
        });
        newTweet.save().then(tweet => {
          console.log("the retweeted tweet is", { tweet });
          res.status(200).json(tweet);
        });

        tweet.retweets_count += 1;
        // Save
        tweet.save().then(console.log("Updated retweet count"));
      })
      .catch(err =>
        res.status(404).json({ tweetnotfound: `No tweet found${err}` })
      );
  }
);

module.exports = router;
