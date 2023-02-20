import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from "./reduser/reducer.js"

const loggerMiddleware = store => next => action => {
   const result = next(action);
   console.log('Middleware', store.getState());
   return result
}

const store = createStore(reducer, applyMiddleware(reduxThunk, loggerMiddleware));

export default store;

