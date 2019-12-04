var express = require("express");
var router = express.Router();
const uuidv4 = require("uuid/v4");
var kafka = require("../../kafka/client");
const lists = require("../../models/Lists");

router.post("/create", (req, res) => {
  console.log("inside create list of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("create", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/add_a_member", (req, res) => {
  console.log("inside add_a_member list of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("add_a_member", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_list", (req, res) => {
  console.log("inside get_list list of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_list", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_members_of_a_list", (req, res) => {
  console.log("inside get_members_of_a_list of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_members_of_a_list", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_subscribers_of_a_list", (req, res) => {
  console.log("inside get_subscribers_of_a_list of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_subscribers_of_a_list", req.body, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_user_owned_lists", (req, res) => {
  console.log("inside get_user_owned_lists of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_user_owned_lists", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

// to get the lists in which the user is a member.
router.post("/get_member_lists_of_user", (req, res) => {
  console.log("inside get_member_lists_of_user of backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_member_lists_of_user", req.body, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/subscribe", (req, res) => {
  console.log("inside subscribeof backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("subscribe", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

router.post("/get_subscribed_lists", (req, res) => {
  console.log("inside get_subscribed_lists backend");

  console.log("Req Body : ", req.body);
  kafka.make_request("get_subscribed_lists", req.body, function(err, results) {
    console.log("in result");
    console.log(results);

    if (err) {
      console.log("Inside err");
      res.status(400).json(errors);
    } else {
      console.log("Inside else");
      if (results.success) {
        res.end(JSON.stringify(results.list));
      } else res.status(400).json(results.msg);
    }
  });
});

module.exports = router;
