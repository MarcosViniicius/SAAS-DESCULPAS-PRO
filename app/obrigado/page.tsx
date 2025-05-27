import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/solid'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <HeartIcon className="h-16 w-16 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Muito Obrigado pelo Seu Apoio!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sua doação ajuda a manter o Desculpas Pro funcionando e nos permite continuar
          desenvolvendo novas funcionalidades.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg transition-colors"
        >
          Voltar para o Início
        </Link>
      </div>
    </main>
  )
} 