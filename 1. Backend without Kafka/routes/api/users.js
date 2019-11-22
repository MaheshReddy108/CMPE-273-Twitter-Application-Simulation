const express = require("express");

const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const redis = require("redis");
const keys = require("../../config/keys");
const User = require("../../models/User");

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
  /*  let { errors, isValid } = validateSignupBuyer(msg);
  if (!isValid) {
    console.log(errors);
    callback(null, errors);
  } */
  // return res.status(400).json(errors);}
  // else {
  const { first_name } = req.body;
  const { last_name } = req.body;
  const { email } = req.body;
  const { username } = req.body;
  const { password } = req.body;
  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm"
  });
  User.findOne({ username }).then(user => {
    if (user) {
      return res.status(400).json({ username: "Username already exists" });
    }
    User.findOne({ email }).then(user1 => {
      if (user1) {
        return res.status(400).json({ email: "Email already exists" });
      }
      const newUser = new User({
        username,
        first_name,
        last_name,
        password,
        email,
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
              console.log(` The user entered is ${user}`);
              res.json(user);
            })
            .catch(err => {
              console.log("err is ", err);
            });
        });
      });
    });
  });
  // }
});

router.post("/login", (req, res) => {
  console.log("inside login of backend");

  console.log("request is..", req.body);
  const { username } = req.body;
  const { password } = req.body;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(400).json({ username: "Username doesnot exist" });
      }
      if (user.active !== "Active") {
        return res.status(400).json({ active: "User has been deactivated" });
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            console.log("match found");
            // res.json({ msg: "match found" });

            const payload = {
              id: user.id,
              username: user.username
            };
            console.log("payload is ", payload);
            // sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            return res.status(400).json({ msg: "Password incorrect" });
          }
        })
        .catch(err => console.log("err is ", err));
    })
    .catch(err => console.log("err is ", err));
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
      console.log("profile is....", user);
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




router.post("/search_people",(req,res)=>{
  console.log("req for search_people",req.body);
  
  User.find({'first_name':req.body.first_name},(err,result)=>{
      if(err){
        res.status(404).json({ error: `user not found ${err}` })
      }
      else {
        console.log(result);
        
        res.status(200).json(result);
      }
  })
})








module.exports = router;