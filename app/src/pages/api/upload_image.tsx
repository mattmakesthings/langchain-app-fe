import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get data submitted in request's body.
    const body = req.body;
   
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    const formData = new FormData();
    formData.append('file', body)
    
    const image_response = await fetch( 
        process.env.BE_BASE_URL + '/social_media/image_variations',
    {
        'body': body,
        'method': 'POST',
    }
    );
    const image_result = await image_response.json();
    console.log(image_result)
   
    // Sends a HTTP success code
    res.status(200).json({
      "images": image_result.images
    });
  }