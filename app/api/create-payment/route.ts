import { NextResponse } from 'next/server'
import mercadopago from 'mercadopago'

// Configurar o SDK do Mercado Pago
const mp = mercadopago as any
mp.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
})

export async function POST(request: Request) {
  try {
    const { amount } = await request.json()
    const headers = new Headers(request.headers)
    const host = headers.get('host')
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    // Criar a data de expiração no formato correto (24 horas a partir de agora)
    const date = new Date()
    date.setHours(date.getHours() + 24)
    const expirationDate = date.toISOString().replace('Z', '-03:00') // Horário de Brasília

    const preference = {
      items: [
        {
          title: 'Doação para Desculpas Pro',
          unit_price: Number(amount),
          quantity: 1,
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: `${baseUrl}/obrigado`,
        failure: `${baseUrl}`,
        pending: `${baseUrl}`,
      },
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      statement_descriptor: 'DESCULPAS PRO',
      external_reference: new Date().getTime().toString(),
      expires: true,
      expiration_date_to: expirationDate
    }

    const { response } = await mp.preferences.create(preference)

    // Criar uma nova resposta para evitar o erro de objeto bloqueado
    return new NextResponse(JSON.stringify({ 
      url: response.init_point,
      preferenceId: response.id,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    return new NextResponse(JSON.stringify({ 
      error: 'Erro ao criar preferência de pagamento' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
} 