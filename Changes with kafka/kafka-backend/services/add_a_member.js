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
  const { username, list_Name } = msg;
  console.log(
    "inside add_a_member api of kafka backend. username is..",
    username
  );
  lists
    .findOne({ list_Name })
    .then(list => {
      if (!list) {
        console.log("no list with this list name");
        data = {
          success: false,
          msg: "no list with this list name"
        };
        callback(null, data);
      }

      const newMember = {
        username: username
      };
      list.members.unshift(newMember);
      list.save().then(list => {
        console.log("list members is....", list.members);
        data = {
          success: true,
          list: list.members
        };
        callback(null, data);
      });
    })
    .catch(err => {
      console.log("error is..", err);
    });
}

exports.handle_request = handle_request;
