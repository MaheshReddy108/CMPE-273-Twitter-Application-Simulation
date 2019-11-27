import {
  ADD_TWEET,
  GET_TWEETS,
  GET_TWEET,
  DELETE_TWEET,
  TWEET_LOADING
} from "../_actions/types";

const initialState = {
  tweets: [],
  tweet: {},
  loading: false
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
    case DELETE_TWEET:
      return {
        ...state,
        tweets: state.tweets.filter(tweet => tweet._id !== action.payload)
      };
    default:
      return { ...state };
  }
};
