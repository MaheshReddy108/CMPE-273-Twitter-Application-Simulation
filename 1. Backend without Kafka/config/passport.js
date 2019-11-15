var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var mongoose = require("mongoose");
const User = require("../models/User");
var keys = require("../config/keys");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      //console.log(jwt_payload.id);
      User.findById(jwt_payload.username)
        .then(user => {
          if (user) {
            return done(null, user);
            console.log(" profile found..........");
          } else {
            return done(null, false);
          }

          console.log("!!!!!!!!!! not found!!!!!!!!!");
        })
        .catch(err => {
          console.log("it is an error");
          console.log(err);
        });
    })
  );
};
