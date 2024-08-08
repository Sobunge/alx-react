import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('NotificationItem', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NotificationItem />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    const li = wrapper.find('li');
    expect(li.prop('data-notification-type')).toBe('default');
    expect(li.text()).toBe('test');
  });

  it('renders correct html from html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem html="<u>test</u>" markAsRead={() => {}} id={1} />);
    const li = wrapper.find('li');
    expect(li.prop('data-urgent')).toBe(true);
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('should call markAsRead with the correct id when clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<NotificationItem markAsRead={spy} id={1} value="test" />);
    
    // Check if the `li` element is rendered
    const li = wrapper.find('li');
    expect(li.exists()).toBe(true);

    // Simulate click and check function call
    li.simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
