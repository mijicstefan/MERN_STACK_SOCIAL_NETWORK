import { v4 as uuid } from "uuid";
import { COMMENT_ADDED, COMMENT_FAILED, COMMENTS_LOADED } from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import {loadUser} from "./auth";
import HTTPService from "../services/HTTPService";
import { makeNotification, removeNotification } from "./notification";

export const loadComments = () => async (dispatch) => {
  try {
    const data = await HTTPService({
      method: "get",
      url: "/api/v1/comments/"
    });
    dispatch({
      type: COMMENTS_LOADED,
      payload: data
    });

  } catch (err) {
    const errorMsg = "Failed to load comments.";

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }
  }
};



export const addComment = (content, blogID) => async (dispatch) => {
    try {

      const body = { content, blogID }
      const data = await HTTPService({
        method: "post",
        url: "/api/v1/comments/",
        data: body
      });
      dispatch({
        type: COMMENT_ADDED,
        payload: data
      });
      dispatch(loadComments());
  
    } catch (err) {
      const errorMsg = "Failed to add comment.";
  
      if (err) {
        dispatch(setAlert(errorMsg, "danger"));
      }
    }
  };




 
