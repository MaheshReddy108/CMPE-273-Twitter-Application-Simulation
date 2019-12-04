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
  console.log("Inside register of kafka backend");
  console.log("msg is....", msg);

  let { errors, isValid } = validateSignup(msg);
  if (!isValid) {
    callback(null, errors);
  } else {
    let first_name = msg.first_name;
    let last_name = msg.last_name;
    let email = msg.email;
    let username = msg.username;
    let password = msg.password;
    var avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

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
              email: email,
              avatar
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
}

exports.handle_request = handle_request;
