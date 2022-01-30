import {
  LOGIN,
  REFRESH,
  LOGOUT
} from "./user.types";
import { checkLoggedIn } from "./helper.util";

const INITIAL_STATE = {
  loggedIn: false,
  access_token: '',
  expires_time:undefined,
  refresh_token: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        expires_time: new Date((new Date).getTime() + action.payload.expires_in),
      };

    case REFRESH:
      return {
        ...state,
        loggedIn: false
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE
      };

    default:
      return state;
  }
};

export default reducer;
