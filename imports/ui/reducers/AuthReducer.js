import * as types from '../actions/ActionTypes';

const AuthReducer = (user = null, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return action.user;
    case types.LOGIN_USER_FAILURE:
    case types.LOGOUT_USER:
      return null;
    default:
      return user;
  }
};

export default AuthReducer;
