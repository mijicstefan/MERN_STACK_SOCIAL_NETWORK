import { TEACHERS_LOADED, TEACHER_PROFILE_SELECTED } from '../actions/types';

const initialState = {
    teachers: {},
    loading: true,
    teacherSelectedID: ''
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type) {
        case TEACHERS_LOADED:
            return {...state, teachers: payload, loading: false};
        case TEACHER_PROFILE_SELECTED:
            return { ...state, teacherSelectedID: payload }    
        default:
            return state;    
    }
}