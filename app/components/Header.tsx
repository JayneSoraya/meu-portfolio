'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import LoginModal from './LoginModal';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadCV = () => {
    const pdfUrl = '/img/curriculum.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Jayne_Soraya_Curriculum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '#portifolio' },
    { name: 'Serviços', href: '#servico' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5"
      >
        <nav className="flex justify-between items-center p-6 container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative text-white font-bold text-xl"
          >
            JSSYSTEM
          </motion.div>

          <ul className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium items-center">
            {menuItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className="hover:text-purple-500 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 bg-purple-600/20 border border-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-600 transition-all duration-300"
              >
                <Download size={16} />
                CURRÍCULO
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                className="bg-purple-600 px-5 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all duration-300"
                onClick={() => setIsModalOpen(true)}
              >
                ÁREA VIP
              </button>
            </motion.li>
          </ul>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg"
          >
            <ul className="flex flex-col gap-4 p-6">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white hover:text-purple-500 transition-colors text-sm uppercase tracking-widest"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleDownloadCV();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 bg-purple-600/20 border border-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-600 transition-all w-full text-sm uppercase"
                >
                  <Download size={16} />
                  CURRÍCULO
                </button>
              </li>
              <li>
                <button
                  className="bg-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all w-full text-sm uppercase"
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  ÁREA VIP
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.header>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;