export default async function handler(req, res){

  const {username, password, token} = JSON.parse(req.body);
    const resp = await fetch(
        `https://rest.cameramanager.com/oauth/token?grant_type=password&scope=write&username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
            Authorization:
              "Basic " + token
              // btoa(`${process.env.NEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SECRET}`),
          },
        }
    );

    const data = await resp.json()
    res.status(200).json({data})
}