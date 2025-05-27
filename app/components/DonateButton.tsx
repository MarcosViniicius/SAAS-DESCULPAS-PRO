'use client'

import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function DonateButton() {
  const [loading, setLoading] = useState(false)

  const handleDonate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500, // R$ 5,00
        }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Erro ao processar doação:', error)
      alert('Erro ao processar doação. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDonate}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
    >
      <HeartIcon className="h-5 w-5 mr-2" />
      {loading ? 'Processando...' : 'Apoiar com R$ 5'}
    </button>
  )
} 