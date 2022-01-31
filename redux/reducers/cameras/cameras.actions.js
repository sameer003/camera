import { CAMERA_LIST_INIT, CAMERA_DATA } from "./cameras.types";

export const initializeCameras = (payload) => {
  return {
    type: CAMERA_LIST_INIT,
    payload
  };
};

export const addCameraData = (payload) => {
  return {
    type: CAMERA_DATA,
    payload
  };
};
