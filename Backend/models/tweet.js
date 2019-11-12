const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const TweetSchema = new Schema({
  tweet_content: {
    String
  },
  tweet_owner: {
    username: String
  },
  tweet_parent: {
    parent_id: String,
    parent_owner: String,
    parent_content: String
  },
  replies: [
    {
      reply_owner: String,
      reply_msg: String
    }
  ],
  Likes: [
    {
      username: String
    }
  ]
});

module.exports = Tweet = mongoose.model("tweets", TweetSchema);
