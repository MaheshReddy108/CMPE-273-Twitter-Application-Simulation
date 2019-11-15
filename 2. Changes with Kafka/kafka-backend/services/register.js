const express = require("express");
var createError = require("http-errors");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var keys = require("../config/keys");
var passport = require("passport");
var jwt = require("jsonwebtoken");
//const redis = require("redis");
//const redisHmapMax = 4;
const app = express();

function handle_request(msg, callback) {
  console.log("Inside register of kafka backend");
  console.log("msg is....", msg);

  var first_name = msg.first_name;
  var last_name = msg.last_name;
  var email = msg.email;
  var username = msg.username;
  var password = msg.password;

  User.findOne({ username: username }).then(user => {
    if (user) {
      errors = {};
      errors.username = "Username already exists";
      callback(null, errors);
    } else {
      User.findOne({ email: email }).then(user1 => {
        if (user1) {
          errors = {};
          errors.email = "Email already exists";
          callback(null, errors);
        } else {
          const newUser = new User({
            username: username,
            first_name: first_name,
            last_name: last_name,
            password: password,
            email: email
          });
          console.log("User is........", newUser);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  console.log(" The user entered is " + user);
                  data = {
                    success: true,
                    user: user
                  };
                  callback(null, data);
                  console.log(
                    " The user record entered with id " + user._id,
                    "The user email id is " + user.email
                  );
                })
                .catch(err => {
                  callback(null, err);
                  console.log("err is ", err);
                });
            });
          });
        }
      });
    }
  });
}

exports.handle_request = handle_request;
