import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import crudUser from "./crudUser";
import teachers from "./teachers";
import blog from "./blog";
import notification from "./notification";

export default combineReducers({
  alert,
  auth,
  profile,
  crudUser,
  teachers,
  blog,
  notification
});
