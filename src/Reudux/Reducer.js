import * as actionTypes from "./actionTypes";

const INITIAL_STATE_USER = {
  user: null,
  isLoading: true
};

export const userReducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        ...state,
        user: action.payload.user,
        isLoading: false
      };
    }
    case actionTypes.SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload
      };
    }
    default:
      return state;
  }
};
