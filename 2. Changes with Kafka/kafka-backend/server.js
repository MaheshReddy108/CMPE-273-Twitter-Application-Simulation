var connection = new require("./kafka/Connection");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
//var logger = require("morgan");
var myJSON = require("JSON");
//var session = require("express-session");
//var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var schema = mongoose.Schema;
var app = express();
const bodyParser = require("body-parser");
var Register = require("./services/register.js");
var Login = require("./services/login.js");
var Deactivate = require("./services/deactivate.js");
var Get_Profile = require("./services/get_profile.js");
var Get_Profile_Redis = require("./services/get_profile_redis.js");
//var Get_Tweets = require("./services/get_tweets.js");
//var Get_Tweet_Id = require("./services/get_tweet/:id.js");
//var Create_Tweet = require("./services/create_tweet.js");

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { poolSize: 50 })
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));
app.use(passport.initialize());
require("./config/passport")(passport);

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
handleTopicRequest("register", Register);
handleTopicRequest("login", Login);
handleTopicRequest("deactivate", Deactivate);
handleTopicRequest("get_profile", Get_Profile);
handleTopicRequest("get_profile_redis", Get_Profile_Redis);
//handleTopicRequest("get_tweets", Get_Tweets);
//handleTopicRequest("get_tweet/:id", Get_Tweet_Id);
//handleTopicRequest("create_tweet", Create_Tweet);
