import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";
import Cookies from "js-cookie";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  console.log(action);
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      console.log(`USER LOADED JE DISPATCHOVAO PAYLOAD:`, payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
      };
    case REGISTER_SUCCESS:
      console.log("Payload u register successu ", payload);
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.data,
      };

    case LOGIN_SUCCESS:
      console.log("Payload u login successu ", payload);
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
