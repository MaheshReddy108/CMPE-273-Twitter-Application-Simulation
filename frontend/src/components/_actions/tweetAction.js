import axios from "axios";
import {
  ADD_TWEET,
  GET_ERRORS,
  GET_TWEETS,
  GET_TWEET,
  DELETE_TWEET,
  TWEET_LOADING,
  CLEAR_ERRORS
} from "./types";
import { rooturl } from "../_config/settings";

// Set loading state
export const setTweetLoading = () => {
  return {
    type: TWEET_LOADING
  };
};

// Get Tweets
export const getTweets = () => dispatch => {
  dispatch(setTweetLoading());
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

// Add Tweet
export const addTweet = newTweet => dispatch => {
  dispatch(clearErrors());
  console.log("Inside create tweet axios call");
  axios
    .post(`http://${rooturl}:4500/api/tweets/create_tweet`, newTweet)
    .then(response => {
      dispatch({
        type: ADD_TWEET,
        payload: response.data
      });
      dispatch(getTweets());
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// Get Tweet
export const getTweet = id => dispatch => {
  console.log("inside gettweet action");
  dispatch(setTweetLoading());
  const data = {
    tweet_id: id
  };
  axios
    .post(`http://${rooturl}:4500/api/tweets/get_tweet`, data)
    .then(res =>
      dispatch({
        type: GET_TWEET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TWEET,
        payload: null
      })
    );
};

// Delete Post
export const deleteTweet = id => dispatch => {
  console.log("inside delete tweet action");
  axios
    .delete(`http://${rooturl}:4500/api/tweets/delete_tweet/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_TWEET,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Like
export const addLike = id => dispatch => {
  axios
    .post(`http://${rooturl}:4500/api/tweets/like/${id}`)
    .then(res => dispatch(getTweets()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Remove Like
export const removeLike = id => dispatch => {
  axios
    .post(`http://${rooturl}:4500/api/tweets/unlike/${id}`)
    .then(res => dispatch(getTweets()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Comment
export const addReply = (tweetId, ReplyData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`http://${rooturl}:4500/api/tweets/reply/${tweetId}`, ReplyData)
    .then(res =>
      dispatch({
        type: GET_TWEET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteReply = (tweetId, replyId) => dispatch => {
  axios
    .delete(`http://${rooturl}:4500/api/tweets/replies/${tweetId}/${replyId}`)
    .then(res =>
      dispatch({
        type: GET_TWEET,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Retweet
export const Retweet = newTweet => dispatch => {
  axios
    .post(`http://${rooturl}:4500/api/tweets/retweet`, newTweet)
    .then(res => {
      dispatch({
        type: GET_TWEET,
        payload: res.data
      });
      dispatch(getTweets());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
