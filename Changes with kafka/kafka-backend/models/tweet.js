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
  firstname: {
    type: String
  },
  lastname: {
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
      firstname: {
        type: String
      },
      lastname: {
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
    type: Number,
    default: 0
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
    type: Number,
    default: 0
  },
  tweeted_date: {
    type: Date,
    default: Date.now
  },
  hashtags: {
    type: Array
  },
  imageList: {
    type: Array
  },
  retweeted_status: {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    username: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    avatar: {
      type: String
    },
    tweet_content: {
      type: String
    },
    hashtags: {
      type: Array
    },
    imageList: {
      type: Array
    }
  },
  retweets_count: {
    type: Number,
    default: 0
  },
  retweeted: {
    type: Boolean
  },
  view_count: {
    type: Number,
    default: 0
  }
});

// eslint-disable-next-line no-multi-assign
module.exports = Tweet = mongoose.model("tweets", TweetSchema);
