import Replicate from "replicate";
import { NextResponse } from "next/server";
import axios from "axios";
import { getDownloadURL, uploadString, ref } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

export async function POST(req) {
    try {    
    const {prompt} = await req.json(); 

    const replicate = new Replicate({
        auth:process.env.REPLICATE_API_TOKEN
    });
 
    const output = await replicate.run(
        "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
        {
          input: {
            width: 1024,
            height: 1024,
            prompt: prompt,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 0,
            negative_prompt: "worst quality, low quality",
            num_inference_steps: 4
          }
        }
      );

    // Save to firebase
    const base64Image= "data:image/png;base64,"+await ConvertImage(output[0].url())
    const fileName = 'ai-short-videos-files/'+Date.now()+".png"
    const storageRef = ref(storage, fileName)

    await uploadString(storageRef,base64Image, 'data_url')
    
    const downloadUrl = await getDownloadURL(storageRef)
    console.log(downloadUrl)
    return NextResponse.json({'result': downloadUrl})
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
} 

const ConvertImage =async(imageUrl)=> {
    try {
        const  resp = await axios.get(imageUrl, {responseType:'arraybuffer'})

        const base64Image = Buffer.from(resp.data).toString('base64')
        return base64Image
    } catch (e) {
        console.log('Error', e)
    }
} 


/* export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN
        });

        const output = await replicate.run(
            "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
            {
                input: {
                    width: 1024,
                    height: 1024,
                    prompt: prompt,
                    scheduler: "K_EULER",
                    num_outputs: 1,
                    guidance_scale: 0,
                    negative_prompt: "worst quality, low quality",
                    num_inference_steps: 4
                }
            }
        );

        const imageUrl = output[0]; // Direct URL string
        const base64Image = "data:image/png;base64," + await ConvertImage(imageUrl);

        const fileName = `ai-short-videos-files/${Date.now()}.png`;
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);

        return NextResponse.json({ result: downloadUrl });

    } catch (e) {
        console.error("Error generating or uploading image:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

async function ConvertImage(imageUrl) {
    try {
        const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        return Buffer.from(resp.data).toString('base64');
    } catch (e) {
        console.error("Error converting image to base64:", e);
        throw e;
    }
} */



/* import Replicate from "replicate";
import { NextResponse } from "next/server";
import dotenv from 'dotenv';
import { getDownloadURL, uploadString } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";
dotenv.config() */