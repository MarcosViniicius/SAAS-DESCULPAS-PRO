'use client'

import { useState } from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'

export default function GenerateForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [formData, setFormData] = useState({
    situation: '',
    context: '',
    tone: 'professional'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setResult(data.excuse)
    } catch (error) {
      console.error('Erro ao gerar desculpa:', error)
      setResult('Desculpe, ocorreu um erro ao gerar sua desculpa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="situation" className="block text-sm font-medium text-gray-700">
            Situação
          </label>
          <input
            type="text"
            id="situation"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Ex: Reunião importante, Entrega de trabalho..."
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700">
            Contexto Adicional
          </label>
          <textarea
            id="context"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Adicione detalhes que tornarão a desculpa mais convincente..."
            value={formData.context}
            onChange={(e) => setFormData({ ...formData, context: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
            Tom da Desculpa
          </label>
          <select
            id="tone"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            value={formData.tone}
            onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
          >
            <option value="professional">Profissional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="creative">Criativo</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <SparklesIcon className="animate-spin h-5 w-5 mr-2" />
          ) : (
            <SparklesIcon className="h-5 w-5 mr-2" />
          )}
          {loading ? 'Gerando...' : 'Gerar Desculpa'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sua Desculpa:</h3>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  )
} 