import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { situation, context, tone } = await request.json()

    const prompt = `Gere uma desculpa ${tone} para a seguinte situação: ${situation}.
    Contexto adicional: ${context}.
    A desculpa deve ser convincente, mas ética e não prejudicial.
    Responda apenas com a desculpa, sem explicações adicionais.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: "system",
            content: "Você é um assistente especializado em gerar desculpas criativas e profissionais."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      }),
    })

    const data = await response.json()
    const excuse = data.choices[0].message.content

    return NextResponse.json({ excuse })
  } catch (error) {
    console.error('Erro ao gerar desculpa:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar desculpa' },
      { status: 500 }
    )
  }
} 