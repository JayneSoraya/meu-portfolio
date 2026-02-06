'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { socialLinks } from '../../lib/data';
import type { SocialLink } from '../../types';

const BehanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
  behance: BehanceIcon
};

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const lightX = useSpring(mouseX, springConfig);
  const lightY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section 
      id="contato" 
      className="py-32 text-center relative overflow-hidden"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Efeito de luz roxa que segue o mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${lightX.get()}px ${lightY.get()}px, rgba(147, 51, 234, 0.3), transparent 70%)`
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter uppercase relative z-10"
      >
        <span className="text-purple-500">/ </span>CONTATO_
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-12 flex-wrap relative z-10"
      >
        {socialLinks.map((link: SocialLink, index: number) => {
          const Icon = iconMap[link.icon];
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div 
                className="text-4xl text-neutral-500 group-hover:text-purple-500 transition-colors relative z-10"
                whileHover={{
                  rotate: [-2, 2, -2, 2, 0],
                  x: [-3, 3, -3, 3, 0],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 0.2
                  }
                }}
              >
                <Icon size={48} />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 text-4xl text-red-500 opacity-0 group-hover:opacity-60 -z-10"
                animate={{
                  x: [-3, 3, -2, 3, 0],
                  opacity: [0, 0.6, 0, 0.6, 0]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
              >
                <Icon size={48} />
              </motion.div>
              
              <motion.div
                className="absolute inset-0 text-4xl text-cyan-400 opacity-0 group-hover:opacity-60 -z-10"
                animate={{
                  x: [3, -3, 3, -2, 0],
                  opacity: [0, 0.6, 0, 0.6, 0]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  delay: 0.15
                }}
              >
                <Icon size={48} />
              </motion.div>

              <motion.div
                className="absolute inset-0 bg-purple-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap"
              >
                {link.name}
              </motion.span>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Contact;