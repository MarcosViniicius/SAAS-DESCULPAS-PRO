'use client'

import { useState } from 'react'
import { SparklesIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import DonateButton from './DonateButton'

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
      setResult(data.excuse?.replace(/^"|"$/g, '') || 'Desculpe, ocorreu um erro ao gerar sua desculpa.')
    } catch (error) {
      console.error('Erro ao gerar desculpa:', error)
      setResult('Desculpe, ocorreu um erro ao gerar sua desculpa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      alert('Texto copiado com sucesso!')
    } catch (error) {
      console.error('Erro ao copiar texto:', error)
      alert('Erro ao copiar texto. Tente novamente.')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="situation" className="block text-sm font-medium text-gray-700">
            Situação
          </label>
          <textarea
            id="situation"
            name="situation"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Descreva a situação para a qual você precisa de uma desculpa..."
            value={formData.situation}
            onChange={(e) => setFormData({ ...formData, situation: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700">
            Contexto Adicional (opcional)
          </label>
          <textarea
            id="context"
            name="context"
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="Adicione qualquer contexto relevante..."
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
            name="tone"
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
          disabled={loading}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? (
            <>
              <SparklesIcon className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Gerando...
            </>
          ) : (
            'Gerar Desculpa'
          )}
        </button>
      </form>

      {result && (
        <>
          <div className="mt-6 p-4 bg-white rounded-lg shadow relative">
            <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              title="Copiar texto"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg shadow text-center">
            <p className="text-gray-800 mb-4">
              ❤️ Gostou da desculpa? Considere fazer uma doação de apenas R$ 5 para ajudar a manter o serviço!
            </p>
            <DonateButton />
          </div>
        </>
      )}
    </div>
  )
} 