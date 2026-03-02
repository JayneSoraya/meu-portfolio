'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { X, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import type { AuthFormData } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewType = 'login' | 'register' | 'forgot-password' | 'reset-sent';

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState<ViewType>('login');
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    name: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (currentView === 'login') {
        const response = await axios.post('/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        setMessage('Login realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          window.location.href = '/vip';
        }, 1500);
      } else if (currentView === 'register') {
        await axios.post('/api/auth/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setMessage('Cadastro realizado com sucesso! Faça login.');
        setTimeout(() => {
          setCurrentView('login');
          setMessage('');
        }, 2000);
      } else if (currentView === 'forgot-password') {
        await axios.post('/api/auth/forgot-password', {
          email: formData.email
        });
        setCurrentView('reset-sent');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'Erro ao processar solicitação');
      } else {
        setMessage('Ocorreu um erro inesperado');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({ email: '', password: '', name: '' });
    setMessage('');
  };

  const switchView = (view: ViewType) => {
    setCurrentView(view);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-neutral-950 p-10 rounded-3xl border border-white/10 w-full max-w-md relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900" />
        </div>

        <button
          className="absolute top-6 right-8 text-2xl hover:text-purple-500 transition-colors z-10"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {(currentView === 'register' || currentView === 'forgot-password') && (
          <button
            className="absolute top-6 left-8 text-2xl hover:text-purple-500 transition-colors z-10"
            onClick={() => switchView('login')}
          >
            <ArrowLeft size={24} />
          </button>
        )}

        <div className="relative z-10">
          {currentView === 'reset-sent' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-purple-600/20 rounded-full flex items-center justify-center">
                <Mail size={40} className="text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold text-purple-500 uppercase tracking-tighter">
                Email_Enviado
              </h2>
              <p className="text-neutral-400">
                Enviamos um link de recuperação para <span className="text-white font-semibold">{formData.email}</span>
              </p>
              <p className="text-neutral-500 text-sm">
                Verifique sua caixa de entrada e spam. O link expira em 1 hora.
              </p>
              <button
                onClick={() => switchView('login')}
                className="w-full bg-purple-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-500 transition-colors"
              >
                Voltar ao Login
              </button>
            </motion.div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center text-purple-500 uppercase tracking-tighter">
                {currentView === 'login' && 'Acesso_VIP'}
                {currentView === 'register' && 'Novo_Membro'}
                {currentView === 'forgot-password' && 'Recuperar_Senha'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {currentView === 'register' && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="NOME COMPLETO"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-xl border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-neutral-500"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-MAIL"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-xl border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-neutral-500"
                  />
                </div>

                {currentView !== 'forgot-password' && (
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500" size={20} />
                    <input
                      type="password"
                      name="password"
                      placeholder="SENHA"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-xl border border-white/10 outline-none focus:border-purple-500 transition-colors text-white placeholder:text-neutral-500"
                    />
                  </div>
                )}

                {currentView === 'login' && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => switchView('forgot-password')}
                      className="text-sm text-purple-500 hover:text-purple-400 transition-colors"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'PROCESSANDO...' : 
                    currentView === 'login' ? 'Entrar no Sistema' : 
                    currentView === 'register' ? 'Criar Conta' :
                    'Enviar Link'}
                </button>
              </form>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 text-center text-sm ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'}`}
                >
                  {message}
                </motion.p>
              )}

              {currentView === 'login' && (
                <p
                  className="mt-4 text-center text-[10px] text-neutral-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
                  onClick={() => switchView('register')}
                >
                  Criar nova credencial
                </p>
              )}

              {currentView === 'register' && (
                <p
                  className="mt-4 text-center text-[10px] text-neutral-600 uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
                  onClick={() => switchView('login')}
                >
                  Já possuo credencial
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;