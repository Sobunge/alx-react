// task_3/dashboard/src/reducers/courseReducer.js

import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE
  } from '../actions/courseActionTypes';
  
  const initialState = [];
  
  const updateCourseSelection = (courses, index, isSelected) => {
    return courses.map(course =>
      course.id === index ? { ...course, isSelected } : course
    );
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COURSE_SUCCESS:
        return action.data.map(course => ({
          ...course,
          isSelected: false
        }));
  
      case SELECT_COURSE:
        return updateCourseSelection(state, action.index, true);
  
      case UNSELECT_COURSE:
        return updateCourseSelection(state, action.index, false);
  
      default:
        return state;
    }
  };
  
  export default courseReducer;
  