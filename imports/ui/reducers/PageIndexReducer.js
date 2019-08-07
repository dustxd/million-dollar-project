import * as types from '../actions/ActionTypes';

const PageIndexReducer = (index = 0, action) => {
  switch (action.type) {
    case types.ADD_RESOURCE_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const { resourcePath, response } = action;
      if (resourcePath === 'entries') {
        return response._id;
      }
      break;
    case types.INDEX_PAGE:
      return action.index;
    default:
      return index;
  }
};

export default PageIndexReducer;