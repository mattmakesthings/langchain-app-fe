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

    // Get caption
    const endpoint = process.env.BE_BASE_URL + '/social_media'
    const paramsString = new URLSearchParams(body).toString()
    const caption_response = await fetch( endpoint + '/caption' + "?" + paramsString);
    const caption_result = await caption_response.json();

    var image_result = null
    var image_response = null
    if (!body.image_data){
      image_response = await fetch( endpoint + '/image' + "?" + paramsString);
      image_result = await image_response.json();
    } else {
      console.log(endpoint + '/image_variations')
      image_response = await fetch( 
        endpoint + '/image_variations',
        {
          'body': body.image_data,
          'headers': {
            'Content-Type': 'image/png'
          },
          'method': 'POST',
        }
      );
      image_result = await image_response.json();
    }
    console.log(caption_result)
    console.log(image_result)
   
    // Sends a HTTP success code
    res.status(200).json({
      "response": caption_result.response,
      "images": image_result.images
    });
  }