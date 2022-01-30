import { POST } from "../../../utils/http-methods";
export default async function handler(req, res) {
  const { username, password, token } = JSON.parse(req.body);
  const result = await POST(
    `https://rest.cameramanager.com/oauth/token?grant_type=password&scope=write&username=${username}&password=${password}`,
    token
  );
  res.status(result.response.status).json(result.data);
}
