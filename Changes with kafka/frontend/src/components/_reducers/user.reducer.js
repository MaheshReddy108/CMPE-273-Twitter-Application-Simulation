import { SEARCH_USER} from "../_actions/types";

const initialState = {
    peopleResult:[],
    // peopleResult: {},
  loading: false
};

export const userReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        peopleResult: action.payload
      };
    // case ADD_TWEET:
    //   return {
    //     ...state,
    //     tweet: action.payload
    //   };
    
    default:
      return { ...state };
  }
};
