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
export const authSuccess = (token, id, role, email, name, avatar, position, password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		id: id,
		token: token,
		role: role,
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
	localStorage.removeItem("expirationDate");
	// localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (name, email, password, avatar, position, isSignIn) => {
	email = email.trim();
	name = isSignIn ? null : name.trim();
	return dispatch => {
		// clear error
		dispatch(authStart());
		let formData = new FormData();
		if (avatar != null) {
			formData.append("avatar", avatar, avatar.name);
		}
		if (position != null) {
			formData.append("position", position, position);
		}
		formData.append("email", email);
		formData.append("name", name);
		formData.append("password", password);
		formData.append("returnSecureToken", true);

		const urls = [ "/register", "/login" ];

		axios
			.post(
				urls[+isSignIn],
				formData,
				{
					// config
				}
			)
			.then(response => {
				const data = response.data.auth;
				const userData = response.data.user;
				// expiration date in milliseconds
				const expirationDate = new Date(new Date().getTime() + data.expires_in * 1000);
				// need to save TO THE CACHE instead of localStorage
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("id", userData.id);
				// localStorage.setItem("email", userData.email);
				// localStorage.setItem("position", userData.position);
				// localStorage.setItem("name", userData.name);
				// localStorage.setItem("userId", response.data.localId);
				// save user state
				dispatch(
					authSuccess(data.access_token, userData.id, userData.role, email, name, avatar, position, password)
				);
				dispatch(checkAuthTimeout(data.expires_in));
			})
			.catch(error => {
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
		const id = localStorage.getItem("id");
		const role = localStorage.getItem("role");
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if (new Date() > expirationDate) {
				dispatch(logout());
			} else {
				const token = localStorage.getItem("token");
				// need to discuss this
				dispatch(authSuccess(token, id, role));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};
