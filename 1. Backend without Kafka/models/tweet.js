const mongoose = require("mongoose");

const { Schema } = mongoose;

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
  replies_count: {
    type: Number
  },
  likes: [
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
  likes_count: {
    type: Number
  },
  tweeted_date: {
    type: Date,
    default: Date.now
  },
  entities: {
    hashtags: [],
    imageList: []
  },
  retweeted_status: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    username: {
      type: String
    },
    tweet_content: {
      type: String
    },
    entities: {
      hashtags: [],
      imageList: []
    }
  },
  retweets_count: {
    type: Number
  },
  retweeted: {
    type: Boolean
  },
  view_count: {
    type: Number
  }
});

// eslint-disable-next-line no-multi-assign
module.exports = Tweet = mongoose.model("tweets", TweetSchema);
