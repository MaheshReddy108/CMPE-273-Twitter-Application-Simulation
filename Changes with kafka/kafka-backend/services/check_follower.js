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
  const { username, follower_name } = msg;
  console.log(
    "inside check_follower api of kafka backend. username is..",
    username
  );
  User.findOne({
    username,
    "following.following_name": { $eq: follower_name }
  })
    .then(user => {
      if (user) {
        data = {
          success: true,
          msg: "exists"
        };
        callback(null, data);
      } else {
        data = {
          success: true,
          msg: "not exists"
        };
        callback(null, data);
      }
    })
    .catch(err => {
      data = {
        success: true,
        msg: "not exists"
      };
      callback(null, data);
    });
}

exports.handle_request = handle_request;
