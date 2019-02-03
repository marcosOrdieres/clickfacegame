import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import splashReducer from '../reducers/splashReducer';

const appReducer = combineReducers({
  isExample: splashReducer.isExample
});

const rootStore = createStore(appReducer, applyMiddleware(thunk), reduxReset());

export default rootStore;
