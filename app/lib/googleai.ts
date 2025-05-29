import { GoogleGenerativeAI } from '@google/generative-ai';

// Verificar se a chave da API está configurada
if (!process.env.GOOGLE_AI_API_KEY) {
  throw new Error('GOOGLE_AI_API_KEY não configurada no ambiente');
}

// Configurar o modelo Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Prompt do sistema para melhorar a qualidade das respostas
const systemPrompt = `Você é um especialista em criar desculpas convincentes. 
Use elementos psicológicos e estruturais para criar desculpas que soem genuínas e críveis.
Considere o contexto, emoções e expectativas das pessoas envolvidas.
Evite desculpas genéricas ou óbvias.
Inclua detalhes específicos e realistas que tornem a desculpa mais autêntica.
Mantenha um tom apropriado para a situação.
Não use linguagem muito formal ou artificial.
Não mencione que é uma IA ou que está gerando uma desculpa.
Não inclua prefixos, aspas ou textos adicionais.
Responda apenas com a desculpa em si.`;

// Função para gerar texto usando o modelo Gemini
export async function generateText(prompt: string) {
  try {
    // Criar uma instância do modelo
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Combinar o prompt do sistema com o prompt do usuário
    const fullPrompt = `${systemPrompt}

    Prompt do usuário: ${prompt}`;

    // Gerar a resposta
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Erro ao gerar texto:', error);
    throw error;
  }
}

// Função para gerar texto e imagem
export async function generateTextAndImage(prompt: string, image: string) {
  try {
    // Criar uma instância do modelo
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

    // Combinar o prompt do sistema com o prompt do usuário
    const fullPrompt = `${systemPrompt}\n\nSolicitação do usuário: ${prompt}`;

    // Gerar a resposta
    const result = await model.generateContent([
      fullPrompt,
      {
        inlineData: {
          data: image,
          mimeType: 'image/jpeg'
        }
      }
    ]);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Erro ao gerar texto e imagem:', error);
    throw error;
  }
}
