var express = require("express");
var router = express.Router();
//const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const bookmarks = require("../../models/Bookmarks");

router.post("/create_bookmark", (req, res) => {
    const { user_id, tweet_id, tweet_content } = req.body;
    bookmarks.findOne({ $and: [{ user_id, tweet_id : tweet_id} ] })
     .then(bookmark => {
         if(bookmark){
             console.log("Already bookmarked");
             return res.status(404).json({ msg: "Already Bookmarked" }); 
         }
        else {
         const newBookmark = new bookmarks({
            user_id: req.body.user_id,
            tweet_id: req.body.tweet_id,
            tweet_content: req.body.tweet_content
          });
          newBookmark.save().then(bookmark1 => res.status(200).json(bookmark1));
        }
     })
  });

  router.post("/view_bookmarks", (req, res) => {
    const { user_id } = req.body;
    bookmarks.find({ user_id })
     .then(bookmark => {
         if(!bookmark){
             console.log("No bookmarks found");
             return res.status(404).json({ msg: "You dont have any bookmarks" }); 
         }
        else {
         console.log("Bookmarks are: ", bookmark);
         res.json(bookmark);
        }
     })
  });


  
module.exports = router;