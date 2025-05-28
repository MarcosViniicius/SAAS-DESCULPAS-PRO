import { NextResponse } from 'next/server';
import { generateText } from '../../lib/googleai';

export async function POST(request: Request) {
  try {
    const { situation, context, tone } = await request.json();

    const prompt = `Gere uma desculpa ${tone} para a seguinte situação: ${situation}.
    Contexto adicional: ${context}.
    A desculpa deve ser convincente, mas ética e não prejudicial.
    Responda apenas com a desculpa, sem explicações adicionais.`;

    const excuse = await generateText(prompt);
    return NextResponse.json({ excuse });
  } catch (error) {
    console.error('Erro ao gerar desculpa:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar desculpa' },
      { status: 500 }
    );
  }
} 