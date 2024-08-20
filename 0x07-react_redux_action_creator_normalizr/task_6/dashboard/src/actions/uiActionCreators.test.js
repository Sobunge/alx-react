// task_4/dashboard/src/actions/uiActionCreators.test.js

import {
    login,
    logout,
    displayNotificationDrawer,
    hideNotificationDrawer
  } from './uiActionCreators';
  import {
    LOGIN,
    LOGOUT,
    DISPLAY_NOTIFICATION_DRAWER,
    HIDE_NOTIFICATION_DRAWER
  } from './uiActionTypes';
  
  describe('UI Action Creators', () => {
    it('should create an action to login', () => {
      const email = 'test@example.com';
      const password = 'password123';
      const expectedAction = {
        type: LOGIN,
        user: { email, password }
      };
      expect(login(email, password)).toEqual(expectedAction);
    });
  
    it('should create an action to logout', () => {
      const expectedAction = {
        type: LOGOUT
      };
      expect(logout()).toEqual(expectedAction);
    });
  
    it('should create an action to display the notification drawer', () => {
      const expectedAction = {
        type: DISPLAY_NOTIFICATION_DRAWER
      };
      expect(displayNotificationDrawer()).toEqual(expectedAction);
    });
  
    it('should create an action to hide the notification drawer', () => {
      const expectedAction = {
        type: HIDE_NOTIFICATION_DRAWER
      };
      expect(hideNotificationDrawer()).toEqual(expectedAction);
    });
  });
  