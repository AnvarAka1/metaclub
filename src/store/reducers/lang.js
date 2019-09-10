import * as actionTypes from "../actions/actionTypes";

const initialState = {
	lang: 0
};

const langChange = (state, action) => {
	const lang = state.lang;
	const newLang = (lang + 1) % 2;
	return {
		...state,
		lang: newLang
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LANG_CHANGE:
			return langChange(state, action);
		default:
			return state;
	}
};

export default reducer;
