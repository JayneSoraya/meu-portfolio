'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import type { ContactFormData } from '../../types';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post(`${API}/contact`, formData);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error); 
      setError('Erro ao enviar mensagem. Tente novamente...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="servico" className="py-24 bg-neutral-900/20 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tighter"
        >
          <span className="text-purple-500">/ </span>VAMOS_CONVERSAR?
        </motion.h2>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="mb-8 p-6 bg-green-500/20 border border-green-500/50 rounded-2xl flex items-center gap-4"
            >
              <CheckCircle className="text-green-400" size={32} />
              <div>
                <h3 className="text-green-400 font-bold text-lg">E-mail enviado com sucesso!</h3>
                <p className="text-green-300/80 text-sm">Aguarde que entrarei em contato em breve.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="text"
              name="name"
              placeholder="NOME"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500"
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500"
            />
          </motion.div>

          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="md:col-span-2 relative"
          >
            <textarea
              name="message"
              rows={6}
              placeholder="DESCREVA SEU PROJETO OU NECESSIDADE DE INFRAESTRUTURA"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none resize-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500"
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-2 text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Enviando...
              </>
            ) : (
              <>
                <Send size={20} />
                Enviar Proposta
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;