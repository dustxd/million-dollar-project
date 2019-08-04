import { combineReducers } from 'redux';
import user from './AuthReducer';
import loading from './LoadingReducer';
import resources from './ResourceReducer';
import index from './PageIndexReducer';

const RootReducer = combineReducers({
  user,
  loading,
  resources,
  index,
});

export default RootReducer;
