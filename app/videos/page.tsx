'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { LogOut, PlayCircle } from 'lucide-react'; 

export default function VideosPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (isLoading) return null; 

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6 gap-4">
        <h1 className="text-3xl font-bold text-purple-500 tracking-tighter">ÁREA_DO_MEMBRO 🎓</h1>
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 rounded-lg border border-white/10 text-sm">Voltar para Home</Link>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-lg font-bold text-sm">
            <LogOut size={16} /> Sair
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
        {/* Card de Aula Exemplo */}
        <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-all group">
          <h2 className="text-xl font-bold mb-4">Aula 1: Next.js</h2>
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden">
            <PlayCircle size={48} className="text-white/50 group-hover:text-purple-500 transition-all" />
          </div>
          <p className="mt-4 text-neutral-400 text-sm">Aprenda os conceitos básicos de rotas no Next.js.</p>
        </div>
      </div>
    </div>
  );
}