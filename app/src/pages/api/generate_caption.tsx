import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get data submitted in request's body.
    const body = req.body;
    
    if (!body.product_description) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'product description not found' });
    }

    const endpoint = process.env.BE_BASE_URL + '/social_media/caption'
    const paramsString = new URLSearchParams({
      "product_description": body.product_description
    }).toString()
    const caption_response = await fetch( endpoint  + "?" + paramsString);
    const caption_result = await caption_response.json();

    console.log(caption_result)
   
    // Sends a HTTP success code
    res.status(200).json({
      "response": caption_result.response,
      // "images": image_result.images
    });
  }