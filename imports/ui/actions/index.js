import { Meteor } from 'meteor/meteor';

import * as types from './ActionTypes';

function updateLoadingState(type) {
  return {
    type,
  };
}

function loginUserSuccess(currentUser) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    user: currentUser,
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
    Meteor.loginWithPassword(user.email, user.password, (error) => {
      if (error) {
        dispatch(loginUserFailure(error));
      } else {
        dispatch(loginUserSuccess(Meteor.user()));
      }
    });
  };
}

export function logoutUser() {
  Meteor.logout((error) => {
    if (error) {
      console.log(error);
    }
  });

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
    Meteor.call(`${resourcePath}.insert`, resource, (error, result) => {
      if (error) {
        dispatch(addResourceFailure(error));
      } else {
        dispatch(addResourceSuccess(resource, result, resourcePath));
      }
    });
  };
}

function deleteResourceSuccess(response, resourcePath) {
  return {
    type: types.DELETE_RESOURCE_SUCCESS, response, resourcePath,
  };
}

function deleteResourceFailure(error) {
  return {
    type: types.DELETE_RESOURCE_FAILURE, error,
  };
}

export function deleteResource(resourceId, resourcePath) {
  return (dispatch) => {
    dispatch(updateLoadingState(types.DELETE_RESOURCE_REQUEST));
    Meteor.call(`${resourcePath}.remove`, resourceId, (error, result) => {
      if (error) {
        dispatch(deleteResourceFailure(error));
      } else {
        dispatch(deleteResourceSuccess(result, resourcePath));
      }
    });
  };
}

export function signUp() {

}
