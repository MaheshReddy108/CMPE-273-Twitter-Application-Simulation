import {
  ADD_TWEET,
  GET_TWEETS,
  GET_TWEET,
  DELETE_TWEET,
  TWEET_LOADING,
  RETWEET,
  SEARCH_TOPIC,
  GET_BOOKMARKS
} from "../_actions/types";

const initialState = {
  tweets: [],
  tweet: {},
  bms: [],
  loading: false,
  topicResult: []
};

// eslint-disable-next-line import/prefer-default-export
export const tweetReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case TWEET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TWEETS:
      return {
        ...state,
        tweets: action.payload,
        loading: false
      };
    case GET_TWEET:
      return {
        ...state,
        tweet: action.payload,
        loading: false
      };
    case ADD_TWEET:
      return {
        ...state,
        tweet: action.payload,
        loading: false
      };
    case RETWEET:
      return {
        ...state,
        tweet: action.payload,
        loading: false
      };
    case DELETE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet._id !== action.payload)
      };
    case SEARCH_TOPIC:
      return {
        ...state,
        topicResult: action.payload
      };
    case GET_BOOKMARKS:
      return {
        ...state,
        bms: action.payload,
        loading: false
      };
    default:
      return { ...state };
  }
};
