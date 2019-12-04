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
  const { following_name, username } = msg;
  console.log("inside unfollow api of kafka backend. username is..", username);
  User.findOne({ username }).then(user => {
    if (!user) {
      console.log("no user with this username");
      data = {
        success: false,
        msg: "no user with this username"
      };
      callback(null, data);
    }
    let removeIndex = user.following
      .map(item => item.following_name)
      .indexOf(following_name);
    user.following.splice(removeIndex, 1);
    user.following_count -= 1;
    user.save().then(user => {
      console.log("new profile is....", user);
      data = {
        success: true,
        user: user
      };
      callback(null, data);
    });
  });
  User.findOne({ username: following_name }).then(user => {
    if (!user) {
      console.log("no user with this username");
      data = {
        success: false,
        msg: "no user with this username"
      };
      callback(null, data);
    }
    let removeIndex = user.followers
      .map(item => item.follower_name)
      .indexOf(username);
    user.followers.splice(removeIndex, 1);
    user.follower_count -= 1;
    user.save().then(user => {
      console.log("new profile is....", user);
      data = {
        success: true,
        user: user
      };
      callback(null, data);
    });
  });
}

exports.handle_request = handle_request;
