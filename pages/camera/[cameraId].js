import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useLoggedIn from "../../utils/useLoggedIn";
import Loader from "../../components/common/loader/loader";
import {BiVideoOff, BiVideo} from 'react-icons/bi';
import {FiMicOff, FiMic, FiEye, FiEyeOff} from 'react-icons/fi';

export default function Camera() {
  const user = useSelector((state) => state.user);
  const [camera, setCamera] = useState({});
  const router = useRouter();
  const [loading, setLoading] = useLoggedIn();
  const cameras = useSelector((state) => state.cameras.list);

  const { cameraId } = router.query;
  useEffect(() => {
    if (cameraId && user.access_token) {
      setLoading(true);
      fetchCameraDetails(cameraId);
    }
  }, [cameraId]);

  async function fetchCameraDetails(cameraId) {
    const camera = await fetch(`../api/cameras/${cameraId} `, {
      method: "POST",
      body: JSON.stringify({ access_token: user.access_token }),
    }).then((res) => res.json());
    setLoading(false);
    setCamera(camera);
  }

  return (
    <div className="flex justify-center items-center w-full h-full">
      {loading && <Loader />}
      {!loading && <div className="flex flex-col w-2/3 rounded overflow-hidden shadow-lg cursor-pointer p-3 gap-3">
        {" "}
        <h4 className="bold ">Camera Name : {camera.name}</h4>
        <div className="flex justify-between">Brand <p className="text-gray-500 text-sm">{camera.brand}</p></div>
        <div className="flex justify-between">Type <p className="text-gray-500 text-sm">{camera.model}</p></div>
        <div className="flex justify-between">MAC <p className="text-gray-500 text-sm">{camera.ethMacAddress}</p></div>
        <div className="flex justify-between">IP Address <p className="text-gray-500 text-sm">{camera.globalHost}</p></div>
        <div className="flex justify-between">Firmware version <p className="text-gray-500 text-sm">{camera.currentVersion}({camera.status})</p></div>
        <div className="flex justify-between">Video Motion {camera.video ? <BiVideo className="text-green-500" /> : <BiVideoOff className="text-gray-500"/> }</div>
        <div className="flex justify-between">Sound {camera.audio ? <FiMic className="text-green-500" /> : <FiMicOff  className="text-gray-500"/> }</div>
        <div className="flex justify-between">Infrared {camera.pir ? <FiEye className="text-green-500" /> : <FiEyeOff  className="text-gray-500"/> }</div>
      </div>}
    </div>
  );
}
