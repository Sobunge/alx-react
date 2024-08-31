// task_5/dashboard/src/reducers/notificationReducer.test.js

import notificationReducer from './notificationReducer';
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  NotificationTypeFilters
} from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = {
    filter: NotificationTypeFilters.DEFAULT,
    notifications: []
  };

  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' }
      ]
    };
    const expectedState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    };
    const action = { type: MARK_AS_READ, index: 2 };
    const expectedState = {
      filter: NotificationTypeFilters.DEFAULT,
      notifications: [
        { id: 1, isRead: false, type: 'default', value: 'New course available' },
        { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      ]
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const action = { type: SET_TYPE_FILTER, filter: NotificationTypeFilters.URGENT };
    const expectedState = {
      filter: NotificationTypeFilters.URGENT,
      notifications: []
    };
    expect(notificationReducer(initialState, action)).toEqual(expectedState);
  });
});
