var connection = new require("./kafka/Connection");
var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var schema = mongoose.Schema;
var app = express();
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
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
var register = require("./services/register.js");
var login = require("./services/login.js");
var deactivate = require("./services/deactivate.js");
var get_profile = require("./services/get_profile.js");
var get_followers = require("./services/get_followers.js");
var update_profile = require("./services/update_profile.js");
var check_follower = require("./services/check_follower.js");
var add_following = require("./services/add_following.js");
var unfollow = require("./services/unfollow.js");
var get_following = require("./services/get_following.js");
var create = require("./services/create.js");
var add_a_member = require("./services/add_a_member.js");
var get_list = require("./services/get_list.js");
var get_members_of_a_list = require("./services/get_members_of_a_list.js");
var get_subscribers_of_a_list = require("./services/get_subscribers_of_a_list.js");
var get_user_owned_lists = require("./services/get_user_owned_lists.js");
var get_member_lists_of_user = require("./services/get_member_lists_of_user.js");
var subscribe = require("./services/subscribe.js");
var get_subscribed_lists = require("./services/get_subscribed_lists.js");

handleTopicRequest("register", register);
handleTopicRequest("login", login);
handleTopicRequest("deactivate", deactivate);
handleTopicRequest("get_profile", get_profile);
handleTopicRequest("get_followers", get_followers);
handleTopicRequest("update_profile", update_profile);
handleTopicRequest("check_follower", check_follower);
handleTopicRequest("add_following", add_following);
handleTopicRequest("unfollow", unfollow);
handleTopicRequest("get_following", get_following);
handleTopicRequest("create", create);
handleTopicRequest("add_a_member", add_a_member);
handleTopicRequest("get_list", get_list);
handleTopicRequest("get_members_of_a_list", get_members_of_a_list);
handleTopicRequest("get_subscribers_of_a_list", get_subscribers_of_a_list);
handleTopicRequest("get_user_owned_lists", get_user_owned_lists);
handleTopicRequest("get_member_lists_of_user", get_member_lists_of_user);
handleTopicRequest("subscribe", subscribe);
handleTopicRequest("get_subscribed_lists", get_subscribed_lists);
