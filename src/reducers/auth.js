import {
  LOGIN,
  LOGOUT,
  UPDATE_FIELD_AUTH,
  ASYNC_START,
  REGISTER
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.playload.errors : null
      };
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return {
          ...state,
          inProgress: true
        };
      }
      break;
    default:
      return state;
  }

  return state;
};
