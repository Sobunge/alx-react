// task_7/dashboard/src/actions/uiActionCreators.test.js

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { loginRequest, login, loginSuccess, loginFailure } from './uiActionCreators';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN and LOGIN_SUCCESS when login is successful', () => {
    fetchMock.getOnce('/login-success.json', {
      status: 200,
      body: {}
    });

    const store = mockStore({});
    const expectedActions = [
      login('test@example.com', 'password123'),
      loginSuccess()
    ];

    return store.dispatch(loginRequest('test@example.com', 'password123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates LOGIN and LOGIN_FAILURE when login fails', () => {
    fetchMock.getOnce('/login-success.json', {
      status: 500,
      body: {}
    });

    const store = mockStore({});
    const expectedActions = [
      login('test@example.com', 'password123'),
      loginFailure()
    ];

    return store.dispatch(loginRequest('test@example.com', 'password123'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
