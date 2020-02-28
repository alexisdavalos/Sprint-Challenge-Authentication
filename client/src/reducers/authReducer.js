// Create a new reducer and import actions from appropriate action file; in this case it's index.js
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from '../actions';

const initialState = {
  isLoggedIn: false,
  token: window.localStorage.getItem('token'),
  currentUser: [],
  isFetching: false,
  error: '',
  users: ''
}

export const authReducer = (state = initialState, action) => {
	switch(action.type){
		case LOGIN_START:
			return {
				...state,
				isFetching: !state.isFetching,
				error: action.payload ? action.payload : ''
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				token: action.payload.data.token,
				currentUser: action.payload.config.data.username,
				isFetching: false,
                error: ''
			}
		case LOGIN_FAILURE:
			return {
				...state,
				isLoggedIn: false,
				isFetching: false,
				error: action.payload ? action.payload : ''
			}
		case FETCH_USERS_START:
			return{
				...state,
				isLoggedIn: true,
				isFetching: false,
				error: '',
				users: []
			}
		case FETCH_USERS_SUCCESS:
		return{
			...state,
			isLoggedIn: true,
			isFetching: false,
			error: '',
			users: action.payload
		}
		case FETCH_USERS_FAILURE:
		return{
			...state,
			isLoggedIn: true,
			isFetching: false,
			error: action.payload,
			users: []
		}
		default:
				return state;
	}
}
	