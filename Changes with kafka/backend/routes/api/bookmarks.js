const express = require("express");

const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
//  Models
const Tweet = require("../../models/tweet");
const bookmarks = require("../../models/Bookmarks");

router.post(
  "/create_bookmark/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("inside create bookmark request");
    User.findOne({ user: req.user.id }).then(user => {
      const user_id = req.user.id;
      const tweet_id = req.params.id;
      Tweet.findById(req.params.id)
        .then(tweet => {
          const { username, avatar, tweet_content } = tweet;
          bookmarks
            .findOne({ $and: [{ user_id, tweet_id: tweet._id }] })
            .then(bookmark => {
              if (bookmark) {
                console.log("Already bookmarked");
                return res.status(404).json({ msg: "Already Bookmarked" });
              }
              const newBookmark = new bookmarks({
                user_id,
                tweet_id,
                tweet_content
              });
              newBookmark
                .save()
                .then(bookmark1 => res.status(200).json(bookmark1));
            });
        })
        .catch(err =>
          res.status(404).json({ Tweetnotfound: "No Tweet found" })
        );
    });
  }
);

router.post(
  "/view_bookmarks",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user_id = req.user.id;
    console.log("inside bookmarks request", req.user.id);
    bookmarks.find({ user_id }).then(bookmark => {
      if (!bookmark) {
        console.log("No bookmarks found");
        return res.status(404).json({ msg: "You dont have any bookmarks" });
      }
      async function getBm() {
        const bm = await Promise.all(
          bookmark.map(async bm => {
            const response = await Tweet.findById(bm.tweet_id).then(
              tweet => tweet
            );
            return response;
          })
        );
        // console.log("bookmarks are", bm);
        res.status(200).json(bm);
      }
      getBm();
    });
  }
);

module.exports = router;
