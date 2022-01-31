import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Camera from "../components/camera";
import Loader from "../components/common/loader/loader";
import { initializeCameras } from "../redux/reducers/cameras/cameras.actions";
import { mapCameraData } from "../utils/helper";
import useLoggedIn from "../utils/useLoggedIn";

export default function Home() {
  const [loading, setLoading] = useLoggedIn();
  const user = useSelector((state) => state.user);
  const cameras = useSelector((state) =>
    state.cameras.list.sort((a, b) => a.cameraId - b.cameraId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.access_token && !cameras.length) {
      setLoading(true);
      getAllCameras();
    }
  }, []);

  async function getAllCameras() {
    const cameras = await fetch("api/cameras", {
      method: "POST",
      body: JSON.stringify({ access_token: user.access_token }),
    }).then((res) => res.json());

    const zones = await fetch("api/zones", {
      method: "POST",
      body: JSON.stringify({ access_token: user.access_token }),
    }).then((res) => res.json());

    const status = await fetch("api/cameras/all/status", {
      method: "POST",
      body: JSON.stringify({ access_token: user.access_token }),
    }).then((res) => res.json());
    setLoading(false);

    dispatch(initializeCameras(mapCameraData(cameras, zones, status)));
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {loading && <Loader />}
      {!loading &&
        cameras &&
        cameras.map((camera) => {
          return <Camera key={camera.cameraId} camera={camera} />;
        })}
    </div>
  );
}
