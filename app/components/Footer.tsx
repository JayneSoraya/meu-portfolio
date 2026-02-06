'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 text-center text-neutral-600 text-xs font-mono uppercase border-t border-white/5 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ width: '50%' }}
      />

      <div className="space-y-2 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Powered by <span className="text-purple-500 font-bold">JSSYSTEM</span> Copyright © {currentYear}. All Rights Reserved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400"
        >
          Construído com <span className="text-red-500">♥</span> por <span className="text-purple-500">Jayne Soraya</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
