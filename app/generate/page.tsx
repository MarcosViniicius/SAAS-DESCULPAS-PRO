import GenerateForm from '../components/GenerateForm'

export default function GeneratePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerador de Desculpas
          </h1>
          <p className="mt-2 text-gray-600">
            Preencha os detalhes abaixo e deixe nossa IA criar a desculpa perfeita para você
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <GenerateForm />
        </div>
      </div>
    </main>
  )
} 