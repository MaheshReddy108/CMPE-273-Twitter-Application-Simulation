var express = require("express");
var myJSON = require("JSON");
const gravatar = require("gravatar");
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");
var passport = require("passport");
let mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const lists = require("../models/Lists");
const validateLogin = require("../validation/login");
const app = express();
var mongooseTypes = require("mongoose").Types;

function handle_request(msg, callback) {
  console.log("create list of kafka backend");
  const { l_Name, l_Desc, ownerID } = msg;
  if (!(l_Name && l_Desc)) {
    console.log("Required Details Missing");
    data = {
      success: false,
      msg: "Required Details Missing"
    };
    callback(null, data);
  }
  try {
    const newList = new lists({
      ownerID: ownerID,
      list_Name: l_Name,
      list_Desc: l_Desc
    });
    newList.save().then(list => {
      console.log("list is....", list);
      data = {
        success: true,
        list: list
      };
      callback(null, data);
    });
  } catch (e) {
    console.log("err is ", err);
  }
}

exports.handle_request = handle_request;
