import { combineReducers } from 'redux';
import user from './AuthReducer';
import loading from './LoadingReducer';
import resources from './ResourceReducer';

const RootReducer = combineReducers({
  user,
  loading,
  resources,
});

export default RootReducer;
