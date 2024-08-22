// task_3/dashboard/src/actions/courseActions.js

import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE
  } from './courseActionTypes';
  
  export const fetchCourseSuccess = (courses) => ({
    type: FETCH_COURSE_SUCCESS,
    data: courses,
  });
  
  export const selectCourse = (index) => ({
    type: SELECT_COURSE,
    index,
  });
  
  export const unselectCourse = (index) => ({
    type: UNSELECT_COURSE,
    index,
  });
  