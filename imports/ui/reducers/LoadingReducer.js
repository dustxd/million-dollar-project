import * as types from '../actions/ActionTypes';

const LoadingReducer = (loading = 0, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      return loading + 1;
    case types.LOGIN_USER_SUCCESS:
    case types.LOGIN_USER_FAILURE:
      return loading - 1;
    case types.LOGOUT_USER:
      return 0;
    default:
      return loading;
  }
};

export default LoadingReducer;
