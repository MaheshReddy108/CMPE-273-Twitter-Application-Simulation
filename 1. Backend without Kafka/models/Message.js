const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema

const MessageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  receiver_id: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  message: {
    type: String
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
