import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Obrigado pela sua doação!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sua contribuição ajuda a manter o Desculpas Pro funcionando e melhorando cada vez mais.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
} 