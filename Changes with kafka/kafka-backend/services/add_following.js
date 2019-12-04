var express = require("express");
var myJSON = require("JSON");
const gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");
var passport = require("passport");
let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validateLogin = require("../validation/login");
const app = express();
var mongooseTypes = require("mongoose").Types;

function handle_request(msg, callback) {
  const { username, following_id, following_name } = msg;
  var user_id = "";
  console.log(
    "inside add_following api of kafka backend. username is..",
    username
  );
  User.findOne({
    username,
    "following.following_name": { $ne: following_name }
  })
    .then(user => {
      const { _id } = user;
      user_id = _id;
      if (!user) {
        console.log("no user or already following");
        data = {
          success: false,
          msg: "no user or already following"
        };
        callback(null, data);
      } else {
        const newFollowing = {
          following_id: following_id,
          following_name: following_name
        };
        user.following.unshift(newFollowing);
        user.save().then(user => {
          console.log("new profile is....", user);
          data = {
            success: true,
            user: user
          };
          callback(null, data);
        });
        user.following_count = user.following_count + 1;
        user.save();
        User.findOne({ username: following_name }).then(user => {
          if (!user) {
            console.log("no user with this username");
            data = {
              success: false,
              msg: "no user with this username"
            };
            callback(null, data);
          }
          const newFollower = {
            follower_id: user_id,
            follower_name: msg.reqBody.username
          };
          user.followers.unshift(newFollower);
          user.follower_count = user.follower_count + 1;
          user.save();
        });
      }
    })
    .catch(err => {
      console.log("err is ", err);
    });
}

exports.handle_request = handle_request;
