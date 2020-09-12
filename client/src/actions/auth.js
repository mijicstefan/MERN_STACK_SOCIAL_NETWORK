import axios from "axios";
import Cookies from "js-cookie";
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
import HTTPService from "../services/HTTPService";

//Load User
export const loadUser = () => async (dispatch) => {
  try {
    const data = await HTTPService({
      method: "get",
      url: "/api/v1/auth/me",
    });
    dispatch({
      type: USER_LOADED,
      payload: data
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

  // const body = JSON.stringify({ email, password });
  const body = { email, password };
  
  try {
    // const res = await axios.post("/api/v1/auth/login", body, config);
    // console.log(`Response je: ${res}`);
    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: res.data
    // });

    const data = await HTTPService({
      method: "post",
      url: "/api/v1/auth/login",
      data: body
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });



  } catch (err) {
    console.log(err);
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
