import { GET_ERRORS } from "../_actions/types";

const initialState = {};

export const errorReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
