import { combineReducers } from 'redux';
import {authReducer} from './authReducer'
// You'll also need to import any other necessary custom reducers.

const rootReducer = combineReducers({
    auth: authReducer,
	// Include any other reducers required by your application.
});

export default rootReducer;