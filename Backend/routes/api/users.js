const express = require("express");
var createError = require("http-errors");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var keys = require("../../config/keys");
var passport = require("passport");
var jwt = require("jsonwebtoken");

const app = express();

router.get("/test", (req, res) => res.json({ msg: "works" }));

router.post("/register", (req, res) => {
  console.log("Inside register of  backend");
  console.log("request is....", req.body);
  /*  let { errors, isValid } = validateSignupBuyer(msg);
  if (!isValid) {
    console.log(errors);
    callback(null, errors);
  }*/
  //return res.status(400).json(errors);}
  // else {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  User.findOne({ username: username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    } else {
      User.findOne({ email: email }).then(user1 => {
        if (user1) {
          return res.status(400).json({ email: "Email already exists" });
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
                  res.json(user);
                })
                .catch(err => {
                  console.log("err is ", err);
                });
            });
          });
        }
      });
    }
  });
  // }
});

router.post("/login", (req, res) => {
  console.log("inside login of backend");

  console.log("request is..", req.body);
  let username = req.body.username;
  let password = req.body.password;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ username: "Username doesnot exist" });
      } else {
        if (user.active != "Active") {
          return res.status(400).json({ active: "User has been deactivated" });
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
                    res.json({
                      success: true,
                      token: "Bearer " + token
                    });
                  }
                );
              } else {
                return res.status(400).json({ msg: "Password incorrect" });
              }
            })
            .catch(err => console.log("err is ", err));
        }
      }
    })
    .catch(err => console.log("err is ", err));
});

router.post("/deactivate", (req, res) => {
  var username = req.body.username;
  console.log("inside deactivate api of backend. username is..", username);
  let userField = {};
  userField.active = "Deactivated";
  console.log("new status is ", userField.active);
  User.findOneAndUpdate(
    { username: username },
    { $set: userField },
    { new: true }
  ).then(user => {
    console.log("user has been deactivared. updated user is ", user);
    res.json(user);
  });
});
module.exports = router;
