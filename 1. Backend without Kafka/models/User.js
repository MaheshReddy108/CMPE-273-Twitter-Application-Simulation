const mongoose = require("mongoose");

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  zipcode: {
    type: Number,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  avatar: {
    type: String
  },
  followers: [
    {
      follower_id: {
        type: String,
        required: false
      },
      follower_name: {
        type: String,
        required: false
      }
    }
  ],
  follower_count: {
    type: Number,
    default: 0
  },
  following: [
    {
      following_id: {
        type: String,
        required: false
      },
      following_name: {
        type: String,
        required: false
      }
    }
  ],
  following_count: {
    type: Number,
    default: 0
  },
  active: {
    type: String,
    default: "Active"
  },
  date: {
    type: Date,
    default: Date.now
  },
  bookmarked_tweets: {
    type: Schema.Types.ObjectId,
    ref: "tweets"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
