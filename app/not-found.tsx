import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Desculpe, mas a página que você está procurando não existe.
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