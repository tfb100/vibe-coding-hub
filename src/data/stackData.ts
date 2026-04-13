export interface StackItem {
  name: string;
  desc: string;
  example?: string;
  isNew: boolean;
  link?: string;
}

export interface StackSection {
  cat: string;
  icon: string;
  items: StackItem[];
}

export const stackData: StackSection[] = [
  {
    cat: "Frontend",
    icon: "🎨",
    items: [
      { name: "React", desc: "Biblioteca para criar interfaces baseadas em componentes reativos. Base do ecossistema frontend moderno.", example: "Facebook, Instagram", isNew: false, link: "https://react.dev" },
      { name: "Next.js", desc: "Framework React com Server Components, Turbopack e renderização híbrida. Padrão para a maioria dos SaaS em 2026.", example: "TikTok, Patreon", isNew: false, link: "https://nextjs.org" },
      { name: "Vue / Nuxt", desc: "Framework progressivo com Nuxt como meta-framework full-stack. Boa alternativa ao Next.js para times Vue.", example: "Nintendo, Gitlab", isNew: false, link: "https://nuxt.com" },
      { name: "SvelteKit", desc: "Framework full-stack minimalista com compilação zero-runtime. Altamente admirado por devs, excelente DX e performance.", example: "Checkout.com", isNew: true, link: "https://kit.svelte.dev" },
      { name: "TailwindCSS", desc: "Framework CSS utilitário para design rápido e customizado. Venceu a guerra de styling em 2026.", example: "Shopify, Vercel", isNew: false, link: "https://tailwindcss.com" },
      { name: "Shadcn UI", desc: "Componentes reutilizáveis e acessíveis para copiar e colar. Combina Tailwind + Radix UI em um sistema de design.", example: "Vercel", isNew: false, link: "https://ui.shadcn.com" },
      { name: "Radix UI", desc: "Primitivos de componentes sem estilo, acessíveis por padrão. Base do Shadcn e de muitos design systems modernos.", example: "Linear, Vercel", isNew: true, link: "https://www.radix-ui.com" },
      { name: "TanStack Query", desc: "Biblioteca para gerenciamento de server-state em React. Substitui Redux em SaaS modernos com cache e sync inteligente.", example: "Notionl, Shopify", isNew: true, link: "https://tanstack.com/query" },
    ]
  },
  {
    cat: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", desc: "Ambiente para executar JavaScript no servidor. Ecossistema enorme e padrão de mercado para backend JS/TS.", example: "Netflix, LinkedIn", isNew: false, link: "https://nodejs.org" },
      { name: "FastAPI", desc: "Framework Python moderno para APIs de altíssima performance com tipagem automática e docs geradas.", example: "Uber, Microsoft", isNew: false, link: "https://fastapi.tiangolo.com" },
      { name: "Django", desc: "Framework Python focado em segurança e velocidade de desenvolvimento. Ideal para SaaS com muito backend.", example: "Instagram, Spotify", isNew: false, link: "https://www.djangoproject.com" },
      { name: "Laravel", desc: "Framework PHP elegante para produtividade e sistemas SaaS com ecossistema maduro.", example: "Bitpanda, Laracasts", isNew: false, link: "https://laravel.com" },
      { name: "Express", desc: "Framework minimalista e flexível para roteamento em Node.js. Backbone de muitas APIs REST.", example: "PayPal, IBM", isNew: false, link: "https://expressjs.com" },
      { name: "NestJS", desc: "Framework TypeScript com arquitetura modular e opinionada. Best-in-class para backends enterprise em Node.", example: "Autodesk, Roche", isNew: true, link: "https://nestjs.com" },
      { name: "Hono", desc: "Framework web ultraligeiro para TypeScript e edge runtimes. Extremamente rápido, substitui Express em contextos serverless.", example: "Cloudflare, Vercel", isNew: true, link: "https://hono.dev" },
    ]
  },
  {
    cat: "Banco de Dados & Storage",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", desc: "O banco relacional mais robusto do mercado. Suporta JSONB, full-text search, RLS e pgvector para IA em um só lugar.", example: "Apple, Instagram", isNew: false, link: "https://www.postgresql.org" },
      { name: "MySQL", desc: "Banco relacional popular, rápido e de fácil manutenção. Amplamente adotado em stacks LAMP e LEMP.", example: "YouTube, Airbnb", isNew: false, link: "https://www.mysql.com" },
      { name: "MongoDB", desc: "Banco NoSQL para armazenamento flexível de documentos. Ideal para schemas dinâmicos e catálogos de produtos.", example: "Forbes, Adobe", isNew: false, link: "https://www.mongodb.com" },
      { name: "Redis", desc: "Banco em memória ultra-rápido para cache, sessões e filas. Reduz latência e carga no banco principal.", example: "Twitter, GitHub", isNew: false, link: "https://redis.io" },
      { name: "Supabase", desc: "Backend-as-a-Service baseado em Postgres com APIs automáticas, auth e storage. Alternativa open-source ao Firebase.", example: "PwC, Mozilla", isNew: false, link: "https://supabase.com" },
      { name: "AWS S3", desc: "Armazenamento escalável de objetos (imagens, vídeos, PDFs). Padrão de mercado para assets estáticos.", example: "Dropbox, Netflix", isNew: false, link: "https://aws.amazon.com/s3" },
      { name: "Prisma ORM", desc: "ORM TypeScript com modelo de dados intuitivo e type safety poderoso. Padrão para a maioria dos projetos Next.js + PostgreSQL.", example: "Taskade, Notabene", isNew: true, link: "https://www.prisma.io" },
      { name: "Drizzle ORM", desc: "ORM leve com sintaxe SQL-like em TypeScript. Ideal para edge functions e projetos que valorizam performance.", example: "Piku, Turso", isNew: true, link: "https://orm.drizzle.team" },
      { name: "pgvector", desc: "Extensão do PostgreSQL para busca vetorial e embeddings de IA. Habilita RAG e busca semântica sem banco externo.", example: "Supabase, Neon", isNew: true, link: "https://github.com/pgvector/pgvector" },
    ]
  },
  {
    cat: "Autenticação",
    icon: "🔐",
    items: [
      { name: "Clerk", desc: "Solução moderna para login e gestão de usuários com UI pré-construída e ótimo DX. Padrão para Next.js SaaS.", example: "Grafbase, Vercel", isNew: false, link: "https://clerk.com" },
      { name: "Auth0", desc: "Plataforma flexível para identidade corporativa com suporte a SSO, MFA e compliance enterprise.", example: "Atlassian, Mozilla", isNew: false, link: "https://auth0.com" },
      { name: "Firebase Auth", desc: "Autenticação simplificada do ecossistema Google. Fácil integração com apps mobile e web.", example: "Duolingo, Lyft", isNew: false, link: "https://firebase.google.com/docs/auth" },
      { name: "NextAuth", desc: "Biblioteca específica para autenticação segura em Next.js. Open-source e com suporte a OAuth, credentials e magic links.", example: "Vercel community", isNew: false, link: "https://next-auth.js.org" },
      { name: "better-auth", desc: "Solução de auth moderna para apps TypeScript full-stack. Leve, sem lock-in e integra with Hono e Next.js nativamente.", example: "supastarter", isNew: true, link: "https://www.better-auth.com" },
    ]
  },
  {
    cat: "Email",
    icon: "📧",
    items: [
      { name: "Resend", desc: "API de email moderna para desenvolvedores. Ótima DX, entregabilidade confiável e suporte nativo a React Email.", example: "Liveblocks, Perplexity", isNew: true, link: "https://resend.com" },
      { name: "React Email", desc: "Biblioteca para criar templates de email com componentes React. Par natural do Resend para transactional emails.", example: "Linear, Vercel", isNew: true, link: "https://react.email" },
    ]
  },
  {
    cat: "Pagamentos & Finanças",
    icon: "💳",
    items: [
      { name: "Stripe", desc: "O padrão ouro para pagamentos e assinaturas globais. API excelente, cobertura global e ecossistema maduro.", example: "Amazon, Shopify", isNew: false, link: "https://stripe.com" },
      { name: "Paddle", desc: "Merchant of Record que cuida de impostos internacionais automaticamente. Ideal para SaaS com vendas globais.", example: "Framer, Notion", isNew: false, link: "https://paddle.com" },
      { name: "Lemon Squeezy", desc: "Vendas de produtos digitais com burocracia reduzida.", example: "Carrd, creators", isNew: false, link: "https://lemonsqueezy.com" },
      { name: "ChartMogul", desc: "Analytics financeiro focado em métricas de assinatura. Dashboard de MRR, Churn e LTV em tempo real.", example: "Canva, Pipedrive", isNew: false, link: "https://chartmogul.com" },
    ]
  },
  {
    cat: "IA & Agentes",
    icon: "🤖",
    items: [
      { name: "Vercel AI SDK", desc: "SDK TypeScript para integrar LLMs em apps web. Provider-agnostic, streaming nativo e mais leve que LangChain para uso frontend.", example: "v0, ChatPDF", isNew: true, link: "https://sdk.vercel.ai" },
      { name: "LangChain", desc: "Framework para criar pipelines de lógica entre modelos de IA. Melhor para workflows backend complexos.", example: "Notion AI, Clay", isNew: false, link: "https://www.langchain.com" },
      { name: "LangGraph", desc: "Extensão do LangChain para agentes com fluxos cíclicos e controle de estado.", example: "Elastic, Adyen", isNew: false, link: "https://github.com/langchain-ai/langgraph" },
      { name: "CrewAI", desc: "Orquestração de múltiplos agentes de IA com papéis e objetivos definidos.", example: "Deloitte, IBM", isNew: false, link: "https://www.crewai.com" },
      { name: "LlamaIndex", desc: "A melhor ferramenta para conectar dados privados à IA (RAG).", example: "Dropbox AI, Notion", isNew: false, link: "https://www.llamaindex.ai" },
      { name: "Instructor", desc: "Garante que a IA responda em formatos de dados estruturados (JSON).", example: "LangChain ecosystem", isNew: false, link: "https://github.com/jxnl/instructor" },
      { name: "LangSmith", desc: "Plataforma para debug, teste e monitoramento de agentes de IA.", example: "Replit, Comet", isNew: false, link: "https://www.langchain.com/langsmith" },
      { name: "OpenAI", desc: "Provedor dos modelos GPT-4o e o1. Lidera o mercado em inteligência pura.", example: "Toda a indústria", isNew: false, link: "https://openai.com" },
      { name: "Anthropic", desc: "Provedor do Claude 3.5 Sonnet, favorito de desenvolvedores por sua precisão de raciocínio.", example: "Claude.ai", isNew: true, link: "https://www.anthropic.com" },
    ]
  },
  {
    cat: "Deploy & DevOps",
    icon: "🚀",
    items: [
      { name: "Vercel", desc: "A melhor experiência para hospedar Frontend e Next.js. Zero-config deploys, preview URLs e edge network global.", example: "Patreon, HashiCorp", isNew: false, link: "https://vercel.com" },
      { name: "Hetzner", desc: "Provedor de cloud europeu com excelente custo-benefício para servidores dedicados e VPS.", example: "SaaS self-hosted", isNew: false, link: "https://www.hetzner.com" },
      { name: "Coolify", desc: "Alternativa open-source ao Heroku/Vercel. Gerencia Docker, DBs e deploys automáticos em VPS própria.", example: "NewWiki infra", isNew: true, link: "https://coolify.io" },
      { name: "Railway", desc: "Deployment simples e escalável para Backend e Bancos de Dados. Suporta processos longos e Docker nativo.", example: "startups globais", isNew: false, link: "https://railway.app" },
      { name: "Docker", desc: "Containerização para rodar seu app em qualquer servidor com consistência entre ambientes.", example: "todo o mercado", isNew: false, link: "https://www.docker.com" },
      { name: "GitHub Actions", desc: "Automação de testes e deploy (CI/CD) integrada ao repositório. Padrão de mercado para pipelines.", example: "Microsoft, Vercel", isNew: false, link: "https://github.com/features/actions" },
      { name: "Upstash", desc: "Redis e agendamento de tarefas (Cron) serverless. Ideal para rate limiting e jobs periódicos em edge.", example: "Vercel ecosystem", isNew: false, link: "https://upstash.com" },
    ]
  },
  {
    cat: "Background Jobs",
    icon: "⚡",
    items: [
      { name: "BullMQ", desc: "Fila de jobs assíncronos baseada em Redis para Node.js. Essencial para processar tarefas pesadas em background.", example: "Taskade, Docusign", isNew: true, link: "https://bullmq.io" },
      { name: "Inngest", desc: "Plataforma serverless para funções em background com retry, observabilidade e agendamento sem infraestrutura.", example: "Vercel ecosystem", isNew: true, link: "https://www.inngest.com" },
    ]
  },
  {
    cat: "Gestão & Produtividade",
    icon: "🏗️",
    items: [
      { name: "Linear", desc: "Gestão de tickets ultra-rápida para times de tecnologia. UX excepcional e integração com GitHub.", example: "Vercel, Arc", isNew: false, link: "https://linear.app" },
      { name: "Notion", desc: "Wiki e documentação central para processos, roadmaps e conhecimento do time.", example: "Loom, Figma", isNew: false, link: "https://notion.so" },
      { name: "Loom", desc: "Comunicação em vídeo assíncrona para demos, feedbacks e documentação técnica.", example: "Figma, HubSpot", isNew: false, link: "https://www.loom.com" },
    ]
  },
  {
    cat: "Analytics & Monitoramento",
    icon: "📈",
    items: [
      { name: "PostHog", desc: "Analytics completo e self-hostable com gravação de sessão, funis, feature flags e A/B testing.", example: "Y Combinator startups", isNew: false, link: "https://posthog.com" },
      { name: "Sentry", desc: "Monitoramento de erros em tempo real com stack trace completo e alertas.", example: "Disney, GitHub", isNew: false, link: "https://sentry.io" },
      { name: "UptimeRobot", desc: "Monitoramento de disponibilidade com alertas de downtime.", example: "PMEs globais", isNew: false, link: "https://uptimerobot.com" },
      { name: "Datadog", desc: "APM completo para métricas de infraestrutura, logs e performance em produção.", example: "Samsung, Peloton", isNew: true, link: "https://www.datadoghq.com" },
      { name: "Plausible", desc: "Analytics de tráfego leve, privado e sem cookies. Foco em privacidade.", example: "Basecamp, Ghost", isNew: true, link: "https://plausible.io" },
    ]
  },
  {
    cat: "Testes & Qualidade",
    icon: "🧪",
    items: [
      { name: "Playwright", desc: "Automação de testes end-to-end no navegador. Suporta Chrome, Firefox e Safari.", example: "Microsoft, BBC", isNew: false, link: "https://playwright.dev" },
      { name: "Postman", desc: "Ferramenta para testar, simular e documentar APIs.", example: "todo o mercado", isNew: false, link: "https://www.postman.com" },
    ]
  },
  {
    cat: "Legal & Compliance",
    icon: "🏛️",
    items: [
      { name: "Vanta", desc: "Automação de conformidade para certificações SOC2 e ISO 27001.", example: "Vercel, Segment", isNew: false, link: "https://www.vanta.com" },
      { name: "Termly", desc: "Gerador de termos de uso e políticas de privacidade.", example: "startups globais", isNew: false, link: "https://termly.io" },
    ]
  },
  {
    cat: "Suporte ao Cliente",
    icon: "🛠️",
    items: [
      { name: "Intercom", desc: "Chat de suporte, onboarding e engajamento com IA integrada.", example: "Atlassian, Shopify", isNew: false, link: "https://www.intercom.com" },
      { name: "Crisp", desc: "Chat leve e eficiente para suporte ao cliente.", example: "europe startups", isNew: false, link: "https://crisp.chat" },
      { name: "Zendesk", desc: "Plataforma de tickets para operações de suporte em escala.", example: "Airbnb, Shopify", isNew: false, link: "https://www.zendesk.com" },
    ]
  },
];
