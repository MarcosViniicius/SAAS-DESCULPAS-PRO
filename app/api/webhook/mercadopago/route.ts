import { NextResponse } from 'next/server'
import mercadopago from 'mercadopago'

// Configurar o SDK do Mercado Pago
const mp = mercadopago as any
mp.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN || ''
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id
      
      // Buscar informações do pagamento
      const payment = await mp.payment.get(paymentId)
      
      // Aqui você pode implementar sua lógica para diferentes status de pagamento
      switch (payment.response.status) {
        case 'approved':
          console.log(`Pagamento ${paymentId} aprovado`)
          break
        case 'pending':
          console.log(`Pagamento ${paymentId} pendente`)
          break
        case 'rejected':
          console.log(`Pagamento ${paymentId} rejeitado`)
          break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
} 