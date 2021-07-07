// If application requires Asyncronous actions
import axios from 'axios';
export const ACTION_NAME = "ACTION_NAME";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE ="LOGIN_FAILURE"

export const FETCH_USERS_START = "FETCH_USERS_START";
export const FETCH_USERS_SUCCESS ="FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE ="FETCH_USERS_FAILURE"
// This is an async action creator.

export const login = (user) => dispatch => {
	dispatch({ type: LOGIN_START });
	axios.post('http://localhost:3300/api/auth/login', user)
		.then(res => dispatch({ type: LOGIN_SUCCESS, payload: res }))
		.catch(err => dispatch({ type: LOGIN_FAILURE, payload: err }))
};
export const getUsers = (token) => dispatch => {
	dispatch({ type: FETCH_USERS_START });
	axios.get('http://localhost:3300/api/jokes', { headers: {"authorization" :  token || window.localStorage.getItem('token')} })
		.then(res => dispatch({ type: FETCH_USERS_SUCCESS, payload: res }))
		.catch(err => dispatch({ type: FETCH_USERS_FAILURE, payload: err }))
};

// This is a sync action creator
export const actionName = payload => ({
	type: ACTION_NAME,
	payload: payload
});