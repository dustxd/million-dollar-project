import * as types from '../actions/ActionTypes';

const initialState = {
  index: 0,
  mode: 'dated',
};

const BookmarkReducer = (state = initialState, action) => {
  const { type, resourcePath, response } = action;
  switch (type) {
    case types.ADD_RESOURCE_SUCCESS:
      if (resourcePath === 'entries') {
        return Object.assign({}, state, { index: response._id });
      }
      return state;
    case types.LOGOUT_USER:
      return initialState;
    case types.UPDATE_BOOKMARK_INDEX:
      return Object.assign({}, state, { index: action.index });
    case types.UPDATE_BOOKMARK_MODE:
      return Object.assign({}, state, { mode: action.mode });
    default:
      return state;
  }
};

export default BookmarkReducer;
