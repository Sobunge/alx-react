import { schema } from 'normalizr';

// Define user schema
export const user = new schema.Entity('users');

// Define message schema with custom idAttribute
export const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid'
});

// Define notification schema
export const notification = new schema.Entity('notifications', {
  author: user,
  context: message
});

// Function to get notifications by user
export const getAllNotificationsByUser = (data, userId) => {
  const notifications = data.entities.notifications || {};
  return Object.values(notifications).filter(notification => 
    notification.author === userId
  );
};
