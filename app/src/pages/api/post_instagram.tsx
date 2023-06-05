import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get data submitted in request's body.
    const body = req.body;
    console.log(body)
    try{
        const instagram_response = await fetch( 
            process.env.BE_BASE_URL + '/social_media/instagram',
                {
                    body: JSON.stringify(body),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const instagram_result = await instagram_response.json();

            console.log(instagram_result)
        
            // Sends a HTTP success code
            res.status(200).json({
            "response": instagram_result.response,
            });
    }catch(e){
        console.error(e);
    }
  }