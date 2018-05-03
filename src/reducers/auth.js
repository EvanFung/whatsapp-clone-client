import { LOGIN, LOGOUT, UPDATE_FIELD_AUTH } from '../constants/actionTypes';

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
    default:
      return state;
  }

  return state;
};
