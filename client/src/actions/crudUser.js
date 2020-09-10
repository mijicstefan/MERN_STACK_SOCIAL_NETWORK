import { v4 as uuid } from "uuid";
import { PROFILE_UPDATE_SUCCESS } from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import {loadUser} from "./auth";

export const updateUser = (name, email, address, biography, id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, address, biography });


  try {
    const res = await axios.put("/api/v1/users/"+id, body, config);
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: res.data,
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
