var express = require("express");
var router = express.Router();
//const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const Message = require("../../models/Message");

router.post("/send_message", (req, res) => {
    const { sender_id, receiver_id, message } = req.body;
    console.log("inside send_message api of backend.");
    User.findOne({ _id: sender_id })
      .then(user => {
        if (!user) {
          console.log("no user");
          return res.status(404).json({ msg: "no sender with this id" });
        }
        else{ 
            console.log("sender user details:", user)
            User.findOne({ _id: receiver_id })
              .then(user1 => {
                  if(!user1){
                      console.log("no receiver found");
                      return res.status(404).json({ msg: "no receiver with this id" });
                  }
                  else{
                      console.log("receiver user details:", user1);
                      const newMessage = new Message({
                        sender_id: sender_id,
                        receiver_id: receiver_id,
                        message: message
                      })
                      newMessage.save().then(messages => res.status(200).json(messages));
                  }
              })
        }
      })
      .catch(err => {
        console.log("err is.....", err);
        res.status(404).json(err);
      });
  });

  /* router.post("/get_sent_messages",  (req, res) => {
    const { user_id } = req.body;
    console.log("inside get_sent_messages api of backend");
    Message.find({ sender_id: user_id })
    .then(message => {
      if (!message) {
        console.log("no message");
        return res.status(404).json({ msg: "no sent messages from this sender" });
      }
      console.log("message is....", message);
      res.json(message);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
  }); */

  /* router.post("/get_received_messages",  (req, res) => {
    const { user_id } = req.body;
    console.log("inside get_received_messages api of backend");
    Message.findOne({ receiver_id: user_id })
    .then(message => {
      if (!message) {
        console.log("no message");
        return res.status(404).json({ msg: "no received messages to this receiver" });
      }
      console.log("message is....", message);
      res.json(message);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
  }); */

  router.post("/get_messages",  (req, res) => {
    const { sender_id, receiver_id } = req.body;
    console.log("inside get_sent_messages api of backend");
    Message.find({ sender_id, receiver_id })
    .then(message => {
      if (!message) {
        console.log("no message");
        return res.status(404).json({ msg: "no sent messages from this sender" });
      }
      console.log("message is....", message);
      const all_msgs = [];
      all_msgs.push(message)
      Message.find({ sender_id: receiver_id, receiver_id: sender_id})
       .then(msg1 => {
         if(!msg1) {
           console.log("no message");
           return res.status(404).json({ msg: "no received messages for this sender"});
         }
         console.log("received messages are: ", msg1);
         all_msgs.push(msg1);
         res.json(all_msgs);
       })
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
  });

module.exports = router;