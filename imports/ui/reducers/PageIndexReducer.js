import * as types from '../actions/ActionTypes';

const PageIndexReducer = (index = 0, action) => {
  const { type, resourcePath, response } = action;
  switch (type) {
    case types.ADD_RESOURCE_SUCCESS:
      if (resourcePath === 'entries') {
        return response._id;
      }
      return index;
    case types.DELETE_RESOURCE_SUCCESS:
      if (resourcePath === 'entries') {
        return 0;
      }
      return index;
    case types.INDEX_PAGE:
      return action.index;
    default:
      return index;
  }
};

export default PageIndexReducer;