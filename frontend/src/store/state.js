import { combineReducers } from "redux";
import { tweetReducer } from "../components/_reducers/tweet.reducer";
import { errorReducer } from "../components/_reducers/error.reducer";
import authReducer from "../components/_reducers/auth.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  tweetState: tweetReducer,
  errorState: errorReducer
});
