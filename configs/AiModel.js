// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node


import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const config = {
  responseMimeType: 'application/json',
};

const model = 'gemini-1.5-flash';


/**
 * Sends a prompt to Gemini and returns the full text response (non-streaming).
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function generateResponse(prompt) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const result = await ai.models.generateContent({
    model,
    config,
    contents,
  });

  return  result.text;
}
