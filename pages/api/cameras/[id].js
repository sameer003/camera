export default async function handler(req, res){
    const { id } = req.query;
    const headers ={
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
      'Authorization': 'Bearer '+ (JSON.parse(req.body)).access_token
    }
    const resp = await fetch(`http://rest.cameramanager.com/rest/v2.4/cameras/${id}`, {
        method: "GET",
        headers
      });

      const deviceInfo = await fetch(`http://rest.cameramanager.com/rest/v2.2/cameras/${id}/deviceInfo`, {
        method: "GET",
        headers
      });

      const details = await fetch(`http://rest.cameramanager.com/rest/v2.2/cameras/${id}/connection/details`, {
        method: "GET",
        headers
      });

      const firmware = await fetch(`http://rest.cameramanager.com/rest/v2.2/cameras/${id}/firmware`, {
        method: "GET",
        headers
      });

      const video = await fetch(`http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/video`, {
        method: "GET",
        headers
      });

      const audio = await fetch(`http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/audio`, {
        method: "GET",
        headers
      });

      const pir = await fetch(`http://rest.cameramanager.com/rest/v2.0/cameras/${id}/detectors/pir`, {
        method: "GET",
        headers
      });
      
      const data = await resp.json();
      const data2 = await deviceInfo.json();
      const data3 = await details.json();
      const data4 = await firmware.json();
      const data5 = await video.json();
      const data6 = await audio.json();
      const data7 = await pir.json();
    res.status(resp.status).json({...data, ...data2, ...data3, ...data4, video: data5.enabled,audio: data6.enabled, pir: data7.enabled });
}