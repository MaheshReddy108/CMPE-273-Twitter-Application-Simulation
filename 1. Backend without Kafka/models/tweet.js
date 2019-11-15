const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  tweet_content: {
    type: String
  },
  username: {
    type: String
  },
  avatar: {
    type: String
  },
  replies: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
