const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
  {
      user_id: {
        type: String
      },
      tweet_id: {
          type: String
      },
      tweet_content: {
          type: String
      }
  }
);

module.exports = bookmarks = mongoose.model("bookmarks", BookmarkSchema);
