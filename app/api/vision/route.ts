import { NextResponse } from 'next/server'
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { verifyMessage } from 'ethers';
export async function POST(request: Request) {
  try{
    const { base64Img, access_token,message }: {base64Img: string, access_token: string, message:string} = await request.json()
    const verify = verifyMessage(message, access_token)
    const imgBuffer = Buffer.from(base64Img, 'base64')
    const credential = JSON.parse(
      Buffer.from(process.env.GOOGLE_SERVICE_KEY as string, 'base64').toString()
    );
    const client = new ImageAnnotatorClient({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: credential,
    }); 
    const [result] = await client.annotateImage({
      image: { content: imgBuffer } ,
      features: [{ type: 'LABEL_DETECTION' }],
    });
    const labels = result.labelAnnotations.map((label) => label.description);
    return NextResponse.json({labels: labels}) 
  }catch(error){
    console.error(error);
    return NextResponse.json({error: error.message});
  }
}