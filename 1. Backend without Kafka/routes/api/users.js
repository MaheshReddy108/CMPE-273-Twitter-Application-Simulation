const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const redis = require("redis");
const keys = require("../../config/keys");
const User = require("../../models/User");
var mongooseTypes = require("mongoose").Types;
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
  let { errors, isValid } = validateSignup(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
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
        errors.username = "Username already exists";
        return res.status(400).json(errors);
      } else {
        User.findOne({ email: email }).then(user1 => {
          if (user1) {
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
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then(user => {
                    res.status(200).json(user);
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

  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const { username } = req.body;
    const { password } = req.body;
    User.findOne({ username })
      .then(user => {
        if (!user) {
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

                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  { expiresIn: 216000 },
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
  User.findOneAndUpdate({ username }, { $set: userField }, { new: true }).then(
    user => {
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
        return res.status(404).json({ msg: "no user with this username" });
      }
      user.views += 1;
      user.save().then(user => res.status(200).json(user));
    })
    .catch(err => {
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
        return res.status(404).json({ msg: "no user with this username" });
      }
      res.json(user.followers);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/update_profile", (req, res) => {
  console.log("inside update profile of backend");
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
      return res.status(404).json({ msg: "no user with this username" });
    }
    user.first_name = first_name;
    user.last_name = last_name;
    user.description = description;
    user.city = city;
    user.state = state;
    user.zipcode = zipcode;
    user.save();

    res.status(200).json(user);
  });
});

router.post("/check_follower", (req, res) => {
  const { username, follower_name } = req.body;
  console.log("inside check_follower api of backend. username is..", username);
  User.findOne({
    username,
    "following.following_name": { $eq: follower_name }
  })
    .then(user => {
      if (user) {
        res.status(200).json({ msg: "exists" });
      } else {
        res.status(200).json({ msg: "not exists " });
      }
    })
    .catch(err => {
      res.status(200).json({ msg: "not exists " });
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
        return res
          .status(404)
          .json({ msg: "no user with this username or already following" });
      } else {
        const newFollowing = {
          following_id: following_id,
          following_name: following_name
        };
        user.following.unshift(newFollowing);
        user.save().then(user => res.json(user));
        user.following_count = user.following_count + 1;
        user.save();
        User.findOne({ username: following_name }).then(user => {
          if (!user) {
            return res.status(404).json({ msg: "no user with this username2" });
          }
          const newFollower = {
            follower_id: user_id,
            follower_name: req.body.username
          };
          user.followers.unshift(newFollower);
          user.follower_count = user.follower_count + 1;
          user.save();
        });
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/unfollow", (req, res) => {
  const { following_name, username } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "no user with this username" });
    }
    let removeIndex = user.following
      .map(item => item.following_name)
      .indexOf(following_name);
    user.following.splice(removeIndex, 1);
    user.following_count -= 1;
    user.save().then(user => {
      res.json(user);
    });
  });

  User.findOne({ username: following_name }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "no user with this username" });
    }
    let removeIndex = user.followers
      .map(item => item.follower_name)
      .indexOf(username);
    user.followers.splice(removeIndex, 1);
    user.follower_count -= 1;
    user.save().then(user => {
      res.json(user);
    });
  });
});

router.post("/get_following", (req, res) => {
  const { username } = req.body;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ msg: "no user with this username" });
      }

      res.json(user.following);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/search_people", (req, res) => {
  var name = req.body.searchText;
  id = mongooseTypes.ObjectId();
  User.find(
    {
      $or: [
        { first_name: new RegExp("^" + name, "i") },
        { last_name: new RegExp("^" + name, "i") },
        { username: new RegExp("^" + name, "i") }
      ]
    },
    (err, result) => {
      if (err) {
        res.status(404).json({ error: `user not found ${err}` });
      } else {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).send({ error: "User not found" });
        }
      }
    }
  );
});

module.exports = router;
