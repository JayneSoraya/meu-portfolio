'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import { Play, LogOut } from 'lucide-react';

export default function VipPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token encontrado: ", token);

    if (!token) {
      router.replace('/'); 
    } else {
      setIsLoading(false); // Só libera a página se o token existir
    }
  }, [router]);

  // Enquanto verifica o token, não mostra NADA (evita o flash da página)
  if (isLoading) {
    return <div className="min-h-screen bg-black" />; 
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 relative z-10 max-w-2xl"
      >
        <div className="space-y-2">
          <div className="inline-block px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
            ● Acesso Autorizado
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
            Bem-vinda<span className="text-purple-600">.</span>
          </h1>
        </div>

        <p className="text-neutral-400 text-lg max-w-md mx-auto leading-relaxed">
          Sua credencial foi validada com sucesso. A área de membros está pronta para você.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
          <button 
            onClick={() => router.push('/videos')}
            className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center gap-3"
          >
            <Play size={20} fill="currentColor" />
            Acessar Aulas
          </button>

          <button 
            onClick={() => {
              localStorage.removeItem('token');
              router.push('/');
            }}
            className="px-8 py-4 border border-white/10 hover:bg-white/5 text-neutral-400 hover:text-white rounded-xl font-bold uppercase tracking-widest transition-all flex items-center gap-3"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </motion.div>
    </div>
  );
}