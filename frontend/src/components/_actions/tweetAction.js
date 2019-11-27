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
  axios
    .get(`http://${rooturl}:4500/api/tweets/get_tweet/${id}`)
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
  axios
    .delete(`/api/posts/${id}`)
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
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
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
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
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

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
