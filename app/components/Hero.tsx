'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center text-center px-4 pt-20"
    >
      {/* Container da Imagem Animada */}
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.6, 0.05, 0.01, 0.9],
          delay: 0.2
        }}
        className="mb-8 relative"
      >
        <motion.div
          className="relative h-40 w-40 md:h-52 md:w-52 flex items-center justify-center"
          animate={{
            y: [0, -15, 0], 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {/* A IMAGEM AQUI */}
          <Image
            src="/img/inomeado.svg" 
            alt="Logo Jayne Soraya"
            width={200} 
            height={200}
            priority 
            className="object-contain"
          />
        </motion.div>
        
        {/* Glow effect atrás da imagem */}
        <motion.div
          className="absolute inset-0 bg-purple-600/20 rounded-full blur-[60px] -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </motion.div>

      {/* Título Principal */}
      <motion.h1
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
          ease: [0.6, 0.05, 0.01, 0.9]
        }}
        className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-600"
      >
        JAYNE SORAYA
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-xl text-neutral-400 uppercase tracking-[0.3em] mt-4 font-mono"
      >
        Full Stack Developer 👷🏽 portifólio em construção 🚧
      </motion.p>

      <motion.div
        className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-white/70 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;