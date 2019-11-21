const mongoose = require("mongoose");

const { Schema } = mongoose;

// Create Schema

const ListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  username: {
    type: String
  },
  list_title: {
    type: String
  },
  members: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String
      }
    }
  ],
  subscribers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      username: {
        type: String
      }
    }
  ],
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = List = mongoose.model("lists", ListSchema);
