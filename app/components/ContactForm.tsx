'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Paperclip, Plus, X, FileText } from 'lucide-react';
import axios from 'axios';
import type { ContactFormData } from '../../types';

const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB em bytes

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const currentTotalSize = files.reduce((acc, file) => acc + file.size, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (selectedFiles.length > 0) {
      const newFilesSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

      if (currentTotalSize + newFilesSize > MAX_TOTAL_SIZE) {
        setError('O tamanho total dos anexos não pode ultrapassar 5MB.');
      } else {
        setError('');
        setFiles(prev => [...prev, ...selectedFiles]);
      }
    }
    e.target.value = '';
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('message', formData.message);
      
      files.forEach(file => {
        data.append('files', file);
      });

      await axios.post('/api/contact', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setFiles([]); 
      
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: unknown) {
      console.error(err); 
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao enviar proposta.');
      } else {
        setError('Erro ao enviar mensagem. Tente novamente...');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="servico" className="py-24 bg-neutral-900/20 backdrop-blur-sm relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
          {/* Nome e Email (Mantidos iguais) */}
          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <input type="text" name="name" placeholder="NOME" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500" />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.02 }} className="relative">
            <input type="email" name="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500" />
          </motion.div>

          {/* Mensagem */}
          <motion.div whileFocus={{ scale: 1.02 }} className="md:col-span-2 relative">
            <textarea name="message" rows={6} placeholder="DESCREVA SEU PROJETO OU NECESSIDADE DE INFRAESTRUTURA" value={formData.message} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none resize-none focus:border-purple-600 transition-all text-white placeholder:text-neutral-500" />
          </motion.div>

          {/* ÁREA DE ANEXOS MÚLTIPLOS */}
          <div className="md:col-span-2 relative space-y-3">
            <div className="flex justify-between items-end mb-2">
              <label className="flex items-center gap-2 text-neutral-500 text-[10px] uppercase tracking-widest ml-1">
                <Paperclip size={12} /> Anexos (Máx Total: 5MB)
              </label>
              <span className={`text-xs font-medium ${currentTotalSize > MAX_TOTAL_SIZE ? 'text-red-400' : 'text-purple-400'}`}>
                {formatBytes(currentTotalSize)} / 5 MB
              </span>
            </div>

            {/* Lista de Arquivos já selecionados */}
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-lg"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText size={16} className="text-purple-500 shrink-0" />
                    <span className="text-white text-sm truncate">{file.name}</span>
                    <span className="text-neutral-500 text-xs shrink-0">({formatBytes(file.size)})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Botão de Adicionar Mais (Esconde o input padrão) */}
            {currentTotalSize < MAX_TOTAL_SIZE && (
              <motion.label
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 bg-purple-600/10 border border-dashed border-purple-500/30 text-purple-400 rounded-lg p-4 cursor-pointer hover:bg-purple-600/20 hover:border-purple-500/50 transition-all text-sm font-medium uppercase tracking-wider"
              >
                <Plus size={16} /> Adicionar Arquivo ou Print
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  className="hidden"
                />
              </motion.label>
            )}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:col-span-2 text-red-400 text-sm text-center font-medium">
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting || currentTotalSize > MAX_TOTAL_SIZE}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 bg-purple-600 text-white font-bold py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20 uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> Enviando...</>
            ) : (
              <><Send size={20} /> Enviar Proposta</>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;