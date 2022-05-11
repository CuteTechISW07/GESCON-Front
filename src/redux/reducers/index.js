import { userReducer } from './userReducer';
import { combineReducers } from 'redux';

const reducers = combineReducers({
	usrData: userReducer,
});

export default reducers;