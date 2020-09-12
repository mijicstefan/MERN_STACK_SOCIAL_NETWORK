import { v4 as uuid } from "uuid";
import { TEACHERS_LOADED, TEACHER_PROFILE_SELECTED ,RESERVATION_SUCCESS } from "./types";
import axios from "axios";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

export const loadTeachers = () => async (dispatch) => {
  try {
    console.log(localStorage.getItem('token'));
    const res = await axios.get("/api/v1/users/");
    dispatch({
      type: TEACHERS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errorMsg = "Failed to load teachers.";

    if (err) {
      dispatch(setAlert(errorMsg, "danger"));
    }
  }
};

export const teacherProfileSelected = (teacherID) => (dispatch) => {

  console.log(`TeacherID iz akcije: ${teacherID}`);  
  dispatch({
    type: TEACHER_PROFILE_SELECTED,
    payload: teacherID[0]
  });
};


// export const makeReservation = () => async (dispatch) => {

     
//     try {
//         const res = await axios.get("/api/v1/auth/me");
//         console.log(res);
//         dispatch({
//           type: USER_LOADED,
//           payload: res.data,
//         });
//       } catch (err) {
//         console.log("Auth problem!");
//         dispatch({
//           type: AUTH_ERROR,
//         });
//       }
//   };
