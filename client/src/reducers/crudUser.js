import { PROFILE_UPDATE_SUCCESS} from '../actions/types';

const initialState = {
    updatedUser: {}
};

export default function(state = initialState, action) {

    const { type, payload } = action;

    switch(type) {
        case PROFILE_UPDATE_SUCCESS:
            return {...state, updatedUser: payload};
        default:
            return state;    
    }
}