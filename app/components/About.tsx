'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { aboutText } from '../../lib/data';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-16 justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* CONTAINER QUADRADO COM BORDAS ESTILIZADAS */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl border-2 border-purple-600/30 p-2 bg-purple-900/10 backdrop-blur-sm shadow-2xl shadow-purple-500/10 overflow-hidden">
              <Image 
                src="/img/jayne.png" 
                alt="Foto de Jayne Soraya"
                width={400} 
                height={400}
                className="w-full h-full object-cover rounded-xl" 
                priority={false} 
              />
              
              {/* Overlay decorativo de scanner/tech */}
              <div className="absolute inset-0 border border-purple-500/20 rounded-xl pointer-events-none" />
            </div>

            {/* Orbiting particles adaptadas para o formato quadrado */}
            <motion.div
              className="absolute -inset-4 rounded-3xl border border-purple-600/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-0 w-2 h-2 bg-purple-600 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl space-y-6 text-left"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter"
          >
            <span className="text-purple-500">/ </span>
            {aboutText.title}
          </motion.h2>

          <motion.p className="text-neutral-400 text-lg leading-relaxed">
            {aboutText.description}
          </motion.p>

          <motion.p className="text-neutral-400 text-lg leading-relaxed italic border-l-4 border-purple-600 pl-4">
            {aboutText.detailedDescription}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-purple-600 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default About;