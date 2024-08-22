import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = fromJS({
    filter: NotificationTypeFilters.DEFAULT,
    notifications: {},
    notificationIds: []
  });

  it('should return the initial state', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState.toJS());
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available', author: 1, context: { guid: 'abc' } },
        { id: 2, type: 'urgent', value: 'New resume available', author: 2, context: { guid: 'def' } },
        { id: 3, type: 'urgent', value: 'New data available', author: 1, context: { guid: 'ghi' } }
      ]
    };
    const expectedState = fromJS({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {
        1: { id: 1, type: 'default', value: 'New course available', author: 1, context: { guid: 'abc' }, isRead: false },
        2: { id: 2, type: 'urgent', value: 'New resume available', author: 2, context: { guid: 'def' }, isRead: false },
        3: { id: 3, type: 'urgent', value: 'New data available', author: 1, context: { guid: 'ghi' }, isRead: false }
      },
      notificationIds: [1, 2, 3]
    });
    expect(notificationReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = fromJS({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {
        1: { id: 1, type: 'default', value: 'New course available', isRead: false },
        2: { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      },
      notificationIds: [1, 2, 3]
    });
    const action = { type: MARK_AS_READ, index: 2 };
    const expectedState = fromJS({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {
        1: { id: 1, type: 'default', value: 'New course available', isRead: false },
        2: { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
        3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
      },
      notificationIds: [1, 2, 3]
    });
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_TYPE_FILTER', () => {
    const initialState = fromJS({
      filter: NotificationTypeFilters.DEFAULT,
      notifications: {},
      notificationIds: []
    });
    const action = { type: SET_TYPE_FILTER, filter: NotificationTypeFilters.URGENT };
    const expectedState = fromJS({
      filter: NotificationTypeFilters.URGENT,
      notifications: {},
      notificationIds: []
    });
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
