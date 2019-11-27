import axios from "axios";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../_utils/setAuthToken";
import { rooturl } from "../_config/settings";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`http://${rooturl}:4500/api/users/register`, userData)
    .then(response => {
      console.log("Status Code : ", response.status);
      console.log(response);
      history.push("/login");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const loginUser = userData => dispatch => {
  axios
    .post(`http://${rooturl}:4500/api/users/login`, userData)
    .then(res => {
      console.log("response is !!!!!!!!!!!!!!!", res.data);
      // save to localstorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // set to auth header
      setAuthToken(token);
      // decode token to get user data
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};
