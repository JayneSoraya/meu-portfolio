<h4 align = "center">
    :construction: Projeto em construção :construction:
</h4>

# Meu portfólio
 Um pouquinho sobre mim  e sobre a engenharia por trás deste projeto

* [Título e Imagem de capa](#título-e-imagem-de-capa)
* [Badges](#badges)
* [índice](#índice)
* [Descrição do Projeto](#descrição-do-projeto)
* [Status do Projeto](#status-do-projeto)
* [Arquitetura de Segurança & DevSecOps](#arquitetura-de-segurança--devsecops)
* [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Pessoas Contribuidoras](#pessoas-contribuidoras)
* [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras-do-projeto)
* [Licença](#licença)
* [Conclusão](#conclusão)

# Título e Imagem de capa
Portfólio / Sistema Full-Stack de Autenticação e Gestão

<img src="https://i.imgur.com/CdJcH78.png" width="1080" height="1350" /> 

---

# Badges

[![CodeQL Analysis](https://github.com/JayneSoraya/meu-portfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/JayneSoraya/meu-portfolio/actions/workflows/codeql.yml)
![Dependabot Status](https://img.shields.io/badge/dependabot-active-brightgreen?logo=dependabot)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)

---

# Índice 

- [Descrição do Projeto](#descrição-do-projeto)
- [Arquitetura de Segurança & DevSecOps](#arquitetura-de-segurança--devsecops)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

---

# Descrição do Projeto

Este projeto consiste em uma aplicação web full-stack desenvolvida em **Next.js (App Router)** com foco em **Security by Design**, desempenho em ambiente Serverless e experiência de usuário moderna. 

O sistema conta com fluxos seguros de autenticação (Registro, Login, Recuperação e Redefinição de senha com tokens criptografados e expiração), proteção contra ataques de força bruta no Edge e integração com banco de dados em nuvem.

 🛠️ **Linguagens e Base**: 
 
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" width="40" height="40" /> 

🖼️ **Front-end (Interface):**
Next.js | React | Tailwind CSS | Framer Motion | Axios

⚙️ **Back-end (Servidor e API):**
Next.js API Routes | Nodemailer | Bcryptjs | Upstash Rate Limit

🗄️ **Banco de Dados e Infraestrutura:**
PostgreSQL | Neon Serverless | @neondatabase/serverless | Vercel 

---

# Status do Projeto

 :construction: **Em desenvolvimento ativo** (Aprimorando novas camadas de monitoramento, testes automatizados e refinamento de interface). :construction:

---

# Arquitetura de Segurança & DevSecOps

O projeto adota uma estratégia de **Defesa em Profundidade (Defense in Depth)**, protegendo todas as camadas da aplicação (Client, Edge, Server e Database):
### 🛡️ Matriz de Controles de Segurança

| Camada | Mecanismo | Implementação Técnica |
| :--- | :--- | :--- |
| **Borda / Edge** | Rate Limiting Global | `@upstash/ratelimit` + Redis em rotas de autenticação (`/api/auth/*`) para mitigar Brute Force. |
| **Aplicação** | Security Headers | `next.config.mjs` configurado com CSP estrita, `X-Frame-Options: DENY` e `X-Content-Type-Options: nosniff`. |
| **Autenticação** | Hashing & Cookies | Senhas hashadas com `bcryptjs` (salt round 10) e tokens em cookies seguros. |
| **Banco de Dados**| Parametrização | Queries SQL seguras via `@neondatabase/serverless` para prevenção contra SQL Injection. |
| **DevSecOps** | SAST & SCA | Pipeline de CI/CD via GitHub Actions com **CodeQL** (análise estática) e **Dependabot**. |

---

# Funcionalidades e Demonstração da Aplicação

- **Autenticação Segura:** Cadastro de usuários com hash de senha por Bcrypt e validação de e-mail.
- **Recuperação de Senha por Token:** Geração de token criptografado com validade de 1 hora e envio de e-mails transacionais via Nodemailer.
- **Proteção contra Brute Force:** Limitação de requisições por IP nas rotas sensíveis utilizando Redis (retornando HTTP 429 quando excedido).
- **Rotas Privadas Protegidas:** Redirecionamento e controle de acesso via Middleware no Next.js.

---

# Acesso ao Projeto

Você pode clonar o repositório e rodar o projeto localmente:

```
# Clone o repositório
git clone https://github.com/SEU_USUARIO/meu-portfolio.git

# Entre na pasta
cd meu-portfolio

# Instale as dependências
npm install

# Configure o arquivo .env.local com suas credenciais do Neon e Upstash

# Inicie o servidor de desenvolvimento
npm run dev
```

---

# Tecnologias Utilizadas

| Categoria | Tecnologias |
| :--- | :--- |
| **Framework & Linguagem** | ![Next.js](https://img.shields.io/badge/Next.js_14+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) |
| **Estilização & Animação** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) |
| **Banco de Dados & Cache** | ![Neon Database](https://img.shields.io/badge/Neon_PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=black) ![Redis / Upstash](https://img.shields.io/badge/Upstash_Redis-FF4438?style=for-the-badge&logo=redis&logoColor=white) |
| **CI/CD & DevSecOps** | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) ![CodeQL SAST](https://img.shields.io/badge/CodeQL_SAST-181717?style=for-the-badge&logo=github&logoColor=white) |

# Pessoas Contribuidoras

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

# Pessoas Desenvolvedoras do Projeto

| [<img src="https://avatars.githubusercontent.com/u/67378860?v=4" width=115 style="border-radius: 50%;"><br><sub>**Jayne Soraya**</sub>](https://github.com/JayneSoraya) |
| :---: |
| Desenvolvedora Full-Stack |

# Licença

Este projeto está licenciado sob a licença [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) — © 2026 Jayne Soraya. 

Você é livre para compartilhar (copiar e redistribuir o material em qualquer suporte ou formato) e adaptar (remixar, transformar e criar a partir do material) para qualquer fim, mesmo que comercial, desde que dê os créditos devidos à autora original.

# Conclusão

Este projeto reflete a aplicação prática de conceitos avançados de engenharia de software, segurança de aplicações web (AppSec) e boas práticas de desenvolvimento moderno.