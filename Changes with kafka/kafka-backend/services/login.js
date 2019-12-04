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
  console.log("inside login of kafka backend");
  let { errors, isValid } = validateLogin(msg);
  if (!isValid) {
    callback(null, errors);
  } else {
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
            errors.username = "Username has been deactivated";
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
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    avatar: user.avatar
                  };
                  console.log("payload is ", payload);
                  //sign token
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 216000 },
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
}

exports.handle_request = handle_request;
