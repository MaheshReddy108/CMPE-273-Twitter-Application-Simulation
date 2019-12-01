import axios from "axios";
import { ADD_TWEET, GET_ERRORS, GET_TWEETS, SEARCH_USER } from "./types";
import { rooturl } from "../_config/settings";

// Add Tweet
export const searchUser = searchUser => dispatch => {
    console.log("Inside search user axios call");
    axios
      .post(`http://${rooturl}:4500/api/users/search_people`, searchUser)
      .then(response => {
        dispatch({
          type: SEARCH_USER,
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