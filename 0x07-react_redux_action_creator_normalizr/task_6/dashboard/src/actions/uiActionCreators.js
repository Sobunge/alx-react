// task_7/dashboard/src/actions/uiActionCreators.js

import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './uiActionTypes';

export const login = (email, password) => ({
  type: LOGIN,
  user: { email, password }
});

export const logout = () => ({
  type: LOGOUT
});

export const displayNotificationDrawer = () => ({
  type: DISPLAY_NOTIFICATION_DRAWER
});

export const hideNotificationDrawer = () => ({
  type: HIDE_NOTIFICATION_DRAWER
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});

// Async action creator
export const loginRequest = (email, password) => async (dispatch) => {
  dispatch(login(email, password));

  try {
    const response = await fetch('/login-success.json');
    if (response.ok) {
      dispatch(loginSuccess());
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    dispatch(loginFailure());
  }
};
