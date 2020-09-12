import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import crudUser from "./crudUser";
import teachers from "./teachers";

export default combineReducers({
  alert,
  auth,
  profile,
  crudUser,
  teachers,
});
