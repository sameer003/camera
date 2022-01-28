export default async function handler(req, res){

    const resp = await fetch('http://rest.cameramanager.com/rest/v2.4/cameras', {
        method: "GET",
        headers:{
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
          'Authorization': 'Bearer '+ (JSON.parse(req.body)).access_token
        }
      });
      
      const data = await resp.json();
    res.status(resp.status).json({data})
}