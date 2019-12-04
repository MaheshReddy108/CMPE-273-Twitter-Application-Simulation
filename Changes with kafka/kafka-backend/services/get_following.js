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
  const { username } = msg;
  console.log(
    "inside get_following api of kafka backend. username is..",
    username
  );

  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no user with this username");
        data = {
          success: false,
          msg: "no user with this username"
        };
        callback(null, data);
      }

      console.log("following are....", user.following);
      data = {
        success: true,
        user: user.following
      };
      callback(null, data);
    })
    .catch(err => {
      console.log("err is ", err);
    });
}

exports.handle_request = handle_request;
