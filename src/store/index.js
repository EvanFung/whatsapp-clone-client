import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { promiseMiddleware, localStorageMiddleware } from '../middleware';
import reducer from '../reducers';

export const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(promiseMiddleware, localStorageMiddleware)
  )
);
