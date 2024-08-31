import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('Notification Selectors', () => {
  const initialState = fromJS({
    filter: 'DEFAULT',
    notifications: {
      1: { id: 1, type: 'default', value: 'New course available', isRead: false },
      2: { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    },
    notificationIds: [1, 2, 3]
  });

  it('filterTypeSelected should return the current filter type', () => {
    expect(filterTypeSelected(initialState)).toBe('DEFAULT');
  });

  it('getNotifications should return the list of notifications', () => {
    const notifications = getNotifications(initialState);
    expect(notifications.toJS()).toEqual({
      1: { id: 1, type: 'default', value: 'New course available', isRead: false },
      2: { id: 2, type: 'urgent', value: 'New resume available', isRead: true },
      3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    });
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(initialState);
    expect(unreadNotifications.toJS()).toEqual({
      1: { id: 1, type: 'default', value: 'New course available', isRead: false },
      3: { id: 3, type: 'urgent', value: 'New data available', isRead: false }
    });
  });
});
