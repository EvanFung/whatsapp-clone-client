import { APP_LOAD, LOGIN, LOGOUT, REGISTER } from '../constants/actionTypes';

const defaultState = {
  appName: 'Whatsapp clone',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
  }

  return state;
};
