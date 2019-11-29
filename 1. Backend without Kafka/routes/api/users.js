const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const redis = require("redis");
const keys = require("../../config/keys");
const User = require("../../models/User");
var mongooseTypes = require("mongoose").Types;

var passport = require("passport");
const app = express();
const validateSignup = require("../../validation/signup");
const validateLogin = require("../../validation/login");

// const redisHmapMax = 4;

// creating redis client
// const client = redis.createClient(6379);

// Testing redis connection
// client.on("connect", function() {
//   console.log("Connected to Redis...");
// });
router.get("/test", (req, res) => res.json({ msg: "works" }));

router.post("/register", (req, res) => {
  console.log("Inside register of  backend");
  console.log("request is....", req.body);
  let { errors, isValid } = validateSignup(req.body);
  if (!isValid) {
    console.log("errors are.......", errors);
    //console.log("in json.... ", json(errors));
    return res.status(400).json(errors);
    //return res.status(500).json(errors);
  }

  //return res.status(400).json(errors);}
  else {
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
        console.log("username exists...........");
        errors.username = "Username already exists";
        return res.status(400).json(errors);
      } else {
        User.findOne({ email: email }).then(user1 => {
          if (user1) {
            console.log("email exists...........");
            errors.email = "Email already exists";
            return res.status(400).json(errors);
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
                    //res.send("user entered");
                    res.status(200).json(user);
                    //return res.json(user);
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
  }
});

router.post("/login", (req, res) => {
  console.log("inside login of backend");

  console.log("request is..", req.body);
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    console.log("errors are.......", errors);
    res.status(400).json(errors);
  } else {
    const { username } = req.body;
    const { password } = req.body;
    User.findOne({ username })
      .then(user => {
        if (!user) {
          console.log("username does not exist");
          errors.username = "Username doesnot exist";
          res.status(400).json(errors);
        } else if (user.active !== "Active") {
          errors.username = "User has been deactivated";
          res.status(400).json(errors);
        } else {
          bcrypt
            .compare(password, user.password)
            .then(isMatch => {
              if (isMatch) {
                console.log("match found");
                const payload = {
                  id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  username: user.username,
                  avatar: user.avatar
                };
                console.log("payload is ", payload);
                // sign token
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.status(200).json({
                      success: true,
                      token: `Bearer ${token}`
                    });
                  }
                );
              } else {
                errors.password = "Password incorrect";
                res.status(400).json(errors);
              }
            })
            .catch(err => console.log("err is ", err));
        }
      })
      .catch(err => console.log("err is ", err));
  }
});

router.post("/deactivate", (req, res) => {
  const { username } = req.body;
  console.log("inside deactivate api of backend. username is..", username);
  const userField = {};
  userField.active = "Deactivated";
  console.log("new status is ", userField.active);
  User.findOneAndUpdate({ username }, { $set: userField }, { new: true }).then(
    user => {
      console.log("user has been deactivared. updated user is ", user);
      res.json(user);
    }
  );
});

router.post("/get_profile", (req, res) => {
  const { username } = req.body;
  console.log("inside get_profile api of backend. username is..", username);
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no user");

        return res.status(404).json({ msg: "no user with this username" });
      }
      // console.log("profile is....", user);
      res.json(user);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

// modifying get-profile api with redis

// router.post("/get_profile_redis", (req, res) => {
//   const { username } = req.body;
//   console.log("inside get_profile api of backend. username is..", username);

//   client.hget("get_profile", username, (err, reply) => {
//     if (err) {
//       console.log(err);
//       res.status(422).send(err);
//     } else {
//       client.hlen("get_profile", (err, length) => {
//         if (length >= redisHmapMax) {
//           client.hkeys("get_profile", (err, keys) => {
//             console.log(keys[0]);
//             client.hdel("get_profile", keys[0]);
//           });
//         }
//       });
//       if (reply) {
//         res.status(200).send(JSON.parse(reply));
//       } else {
//         User.findOne({ username })
//           .then(user => {
//             if (!user) {
//               console.log("no user");

//               return res
//                 .status(404)
//                 .json({ msg: "no user with this username" });
//             }
//             console.log("profile is....", user);
//             res.json(user);
//             client.hset("get_profile", username, JSON.stringify(user));
//           })
//           .catch(err => {
//             console.log("err is.....", err);
//             res.status(404).json(err);
//           });
//       }
//     }
//   });
// });

router.post("/get_followers", (req, res) => {
  const { username } = req.body;
  console.log("inside get_followers api of backend. username is..", username);
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no user");

        return res.status(404).json({ msg: "no user with this username" });
      }
      // console.log("profile is....", user);
      res.json(user.followers);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});
router.post("/update_profile", (req, res) => {
  console.log("request is..", req.body);
  let {
    username,
    first_name,
    last_name,
    description,
    city,
    state,
    zipcode
  } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      console.log("no user");
      return res.status(404).json({ msg: "no user with this username" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.description = description;
    user.city = city;
    user.state = state;
    user.zipcode = zipcode;
    user.save();
    // console.log("new profile is....", user);
    res.status(200).json(user);
  });
});
router.post("/add_following", (req, res) => {
  const { username, following_id, following_name } = req.body;
  var user_id = "";
  console.log("inside add_following api of backend. username is..", username);
  User.findOne({
    username,
    "following.following_name": { $ne: following_name }
  })
    .then(user => {
      const { _id } = user;
      user_id = _id;
      if (!user) {
        console.log("no user");

        return res.status(404).json({ msg: "no user with this username" });
      } else {
        const newFollowing = {
          following_id: following_id,
          following_name: following_name
        };
        user.following.unshift(newFollowing);
        user.save().then(user => res.json(user));
        user.following_count = user.following_count + 1;
        user.save();
        // console.log("profile is....", user);
        User.findOne({ username: following_name }).then(user => {
          if (!user) {
            console.log("no user");

            return res.status(404).json({ msg: "no user with this username2" });
          }
          const newFollower = {
            follower_id: user_id,
            follower_name: req.body.username
          };
          user.followers.unshift(newFollower);
          user.follower_count = user.follower_count + 1;
          user.save();
          // console.log("profile is....", user);
        });
      }
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});
router.post("/unfollow", (req, res) => {
  const { following_name, username } = req.body;
  console.log("req is ", req.body);
  console.log("following id is..", following_name);
  console.log("username is..", username);
  User.findOne({ username }).then(user => {
    if (!user) {
      console.log("no user");
      return res.status(404).json({ msg: "no user with this username" });
    }
    let removeIndex = user.following
      .map(item => item.following_name)
      .indexOf(following_name);
    console.log("remove index is..", removeIndex);

    user.following.splice(removeIndex, 1);
    user.following_count -= 1;
    user.save().then(user => {
      // console.log("user new profile is ", user);
      res.json(user);
    });
  });

  User.findOne({ username: following_name }).then(user => {
    if (!user) {
      console.log("no user");
      return res.status(404).json({ msg: "no user with this username" });
    }
    let removeIndex = user.followers
      .map(item => item.follower_name)
      .indexOf(username);
    console.log("remove index is..", removeIndex);

    user.followers.splice(removeIndex, 1);
    user.follower_count -= 1;
    user.save().then(user => {
      //  console.log("user new profile is ", user);
      res.json(user);
    });
  });
});
router.post("/get_following", (req, res) => {
  const { username } = req.body;
  console.log("inside get_following api of backend. username is..", username);
  User.findOne({ username })
    .then(user => {
      if (!user) {
        console.log("no user");

        return res.status(404).json({ msg: "no user with this username" });
      }
      // console.log("profile is....", user);
      res.json(user.following);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/search_people", (req, res) => {
  console.log("req for search_people", req.body);
  var name = req.body.first_name;
  id = mongooseTypes.ObjectId();
  User.find({ first_name: new RegExp(name, "i") }, (err, result) => {
    if (err) {
      res.status(404).json({ error: `user not found ${err}` });
    } else {
      // console.log(result);
      console.log("id", result[0].id);
      console.log("name", result[0].first_name);
      res.status(200).json(result);
    }
  });
});

module.exports = router;
