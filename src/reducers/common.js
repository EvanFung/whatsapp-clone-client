import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REDIRECT
} from '../constants/actionTypes';

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
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user,
        redirectTo: action.error ? null : 'AppNavigator'
      };
    case LOGIN_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    case REDIRECT:
      return { ...state, redirectTo: null };
  }

  return state;
};
