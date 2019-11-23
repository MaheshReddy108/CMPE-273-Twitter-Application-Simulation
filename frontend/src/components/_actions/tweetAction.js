import axios from "axios";
import { ADD_TWEET, GET_ERRORS, GET_TWEETS } from "./types";
import { rooturl } from "../_config/settings";

// Add Tweet
export const addTweet = newTweet => dispatch => {
  console.log("Inside create tweet axios call");
  axios
    .post(`http://${rooturl}:4500/api/tweets/create_tweet`, newTweet)
    .then(response => {
      dispatch({
        type: ADD_TWEET,
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
