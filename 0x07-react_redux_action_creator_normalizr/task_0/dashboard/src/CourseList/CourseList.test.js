import React from "react";
import { shallow } from "enzyme";
import CourseList from "./CourseList";
import CourseListRow from "./CourseListRow";

describe("CourseList component tests", () => {
  it("renders 5 different rows", () => {
    const listCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
      { id: 4, name: "Node", credit: 30 },
      { id: 5, name: "Express", credit: 10 }
    ];

    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const rows = wrapper.find("tbody").children();

    expect(rows).toHaveLength(5);

    rows.forEach((row, index) => {
      expect(row.find("td").at(0).text()).toEqual(listCourses[index].name);
      expect(row.find("td").at(1).text()).toEqual(String(listCourses[index].credit));
    });
  });

  it("renders correctly when passed a list of courses", () => {
    const listCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 }
    ];

    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    const rows = wrapper.find("tbody").children();

    expect(rows).toHaveLength(3);

    rows.forEach((row, index) => {
      expect(row.find("td").at(0).text()).toEqual(listCourses[index].name);
      expect(row.find("td").at(1).text()).toEqual(String(listCourses[index].credit));
    });
  });
});
