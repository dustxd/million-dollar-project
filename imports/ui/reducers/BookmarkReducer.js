import * as types from '../actions/ActionTypes';

const BookmarkReducer = (bookmark = 'testing', action) => {
  switch (action.type) {
    case types.BOOKMARK_PAGE:
      return action.entryId;
    default:
      return bookmark;
  }
};

export default BookmarkReducer;
