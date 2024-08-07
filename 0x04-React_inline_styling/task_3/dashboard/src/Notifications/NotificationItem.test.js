import React from 'react';
import NotificationItem from './NotificationItem';
import { shallow } from 'enzyme';

describe('rendering components', () => {
  it('renders NotificationItem component without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders correct html from html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem html="<u>test</u>" />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('onclick event behaves as it should', () => {
  it('should call markAsRead with correct id', () => {
    const spy = jest.fn();
    const wrapper = shallow(<NotificationItem value="test item" markAsRead={spy} id={1} />);
    wrapper.find('li').simulate('click');
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });
});
