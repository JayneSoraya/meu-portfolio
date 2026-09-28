'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate?: string;
  endDate?: string;
  activities?: string;
  description?: string;
}

const academicData: EducationItem[] = [
  {
    institution: 'Centro Universitário Senac',
    degree: 'Curso Superior de Tecnologia (CST)',
    fieldOfStudy: 'Análise e Desenvolvimento de Sistemas',
    startDate: 'Fev 2025',
    endDate: '2028',
  },
  {
    institution: 'Instituto Federal de Educação, Ciência e Tecnologia de São Paulo - IFSP',
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    fieldOfStudy: 'Computer Programming',
    startDate: 'Jan 2021',
    endDate: 'Dez 2022',
    activities: 'Programação',
  },
  {
    institution: 'Centro Universitário Senac',
    degree: 'Administração de Conflitos',
    fieldOfStudy: 'Gestão de Conflitos',
    startDate: 'Jan 2019',
    endDate: 'Dez 2019',
    description:
      'Administrar conflitos no ambiente de trabalho, com base na utilização de estratégias de comunicação verbal e não verbal, bem como de técnicas de gestão de conflitos, a fim de atender as necessidades das partes envolvidas e otimizar o clima organizacional, de acordo com as possibilidades e os limites de cada contexto específico.',
  },
  {
    institution: 'Centro Universitário Senac',
    degree: 'Assistente de Atendimento e Planejamento Publicitário',
    fieldOfStudy: 'Técnico em Publicidade',
    startDate: 'Jan 2019',
    endDate: 'Dez 2019',
    activities: 'Planejamento de eventos, realizações de projetos',
  },
  {
    institution: 'Centro Universitário Senac',
    degree: 'Assistente de Criação Publicitária',
    fieldOfStudy: 'Técnico em Publicidade',
    startDate: 'Jan 2019',
    endDate: 'Dez 2019',
  },
];

const AcademicBackground: React.FC = () => {
  return (
    <section id="formacao" className="py-24 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-4 text-left">
          <motion.h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            <span className="text-purple-500">/ </span>
            Formação Acadêmica
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-purple-600 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {academicData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, x: 5 }}
              className="relative p-6 rounded-2xl border border-purple-600/30 bg-purple-900/10 backdrop-blur-sm shadow-xl shadow-purple-500/5 hover:border-purple-500/60 transition-all duration-300"
            >
              {/* Brilho decorativo no canto */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {item.degree}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm md:text-base">
                    {item.institution}
                  </p>
                </div>

                {(item.startDate || item.endDate) && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 w-fit">
                    {item.startDate ? `${item.startDate} - ` : ''}
                    {item.endDate || ''}
                  </span>
                )}
              </div>

              <div className="space-y-2 mt-3 text-neutral-300 text-sm md:text-base">
                <p>
                  <span className="text-neutral-400 font-semibold">Área de estudo: </span>
                  {item.fieldOfStudy}
                </p>

                {item.activities && (
                  <p className="text-neutral-400 text-sm italic">
                    <span className="font-semibold text-neutral-300">Atividades e grupos: </span>
                    {item.activities}
                  </p>
                )}

                {item.description && (
                  <p className="text-neutral-400 text-sm leading-relaxed border-l-2 border-purple-500/40 pl-3 mt-2">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AcademicBackground;