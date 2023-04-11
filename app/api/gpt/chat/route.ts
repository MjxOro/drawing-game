import { NextResponse } from 'next/server'
import { verifyMessage } from 'ethers';
export async function POST(request: Request) {
  try{
    const { prompt, access_token, message }: {prompt: string, access_token: string, message: string} = await request.json()
    const verify = verifyMessage(message, access_token)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { "Authorization": `Bearer ${process.env.OPEN_AI_SECRET}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{role:"user", content:`${prompt} ${process.env.NEXT_PUBLIC_GPT_CHAT_PROMPT as string}`}],
      })
    })
    const json = await response.json()
    const gpt = json.choices[0].message.content
    return NextResponse.json({gpt: gpt}) 
  }catch(error){
    console.error(error);
    return NextResponse.json({error: error.message});
  }
}

