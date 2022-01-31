import { CAMERA_LIST_INIT, CAMERA_DATA } from "./cameras.types";

const INITIAL_STATE = {
  list: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CAMERA_LIST_INIT:
      return {
        list: action.payload,
      };
    case CAMERA_DATA:
      const camera = state.list.find(
        ({ cameraId }) => cameraId == action.payload.id
      );
      return {
        list: [
          ...state.list.filter(({ cameraId }) => cameraId != action.payload.id),
          { ...camera, data: action.payload.data },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
