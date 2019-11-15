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
  console.log("inside deactivate of kafka backend");

  console.log("msg is..", msg);
  let username = msg.username;
  let userField = {};
  userField.active = "Deactivated";
  console.log("new status is ", userField.active);
  User.findOneAndUpdate(
    { username: username },
    { $set: userField },
    { new: true }
  ).then(user => {
    console.log("user has been deactivared. updated user is ", user);
    data = {};
    data.success = "true";
    data.msg = "Deactivated";
    callback(null, data);
  });
}

exports.handle_request = handle_request;
