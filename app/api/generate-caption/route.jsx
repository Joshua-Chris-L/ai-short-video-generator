import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API,
    });

    const params = {
      audio: audioFileUrl,
      speech_model: "universal",
    };

    const transcript = await client.transcripts.transcribe(params);

    console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}



/* import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";


export async function  POST (req) {
    try {
        const {audioFileUrl} = await req.json()
        const client = new AssemblyAI({
            apiKey: process.env.CAPTION_API,
          });
          
        const FiLE_URL = audioFileUrl
    
        const params = {
            audio: FiLE_URL,
            speech_model: "universal",
          };
        const transcript = await client.transcripts.transcribe(params);
        console.log(transcript.words);
        return NextResponse.json({'result':transcript.words})
    } catch (e) {
        return NextResponse.json({'error':e})
    }

   
} */