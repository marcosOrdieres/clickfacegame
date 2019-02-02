import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import splashReducer from '../reducers/splashReducer';

const appReducer = combineReducers({
  isUserLoggedIn: splashReducer.isUserLoggedIn
});

const rootStore = createStore(appReducer, applyMiddleware(thunk), reduxReset());

export default rootStore;
