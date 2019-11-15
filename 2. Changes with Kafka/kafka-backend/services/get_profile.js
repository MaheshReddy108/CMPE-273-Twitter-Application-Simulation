const express = require("express");
var createError = require("http-errors");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var keys = require("../config/keys");
var passport = require("passport");
var jwt = require("jsonwebtoken");
const app = express();

function handle_request(msg, callback) {
  console.log("inside get_profile of kafka backend");

  console.log("msg is..", msg);
  let username = msg.username;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no profile");
        data = {
          success: false,
          msg: "no profile"
        };
        callback(null, data);
      } else {
        console.log("profile is....", user);
        data = {
          success: true,
          user: user
        };
        callback(null, data);
      }
    })
    .catch(err => {
      console.log("err is.....", err);
      //res.status(404).json(err);
    });
}

exports.handle_request = handle_request;
