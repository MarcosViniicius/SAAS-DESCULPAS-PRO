import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

// Configurar o SDK do Mercado Pago com o access token
if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN não configurado no ambiente');
}

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id;
      
      // Criar instância do Payment
      const payment = new Payment(client);
      
      // Buscar informações do pagamento
      const paymentInfo = await payment.get({ id: paymentId });

      // Processar o pagamento conforme necessário
      console.log('Pagamento recebido:', paymentInfo);

      // Retornar sucesso
      return NextResponse.json({ success: true });
    }

    // Se não for uma notificação de pagamento, retornar sucesso também
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
} 