import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoConfig, Preference } from 'mercadopago'

// Definindo as interfaces necessárias
interface PreferenceItem {
  title: string;
  unit_price: number;
  quantity: number;
  currency_id: "ARS" | "BRL" | "CLP" | "COP" | "MXN" | "PEN" | "UYU" | "VES";
}

interface PreferenceBackUrls {
  success: string;
  failure: string;
  pending: string;
}

interface PreferenceRequest {
  items: PreferenceItem[];
  back_urls: PreferenceBackUrls;
  notification_url?: string;
  statement_descriptor?: string;
  external_reference?: string;
  expires: boolean;
  expiration_date_to: string;
  auto_return: "approved" | "all";
}

// Configurar o SDK do Mercado Pago com o access token
if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error('MERCADO_PAGO_ACCESS_TOKEN não configurado no ambiente')
}

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
})

// Função para formatar a data no padrão do Mercado Pago
function formatExpirationDate(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, '0');
  
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
  
  // Formato: YYYY-MM-DDThh:mm:ss.000-03:00
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}-03:00`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const amount = body.amount || 5 // Valor padrão de R$ 5

    const headers = new Headers(request.headers)
    const host = headers.get('host')
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
    const baseUrl = `${protocol}://${host}`

    // Data de expiração: 24 horas a partir de agora
    const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const preference = new Preference(client)
    const preferenceData = {
      items: [
        {
          id: new Date().getTime().toString(),
          title: 'Doação para Desculpas Pro',
          unit_price: Number(amount),
          quantity: 1,
          currency_id: 'BRL'
        },
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/obrigado`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/erro`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      },
      notification_url: `${baseUrl}/api/webhook/mercadopago`,
      statement_descriptor: 'DESCULPAS PRO',
      external_reference: new Date().getTime().toString(),
      expires: true,
      expiration_date_to: formatExpirationDate(expirationDate),
      auto_return: 'approved'
    }

    const response = await preference.create({ body: preferenceData })

    // Criar uma nova resposta para evitar o erro de objeto bloqueado
    return NextResponse.json({ 
      url: response.init_point,
      preferenceId: response.id,
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
} 