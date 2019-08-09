import * as types from '../actions/ActionTypes';

const BookmarkReducer = (index = 0, action) => {
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
    case types.LOGOUT_USER:
      return 0;
    case types.INDEX_PAGE:
      return {
        page: action.index.page,
        mode: action.index.mode,
      };
    default:
      return index;
  }
};

export default BookmarkReducer;
