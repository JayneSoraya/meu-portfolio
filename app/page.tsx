"use client";

import { useState } from "react";
import Image from "next/image"; // Importação necessária
import { useRouter } from "next/navigation"; // Para redirecionar após login

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const router = useRouter();

  // Função de Login Conectada à API
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailEl = document.getElementById('login-email') as HTMLInputElement;
    const senhaEl = document.getElementById('login-senha') as HTMLInputElement;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email: emailEl.value, senha: senhaEl.value }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Bem-vinda, ${data.user.nome}! Redirecionando para área de vídeos...`);
        setIsModalOpen(false);
        router.push("/videos"); // Envia o usuário para a área protegida
      } else {
        alert(data.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    }
  };

  // Função de Cadastro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const nomeEl = document.getElementById('cad-nome') as HTMLInputElement;
    const emailEl = document.getElementById('cad-email') as HTMLInputElement;
    const senhaEl = document.getElementById('cad-senha') as HTMLInputElement;

    if (!nomeEl || !emailEl || !senhaEl) return;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          nome: nomeEl.value,
          email: emailEl.value,
          senha: senhaEl.value
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert("Cadastro realizado com segurança! Agora faça login.");
        setIsLoginView(true);
      } else {
        alert("Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Não foi possível conectar ao servidor");
    }
  };

  return (
    <>
      <header>
        <nav className="menu">
          <div>
            <Image 
              src="/img/logo-empresa-branca.webp" 
              alt="Logo JS SYSTEM" 
              width={150} 
              height={50} 
              className="logo-empresa"
            />
          </div>

          <ul className="container">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre mim</a></li>
            <li><a href="#portifolio">Projetos</a></li>
            <li><a href="#servico">Serviços</a></li>
            <li><a href="#servico">Blog</a></li>
            <li><a href="#contato">Contato</a></li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{ color: "cyan", background: "none", border: "none", cursor: "pointer", fontSize: "inherit", fontFamily: "inherit" }}
              >
                Login / Cadastro
              </button>
            </li>
          </ul>
        </nav>

        <section className="titulo" id="inicio">
          <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            <Image
              src="/img/fundo-titulo-site.webp"
              alt="Fundo título"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 className="site-title">Jayne Soraya dos Santos Silva</h1>
            <h2 className="site-subtitle">🚧 Portifólio em construção 🚧 dev full-stack developer</h2>
            <h2 className="site-subtitle">sr. email responder</h2>
          </div>
        </section>
      </header>

      <main>
        {/* ================= SEÇÃO SOBRE ================= */}
        <section className="sobre container" id="sobre">
          <h2 className="titulo-sobre">Sobre</h2>
          <figure className="avatar">
            {/* LINHA 52: Alterada de <img> para <Image /> */}
            <Image 
              src="/img/jayne.png" 
              alt="Foto de Jayne Soraya" 
              width={250} 
              height={250} 
              className="rounded-full"
            />
          </figure>
          <p>Dev que entende de gente e de máquina 🚀</p>
          <p>Future Systems Analyst | ADS. Interesse em Infraestrutura, DevOps e Automação.</p>
        </section>

        {/* ================= SEÇÃO PORTFÓLIO ================= */}
        <section className="portifolio container" id="portifolio">
          <h2>Projetos</h2>
          <div className="grid">
            {/* Exemplo de card corrigido com Image */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <Image 
                    src="/img/mulheresFelizes.jpg" 
                    alt="Projeto PLP" 
                    width={300} 
                    height={200} 
                    className="img-portifolio"
                  />
                </figure>
                <div className="card-back">
                  <h3>Projeto App PLP</h3>
                  <p>Documento de requisitos para PLPs.</p>
                  <a href="https://github.com/JayneSoraya/projeto-plp-araraquara" target="_blank" className="btn-link">Ver no Git</a>
                </div>
              </div>
            </div>
            {/* Repetir o padrão para os outros cards usando <Image /> */}
          </div>
        </section>

        {/* ================= SEÇÃO SERVIÇOS E CONTATO (Mantidas) ================= */}
        {/* ... código anterior ... */}
      </main>

      {/* ================= MODAL LOGIN / CADASTRO ================= */}
      {isModalOpen && (
        <div id="modal-login" className="modal-container" style={{ display: "flex" }}>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            <div id="form-box">
              {isLoginView ? (
                <div id="Login-view">
                  <h2>Acesse a Área VIP</h2>
                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <label>E-mail</label>
                      <input type="email" id="login-email" required />
                    </div>
                    <div className="input-group">
                      <label>Senha</label>
                      <input type="password" id="login-senha" required />
                    </div>
                    <button type="submit" className="btn-enviar">Entrar</button>
                    <p>Não tem conta? <button type="button" onClick={() => setIsLoginView(false)} style={{background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline"}}>Cadastre-se</button></p>
                  </form>
                </div>
              ) : (
                <div id="cadastro-view">
                  <h2>Crie sua conta</h2>
                  <form onSubmit={handleRegister}>
                    <div className="input-group">
                      <label>Nome</label>
                      <input type="text" id="cad-nome" required />
                    </div>
                    <div className="input-group">
                      <label>E-mail</label>
                      <input type="email" id="cad-email" required />
                    </div>
                    <div className="input-group">
                      <label>Senha</label>
                      <input type="password" id="cad-senha" required />
                    </div>
                    <button type="submit" className="btn-enviar">Cadastrar</button>
                    <p>Já tem conta? <button type="button" onClick={() => setIsLoginView(true)} style={{background: "none", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline"}}>Faça Login</button></p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="rodape">
        <p>Powered by JSSYSTEM Copyright © 2025. All Rights Reserved.</p>
        <p>Feito com ❤️ por Jayne Soraya</p>
      </footer>
    </>
  );
}