var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");

const lists = require("../../models/Lists");

router.post("/create", (req, res) => {
  console.log("create list of backend");
  const { l_Name, l_Desc, ownerID } = req.body;
  if (!(l_Name && l_Desc)) {
    return res.status(400).json({ message: "Required Details Missing" });
  }
  try {
    const loggedInUser = req.user;
    const newList = new lists({
      ownerID: ownerID,
      list_Name: l_Name,
      list_Desc: l_Desc
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
        return res.status(404).json({ msg: "no list with this list name" });
      }

      const newMember = {
        username: username
      };
      list.members.unshift(newMember);
      list.save().then(list => res.json(list.members));
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/get_list", (req, res) => {
  const { list_Name } = req.body;
  console.log("inside get_list api of backend");
  lists
    .findOne({ list_Name })
    .then(list => {
      if (!list) {
        return res.status(404).json({ msg: "no list with this list name" });
      }

      res.json(list);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/get_members_of_a_list", (req, res) => {
  const { list_Name } = req.body;
  console.log("inside get_members_of_a_list api of backend");
  lists
    .findOne({ list_Name })
    .then(list => {
      if (!list) {
        return res.status(404).json({ msg: "no list with this list name" });
      }

      res.json(list.members);
    })
    .catch(err => {
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
        return res.status(404).json({ msg: "no list with this list name" });
      }

      res.json(list.subscribers);
    })
    .catch(err => {
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
        return res.status(404).json({ msg: "no list with this list name" });
      }

      res.json(list);
    })
    .catch(err => {
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
        return res.status(404).json({ msg: "no list with this list name" });
      }

      res.json(list);
    })
    .catch(err => {
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
        return res.status(404).json({ msg: "no list with this list name" });
      }

      const newsubscriber = {
        user_id: user_id,
        username: username
      };
      list.subscribers.unshift(newsubscriber);
      list.save().then(list => res.json(list.subscribers));
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.post("/get_subscribed_lists", (req, res) => {
  const { username } = req.body;
  console.log("inside get_subscribed_lists api of backend");
  lists
    .find({ "subscribers.username": username })
    .then(list => {
      if (!list) {
        return res.status(404).json({ msg: "no list are subscribed" });
      }

      res.json(list);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;
