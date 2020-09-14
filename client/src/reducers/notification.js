import { NEW_NOTIFICATION, NOTIFICATION_REMOVED } from "../actions/types";

const initialState = {
  newBlogNotification: null,
  notificationList: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_NOTIFICATION:
      return {
        ...state,
        newBlogNotification: payload.data,
        notificationList: [...state.notificationList, payload.data]
      };
      case NOTIFICATION_REMOVED:
        return {
          ...state,
          newBlogNotification: null
        };  
    default:
      return state;
  }
}
