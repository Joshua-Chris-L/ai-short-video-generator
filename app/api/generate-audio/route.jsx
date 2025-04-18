import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_API_KEY
});

export async function POST(req) {
    const { text, id } = await req.json();

    const storageRef = ref(storage, `ai-short-videos-files/${id}.mp3`);

    const request = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);

    const audioBuffer = Buffer.from(response.audioContent, 'base64');

    await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });

    const downloadUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ Result: downloadUrl });
}



/* import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";
import { uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient({
    apiKey:process.env.GOOGLE_API_KEY
});

export async function POST(req) {

    const {text, id} = await req.json()
    console.log(text)
    
    const storageRef=ref(storage, 'ai-short-videos-files/'+id+'.mp3');
    

    const request = {
        input: {text: text},
        // Select the language and SSML voice gender (optional)
        voice: {languageCode: 'en-US', ssmlGender: 'FEMALE'},
        // select the type of audio encoding
        audioConfig: {audioEncoding: 'MP3'},
    };
    
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile('output.mp3', response.audioContent, 'binary'); 
    const audioBuffer=Buffer.from(response.audioContent, 'binary')
    console.log('Audio content written to file: output.mp3');
    await uploadBytes(storageRef, audioBuffer, {contentType:'audio/mp3'}) ;
    const downloadUrl = await getDownloadURL(storageRef)
    console.log(downloadUrl);
    return NextResponse.json({Result:downloadUrl}) ; 
} */