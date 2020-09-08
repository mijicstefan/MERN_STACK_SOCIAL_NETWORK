import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res =  axios.get('/api/v1/auth/me');
        console.log(`Data bout current user: ${res}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{ msg: err.response.statusText, sstatus: err.response.status }
        });
    }
}
