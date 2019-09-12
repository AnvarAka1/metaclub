import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	error: null,
	email: null,
	name: null,
	avatar: null,
	position: null,
	password: null,
	formFlush: false,
	loading: false
};

const authFormFlush = (state, action) => {
	return {
		...state,
		formFlush: false
	};
};
// fill all the parameters of the user
const authSuccess = (state, action) => {
	return {
		...state,
		token: action.token,
		name: action.name,
		email: action.email,
		avatar: action.avatar,
		position: action.position,
		password: action.password,
		error: null,
		formFlush: true,
		loading: false
	};
};

// error
const authFail = (state, action) => {
	return {
		...state,
		error: action.error,
		loading: false
	};
};

//clear error in global user state
const authStart = (state, action) => {
	return {
		...state,
		error: null,
		loading: true
	};
};

// clear everything
const authLogout = (state, action) => {
	console.log("REDUCER LOGOUT");
	return {
		...state,
		token: null,
		error: null,
		email: null,
		name: null,
		avatar: null,
		position: null,
		password: null
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAIL:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		case actionTypes.AUTH_FORM_FLUSH:
			return authFormFlush(state, action);
		default:
			return state;
	}
};
export default reducer;
