import { fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

describe('courseReducer', () => {
  const initialState = fromJS({
    courses: {},
    courseIds: []
  });

  it('should return the initial state', () => {
    expect(courseReducer(undefined, {})).toEqual(initialState.toJS());
  });

  it('should handle FETCH_COURSE_SUCCESS', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: 'Course 1' },
        { id: 2, name: 'Course 2' }
      ]
    };
    const expectedState = fromJS({
      courses: {
        1: { id: 1, name: 'Course 1' },
        2: { id: 2, name: 'Course 2' }
      },
      courseIds: [1, 2]
    });
    expect(courseReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SELECT_COURSE', () => {
    const initialState = fromJS({
      courses: {
        1: { id: 1, name: 'Course 1', isSelected: false },
        2: { id: 2, name: 'Course 2', isSelected: false }
      },
      courseIds: [1, 2]
    });
    const action = { type: SELECT_COURSE, index: 1 };
    const expectedState = fromJS({
      courses: {
        1: { id: 1, name: 'Course 1', isSelected: true },
        2: { id: 2, name: 'Course 2', isSelected: false }
      },
      courseIds: [1, 2]
    });
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle UNSELECT_COURSE', () => {
    const initialState = fromJS({
      courses: {
        1: { id: 1, name: 'Course 1', isSelected: true },
        2: { id: 2, name: 'Course 2', isSelected: false }
      },
      courseIds: [1, 2]
    });
    const action = { type: UNSELECT_COURSE, index: 1 };
    const expectedState = fromJS({
      courses: {
        1: { id: 1, name: 'Course 1', isSelected: false },
        2: { id: 2, name: 'Course 2', isSelected: false }
      },
      courseIds: [1, 2]
    });
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
