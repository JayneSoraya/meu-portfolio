'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, AlertCircle , Check, X} from 'lucide-react';
import axios from 'axios';

interface PasswordRules{
  minLength: boolean;
  hasTwoNumbers: boolean;
  hasSpecialChar: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
}
const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');


  const rules: PasswordRules = {
    minLength: password.length >= 8,
    hasTwoNumbers: (password.match(/\d/g) || []).length >= 2,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\-_=+\\\/\[\]]/.test(password),
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
  }

   const isPassordValid = Object.values(rules).every(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPassordValid) {
      setStatus('error');
      setMessage('A senha não atende aos requisitos de segurança: mínimo de 8 caracteres, 2 números, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula.');
      return;
    }
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('As senhas não coincidem.');
      return;
    }

    setStatus('loading');
    try {
      await axios.post('/api/auth/reset-password', { token, newPassword: password });
      setStatus('success');
      setMessage('Senha alterada com sucesso! Redirecionando...');
      setTimeout(() => router.push('/'), 3000);
    } catch (err: unknown) {
      setStatus('error');
      if (axios.isAxiosError(err)){
        setMessage(err.response?.data?.error || 'Erro ao redefinir senha.');
      }else {
        setMessage('Ocorreu um erro inesperado.');
      }
    }
  };

  if (!token) {
    return (
      <div className="text-center text-red-400 p-8">
        <AlertCircle className="mx-auto mb-4" size={48} />
        <p>Token de recuperação ausente ou inválido.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-950 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-500 uppercase tracking-tighter">
          Nova_Senha
        </h2>

        {status === 'success' ? (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <p className="text-white">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                type="password"
                placeholder="NOVA SENHA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-white transition-all"
              />
            </div>
          {password.length > 0 && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2 text-xs">
                <p className="text-neutral-400 font-medium mb-1">A senha deve conter:</p>
                <RuleItem isValid={rules.minLength} label="No mínimo 8 caracteres" />
                <RuleItem isValid={rules.hasTwoNumbers} label="Pelo menos 2 números" />
                <RuleItem isValid={rules.hasSpecialChar} label="Pelo menos 1 caractere especial (!@#$...)" />
                <RuleItem isValid={rules.hasUpperCase} label="Pelo menos 1 letra maiúscula" />
                <RuleItem isValid={rules.hasLowerCase} label="Pelo menos 1 letra minúscula" />
              </div>
            )}



            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                type="password"
                placeholder="CONFIRME A SENHA"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white/5 pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none text-white transition-all"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center font-medium">{message}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-purple-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-purple-500 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'PROCESSANDO...' : 'ATUALIZAR SENHA'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const RuleItem = ({ isValid, label }: { isValid: boolean; label: string }) => (
  <div className={`flex items-center gap-2 ${isValid ? 'text-green-400' : 'text-neutral-500'}`}>
    {isValid ? <Check size={14} /> : <X size={14} />}
    <span>{label}</span>
  </div>
);

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}