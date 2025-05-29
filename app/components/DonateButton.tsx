'use client'

import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function DonateButton() {
  const [loading, setLoading] = useState(false)

  const handleDonate = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 5 }), // Valor fixo de R$ 5,00
      })

      if (!response.ok) {
        throw new Error('Erro na resposta do servidor')
      }

      const data = await response.json()
      window.location.href = data.url
    } catch (error) {
      console.error('Erro ao processar doação:', error)
      alert('Desculpe, ocorreu um erro ao processar sua doação. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDonate}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
    >
      <HeartIcon className="h-5 w-5 mr-2" />
      {loading ? 'Processando...' : 'Doar R$ 5'}
    </button>
  )
} 