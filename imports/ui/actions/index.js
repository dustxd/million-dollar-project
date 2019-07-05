import { Meteor } from 'meteor/meteor';

import * as types from './ActionTypes';

function updateLoadingState(type) {
  return {
    type,
  };
}

function loginUserSuccess(response) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user: response.data,
  };
}

function loginUserFailure(error) {
  return {
    type: types.LOGIN_USER_FAILURE, error,
  };
}

export function loginUser(user) {
  return (dispatch) => {
    dispatch(updateLoadingState(types.LOGIN_USER_REQUEST));
    // TODO: Remove dummy data when API is set up
    const response = {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@test.com',
      },
    };
    dispatch(loginUserSuccess(response));
    // fetch('http://localhost:9000/users', {
    //   method: 'POST',
    //   body: JSON.stringify({ user }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(res => res.json()) // Returns a promise
    //   .then(
    //     response => dispatch(loginUserSuccess(response)),
    //     error => dispatch(loginUserFailure(error)),
    //   );
  };
}

export function logout() {
  return {
    type: types.LOGOUT_USER,
  };
}

function addResourceSuccess(resource, resourceId, resourcePath) {
  const response = {
    _id: resourceId,
    ...resource,
  };
  return {
    type: types.ADD_RESOURCE_SUCCESS,
    response,
    resourcePath,
  };
}

function addResourceFailure(error) {
  return {
    type: types.ADD_RESOURCE_FAILURE, error,
  };
}

export function addResource(resource, resourcePath) {
  return (dispatch) => {
    dispatch(updateLoadingState(types.ADD_RESOURCE_REQUEST));
    Meteor.call('entries.insert', resource, (error, result) => {
      if (error) {
        dispatch(addResourceFailure(error));
      } else {
        dispatch(addResourceSuccess(resource, result, resourcePath));
      }
    });
  };
}