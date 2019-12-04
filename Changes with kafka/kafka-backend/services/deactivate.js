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
  console.log("inside deactivate of kafka backend");

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
