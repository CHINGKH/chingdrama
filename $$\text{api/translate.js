import { GoogleGenAI } from "@google/genai";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // កំណត់ទំហំ ፋ៊ីលអតិបរមា
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { audioBase64, mimeType, targetLang, glossary } = req.body;
    
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // បញ្ជូនទិន្នន័យអូឌីយ៉ូទៅកាន់ Gemini 2.5 Flash សម្រាប់វិភាគ និងបកប្រែ
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          inlineData: {
            data: audioBase64,
            mimeType: mimeType || 'audio/mp3'
          }
        },
        {
          text: `Listen to this audio, transcribe it with timestamps, and translate it into ${targetLang}. Use this character glossary/notes if provided: ${glossary}. Format output cleanly as SRT or structured timestamps.`
        }
      ]
    });

    return res.status(200).json({ result: response.text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to process audio with Gemini API' });
  }
            }
