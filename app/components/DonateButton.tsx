'use client'

import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function DonateButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDonate = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10 }), // Valor fixo de R$ 10,00
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de pagamento não encontrada')
      }
    } catch (error) {
      console.error('Erro ao processar doação:', error)
      alert('Desculpe, ocorreu um erro ao processar sua doação. Tente novamente mais tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleDonate}
      disabled={isLoading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
    >
      <HeartIcon className="h-5 w-5 mr-2" />
      {isLoading ? 'Processando...' : 'Doar R$ 10'}
    </button>
  )
} 