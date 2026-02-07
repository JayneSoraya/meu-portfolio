'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { projects } from '../../lib/data';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../../types';
import Image from 'next/image';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'desenvolvimento' | 'impactoSocial' | 'automacao'>('all');

  const categories: Array<'all' | 'desenvolvimento' | 'impactoSocial' | 'automacao'> = ['all', 'desenvolvimento', 'impactoSocial', 'automacao'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter((p: Project) => p.category === filter);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };

  const categoryLabels = {
    all: 'Todos',
    desenvolvimento: 'Desenvolvimento',
    impactoSocial: 'Impacto Social',
    automacao: 'Automação'
  };

  return (
    <section id="portifolio" className="py-32 container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold mb-8 tracking-tighter"
      >
        <span className="text-purple-500">/ </span>PROJETOS_
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap gap-4 mb-16"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest font-medium transition-all ${
              filter === category
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10'
            }`}
          >
            {categoryLabels[category]}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project: Project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="group relative overflow-hidden bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-white/5 shadow-xl hover:shadow-purple-500/20 transition-all duration-500"
          >
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-purple-900 to-purple-600 flex items-center justify-center">
              <Image
                src={project.image}
                alt={project.title}
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* REMOVIDO O BLOCO motion.span QUE CONTINHA O TÍTULO SOBRE A IMAGEM */}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white p-4 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-purple-500"
                  >
                    <ExternalLink size={24} />
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold group-hover:text-purple-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs uppercase tracking-wider bg-purple-600/20 text-purple-300 rounded-full border border-purple-600/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              className="absolute top-0 right-0 w-20 h-20 bg-purple-600/10"
              style={{
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
              }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;