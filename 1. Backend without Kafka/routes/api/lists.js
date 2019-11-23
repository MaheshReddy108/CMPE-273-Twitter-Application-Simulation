var express = require("express");
var router = express.Router();
var passport = require("passport");
const path = require("path");

const lists = require("../../models/Lists");

router.post("/create", passport.authenticate("jwt", { session: false }) , (req, res) => {
    const { listName, listDesc, isPrivate } = req.body;
    if (!(listName && listDesc)) {
      console.error("Required Details Missing");
      return res.status(400).json({ message: "Required Details Missing" });
    }
    try {
      const loggedInUser = req.user;
      const newList = new lists({
        ownerID: loggedInUser.userID,
        listName: listName,
        listDesc: listDesc,
        isPrivate: isPrivate
      });
      newList.save().then(list => res.status(200).json(list));
    } catch (e) {
        res.status(500).send(e.message || e);
    }
  });

  
module.exports = router;
