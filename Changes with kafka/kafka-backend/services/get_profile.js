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
  console.log("inside get_profile of kafka backend");
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
    });
}

exports.handle_request = handle_request;
