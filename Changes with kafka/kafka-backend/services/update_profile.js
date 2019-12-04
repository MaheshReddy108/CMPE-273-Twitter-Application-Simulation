var express = require("express");
var myJSON = require("JSON");
const gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");
var passport = require("passport");
let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const validateSignup = require("../validation/signup");
const app = express();
var mongooseTypes = require("mongoose").Types;

function handle_request(msg, callback) {
  console.log("inside update profile of kafka backend");
  let {
    username,
    first_name,
    last_name,
    description,
    city,
    state,
    zipcode
  } = msg;
  User.findOne({ username }).then(user => {
    if (!user) {
      console.log("no user");
      data = {
        success: false,
        msg: "no user"
      };
      callback(null, data);
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.description = description;
    user.city = city;
    user.state = state;
    user.zipcode = zipcode;
    user.save();

    console.log("new profile is....", user);
    data = {
      success: true,
      user: user
    };
    callback(null, data);
  });
}

exports.handle_request = handle_request;
