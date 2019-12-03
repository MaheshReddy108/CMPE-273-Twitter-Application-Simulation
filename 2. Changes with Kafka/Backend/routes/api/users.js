const express = require("express");
var createError = require("http-errors");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
var keys = require("../../config/keys");
var passport = require("passport");
var jwt = require("jsonwebtoken");
var kafka = require("../../kafka/client");
const redis = require("redis");
const redisHmapMax = 4;
const app = express();
// creating redis client
var client = redis.createClient(6379);
const TOPIC = "users";

// Testing redis connection
client.on("connect", function() {
  console.log("Connected to Redis...");
});
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

//router.get("/test", (req, res) => res.json({ msg: "works" }));

router.post("/register", (req, res) => {
  console.log("Inside register of  backend");
  console.log("request is....", req.body);
  var reqMsg = {
    api: "post/register",
    reqBody: req.body
  };
  kafka.make_request(TOPIC, reqMsg, function(err, results) {
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
  console.log("request is..", req.body);
  var reqMsg = {
    api: "post/login",
    reqBody: req.body
  };
  kafka.make_request(TOPIC, reqMsg, function(err, results) {
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

/*router.post("/deactivate", (req, res) => {
  console.log("inside deactivate api of backend. ");
  var username = req.body.username;
  
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
  var username = req.body.username;
  console.log("inside get_profile api of backend. username is..", username);
  kafka.make_request("get_profile", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        //res.json(results.profile);
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});

// modifying get-profile api with redis

router.post("/get_profile_redis", (req, res) => {
  var username = req.body.username;
  console.log("inside get_profile api of backend. username is..", username);
  kafka.make_request("get_profile_redis", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        //res.json(results.profile);
        res.end(JSON.stringify(results));
      } else res.status(400).json(results);
    }
  });
});*/
module.exports = router;
