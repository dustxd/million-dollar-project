import { combineReducers } from 'redux';
import user from './AuthReducer';
import loading from './LoadingReducer';
import resources from './ResourceReducer';
import bookmark from './BookmarkReducer';
import index from './PageIndexReducer'

const RootReducer = combineReducers({
  user,
  loading,
  resources,
  bookmark,
  index,
});

export default RootReducer;
