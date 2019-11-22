import { GET_TWEETS } from "../_actions/types";

const initialState = {
  tweets: [],
  tweet: {},
  loading: false
};

export const tweetReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case GET_TWEETS:
      return {
        ...state,
        tweets: action.payload
      };
    default:
      return { ...state };
  }
};
