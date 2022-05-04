import { ActionTypes } from "../constants/action-types";

export const userLogin = (data) => {
	return {
		type: ActionTypes.USR_LOGIN,
		payload: data,
	};
};
export const userLogout = (data) => {
	return {
		type: ActionTypes.USR_LOGOUT,
		payload: data,
	};
};