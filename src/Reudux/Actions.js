import * as actionTypes from "./actionTypes";

export const login = user => {
  return {
    type: actionTypes.LOGIN,
    payload: { user }
  };
};

export const setLoading = isLoading => {
  return {
    type: actionTypes.SET_LOADING,
    payload: isLoading
  };
};
