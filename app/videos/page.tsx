import Link from "next/link";

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-cyan-400">Área de Conhecimento 🎓</h1>
        <Link href="/" className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
          Voltar para Home
        </Link>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl mb-4 font-semibold">Aula 1: Introdução ao Next.js</h2>
          <div className="aspect-video bg-black rounded flex items-center justify-center">
            <p className="text-gray-500">Player do Vídeo Aqui</p>
          </div>
          <p className="mt-4 text-gray-400">Aprenda os conceitos básicos...</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl mb-4 font-semibold">Aula 2: Banco de Dados</h2>
          <div className="aspect-video bg-black rounded flex items-center justify-center">
            <p className="text-gray-500">Player do Vídeo Aqui</p>
          </div>
          <p className="mt-4 text-gray-400">Conectando Postgres com Neon...</p>
        </div>
      </div>
    </div>
  );
}