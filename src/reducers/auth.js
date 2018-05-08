import {
  LOGIN,
  LOGOUT,
  UPDATE_FIELD_AUTH,
  ASYNC_START,
  REGISTER,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case UPDATE_FIELD_AUTH:
      return {
        ...state,
        [action.key]: action.value,
        errors: null
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return {
          ...state,
          inProgress: true
        };
      }
      break;
    case LOGIN_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }

  return state;
};
