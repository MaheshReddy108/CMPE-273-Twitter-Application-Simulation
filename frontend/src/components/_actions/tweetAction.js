import axios from "axios";
import { ADD_TWEET, GET_ERRORS, GET_TWEETS } from "./types";
import { rooturl } from "../_config/settings.js";

// Add Tweet
export const addTweet = tweetData => dispatch => {};

// Get Tweets
export const getTweets = () => dispatch => {
  axios
    .get(`http://${rooturl}:4500/api/tweets/get_tweets`)
    .then(response => {
      dispatch({
        type: GET_TWEETS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};
