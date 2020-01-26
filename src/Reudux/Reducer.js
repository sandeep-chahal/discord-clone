import * as actionTypes from "./actionTypes";
import { combineReducers } from "redux";

const INITIAL_USER_STATE = {
  user: null,
  isLoading: true
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
    case actionTypes.SET_USER_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    default:
      return state;
  }
};

const INITIAL_SERVER_STATE = {
  currentSelected: null,
  joinedServers: null,
  totalServers: null,
  loadingTotalServers: true
};

const serverReducer = (state = INITIAL_SERVER_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_JOINED_SERVER: {
      return {
        ...state,
        joinedServers: action.payload
      };
    }
    case actionTypes.ADD_TOTAL_SERVER: {
      return {
        ...state,
        totalServers: action.payload
      };
    }
    case actionTypes.SET_CURRENT_SELECTED: {
      return {
        ...state,
        currentSelected: action.payload
      };
    }
    case actionTypes.SET_LOADING_TOTAL_SERVERS: {
      return {
        ...state,
        loadingTotalServers: action.payload
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  sever: serverReducer
});

export default rootReducer;
