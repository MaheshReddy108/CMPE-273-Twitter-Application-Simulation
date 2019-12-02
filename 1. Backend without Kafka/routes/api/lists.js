var express = require("express");
var router = express.Router();
//const uuidv4 = require("uuid/v4");
var passport = require("passport");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");

const lists = require("../../models/Lists");
//passport.authenticate("jwt", { session: false }) ,

router.post("/create", (req, res) => {
  //const { l_Name, l_Desc, is_Private, ownerID } = req.body;
  const { l_Name, l_Desc, ownerID } = req.body;
  if (!(l_Name && l_Desc)) {
    console.error("Required Details Missing");
    return res.status(400).json({ message: "Required Details Missing" });
  }
  try {
    const loggedInUser = req.user;
    const newList = new lists({
      ownerID: ownerID,
      list_Name: l_Name,
      list_Desc: l_Desc
      //make_Private: is_Private
    });
    newList.save().then(list => res.status(200).json(list));
  } catch (e) {
    res.status(500).send(e.message || e);
  }
});

router.post("/add_a_member", (req, res) => {
  const { username, list_Name } = req.body;
  console.log("inside add_a_member api of backend. username is..", username);
  lists
    .findOne({ list_Name })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      const newMember = {
        // user_id: user_id,
        username: username
      };
      list.members.unshift(newMember);
      list.save().then(list => res.json(list.members));
      // console.log("After adding the members of the list are", list.members);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/get_list", (req, res) => {
  const { list_Name } = req.body;
  //  console.log("inside get_list api of backend");
  lists
    .findOne({ list_Name })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      res.json(list);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/get_members_of_a_list", (req, res) => {
  const { list_Name } = req.body;
  console.log("inside get_members_of_a_list api of backend");
  lists
    .find({ list_Name })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      res.json(list.members);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/get_subscribers_of_a_list", (req, res) => {
  const { list_Name } = req.body;
  console.log("inside get_subscribers_of_a_list api of backend");
  lists
    .find({ list_Name })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list of subscribers....", list.subscribers);
      res.json(list.subscribers);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/get_user_owned_lists", (req, res) => {
  const { ownerID } = req.body;
  console.log("inside get_user_owned_lists api of backend");
  lists
    .find({ ownerID })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      res.json(list);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

// to get the lists in which the user is a member.
router.post("/get_member_lists_of_user", (req, res) => {
  const { username } = req.body;
  console.log("inside get_member_lists_of_user api of backend");
  lists
    .find({ "members.username": username })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      res.json(list);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

router.post("/subscribe", (req, res) => {
  const { user_id, username, list_Name } = req.body;
  console.log("inside subscribe api of backend. username is..", username);
  lists
    .findOne({ list_Name, "subscribers.username": { $ne: username } })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list with this list name" });
      }
      // console.log("list is....", list);
      const newsubscriber = {
        user_id: user_id,
        username: username
      };
      list.subscribers.unshift(newsubscriber);
      list.save().then(list => res.json(list.subscribers));
      console.log(
        "After adding the subscribers of the list: ",
        list.subscribers
      );
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

//getting the lists to which the user has subscribed for
router.post("/get_subscribed_lists", (req, res) => {
  const { username } = req.body;
  console.log("inside get_subscribed_lists api of backend");
  lists
    .find({ "subscribers.username": username })
    .then(list => {
      if (!list) {
        console.log("no list");
        return res.status(404).json({ msg: "no list are subscribed" });
      }
      // console.log("list is....", list);
      res.json(list);
    })
    .catch(err => {
      console.log("err is.....", err);
      res.status(404).json(err);
    });
});

module.exports = router;
