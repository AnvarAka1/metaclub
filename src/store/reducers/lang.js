import * as actionTypes from "../actions/actionTypes";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
	lang: 0
};

const langInit = (state, action) => {
	const lang = cookies.get("lang");
	if (lang !== state.lang && typeof lang !== "undefined") {
		return { ...state, lang: +lang };
	} else {
		return { ...state, lang: 0 };
	}
};
const langChange = (state, action) => {
	const lang = state.lang;
	const newLang = (lang + 1) % 2;
	const date = new Date("2099");
	cookies.set("lang", newLang, { expires: date });
	return {
		...state,
		lang: newLang
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LANG_INIT:
			return langInit(state, action);
		case actionTypes.LANG_CHANGE:
			return langChange(state, action);
		default:
			return state;
	}
};

export default reducer;
