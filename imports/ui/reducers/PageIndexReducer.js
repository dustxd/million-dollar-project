import * as types from '../actions/ActionTypes';

const PageIndexReducer = (index = 0, action) => {
  switch (action.type) {
    case types.INDEX_PAGE:
      return action.index;
    default:
      return index;
  }
};

export default PageIndexReducer;