import { combineReducers } from 'redux';
import userReducer from './user';
import vacationReducer from './vacation';
import followReducer from './follow';
import followGraphReducer from './followGraph';

export default combineReducers({
    userReducer,
    vacationReducer,
    followReducer,
    followGraphReducer
  })