const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
app.use(express.json());
app.use(passport.initialize());
require("./config/passport.js")(passport);
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose DB config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected from Mongoose"))
  .catch(err => console.log(err));

//defining routes
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

app.get("/", function(request, response) {
  console.log("Inside Node Home");
  response.send("Node Backend is working");
});

//use routes
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
