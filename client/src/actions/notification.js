import { v4 as uuid } from "uuid";
import { NEW_NOTIFICATION, NOTIFICATION_REMOVED } from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import {loadUser} from "./auth";
import HTTPService from "../services/HTTPService";

export const makeNotification = (data) => async (dispatch) => {
    
    dispatch({
      type: NEW_NOTIFICATION,
      payload: data
    });
};


export const removeNotification = () => async (dispatch) => {
    dispatch({
      type: NOTIFICATION_REMOVED
    });
};


