import * as types from '../actions/ActionTypes';

const LoadingReducer = (loading = 0, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
    case types.ADD_RESOURCE_REQUEST:
    case types.UPDATE_RESOURCE_REQUEST:
    case types.DELETE_RESOURCE_REQUEST:
      return loading + 1;
    case types.LOGIN_USER_SUCCESS:
    case types.LOGIN_USER_FAILURE:
    case types.ADD_RESOURCE_SUCCESS:
    case types.ADD_RESOURCE_FAILURE:
    case types.UPDATE_RESOURCE_SUCCESS:
    case types.UPDATE_RESOURCE_FAILURE:
    case types.DELETE_RESOURCE_SUCCESS:
    case types.DELETE_RESOURCE_FAILURE:
      return loading - 1;
    case types.LOGOUT_USER:
      return 0;
    default:
      return loading;
  }
};

export default LoadingReducer;
