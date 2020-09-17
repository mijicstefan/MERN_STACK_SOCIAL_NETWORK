import {
  COMMENTS_LOADED,
  COMMENT_FAILED,
  COMMENT_ADDED,
} from "../actions/types";

const initialState = {
  loading: true,
  allComments: [],
  addedComent: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log('Payload iz komentara: ', payload);
  switch (type) {
    case COMMENTS_LOADED:
      return {
        ...state,
        loading: false,
        allComments: payload.data,
      };

    case COMMENT_ADDED:
    return {
        ...state,
        loading: false,
        addedComent: payload.data,
    };  
    default:
      return state;
  }
}
