import { combineReducers } from 'redux';
import schoolsReducer from './schoolsReducer';

const rootReducer = combineReducers({
  schools: schoolsReducer,
});

export default rootReducer;
