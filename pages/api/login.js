export default async function handler(req, res){


    const resp = await fetch(
        `https://rest.cameramanager.com/oauth/token?grant_type=password&scope=write&username=${process.env.NEXT_PUBLIC_USERNAME}&password=${process.env.NEXT_PUBLIC_PASSWORD}`,
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
              "Basic " +
              btoa(`${process.env.NEXT_PUBLIC_KEY}:${process.env.NEXT_PUBLIC_SECRET}`),
          },
        }
    );

    const data = await resp.json()
    res.status(200).json({data})
}