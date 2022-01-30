import { CAMERA_LIST_INIT } from "./cameras.types";

const INITIAL_STATE = {
  list: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAMERA_LIST_INIT:
      return {
        list:action.payload
      };

    default:
      return state;
  }
};

export default reducer;
