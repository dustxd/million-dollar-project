import { combineReducers } from 'redux';
import user from './AuthReducer';
import loading from './LoadingReducer';
import resources from './ResourceReducer';
import bookmark from './BookmarkReducer';

const RootReducer = combineReducers({
  user,
  loading,
  resources,
  bookmark,
});

export default RootReducer;
