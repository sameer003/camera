import { LOGIN, LOGOUT, REFRESH } from "./user.types";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload
  };
};

export const refresh = () => {
  return {
    type: REFRESH
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const updateQuantity = (payload) => {
  return {
    type: UPDATE_QUANTITY,
    payload
  };
};

export const saveOrder = (payload) => {
  return {
    type: SAVE_ORDER,
    payload
  };
};

