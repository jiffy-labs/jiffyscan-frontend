// pages/api/getUserOps.js

export default async function handler(req, res) {
    const { userOpHash } = req.query;
  console.log(userOpHash)
    // Define the headers
    const headers = {
      'x-api-key': 'gFQghtJC6F734nPaUYK8M3ggf9TOpojkbNTH9gR5',

    };
  const API_URL = `https://api.jiffyscan.xyz`
    try {
      const response = await fetch(`${API_URL}/v0/getUserOp?hash=${userOpHash}`, { headers });
      console.log(response)
      // Check for a successful response
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  

     
  
      // Respond with the user operations data
      res.status(200).json(await response.json());
    } catch (error) {
      // Handle errors
      res.status(500).json({ message: error.message });
    }
  }
  