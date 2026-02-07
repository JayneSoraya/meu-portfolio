'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { hardSkills} from '../../lib/data';

const HardSkills: React.FC = () => {
  return (
    <section className="py-20 container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-12 tracking-tighter"
      >
        <span className="text-purple-500">/ </span>HARD SKILLS_
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {hardSkills.map((hardSkill, index) => (
          <motion.div
            key={hardSkill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-end">
              <span className="font-bold text-lg uppercase tracking-wider">{hardSkill.name}</span>
              <span className="text-purple-400 font-mono">{hardSkill.level}%</span>
            </div>
            
            {/* Barra de Progresso */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${hardSkill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-purple-600 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HardSkills;