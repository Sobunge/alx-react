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
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const user = {
  email: "testy@gmail.com",
  password: "testy",
  isLoggedIn: true,
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("rendering components", () => {
  it("renders App component without crashing", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive(); // Use dive() to get the shallow version of App component

    expect(wrapper.exists()).toBe(true);
  });

  it("contains Notifications component", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive();

    expect(wrapper.find(Notifications)).toHaveLength(1);
  });

  it("contains Header component", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive();

    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it("contains Login component", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive();

    expect(wrapper.find(Login)).toHaveLength(1);
  });

  it("contains Footer component", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive();

    expect(wrapper.contains(<Footer />)).toBe(true);
  });

  it("checks CourseList is not rendered", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    ).dive();

    expect(wrapper.contains(<CourseList />)).toBe(false);
  });
});

describe("when isLogged in is true", () => {
  const store = mockStore({
    isUserLoggedIn: true,
    user
  });

  it("checks Login is not rendered", () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.find(Login)).toHaveLength(0);
  });

  it("checks CourseList is rendered", () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.find(CourseList)).toHaveLength(1);
  });

  it(`Tests that the logIn function updates user's state correctly`, () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    const myUser = {
      email: "testy@gmail.com",
      password: "testy",
      isLoggedIn: true,
    };

    expect(wrapper.state().user).toEqual(user);
    const instance = wrapper.instance();
    instance.logIn(myUser.email, myUser.password);
    expect(wrapper.state().user).toEqual(myUser);
    wrapper.unmount();
  });

  it(`Tests that the logOut function updates user's state correctly`, () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user, logOut }}>
        <App />
      </AppContext.Provider>
    );

    const myUser = {
      email: "testy@gmail.com",
      password: "testy",
      isLoggedIn: true,
    };

    expect(wrapper.state().user).toEqual(user);
    const instance = wrapper.instance();
    instance.logOut();
    expect(wrapper.state().user).toEqual(user);
    wrapper.unmount();
  });
});

describe("testing state of App.js", () => {
  it("displayDrawer initial value should be set to false", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it("should set displayDrawer to true after calling handleDisplayDrawer", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    wrapper.instance().handleDisplayDrawer();

    expect(wrapper.state().displayDrawer).toBe(true);
  });

  it("should set displayDrawer to false after calling handleHideDrawer", () => {
    const store = mockStore({
      isUserLoggedIn: false,
      user: {}
    });

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    wrapper.instance().handleHideDrawer();

    expect(wrapper.state().displayDrawer).toBe(false);
  });
});

describe("markNotificationAsRead works as intended", () => {
  it(`verify that markNotificationAsRead works as intended, deletes the notification with the passed id from the listNotifications array`, () => {
    const context = {
      user: {
        ...user,
      },
      logOut: jest.fn(),
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, html: { __html: jest.fn() }, type: "urgent" },
      ],
    };

    const wrapper = mount(
      <AppContext.Provider value={context}>
        <App />
      </AppContext.Provider>
    );

    const instance = wrapper.instance();

    instance.markNotificationAsRead(3);

    expect(wrapper.state().listNotifications).toEqual([
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ]);

    expect(wrapper.state().listNotifications.length).toBe(2);
    expect(wrapper.state().listNotifications.find(n => n.id === 3)).toBeUndefined();

    wrapper.unmount();
  });
});
