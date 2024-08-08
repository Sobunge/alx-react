import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: "<u>New course available</u>" },
];

const newListNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "default", html: "<u>New course available</u>" },
  { id: 4, type: "default", value: "Foo" },
];

describe("Notification tests", () => {
  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders correct list items", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    expect(wrapper.find("NotificationItem")).toHaveLength(listNotifications.length);
    
    wrapper.find("NotificationItem").forEach((node, index) => {
      const notification = listNotifications[index];
      expect(node.prop('type')).toBe(notification.type);
      if (notification.html) {
        expect(node.html()).toContain(notification.html);
      } else {
        expect(node.prop('value')).toBe(notification.value);
      }
    });
  });

  it("renders correct text when there are no notifications", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.contains(<li data-notification-type="default">No new notification for now</li>)).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(true);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("does not display menuItem when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(false);
  });

  it("displays Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(true);
  });

  it("renders correctly when listNotifications is not passed", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.containsMatchingElement(<li data-notification-type="default">No new notification for now</li>)).toBe(true);
  });

  it("renders correctly when empty array is passed", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.containsMatchingElement(<li data-notification-type="default">No new notification for now</li>)).toBe(true);
  });

  it('renders "No new notifications for now" instead of "Here is the list of notifications" when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(false);
    expect(wrapper.containsMatchingElement(<li data-notification-type="default">No new notification for now</li>)).toBe(true);
  });

  it("re-renders if listNotifications is changed", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    const instance = wrapper.instance();
    
    // Call shouldComponentUpdate with new props
    const shouldUpdate = instance.shouldComponentUpdate({
      listNotifications: newListNotifications,
      displayDrawer: true
    });
    
    expect(shouldUpdate).toBe(true);
  });
});
