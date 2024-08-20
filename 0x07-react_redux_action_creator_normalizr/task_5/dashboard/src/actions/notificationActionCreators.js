// task_5/dashboard/src/actions/notificationActionCreators.js

import {
    MARK_AS_READ,
    SET_TYPE_FILTER,
    NotificationTypeFilters
  } from './notificationActionTypes';
  
  export const markAsAread = (index) => ({
    type: MARK_AS_READ,
    index
  });
  
  export const setNotificationFilter = (filter) => ({
    type: SET_TYPE_FILTER,
    filter
  });
  