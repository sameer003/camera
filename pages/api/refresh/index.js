import { POST } from "../../../utils/http-methods";

export default async function handler(req, res) {
  const { refresh_token, token } = JSON.parse(req.body);
  const result = await POST(
    `https://rest.cameramanager.com/oauth/token?grant_type=refresh_token&scope=write&refresh_token=${refresh_token}`,
    token
  );
  res.status(result.response.status).json(result.data);
}
