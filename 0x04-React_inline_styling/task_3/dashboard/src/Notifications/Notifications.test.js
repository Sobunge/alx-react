import React from 'react';
import Notifications from './Notifications';
import { shallow } from 'enzyme';

describe('Notification tests', () => {
  it('renders correct list items', () => {
    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={[
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
        ]}
      />
    );
    const items = wrapper.find('NotificationItem');
    expect(items.at(0).prop('type')).toEqual('default');
    expect(items.at(0).prop('value')).toEqual('New course available');
    expect(items.at(1).prop('type')).toEqual('urgent');
    expect(items.at(1).prop('value')).toEqual('New resume available');
  });

  it('renders correct text when listNotifications is not passed', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('renders correct text when an empty array is passed', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('renders "No new notifications for now" instead of "Here is the list of notifications" when listNotifications is empty', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} />);
    expect(wrapper.text()).not.toContain('Here is the list of notifications');
    expect(wrapper.text()).toContain('No new notification for now');
  });

  it('re-renders if listNotifications is changed', () => {
    const listNotifications = [{ id: 1, type: 'default', value: 'New course available' }];
    const newListNotifications = [{ id: 2, type: 'urgent', value: 'New resume available' }];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    
    wrapper.setProps({ listNotifications: newListNotifications });
    wrapper.update();

    const items = wrapper.find('NotificationItem');
    expect(items.at(0).prop('type')).toEqual('urgent');
    expect(items.at(0).prop('value')).toEqual('New resume available');
  });
});
