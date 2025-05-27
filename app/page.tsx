import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/outline'
import DonateButton from './components/DonateButton'
import AdUnit from './components/AdUnit'

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SparklesIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">Desculpas Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <DonateButton />
              <Link href="/generate" className="btn-primary">
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Anúncio superior */}
        <div className="mb-12">
          <AdUnit 
            slotId="6234354360" 
            format="auto"
            style={{ minHeight: '250px', width: '100%' }}
          />
        </div>

        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Nunca mais fique sem uma</span>
            <span className="block text-primary">desculpa criativa!</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Gere desculpas profissionais e criativas em segundos usando inteligência artificial.
            Perfeito para aquelas situações onde você precisa de uma saída elegante! 😉
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/generate" className="btn-primary inline-block">
                Gerar Desculpa Grátis
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card">
            <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">Inteligência Artificial</h3>
            <p className="mt-2 text-gray-500">
              Nossas desculpas são geradas por IA avançada para garantir originalidade e credibilidade.
            </p>
          </div>

          <div className="card">
            <div className="h-12 w-12 rounded-md bg-secondary flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">Contextualizado</h3>
            <p className="mt-2 text-gray-500">
              Desculpas personalizadas para cada situação, seja trabalho, escola ou vida pessoal.
            </p>
          </div>

          <div className="card">
            <div className="h-12 w-12 rounded-md bg-accent flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">Rápido e Fácil</h3>
            <p className="mt-2 text-gray-500">
              Em apenas alguns cliques, tenha uma desculpa convincente pronta para usar.
            </p>
          </div>
        </div>

        {/* Anúncio inferior */}
        <div className="mt-16">
          <AdUnit 
            slotId="9841592733" 
            format="auto"
            style={{ minHeight: '280px', width: '100%' }}
          />
        </div>
      </div>
    </main>
  )
} 