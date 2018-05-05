import auth from './auth';
import common from './common';
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  common
});
