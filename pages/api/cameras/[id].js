import { GET } from "../../../utils/http-methods";

export default async function handler(req, res) {
  const { id } = req.query;

  const resp = await GET(
    `http://rest.cameramanager.com/rest/v2.4/cameras/${id}`,
    JSON.parse(req.body).access_token
  );

  const deviceInfo = await GET(
    `http://rest.cameramanager.com/rest/v2.2/cameras/${id}/deviceInfo`,
    JSON.parse(req.body).access_token
  );

  const details = await GET(
    `http://rest.cameramanager.com/rest/v2.2/cameras/${id}/connection/details`,
    JSON.parse(req.body).access_token
  );

  const firmware = await GET(
    `http://rest.cameramanager.com/rest/v2.2/cameras/${id}/firmware`,
    JSON.parse(req.body).access_token
  );

  const video = await GET(
    `http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/video`,
    JSON.parse(req.body).access_token
  );

  const audio = await GET(
    `http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/audio`,
    JSON.parse(req.body).access_token
  );

  const pir = await GET(
    `http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/pir`,
    JSON.parse(req.body).access_token
  );

  res
    .status(resp.response.status)
    .json({
      ...resp.data,
      ...deviceInfo.data,
      ...details.data,
      ...firmware.data,
      video: video.data.enabled,
      audio: audio.data.enabled,
      pir: pir.data.enabled,
    });
}
