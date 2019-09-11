import * as actionTypes from "./actionTypes";
import axios from "../../axios-db";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};
export const authFormFlush = () => {
	return {
		type: actionTypes.AUTH_FORM_FLUSH
	};
};
export const authSuccess = (token, email, name, avatar, position, password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		email: email,
		name: name,
		avatar: avatar,
		position: position,
		password: password,
		formFlush: true
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};
export const logout = () => {
	localStorage.removeItem("token");
	//   localStorage.removeItem("expirationDate");
	// localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (name, email, password, avatar, position, isSignIn) => {
	console.log(name, email, password, avatar, position, isSignIn);
	email = email.trim();
	name = isSignIn ? null : name.trim();
	return dispatch => {
		// clear error
		dispatch(authStart());
		const authData = {
			email: email,
			name: name,
			password: password,
			avatar: avatar && avatar,
			position: position && position,
			returnSecureToken: true
		};
		console.log(authData);
		const urls = [ "/register", "/login" ];

		axios
			.post(
				urls[+isSignIn],
				authData,
				{
					// config
				}
			)
			.then(response => {
				console.log(response.data);
				const data = response.data.auth;
				console.log(data.access_token);
				// expiration date in milliseconds
				const expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
				// need to save TO THE CACHE instead of localStorage
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("expirationDate", expirationDate);
				// localStorage.setItem("userId", response.data.localId);

				// save user state
				dispatch(authSuccess(data.access_token, email, name, avatar, position, password));
				dispatch(checkAuthTimeout(data.expires_in));
			})
			.catch(error => {
				console.log(error);
				dispatch(authFail(error.message));
			});
	};
};
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (new Date() > expirationDate) {
				dispatch(logout());
			} else {
				const token = localStorage.getItem("token");
				// need to discuss this
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
