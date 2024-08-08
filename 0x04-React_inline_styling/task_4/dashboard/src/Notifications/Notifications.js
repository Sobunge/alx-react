// Notifications.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static propTypes = {
    displayDrawer: PropTypes.bool,
    listNotifications: PropTypes.array
  };

  static defaultProps = {
    displayDrawer: false,
    listNotifications: []
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications !== this.props.listNotifications;
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <div>
        {displayDrawer ? (
          <div className="Notifications">
            {listNotifications.length === 0 ? (
              <ul>
                <li data-notification-type="default">No new notification for now</li>
              </ul>
            ) : (
              <ul>
                {listNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    html={notification.html}
                    value={notification.value}
                    data-notification-type={notification.type}
                  />
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="menuItem">Your notifications</div>
        )}
      </div>
    );
  }
}

export default Notifications;
