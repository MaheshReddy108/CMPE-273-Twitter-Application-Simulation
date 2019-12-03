const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateSignup = require("../validation/signup");
const validateLogin = require("../validation/login");
const app = express();

function handle_request(msg, callback) {
  switch (msg.api) {
    case "post/register":
      console.log("Inside register of kafka backend");
      console.log("msg is....", msg);

      let { errors, isValid } = validateSignup(msg.reqBody);
      if (!isValid) {
        callback(null, errors);
      } else {
        var first_name = msg.reqBody.first_name;
        var last_name = msg.reqBody.last_name;
        var email = msg.reqBody.email;
        var username = msg.reqBody.username;
        var password = msg.reqBody.password;

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
      break;
    case "post/login":
      console.log("inside login of kafka backend");
      const { errors, isValid } = validateLogin(msg.reqBody);
      if (!isValid) {
        callback(null, errors);
      } else {
        let username = msg.reqBody.username;
        let password = msg.reqBody.password;
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
      break;
  }
}

exports.handle_request = handle_request;
