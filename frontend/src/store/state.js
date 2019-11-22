import { combineReducers } from "redux";
import { tweetReducer } from "../components/_reducers/tweet.reducer";
import { errorReducer } from "../components/_reducers/error.reducer";

export const rootReducer = combineReducers({
  tweetState: tweetReducer,
  errorState: errorReducer
});
