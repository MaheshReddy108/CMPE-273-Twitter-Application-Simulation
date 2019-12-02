const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema

const MessageSchema = new Schema({
  sender_name: {
    type: String,
  },
  receiver_name: {
    type: String,
  },
  message: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Message = mongoose.model("messages", MessageSchema);
