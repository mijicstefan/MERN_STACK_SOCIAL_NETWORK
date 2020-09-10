import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  //This will run only once when new user registers
  //It needs to be run everytime when the main App.js file loads.
  //So, we'll copy this if statement in App.js
  if (localStorage.token) {
    console.log(`Token je tu: ${localStorage.token}`);
    //stick token to every future request to server.
    setAuthToken(localStorage.token);
    console.log("User loaded and token is ready to use.");
  } else {
    console.log("Token is missing!");
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/v1/auth/me");
    console.log(res);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("Auth problem!");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/v1/auth/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;
    const errorMsg = "Failed to Register!";

    // if(errors) {
    //     errors.forEach(error => dispatach(setAlert(error.msg, 'danger')));
    // }

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;
    const errorMsg = "Failed to Login!";

    // if(errors) {
    //     errors.forEach(error => dispatach(setAlert(error.msg, 'danger')));
    // }

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Logout /Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
