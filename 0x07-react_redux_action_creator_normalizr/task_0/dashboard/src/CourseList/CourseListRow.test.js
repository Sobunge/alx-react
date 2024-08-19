import React from "react";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Course List Row component test", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render one cell with colspan = 2 when textSecondCell is null and isHeader is true", () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" textSecondCell={null} />);
    const th = wrapper.find("th");

    expect(th).toHaveLength(1); // Check that there's one <th>
    expect(th.prop("colSpan")).toEqual("2"); // Check that colspan is 2
    expect(th.text()).toBe("test"); // Check that content is "test"
  });

  it("should render two cells when textSecondCell is not null and isHeader is true", () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test1" textSecondCell="test2" />);
    const ths = wrapper.find("th");

    expect(ths).toHaveLength(2); // Check that there are two <th> elements
    expect(ths.at(0).text()).toBe("test1"); // Check content of the first <th>
    expect(ths.at(1).text()).toBe("test2"); // Check content of the second <th>
  });

  it("should render two <td> elements with checkbox when isHeader is false", () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="test1" textSecondCell="test2" />);
    const tds = wrapper.find("td");

    expect(tds).toHaveLength(2); // Check that there are two <td> elements
    expect(tds.at(0).find("input[type='checkbox']")).toHaveLength(1); // Ensure there's a checkbox in the first cell
    expect(tds.at(0).text()).toContain("test1"); // Check content of the first <td>
    expect(tds.at(1).text()).toBe("test2"); // Check content of the second <td>
  });
});
