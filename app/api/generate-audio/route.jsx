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
