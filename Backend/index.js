const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

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
const tweets = require("./routes/api/tweets");

app.get("/", function(request, response) {
  console.log("Inside Node Home");
  response.send("Node Backend is working");
});

//use routes
app.use("/api/tweets", tweets);

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;
