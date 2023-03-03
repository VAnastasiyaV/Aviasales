import { combineReducers } from 'redux';
import { ticketReducer } from './ticketReducer';
import { filterReducer } from './filterReducer';

export default combineReducers({
    tickets: ticketReducer,
    filters: filterReducer
});