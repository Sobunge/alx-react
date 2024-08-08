import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // Update if props change (including listNotifications or displayDrawer)
    return nextProps.listNotifications !== this.props.listNotifications || nextProps.displayDrawer !== this.props.displayDrawer;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    return (
      <React.Fragment>
        <div className={css(styles.menuItem)}>
          <p>Your notifications</p>
        </div>
        {this.props.displayDrawer ? (
          <div className={css(styles.Notifications)}>
            <button
              style={{
                color: "#3a3a3a",
                fontWeight: "bold",
                background: "none",
                border: "none",
                fontSize: "15px",
                position: "absolute",
                right: "3px",
                top: "3px",
                cursor: "pointer",
                outline: "none",
              }}
              aria-label="Close"
              onClick={() => {
                console.log("Close button has been clicked");
              }}
            >
              <img src={closeIcon} alt="close icon" width="10px" />
            </button>
            {this.props.listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <div>
                <p>Here is the list of notifications</p>
                <ul>
                  {this.props.listNotifications.map((val) => (
                    <NotificationItem
                      type={val.type}
                      value={val.value}
                      html={val.html}
                      key={val.id}
                      markAsRead={this.markAsRead}
                      id={val.id}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  Notifications: {
    padding: "1em",
    border: "2px dashed red",
    position: "absolute",
    top: "1.8em",
    right: "0",

    "@media (max-width: 375px)": {
      display: "block",
      height: "100vh",
      width: "100vw",
      marginLeft: "auto",
      marginRight: "auto",
      border: "none",
      fontSize: "20px",
      padding: "0",
    },
  },

  menuItem: {
    textAlign: "right",
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
