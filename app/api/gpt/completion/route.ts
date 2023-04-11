import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  try{
    const { prompt, appSecret }: {prompt: string, appSecret: string} = await request.json()
    console.log(appSecret)
    if(appSecret !== process.env.NEXT_PUBLIC_APP_SECRET as string){
      throw new Error('Unauthorized')
    }
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: 'POST',
      headers: { "Authorization": `Bearer ${process.env.OPEN_AI_SECRET}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
       model: "text-davinci-003",
        prompt: prompt,
        temperature: 1,
        max_tokens: 50,
        top_p: 1,
        best_of: 5,
        frequency_penalty: 2,
        presence_penalty: 2,
      })
    })
    const json = await response.json()
    const gpt = json.choices[0].text
    return NextResponse.json({gpt: gpt}) 
  }catch(error){
    console.error(error);
    return NextResponse.json({error: error.message});
  }
}

