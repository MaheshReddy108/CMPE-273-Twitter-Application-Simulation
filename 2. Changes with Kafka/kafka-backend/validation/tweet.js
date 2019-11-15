const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.tweet_content = !isEmpty(data.tweet_content) ? data.tweet_content : "";

  if (!Validator.isLength(data.tweet_content, { min: 1, max: 280 })) {
    errors.text = "Tweet must be between 1 and 280 characters";
  }

  if (Validator.isEmpty(data.tweet_content)) {
    errors.text = "Type in something before tweeting";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
