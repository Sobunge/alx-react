// task_1/dashboard/src/reducers/uiReducer.test.js

import { Map } from 'immutable';
import uiReducer from './uiReducer';
import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER, 
  LOGIN, 
  LOGOUT 
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {},
  });

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when SELECT_COURSE action is passed', () => {
    expect(uiReducer(initialState, { type: 'SELECT_COURSE' }).toJS()).toEqual(initialState.toJS());
  });

  it('should change isNotificationDrawerVisible to true when DISPLAY_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()).toEqual({
      ...initialState.toJS(),
      isNotificationDrawerVisible: true,
    });
  });

  it('should change isNotificationDrawerVisible to false when HIDE_NOTIFICATION_DRAWER is passed', () => {
    expect(uiReducer(initialState, { type: HIDE_NOTIFICATION_DRAWER }).toJS()).toEqual({
      ...initialState.toJS(),
      isNotificationDrawerVisible: false,
    });
  });

  it('should set isUserLoggedIn to true when LOGIN is passed', () => {
    expect(uiReducer(initialState, { type: LOGIN }).toJS()).toEqual({
      ...initialState.toJS(),
      isUserLoggedIn: true,
    });
  });

  it('should set isUserLoggedIn to false when LOGOUT is passed', () => {
    expect(uiReducer(initialState, { type: LOGOUT }).toJS()).toEqual({
      ...initialState.toJS(),
      isUserLoggedIn: false,
    });
  });
});
