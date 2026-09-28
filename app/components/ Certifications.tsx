'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

const certificationsData: CertificationItem[] = [
  {
    title: 'Module 1: Personal and Professional Development',
    issuer: 'Aspire Institute',
    issueDate: 'Junho 2025',
    expirationDate: 'Junho 2030',
  },
  {
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Maio 2025',
    expirationDate: 'Maio 2026',
    description:
      'Projetar, desenvolver, depurar, executar e refatorar programas em Python 3. Pensamento algorítmico para análise e solução de problemas. Uso de sintaxe, semântica e biblioteca padrão do Python para desenvolvimento de scripts e desafios práticos.',
  },
  {
    title: 'Computer Hardware Basics',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Abril 2025',
    expirationDate: 'Junho 2026',
    description:
      'Instalação, manutenção preventiva, diagnóstico e reparo de hardware de computadores pessoais, notebooks e dispositivos móveis. Aplicação de normas gerais de segurança e prevenção de incêndios.',
  },
  {
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Abril 2025',
    expirationDate: 'Junho 2026',
    description:
      'Aplicação de conceitos de cibersegurança e documentação de postura de rede. Configuração de firewalls simulados e proteção em sistemas Linux/Windows. Gestão de identidades, segurança em nuvem, PKI e ambientes virtuais de computação.',
  },
  {
    title: 'Modelagem de Ameaças',
    issuer: 'Alura',
    issueDate: 'Abril 2025',
    expirationDate: 'Junho 2030',
    credentialId: 'ccdf2d64-f447-403c-8345-44d764fd9203',
    credentialUrl:
      'https://cursos.alura.com.br/certificate/ccdf2d64-f447-403c-8345-44d764fd9203?lang',
  },
  {
    title: 'Looker Studio: Criando o Primeiro Relatório',
    issuer: 'Alura',
    issueDate: 'Agosto 2024',
    expirationDate: 'Agosto 2027',
    credentialUrl:
      'https://cursos.alura.com.br/user/jaysoy/course/looker-studio-primeiro-relatorio/certificate',
  },
  {
    title: 'Git e GitHub: Compartilhando e Colaborando em Projetos',
    issuer: 'Alura',
    issueDate: 'Julho 2024',
    expirationDate: 'Junho 2027',
    credentialUrl:
      'https://cursos.alura.com.br/user/jaysoy/course/git-github-compartilhando-colaborando-projetos/formalCertificate',
  },
  {
    title: 'Git e GitHub: Dominando Controle de Versão de Código',
    issuer: 'Alura',
    issueDate: 'Julho 2024',
    expirationDate: 'Julho 2027',
    credentialUrl:
      'https://cursos.alura.com.br/certificate/6ee4f223-b9ac-428d-b9b2-fd2f3da9dcdb?lang=pt_BR',
  },
  {
    title: 'Assistente de Atendimento e Planejamento Publicitário',
    issuer: 'Senac Serviço Nacional de Aprendizagem Comercial',
    issueDate: 'Agosto 2019',
    credentialId: 'SED sob o n° 01956824640',
  },
  {
    title: 'Assistente de Criação Publicitária',
    issuer: 'Senac Serviço Nacional de Aprendizagem Comercial',
    issueDate: 'Agosto 2019',
    credentialId: 'SED sob o n° 01960544958',
  },
];

const Certifications: React.FC = () => {
  return (
    <section id="certificacoes" className="py-24 container mx-auto px-6">
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
            Licenças e Certificados
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-purple-600 to-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificationsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="flex flex-col justify-between p-6 rounded-2xl border border-purple-600/30 bg-purple-900/10 backdrop-blur-sm shadow-xl shadow-purple-500/5 hover:border-purple-500/60 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Overlay suave ao passar o mouse */}
              <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-lg font-bold text-white tracking-wide leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-purple-400 font-medium text-sm">
                  {item.issuer}
                </p>

                <p className="text-xs text-neutral-400 font-medium">
                  Emitido em {item.issueDate}
                  {item.expirationDate ? ` · Expira em ${item.expirationDate}` : ''}
                </p>

                {item.description && (
                  <p className="text-xs text-neutral-300 leading-relaxed border-l-2 border-purple-500/40 pl-3 mt-2">
                    {item.description}
                  </p>
                )}
              </div>

              {(item.credentialId || item.credentialUrl) && (
                <div className="mt-4 pt-3 border-t border-purple-600/20 flex flex-col gap-2">
                  {item.credentialId && (
                    <p className="text-[11px] text-neutral-400 font-mono truncate">
                      <span className="text-neutral-500">ID:</span> {item.credentialId}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200 w-fit"
                    >
                      Exibir credencial
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;