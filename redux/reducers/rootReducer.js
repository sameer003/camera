import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import camerasReducer from "./cameras/cameras.reducer";

const rootReducer = combineReducers({
  user:userReducer,
  cameras:camerasReducer
});

export default rootReducer;
