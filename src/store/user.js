import axios from "axios";
import { getRedirectPath } from "../util";
const initState = {
    redirectTo: "",
    isAuth: false,
    msg: "",
    user: "",
    type: ""
};
function loginSuccess(data) {
    return {
        type: "LOGIN_SUCESS",
        payload: data
    };
}
function registerSuccess(data) {
    return {
        type: "REGISTER_SUCESS",
        payload: data
    };
}
function errorMsg(msg) {
    return { msg, type: "ERROR_MSG" };
}
export function loadData(userinfo) {
	return { type: "LOAD_DATA", payload: userinfo };
}
export function handleLogin(value) {
    return dispatch => {
        axios.post("/user/login", value).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(loginSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}
export function handleRegister(value) {
    return dispatch => {
        axios.post("/user/register", value).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(registerSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

export function user(state = initState, action) {
    switch (action.type) {
        case "LOGIN_SUCESS":
            return {
                ...state,
                msg: "",
                isAuth: true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            };
        case "REGISTER_SUCESS":
            return {
                ...state,
                msg: "",
                isAuth: true,
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            };
        case "ERROR_MSG":
			return { ...state, isAuth: false, msg: action.msg };
		case "LOAD_DATA":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
