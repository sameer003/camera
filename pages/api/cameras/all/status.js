import { GET } from "../../../../utils/http-methods";

export default async function handler(req, res) {
  const result = await GET('http://rest.cameramanager.com/rest/v2.4/cameras/all/status',(JSON.parse(req.body)).access_token);
  res.status(result.response.status).json(result.data);
}
