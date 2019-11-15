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
  console.log("inside login of kafka backend");

  console.log("msg is..", msg);
  let username = msg.username;
  let password = msg.password;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        errors = {};
        errors.username = "Username does not exist";
        callback(null, errors);
      } else {
        if (user.active != "Active") {
          errors = {};
          errors.username = "Username does not exist";
          callback(null, errors);
        } else {
          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                console.log("match found");
                //res.json({ msg: "match found" });

                let payload = {
                  id: user.id,
                  username: user.username
                };
                console.log("payload is ", payload);
                //sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    data = {
                      success: true,
                      token: "Bearer " + token
                    };
                    callback(null, data);
                  }
                );
              } else {
                errors = {};
                errors.password = "Password Incorrect";
                callback(null, errors);
              }
            })
            .catch(err => console.log("err is ", err));
        }
      }
    })
    .catch(err => console.log("err is ", err));
}

exports.handle_request = handle_request;
