import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import {
  RiRadioButtonLine,
  RiHistoryLine,
  RiSettings3Fill,
} from "react-icons/ri";
import Router from "next/router";

export default function Camera({ camera }) {
  const gotoCamera = (cameraId) => {
    Router.push(`/camera/${cameraId}`);
  };

  return (
    <div
      className="w-2/3 rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={() => gotoCamera(camera.cameraId)}
    >
      <div className="px-6 py-4">
        <div className="flex  mb-2 justify-between">
          <h4 className="font-bold text-l">{camera.name}</h4>
          <h6 className="flex items-center text-xs">
            <RiRadioButtonLine
              className={camera.online ? "text-green-500" : "text-gray-500"}
            />
            {camera.online ? "Online" : "Offine"}
          </h6>
        </div>
        <div className="flex justify-between">
          {camera.online ? (
            <BsFillCameraVideoFill className="text-4xl" />
          ) : (
            <BsFillCameraVideoOffFill className="text-gray-500 text-4xl" />
          )}
          <div className="flex justify-items-end items-center gap-2">
            <BsFillPlayCircleFill className="text-teal-600" title="Live" />
            <RiHistoryLine className="text-teal-600" title="Footage" />
            <RiSettings3Fill className="text-teal-600" title="Settings" />
            <p className="text-gray-700">Zone: {camera.zone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
