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
  const { user_id, username, list_Name } = msg;
  console.log("inside subscribe api of kafka backend. username is..", username);
  lists
    .findOne({ list_Name, "subscribers.username": { $ne: username } })
    .then(list => {
      if (!list) {
        console.log("no list with this list name");
        data = {
          success: false,
          msg: "no list with this list name"
        };
        callback(null, data);
      }

      const newsubscriber = {
        user_id: user_id,
        username: username
      };
      list.subscribers.unshift(newsubscriber);
      list.save().then(list => {
        console.log("subscribers of lists are are....", list.subscribers);
        data = {
          success: true,
          list: list.subscribers
        };
        callback(null, data);
      });
    })
    .catch(err => {
      console.log("err is ", err);
    });
}

exports.handle_request = handle_request;
