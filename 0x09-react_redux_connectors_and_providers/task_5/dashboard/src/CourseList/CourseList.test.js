import React from "react";
import CourseList from "./CourseList";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listCourses = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

describe("CourseList component tests", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<CourseList />);

    expect(wrapper.exists()).toBe(true);
  });

  it("renders 5 different rows", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("CourseListRow").length).toBe(5);
    expect(wrapper.find("CourseListRow").at(0).props().textFirstCell).toEqual("Available courses");
    expect(wrapper.find("CourseListRow").at(1).props().textFirstCell).toEqual("Course name");
    expect(wrapper.find("CourseListRow").at(1).props().textSecondCell).toEqual("Credit");
    expect(wrapper.find("CourseListRow").at(2).props().textFirstCell).toEqual("ES6");
    expect(wrapper.find("CourseListRow").at(2).props().textSecondCell).toEqual(60);
    expect(wrapper.find("CourseListRow").at(3).props().textFirstCell).toEqual("Webpack");
    expect(wrapper.find("CourseListRow").at(3).props().textSecondCell).toEqual(20);
    expect(wrapper.find("CourseListRow").at(4).props().textFirstCell).toEqual("React");
    expect(wrapper.find("CourseListRow").at(4).props().textSecondCell).toEqual(40);
  });

  it("renders correctly when passed a list of courses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} />);

    expect(wrapper.find("CourseListRow").length).toBe(5);
    expect(wrapper.find("CourseListRow").at(2).props().textFirstCell).toEqual("ES6");
    expect(wrapper.find("CourseListRow").at(2).props().textSecondCell).toEqual(60);
    expect(wrapper.find("CourseListRow").at(3).props().textFirstCell).toEqual("Webpack");
    expect(wrapper.find("CourseListRow").at(3).props().textSecondCell).toEqual(20);
    expect(wrapper.find("CourseListRow").at(4).props().textFirstCell).toEqual("React");
    expect(wrapper.find("CourseListRow").at(4).props().textSecondCell).toEqual(40);
  });
});
