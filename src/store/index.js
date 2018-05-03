import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import reducer from '../reducers';

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(createLogger()))
);
