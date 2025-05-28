import { GoogleGenAI } from '@google/genai';

// Inicializa o cliente do Google AI
const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY || '' });

// Função para gerar texto
export async function generateText(prompt: string) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    console.error('Erro ao gerar texto:', error);
    throw error;
  }
}

// Função para gerar texto e imagem
export async function generateTextAndImage(prompt: string, image: string) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-pro-vision",
      contents: [prompt, image]
    });
    return response.text;
  } catch (error) {
    console.error('Erro ao gerar texto e imagem:', error);
    throw error;
  }
} 