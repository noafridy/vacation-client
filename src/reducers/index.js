import { combineReducers } from 'redux';
import userReducer from './user';
import vacationReducer from './vacation';

export default combineReducers({
    userReducer,
    vacationReducer
  })