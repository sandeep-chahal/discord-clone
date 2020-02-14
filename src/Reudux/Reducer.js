import * as actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const INITIAL_USER_STATE = {
	user: null
};

const userReducer = (state = INITIAL_USER_STATE, action) => {
	switch (action.type) {
		case actionTypes.LOGIN: {
			return {
				...state,
				user: action.payload.user,
				isLoading: false
			};
		}
		default:
			return state;
	}
};

const INITIAL_SERVER_STATE = {
	joinedServers: null,
	totalServers: null,
	isLoading: true,
	messages: null,
	server: null,
	channel: {
		categoryID: "general",
		id: "0",
		name: "general"
	},
	dm: "totalServers",
	role: null,
	roles: null,
	dms: null,
	call: null
};

const serverReducer = (state = INITIAL_SERVER_STATE, action) => {
	switch (action.type) {
		case actionTypes.ADD_TOTAL_SERVER: {
			return {
				...state,
				totalServers: action.payload
			};
		}

		case actionTypes.SELECT_SERVER: {
			return {
				...state,
				...action.payload
			};
		}
		case actionTypes.UPDATE_SERVER: {
			const servers = { ...state.joinedServers } || {};
			servers[action.payload.id] = action.payload.server;
			return {
				...state,
				joinedServers: servers
			};
		}
		case actionTypes.SET_SERVER_LOADING: {
			return {
				...state,
				isLoading: action.payload
			};
		}
		case actionTypes.REMOVE_SERVER: {
			const servers = { ...state.joinedServers } || {};
			delete servers[action.payload];
			return {
				...state,
				joinedServers: servers
			};
		}
		case actionTypes.ADD_MESSAGES: {
			const messages = { ...state.messages };
			messages[action.payload.serverId] = action.payload.channels;
			return {
				...state,
				messages
			};
		}
		case actionTypes.ADD_DM: {
			const dms = { ...state.dms } || {};
			dms[action.payload.id] = action.payload.dms;
			return {
				...state,
				dms: dms
			};
		}
		case actionTypes.SET_CALL: {
			return {
				...state,
				call: action.payload
			};
		}
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	user: userReducer,
	server: serverReducer
});

export default rootReducer;
