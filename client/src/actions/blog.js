import { v4 as uuid } from "uuid";
import { BLOGS_LOADED, BLOG_SELECTED, BLOG_POSTED } from "./types";
import axios from "axios";
import {setAlert} from "./alert";
import {loadUser} from "./auth";
import HTTPService from "../services/HTTPService";
import { makeNotification, removeNotification } from "./notification";

export const loadBlogs = () => async (dispatch) => {
  try {
    //   ?Srediti rutu za dobavljanje blogova.
    const data = await HTTPService({
      method: "get",
      url: "/api/v1/blogs/"
    });
    dispatch({
      type: BLOGS_LOADED,
      payload: data
    });

  } catch (err) {
    const errorMsg = "Failed to load blogs.";

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }
  }
};


export const blogSelected = (blogID) => (dispatch) => {

    console.log(`blogID iz akcije: ${blogID}`);  
    dispatch({
      type: BLOG_SELECTED,
      payload: blogID[0]
    });
};


export const postBlog = (blogName, category, content) => async (dispatch) => {

  const body = {blogName, category, content};
  try {
    const data = await HTTPService({
      method: "post",
      url: "/api/v1/blogs/",
      data: body
    });

    dispatch({
      type: BLOG_POSTED,
      payload: data
    });

    dispatch(setAlert('Blog successfully added.', "success"));
    dispatch(makeNotification(data));

    setTimeout(()=>{
      dispatch(removeNotification());
    }, 10000);
    
  } catch (error) {
    dispatch(setAlert('Please enter valid data in forms.', "error"));
  }
  
};  
