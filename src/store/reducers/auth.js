import * as actionTypes from "../actions/actionTypes";

const initialState = {
	token: null,
	userId: null,
	loading: false,
    error: null,
    authorities : [],
    isAdmin: ""
};

const authStart = (state,action) => {
    return { ...state, loading: true, error: null, }
}

const authSuccess = (state,action) => {
    return { ...state, token: action.token, userId: action.userId, error: null, loading: false, authorities: action.authorities,isAdmin: ""}
}

const authFail = (state,action) => {
    return { ...state, token: null ,loading: false, error: action.error }
}

const authLogout = (state,action) => {
    return { ...state, token: null, userId: null}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case "NOT_ADMIN": return { ...state, isAdmin: "negative" , loading: false}
		default: return state;
	}
};

export default reducer;
