// task_6/dashboard/src/actions/courseActionCreators.js

import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

// Action creators
export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index
});
