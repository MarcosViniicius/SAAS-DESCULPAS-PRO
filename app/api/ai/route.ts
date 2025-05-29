import { NextResponse } from 'next/server';
import { generateText } from '../../lib/googleai';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt é obrigatório' },
        { status: 400 }
      );
    }

    const response = await generateText(prompt);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Erro na rota de AI:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    );
  }
} 