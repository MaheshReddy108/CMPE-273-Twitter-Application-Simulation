const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var kafka = require("../../kafka/client");
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
  console.log("inside register of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("register", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});

router.post("/login", (req, res) => {
  console.log("inside login of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("login", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});

router.post("/deactivate", (req, res) => {
  console.log("inside deactivate of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("deactivate", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});

router.post("/get_profile", (req, res) => {
  console.log("inside deactivate of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_profile", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.user));
      } else res.status(400).json(results);
    }
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
  console.log("inside get_followers of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_followers", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.followers));
      } else res.status(400).json(results);
    }
  });
});

router.post("/update_profile", (req, res) => {
  console.log("inside update_profile of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("update_profile", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.user));
      } else res.status(400).json(results);
    }
  });
});

router.post("/check_follower", (req, res) => {
  console.log("inside check_follower of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("check_follower", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.msg));
      } else res.status(400).json(results);
    }
  });
});

router.post("/add_following", (req, res) => {
  console.log("inside add_following of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("add_following", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.user));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/unfollow", (req, res) => {
  console.log("inside unfollow of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("unfollow", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.user));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_following", (req, res) => {
  console.log("inside get_following of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_following", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.user));
      } else res.status(400).json(results.msg);
    }
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
