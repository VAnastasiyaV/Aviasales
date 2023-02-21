import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from "./reduser/reducer"

const loggerMiddleware = store => next => action => {
    const result = next(action);
    // eslint-disable-next-line no-console
    console.log('Middleware', store.getState());
    return result
}

const store = createStore(reducer, applyMiddleware(reduxThunk, loggerMiddleware));

export default store;

