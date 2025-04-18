import { generateResponse } from "@/configs/AiModel";
import { NextResponse } from 'next/server'

export async function POST(req) {
    try {
        const {prompt}= await req.json()
        console.log(prompt);

        const result = await generateResponse(prompt);
        console.log(result);

        return NextResponse.json({'result':JSON.parse(result)})
    }catch(e){
        return NextResponse.json({'Error:' : e})
    }
}
