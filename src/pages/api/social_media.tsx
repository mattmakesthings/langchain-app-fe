import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get data submitted in request's body.
    const body = req.body;
   
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body);
   
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.product_description) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'First or last name not found' });
    }
    const endpoint = 'http://127.0.0.1:3000/social_media'
    const newParams = new URLSearchParams(body)
    const paramsString = newParams.toString()
    const new_endpoint = endpoint + "?" + paramsString
    const response = await fetch(new_endpoint);
    const result = await response.json();
    console.log(result)
   
    // Found the name.
    // Sends a HTTP success code
    res.status(200).json(result);
  }