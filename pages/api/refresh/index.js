export default async function handler(req, res){

    const {refresh_token, token} = JSON.parse(req.body);
    try{
      const response = await fetch(
          `https://rest.cameramanager.com/oauth/token?grant_type=refresh_token&scope=write&refresh_token=${refresh_token}`,
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