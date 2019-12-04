var express = require("express");
var myJSON = require("JSON");
const gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");
var passport = require("passport");
let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const lists = require("../models/Lists");
const validateLogin = require("../validation/login");
const app = express();
var mongooseTypes = require("mongoose").Types;

function handle_request(msg, callback) {
  const { username } = msg;
  console.log("inside get_subscribed_lists api of kafka backend");
  lists
    .find({ "subscribers.username": username })
    .then(list => {
      if (!list) {
        console.log("no list with this list name");
        data = {
          success: false,
          msg: "no list with this list name"
        };
        callback(null, data);
      } else {
        console.log("user owned lists are are....", list);
        data = {
          success: true,
          list: list
        };
        callback(null, data);
      }
    })
    .catch(err => {
      console.log("err is ", err);
    });
}

exports.handle_request = handle_request;
