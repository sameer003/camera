export default async function handler(req, res){

  const {username, password, token} = JSON.parse(req.body);
  try{
    const response = await fetch(
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
          },
        }
    );
    
    if(response.status == 200){
      const data = await response.json();
      res.status(response.status).json({data})
    }else{
      res.status(400).json({ error: 'Some error occurred' })
    
    }
  } catch(e){
    res.status(400).json({ error: e })
  }
    
}