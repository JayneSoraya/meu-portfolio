"use client"; // Necessário para usar interações (clicks, modal)

import { useState } from "react";

export default function Home() {
  // Estados para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true); // true = Login, false = Cadastro

  // Função para lidar com o envio do login (placeholder)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Botão de Login clicado! (Lógica será conectada depois)");
  };

  // Função para lidar com o envio do cadastro (placeholder)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const nomeEl = document.getElementById('cad-nome') as HTMLInputElement;
    const emailEl = document.getElementById('cad-email') as HTMLInputElement;
    const senhaEl = document.getElementById('cad-senha') as HTMLInputElement;
  
  if (!nomeEl || !emailEl || !senhaEl) return;

  try{
    const response = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({
       nome: nomeEl.value, 
       email: emailEl.value,
       senha: senhaEl.value }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    alert("Cadastro realizado! Agora tente fazer login.");
    setIsLoginView(true);
  } else {
    alert("Erro ao cadastrar." );
  }
  } catch(error){
    console.error("Erro na requisição:", error);
    alert("Não foi possível conectar ao servidor");
  }
  };

  return (
    <>
      <header>
        <nav className="menu">
          <div>
            <img src="/img/logo-empresa-branca.webp" alt="Logo da empresa JSSYSTEM" className="logo-empresa" />
          </div>

          <ul className="container">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre mim</a></li>
            <li><a href="#portifolio">Projetos</a></li>
            <li><a href="#servico">Serviços</a></li>
            <li><a href="#servico">Blog</a></li>
            <li><a href="#contato">Contato</a></li>
            <li>
              {/* Botão que abre o modal */}
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
          <div>
            <picture>
              <source srcSet="img/fundo-titulo-site.webp" type="image/webp" />
              <img className="img-fundo" src="/img/fundo-titulo-site.webp" alt="fundo" loading="lazy" />
            </picture>
          </div>
          <div>
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
            <picture>
              <source srcSet="img/jayne.webp" type="image/webp" />
              <source srcSet="img/jayne.png" type="image/png" />
              <img src="/img/jayne.png" alt="Foto de Jayne Soraya sentada na grama sorrindo" loading="lazy" />
            </picture>
          </figure>

          <p>Dev que entende de gente e de máquina 🚀</p>
          <p>Future Systems Analyst | Em formação em Análise e Desenvolvimento de Sistemas. Interesse em Infraestrutura, DevOps e Automação.</p>
          <p>Experiência com suporte técnico corporativo, resolução de incidentes complexos e administração de ambientes Windows e Linux, além de automação com Google Apps Script.</p>
          <p>Conhecimento em Active Directory, VPN, ITIL, Office 365 e atendimento ao usuário com foco em eficiência e melhoria contínua.</p>
          <p>Busco desafios para aplicar minhas habilidades e contribuir com inovação e eficiência em TI.</p>
        </section>

        {/* ================= SEÇÃO PORTFÓLIO ================= */}
        <section className="portifolio container" id="portifolio">
          <h2>Projetos</h2>
          <div className="grid">
            
            {/* Card 1 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/mulheresFelizes.webp" type="image/webp" />
                    <source srcSet="img/mulheresFelizes.jpg" type="image/jpeg" />
                    <img className="img-portifolio" src="/img/mulheresFelizes.jpg" alt="mulheres felizes" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Projeto App PLP</h3>
                  <p>Criei o documento de requisitos das Promotoras Legais Populares (PLPs).</p>
                  <a href="https://github.com/JayneSoraya/projeto-plp-araraquara/blob/main/README.md" target="_blank" className="btn-link">Ver projeto no Git</a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/auditoria.webp" type="image/webp" />
                    <source srcSet="img/auditoria.jpg" type="image/jpeg" />
                    <img className="img-portifolio" src="/img/auditoria.jpg" alt="Mulher olhando papeis" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Auditoria Tembici</h3>
                  <p>Automatizei o processo de IAM com JavaScript, validando prazos e gerando chamados.</p>
                  <a href="https://www.linkedin.com/posts/jayne-soraya_sempre-busco-um-jeito-de-inovar-para-os-clientes-activity-7288344763362168832-mMlM?utm_source=share&utm_medium=member_desktop&rcm=ACoAACEhVZcB0j6ppdOhc_yT1YQRoSayumR8aNo" target="_blank" className="btn-link">Saiba mais</a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/alura.webp" type="image/webp" />
                    <source srcSet="img/alura.jpg" type="image/jpg" />
                    <img className="img-portifolio" src="/img/alura.png" alt="Logo imersão Alura" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Imersões Alura</h3>
                  <p>Usado como laboratório, faço as aulas usando a plataforma da Alura, o famoso mão na massa</p>
                  <a href="https://github.com/JayneSoraya/Lab-Alura/blob/main/README.md" target="_blank" className="btn-link">Ver projetos no Git</a>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/leigosetroianos.webp" type="image/webp" />
                    <source srcSet="img/leigosetroianos.jpg" type="image/jpg" />
                    <img className="img-portifolio" src="/img/leigosetroianos.jpg" alt="Logo Leigos e Troianos" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Leigos e Troianos</h3>
                  <p>Desenvolvi um site no Google Sites para automatizar horários, coletar dados de NPS e enviar pesquisas por e-mail com JavaScript.</p>
                  <a href="https://sites.google.com/view/leigos-e-troianos-atendimento/biografia" target="_blank" className="btn-link">Saiba mais</a>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/empreendasenac.webp" type="image/webp" />
                    <source srcSet="img/empreendasenac.jpg" type="image/jpg" />
                    <img className="img-portifolio" src="/img/empreendasenac.jpg" alt="empreenda senac logo" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Empreenda Senac</h3>
                  <p>Criação do projeto SaveMoney para o evento do empreenda Senac 18ª edição. Cheguei na semi final, foi uma experiência fascinante!</p>
                  <a href="https://github.com/JayneSoraya/Empreenda-Senac" target="_blank" className="btn-link">Ver projeto no Git</a>
                </div>
              </div>
            </div>

            {/* Card 6 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/logocomletrinha.webp" type="image/webp" />
                    <source srcSet="img/logocomletrinha.jpg" type="image/jpg" />
                    <img className="img-portifolio" src="/img/logocomletrinha.jpg" alt="intuictive logo" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Intuictive</h3>
                  <p>Comunicação em massa com JavaScript para ação preventiva sobre a descontinuidade do Sat e a migração para NFCe.</p>
                  <a href="https://github.com/JayneSoraya/Empreenda-Senac" target="_blank" className="btn-link">Saiba mais</a>
                </div>
              </div>
            </div>

            {/* Card 7 */}
            <div className="flip-card">
              <div className="card">
                <figure className="card-front">
                  <picture>
                    <source srcSet="img/primeiraArte.webp" type="image/webp" />
                    <img className="img-portifolio" src="/img/primeiraArte.webp" alt="vetores" loading="lazy" />
                  </picture>
                </figure>
                <div className="card-back">
                  <h3>Artes</h3>
                  <p>Aplicando teoria, técnica e prática da publicidade e propaganda.</p>
                  <a href="https://www.behance.net/jaynesoraya/projects" target="_blank" className="btn-link">Saiba mais</a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= SEÇÃO SERVIÇOS ================= */}
        <section className="servicos container" id="servico">
          <h2>Serviços</h2>
          <div className="servicos-content">
            <div className="servicos-info">
              <h3>O que posso fazer por você?</h3>
              <ul>
                <li><i className="fas fa-code"></i> Criação de Landing Pages</li>
                <li><i className="fas fa-bug"></i> Automação de processos</li>
                <li><i className="fas fa-server"></i> Configuração de Infraestrutura</li>
                <li><i className="fas fa-tools"></i> Suporte Técnico Especializado</li>
              </ul>
            </div>

            <div className="from-container">
              <h3>Solicite um orçamento</h3>
              <form action="https://formsubmit.co/jayne.soraya@hotmail.com" method="POST">
                <input type="hidden" name="_next" value="https://jaynesoraya.github.io/meu-portfolio/" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="input-group">
                  <label htmlFor="nome">Nome</label>
                  <input type="text" id="nome" name="nome" required placeholder="Digite seu nome" />
                </div>

                <div className="input-group">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" required placeholder="Informe seu e-mail" />
                </div>

                <div className="input-group">
                  <label htmlFor="tipo-servico">Tipo de Serviço</label>
                  <select id="tipo-servico" name="service">
                    <option value="landing-page">Desenvolvimento Web</option>
                    <option value="automacao">Automação / Scripting</option>
                    <option value="suporte">Suporte / Infra</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="mensagem">Mensagem</label>
                  <textarea id="mensagem" name="message" rows={4} required placeholder="Descreva o que precisa..."></textarea>
                </div>

                <button type="submit" className="btn-enviar">Enviar Solicitação</button>
              </form>
            </div>
          </div>
        </section>

        {/* ================= SEÇÃO CONTATO ================= */}
        <section className="contato container" id="contato">
          <h2>Contato</h2>
          <div className="icons">
            <a target="_blank" href="https://github.com/JayneSoraya">
              <i className="fab fa-github"></i>
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/jayne-soraya/">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://wa.me/5516988209408?text=Olá,%20vi%20seu%20portfólio%20e%20quero%20um%20orçamento" target="_blank" className="btn-link" style={{ display: "inline-block", color: "#FFFF" }}>
              <i className="fab fa-whatsapp"></i>
            </a>
            <a target="_blank" href="https://www.behance.net/jaynesoraya/services">
              <i className="devicon-behance-plain"></i>
            </a>
            <a href="mailto:jayne.soraya@hotmail.com">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </section>
      </main>

      {/* ================= MODAL LOGIN / CADASTRO ================= */}
      {isModalOpen && (
        <div id="modal-login" className="modal-container" style={{ display: "flex" }}>
          <div className="modal-content">
            {/* Botão de Fechar */}
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            
            <div id="form-box">
              {/* === VISÃO DE LOGIN === */}
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
                /* === VISÃO DE CADASTRO === */
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

      {/* ================= RODAPÉ ================= */}
      <footer className="rodape" id="rodape">
        <div>
          <div>
            <p>Powered by JSSYSTEM Copyright © 2025. All Rights Reserved.</p>
          </div>
          <div>Feito com ❤️ por Jayne Soraya</div>
        </div>
      </footer>
    </>
  );
}