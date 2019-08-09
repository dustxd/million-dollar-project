import * as types from '../actions/ActionTypes';

const initialState = {
  index: 0,
  mode: 'createdAt',
};

const BookmarkReducer = (state = initialState, action) => {
  const { type, resourcePath, response } = action;
  switch (type) {
    case types.ADD_RESOURCE_SUCCESS:
      if (resourcePath === 'entries') {
        return Object.assign({}, state, { index: response._id });
      }
      return state;
    case types.DELETE_RESOURCE_SUCCESS:
      if (resourcePath === 'entries') {
        return Object.assign({}, state, { index: 0 });
      }
      return state;
    case types.LOGOUT_USER:
      return initialState;
    case types.INDEX_PAGE:
      return {
        page: action.index.page,
        mode: action.index.mode,
      };
    default:
      return state;
  }
};

export default BookmarkReducer;
