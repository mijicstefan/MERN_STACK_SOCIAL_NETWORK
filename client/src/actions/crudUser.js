import { v4 as uuid } from "uuid";
import { PROFILE_UPDATE_SUCCESS } from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import {loadUser} from "./auth";
import HTTPService from "../services/HTTPService";

export const updateUser = (name, email, address, biography, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, address, biography });


  try {
    const data = await HTTPService({
      method: "put",
      url: "/api/v1/users/"+id,
      data: body
    });
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data
    });

    dispatch(loadUser());
    dispatch(setAlert('Success', "success"));

  } catch (err) {
    const errorMsg = "Failed to update user";

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }
  }
};
