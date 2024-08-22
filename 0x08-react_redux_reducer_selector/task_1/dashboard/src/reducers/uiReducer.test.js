// task_0/dashboard/src/reducers/uiReducer.test.js

import uiReducer from './uiReducer';
import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER, 
  LOGIN, 
  LOGOUT 
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  };

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when SELECT_COURSE action is passed', () => {
    expect(uiReducer(initialState, { type: 'SELECT_COURSE' })).toEqual(initialState);
  });

  it('should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual({
      ...initialState,
      isNotificationDrawerVisible: true,
    });
  });

  it('should change isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer(initialState, { type: HIDE_NOTIFICATION_DRAWER })).toEqual({
      ...initialState,
      isNotificationDrawerVisible: false,
    });
  });

  it('should set isUserLoggedIn to true when LOGIN is passed', () => {
    expect(uiReducer(initialState, { type: LOGIN })).toEqual({
      ...initialState,
      isUserLoggedIn: true,
    });
  });

  it('should set isUserLoggedIn to false when LOGOUT is passed', () => {
    expect(uiReducer(initialState, { type: LOGOUT })).toEqual({
      ...initialState,
      isUserLoggedIn: false,
    });
  });
});
