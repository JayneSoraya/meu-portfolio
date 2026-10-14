
import type { Project, Skill, AboutText, SocialLink, HardSkill } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "App PLPs",
    impact: " ♀️ impacto: Redução do tempo de planejamento pedagógico e padronização total de requisitos do coletivo.",
    description: " Como organizar a bagunça de um coletivo social sem perder o rumo na primeira semana? O Coletivo Bennu precisava estruturar as turmas das Promotoras Legais Populares (PLPs) em Araraquara, mas a complexidade de requisitos e a comunicação descentralizada geravam fricção. Em vez de criar apenas mais uma planilha, apliquei engenharia de requisitos e modelagem UML rigorosa para desenhar o fluxo operacional de ponta a ponta. O resultado foi a arquitetura de uma solução Full Stack robusta em Java e Spring Boot, transformando diretrizes sociais abstratas em uma API REST limpa, previsível e pronta para escalar.",
    image: "/img/mulheresFelizes.jpg",
    url: "https://github.com/JayneSoraya/projeto-plp-araraquara",
    tags: ["Full Stack", "UML", "Java", "Spring Boot", "API REST"],
    category: "impactoSocial"
  },
  {
    id: 2,
    title: "Auditoria Tembici",
    impact: "🔒 Impacto: Zero acessos indevidos e automação de 100% da checagem diária de conformidade de IAM.",
    description: "E se a sua infraestrutura detectasse brechas de acesso e abrisse chamados sozinha antes de você tomar o primeiro café? Gestão de identidades (IAM) manual é um convite silencioso para falhas de segurança e perda de prazos. Para resolver isso na operação da Tembici, desenvolvi uma automação em JavaScript que cruza dados de conformidade de segurança e prazos de acesso ativamente. O sistema audita o CrowdStrike e o Google Workspace em background, identifica desvios e abre chamados de forma autônoma no Jira e planilhas de controle. Menos cliques repetitivos, zero margem para esquecimento humano.",
    image: "/img/logo-tembici.webp",
    url: "https://www.linkedin.com/posts/jayne-soraya_sempre-busco-um-jeito-de-inovar-para-os-clientes-activity-7288344763362168832-mMlM/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACEhVZcB0j6ppdOhc_yT1YQRoSayumR8aNo",
    tags: ["Jira", "Google Sheets", "JavaScript", "CrowdStrike", "Google Workspace APIs"],
    category: "automacao" 
  },
  {
    id: 3,
    title: "Leigos e Troianos",
    impact: "📈 Impacto: Aumento na taxa de resposta de NPS e eliminação de agendamentos manuais sobrepostos.",
    description: "Como coletar o NPS real dos seus clientes sem parecer chato ou invasivo? Pesquisas de satisfação tradicionais sofrem com taxas de resposta pífias porque exigem esforço ativo do usuário. Resolvi isso redesenhando a jornada de atendimento do projeto Leigos e Troianos. Criei uma interface automatizada em Google Sites integrada a scripts em JavaScript que gerenciam a agenda e disparam pesquisas de NPS contextuais e personalizadas por e-mail no timing perfeito. O resultado? Coleta de dados orgânica e inteligência de atendimento rodando no piloto automático.",
    image: "/img/leigosetroianos.webp",
    url: "https://sites.google.com/view/leigos-e-troianos-atendimento/biografia",
    tags: ["Google Sites", "Automação", "JavaScript", "Full Stack", "Automação de E-mail"],
    category: "automacao"
  },
  {
    id: 4,
    title: "Comunicação em massa",
    impact: "🚀 Impacto: Prevenção de paradas fiscais e redução de 80% nos chamados urgentes de última hora.",
    description: "Como evitar que centenas de clientes parem de emitir notas fiscais da noite para o dia por uma mudança de legislação? A descontinuidade do hardware SAT pegou muitos estabelecimentos de surpresa, criando um risco crítico de interrupção nas vendas. Para antecipar o problema em escala, criei um script de comunicação em massa inteligente em JavaScript capaz de notificar, orientar e direcionar clientes de forma segmentada sobre a migração obrigatória para a NFC-e. Uma solução de engenharia voltada para negócio: reduziu drasticamente o volume de chamados de suporte em cima da hora e blindou a operação dos clientes.",
    image: "/img/logocomletrinha.webp",
    url: "https://www.linkedin.com/posts/jayne-soraya_javascript-desenvolvimentoweb-aprendizadocontaednuo-activity-7405279123151187969-4oWW/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACEhVZcB0j6ppdOhc_yT1YQRoSayumR8aNo",
    tags: ["JavaScript", "NFCe", "Sat", "Regulamentação Fiscal"],
    category: "automacao"
  }
  ,
  {
    id: 5,
    title: "Imersões Alura",
    impact: "🎓 Impacto: Aumento da eficiência de aprendizado e engajamento dos alunos com conteúdos práticos e interativos.",
    description: "Usado como laboratório, faço as aulas usando a plataforma da Alura, o famoso mão na massa.",
    image: "/img/alura.webp",
     url: "https://github.com/JayneSoraya/Lab-Alura/blob/main/README.md",
    tags: ["Python", "Automação", "DevOps"],
    category: "desenvolvimento"
  },
  {
    id: 6,
    title: "Empreenda Senac",
    impact: "🏆 Impacto: Semifinalista do Empreenda Senac 18ª ed. com validação de modelo de economia de até R$ 87/mês por usuário.",
    description: "Criei o SaveMoney para a competição do empreenda Senac 18ª edição. Cheguei na semi final, foi uma experiência fascinante!",
    image: "/img/empreendasenac.webp",
     url: "https://github.com/JayneSoraya/Empreenda-Senac",
    tags: ["React", "UI/UX", "Responsive"],
    category: "desenvolvimento"
  }
  ,
  {
    id: 7,
    title: "Artes & Design Publicitário",
    impact: "🎯 Impacto: Construção de interfaces com foco em psicologia visual, retenção e máxima usabilidade.",
    description: "A união entre design, comunicação e código. Aplicação prática de conceitos de publicidade e propaganda na estruturação de layouts intuitivos, hierarquia visual e experiência do usuário (UI/UX) alinhadas às metas do negócio.",
    image: "/img/primeiraArte.webp",
    url: "https://github.com/JayneSoraya/Empreenda-Senac",
    tags: ["React", "UI/UX", "Responsive", "Desing","Responsive"],
    category: "desenvolvimento"
  }

  ,
  {
    id: 8,
    title: "Jogo Vivência escolar",
    impact: "🎮 Impacto: Desenvolvimento de um jogo interativo para simular a vivência escolar do Ensino Integral.",
    description: "Engenharia e gamificação aplicadas à adaptação social. Desenvolvimento de um jogo interativo que simula a rotina do Ensino Integral, utilizando mecânicas de engajamento para habituar e tranquilizar estudantes em fase de transição.",
    image: "/img/jogoEscolar.png",
     url: "https://github.com/JayneSoraya/Empreenda-Senac",
    tags: ["Unity", "UI/UX", "Responsive", "Gamificação"],
    category: "desenvolvimento"
  } 
  
];

export const skills: Skill[] = [
  { name: "React", level: 70 },
  { name: "Node.js", level: 70 },
  { name: "JavaScript", level: 85 },
  { name: "Python", level: 65 },
  { name: "PL/SQL", level: 90 },
  { name: "Java", level: 65 },
  { name: "Git", level: 95 },
  { name: "Infraestrutura", level: 90 }
];


export const hardSkills: HardSkill[] = [
  { name: "Proatividade", level: 91 },
  { name: "Liderança", level: 72 },
  { name: "Comunicação", level: 93 },
  { name: "Resolução de Problemas", level: 95 },
  { name: "Criatividade", level: 90 },
  { name: "Inovação", level: 85 },
  { name: "Inglês Reading, writing and listening", level: 50 },
  { name: "Trabalho em equipe", level: 85 }
];

export const aboutText: AboutText = {
  title: "SOBRE_MIM",
  description: "Dev que entende de gente e de máquina.",
  detailedDescription: "Durante anos como Analista de Infraestrutura e Suporte, eu fui a pessoa que consertava o sistema quando ele caía. Mas percebi algo fundamental: o melhor código é aquele que evita que o problema aconteça no código-fonte.Essa experiência na trincheira técnica moldou minha visão como Engenheira de Software. Não construo apenas aplicações bonitas em React, Node.js ou Java; eu desenho sistemas resilientes, com regras de negócio complexas validadas (como integrações fiscais rigorosas de SAT e NFC-e) e fluxos focados em conversão e usabilidade.Minha missão? Unir a estabilidade que a infraestrutura exige com a agilidade e inovação que o desenvolvimento de produtos modernos precisa."
};

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/JayneSoraya", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/jayne-soraya/", icon: "linkedin" },
  { name: "Behance", url: "https://www.behance.net/jaynesoraya", icon: "behance" },
  { name: "Email", url: "mailto:jayne.soraya@hotmail.com", icon: "mail" },
  { name: "WhatsApp", url: "https://wa.me/5516988209408", icon: "phone" }
];