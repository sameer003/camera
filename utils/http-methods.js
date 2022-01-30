export async function GET(url, token) {
    const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Request-Method": "GET, POST, DELETE, PUT, OPTIONS",
            Authorization: "Bearer " + token,
          },
        }
      );
    
      const data = await response.json();
      return {response, data}
}

export async function POST(url, token) {
    const response = await fetch(
        url,
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
    
      const data = await response.json();
      return {response, data}
}