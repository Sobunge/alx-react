/**
 * @jest-environment jsdom
 */
import React from "react";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { shallow, mount } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

// Mock global alert function
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
  global.alert = jest.fn(); // Mock alert globally
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  jest.clearAllMocks(); // Clear all mocks after each test
});

describe("App tests", () => {
  it("renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it("should render Notifications component", () => {
    const component = mount(<App />);
    expect(component.find(Notifications).exists()).toBe(true);
  });

  it("should render Header component", () => {
    const component = mount(<App />);
    expect(component.find(Header).exists()).toBe(true);
  });

  it("should render Login Component when logged out", () => {
    const component = mount(<App isLoggedIn={false} />);
    expect(component.find(Login).exists()).toBe(true);
  });

  it("should render Footer Component", () => {
    const component = mount(<App />);
    expect(component.find(Footer).exists()).toBe(true);
  });

  it("does not render CourseList if logged out", () => {
    const component = mount(<App isLoggedIn={false} />);
    expect(component.find(CourseList).exists()).toBe(false);
  });

  it("renders CourseList if logged in", () => {
    const component = mount(<App isLoggedIn={true} />);
    expect(component.find(CourseList).exists()).toBe(true);
    expect(component.find(Login).exists()).toBe(false);
  });
});

describe("When ctrl + h is pressed", () => {
  it("calls logOut function", () => {
    const mocked = jest.fn();
    const wrapper = mount(<App logOut={mocked} />);
    const event = new KeyboardEvent("keydown", { ctrlKey: true, key: "h" });
    document.dispatchEvent(event);
    expect(mocked).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it("checks that alert function is called", () => {
    const wrapper = mount(<App />);
    const spy = jest.spyOn(global, "alert");
    const event = new KeyboardEvent("keydown", { ctrlKey: true, key: "h" });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    wrapper.unmount();
  });

  it('checks that the alert is "Logging you out"', () => {
    const wrapper = mount(<App />);
    const spy = jest.spyOn(global, "alert");
    const event = new KeyboardEvent("keydown", { ctrlKey: true, key: "h" });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith("Logging you out");
    spy.mockRestore();
    wrapper.unmount();
  });
});
