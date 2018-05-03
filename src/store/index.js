import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

export const store = createStore(reducer, applyMiddleware(createLogger()));
