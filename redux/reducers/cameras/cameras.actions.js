import { CAMERA_LIST_INIT } from "./cameras.types";

export const initializeCameras = (payload) => {
  return {
    type: CAMERA_LIST_INIT,
    payload
  };
};
