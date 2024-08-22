// task_0/dashboard/src/reducers/uiReducer.js

import { 
    DISPLAY_NOTIFICATION_DRAWER, 
    HIDE_NOTIFICATION_DRAWER, 
    LOGIN, 
    LOGOUT 
  } from '../actions/uiActionTypes';
  
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  };
  
  const uiReducer = (state = initialState, action) => {
    switch (action.type) {
      case DISPLAY_NOTIFICATION_DRAWER:
        return {
          ...state,
          isNotificationDrawerVisible: true,
        };
      case HIDE_NOTIFICATION_DRAWER:
        return {
          ...state,
          isNotificationDrawerVisible: false,
        };
      case LOGIN:
        return {
          ...state,
          isUserLoggedIn: true,
        };
      case LOGOUT:
        return {
          ...state,
          isUserLoggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default uiReducer;
  