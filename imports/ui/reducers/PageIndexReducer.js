import * as types from '../actions/ActionTypes';

const initialIndex = {
  page: '',
  mode: 'dated',
};

const PageIndexReducer = (index = initialIndex, action) => {
  switch (action.type) {
    case types.INDEX_PAGE:
      return {
        page: action.index.page,
        mode: action.index.mode,
      };
    default:
      return index;
  }
};

export default PageIndexReducer;
