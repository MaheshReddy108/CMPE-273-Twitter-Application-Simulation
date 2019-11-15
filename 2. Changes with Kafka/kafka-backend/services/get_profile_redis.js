const express = require("express");
var createError = require("http-errors");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
var keys = require("../config/keys");
var passport = require("passport");
var jwt = require("jsonwebtoken");
const redis = require("redis");
const redisHmapMax = 4;
const app = express();
// creating redis client
var client = redis.createClient(6379);

// Testing redis connection
client.on("connect", function() {
  console.log("Connected to Redis...");
});

function handle_request(msg, callback) {
  console.log("inside get_profile_redis of kafka backend");

  console.log("msg is..", msg);
  let username = msg.username;
  client.hget("get_profile", username, (err, reply) => {
    if (err) {
      console.log("err is ", err);
      data = {
        success: false,
        err: err
      };
      callback(null, data);
    } else {
      client.hlen("get_profile", (err, length) => {
        if (length >= redisHmapMax) {
          client.hkeys("get_profile", (err, keys) => {
            console.log(keys[0]);
            client.hdel("get_profile", keys[0]);
          });
        }
      });
      if (reply) {
        data = {
          success: true,
          reply: reply
        };
        callback(null, data);

        //res.status(200).send(JSON.parse(reply));
      } else {
        User.findOne({ username })
          .then(user => {
            if (!user) {
              console.log("no user");
              data = {
                success: false,
                msg: "no profile"
              };
              callback(null, data);
            } else {
              console.log("profile is....", user);
              data = {
                success: true,
                user: user
              };
              callback(null, data);
            }
          })
          .catch(err => {
            console.log("err is.....", err);
            //res.status(404).json(err);
          });
      }
    }
  });
}

exports.handle_request = handle_request;
