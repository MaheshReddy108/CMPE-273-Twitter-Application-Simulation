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
  let username = msg.username;
  console.log(
    "inside get_followers api of kafka backend. username is..",
    username
  );
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no user");
        data = {
          success: false,
          msg: "no user"
        };
        callback(null, data);
      } else {
        console.log("followers are ....", user.followers);
        data = {
          success: true,
          followers: user.followers
        };
        callback(null, data);
      }
    })
    .catch(err => {
      console.log("err is.....", err);
    });
}

exports.handle_request = handle_request;
