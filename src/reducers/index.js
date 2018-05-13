import auth from './auth';
import common from './common';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  common,
  form: formReducer
});
