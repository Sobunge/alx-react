import { schema } from 'normalizr';

// Define the user entity
const user = new schema.Entity('users');

// Define the message entity with `guid` as the id attribute
const message = new schema.Entity('messages', {}, {
  idAttribute: 'guid'
});

// Define the notification entity with relationships to user and message
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

export { user, message, notification };
