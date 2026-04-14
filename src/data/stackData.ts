import type { StackSection } from '../types/stack';

export const stackData: StackSection[] = [
  {
    cat: "Frontend",
    icon: "🎨",
    items: [
      { name: "React", desc: "Biblioteca para criar interfaces baseadas em componentes reativos. Base do ecossistema frontend moderno.", example: "Facebook, Instagram", isNew: false, link: "https://react.dev", repo: "facebook/react" },
      { name: "Next.js", desc: "Framework React com Server Components, Turbopack e renderização híbrida. Padrão para a maioria dos SaaS em 2026.", example: "TikTok, Patreon", isNew: false, link: "https://nextjs.org", repo: "vercel/next.js" },
      { name: "Vue / Nuxt", desc: "Framework progressivo com Nuxt como meta-framework full-stack. Boa alternativa ao Next.js para times Vue.", example: "Nintendo, Gitlab", isNew: false, link: "https://nuxt.com", repo: "nuxt/nuxt" },
      { name: "SvelteKit", desc: "Framework full-stack minimalista com compilação zero-runtime. Altamente admirado, excelente DX e performance.", example: "Checkout.com", isNew: true, link: "https://kit.svelte.dev", repo: "sveltejs/kit" },
      { name: "TailwindCSS", desc: "Framework CSS utilitário para design rápido e customizado. Venceu a guerra de styling em 2026.", example: "Shopify, Vercel", isNew: false, link: "https://tailwindcss.com", repo: "tailwindlabs/tailwindcss" },
      { name: "Shadcn UI", desc: "Componentes reutilizáveis e acessíveis para copiar e colar. Combina Tailwind + Radix UI em um sistema de design.", example: "Vercel", isNew: false, link: "https://ui.shadcn.com", repo: "shadcn-ui/ui" },
      { name: "Radix UI", desc: "Primitivos de componentes sem estilo, acessíveis por padrão. Base do Shadcn e de muitos design systems.", example: "Linear, Vercel", isNew: true, link: "https://www.radix-ui.com", repo: "radix-ui/primitives" },
      { name: "TanStack Query", desc: "Gerenciamento de server-state em React. Substitui Redux com cache e sync inteligente.", example: "Notion, Shopify", isNew: true, link: "https://tanstack.com/query", repo: "tanstack/query" },
    ]
  },
  {
    cat: "Backend",
    icon: "⚙️",
    items: [
      { name: "Node.js", desc: "Ambiente para executar JavaScript no servidor. Ecossistema enorme e padrão de mercado para backend JS/TS.", example: "Netflix, LinkedIn", isNew: false, link: "https://nodejs.org", repo: "nodejs/node" },
      { name: "FastAPI", desc: "Framework Python moderno para APIs de altíssima performance com tipagem automática e docs geradas.", example: "Uber, Microsoft", isNew: false, link: "https://fastapi.tiangolo.com", repo: "tiangolo/fastapi" },
      { name: "Django", desc: "Framework Python focado em segurança e velocidade de desenvolvimento. Ideal para SaaS com muito backend.", example: "Instagram, Spotify", isNew: false, link: "https://www.djangoproject.com", repo: "django/django" },
      { name: "Laravel", desc: "Framework PHP elegante para produtividade e sistemas SaaS com ecossistema maduro.", example: "Bitpanda", isNew: false, link: "https://laravel.com", repo: "laravel/laravel" },
      { name: "Express", desc: "Framework minimalista e flexível para roteamento em Node.js. Backbone de muitas APIs REST.", example: "PayPal, IBM", isNew: false, link: "https://expressjs.com", repo: "expressjs/express" },
      { name: "NestJS", desc: "Framework TypeScript com arquitetura modular e opinionada. Best-in-class para backends enterprise em Node.", example: "Autodesk, Roche", isNew: true, link: "https://nestjs.com", repo: "nestjs/nest" },
      { name: "Hono", desc: "Framework web ultraligeiro para TypeScript e edge runtimes. Substitui Express em contextos serverless.", example: "Cloudflare, Vercel", isNew: true, link: "https://hono.dev", repo: "honojs/hono" },
    ]
  },
  {
    cat: "Banco de Dados & Storage",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", desc: "O banco relacional mais robusto do mercado. Suporta JSONB, RLS e pgvector para IA.", example: "Apple, Instagram", isNew: false, link: "https://www.postgresql.org" },
      { name: "MySQL", desc: "Banco relacional popular, rápido e de fácil manutenção.", example: "YouTube, Airbnb", isNew: false, link: "https://www.mysql.com" },
      { name: "MongoDB", desc: "Banco NoSQL para armazenamento flexível de documentos.", example: "Forbes, Adobe", isNew: false, link: "https://www.mongodb.com" },
      { name: "Redis", desc: "Banco em memória ultra-rápido para cache, sessões e filas.", example: "Twitter, GitHub", isNew: false, link: "https://redis.io" },
      { name: "Supabase", desc: "Backend-as-a-Service baseado em Postgres com APIs automáticas, auth e storage.", example: "PwC, Mozilla", isNew: false, link: "https://supabase.com" },
      { name: "AWS S3", desc: "Armazenamento escalável de objetos (imagens, vídeos, PDFs). Padrão de mercado.", example: "Dropbox, Netflix", isNew: false, link: "https://aws.amazon.com/s3" },
      { name: "Prisma ORM", desc: "ORM TypeScript com modelo de dados intuitivo e type safety poderoso.", example: "Taskade", isNew: true, link: "https://www.prisma.io" },
      { name: "Drizzle ORM", desc: "ORM leve com sintaxe SQL-like em TypeScript. Ideal para edge functions.", example: "Piku, Turso", isNew: true, link: "https://orm.drizzle.team" },
      { name: "pgvector", desc: "Extensão do PostgreSQL para busca vetorial e embeddings de IA. Habilita RAG sem banco externo.", example: "Supabase, Neon", isNew: true, link: "https://github.com/pgvector/pgvector" },
    ]
  },
  {
    cat: "Autenticação",
    icon: "🔐",
    items: [
      { name: "Clerk", desc: "Solução moderna para login e gestão de usuários com UI pré-construída.", example: "Grafbase", isNew: false, link: "https://clerk.com" },
      { name: "Auth0", desc: "Plataforma flexível para identidade corporativa com suporte a SSO, MFA e compliance.", example: "Atlassian, Mozilla", isNew: false, link: "https://auth0.com" },
      { name: "Firebase Auth", desc: "Autenticação simplificada do ecossistema Google.", example: "Duolingo, Lyft", isNew: false, link: "https://firebase.google.com" },
      { name: "NextAuth", desc: "Biblioteca de autenticação segura para Next.js. Open-source com OAuth e magic links.", example: "Vercel community", isNew: false, link: "https://next-auth.js.org" },
      { name: "better-auth", desc: "Auth moderna para apps TypeScript full-stack. Leve, sem lock-in.", example: "supastarter", isNew: true, link: "https://www.better-auth.com" },
    ]
  },
  {
    cat: "Email",
    icon: "📧",
    items: [
      { name: "Resend", desc: "API de email moderna para devs. Entregabilidade confiável e suporte nativo a React Email.", example: "Liveblocks, Perplexity", isNew: true, link: "https://resend.com" },
      { name: "React Email", desc: "Templates de email com componentes React. Par natural do Resend.", example: "Linear, Vercel", isNew: true, link: "https://react.email" },
    ]
  },
  {
    cat: "Pagamentos & Finanças",
    icon: "💳",
    items: [
      { name: "Stripe", desc: "O padrão ouro para pagamentos e assinaturas globais.", example: "Amazon, Shopify", isNew: false, link: "https://stripe.com" },
      { name: "Paddle", desc: "Merchant of Record com gestão automática de impostos internacionais.", example: "Framer, Notion", isNew: false, link: "https://paddle.com" },
      { name: "Lemon Squeezy", desc: "Vendas de produtos digitais com burocracia reduzida.", example: "Carrd", isNew: false, link: "https://lemonsqueezy.com" },
      { name: "ChartMogul", desc: "Analytics financeiro focado em MRR, Churn e LTV para SaaS.", example: "Canva, Pipedrive", isNew: false, link: "https://chartmogul.com" },
    ]
  },
  {
    cat: "IA & Agentes",
    icon: "🤖",
    items: [
      { name: "Vercel AI SDK", desc: "SDK TypeScript para integrar LLMs em apps web. Provider-agnostic, streaming nativo.", example: "v0, ChatPDF", isNew: true, link: "https://sdk.vercel.ai" },
      { name: "LangChain", desc: "Framework para pipelines de lógica entre modelos de IA. Ideal para workflows backend complexos.", example: "Notion AI, Clay", isNew: false, link: "https://www.langchain.com" },
      { name: "LangGraph", desc: "Extensão para agentes com fluxos cíclicos e controle de estado.", example: "Elastic, Adyen", isNew: false, link: "https://langchain-ai.github.io/langgraph/" },
      { name: "CrewAI", desc: "Orquestração de múltiplos agentes de IA com papéis e objetivos definidos.", example: "Deloitte, IBM", isNew: false, link: "https://www.crewai.com" },
      { name: "LlamaIndex", desc: "Melhor ferramenta para conectar dados privados à IA (RAG).", example: "Dropbox AI", isNew: false, link: "https://www.llamaindex.ai" },
      { name: "Instructor", desc: "Garante que a IA responda em formatos estruturados (JSON/Pydantic).", example: "LangChain ecosystem", isNew: false, link: "https://github.com/jxnl/instructor" },
      { name: "LangSmith", desc: "Plataforma para debug, teste e monitoramento de agentes de IA em produção.", example: "Replit, Comet", isNew: false, link: "https://www.langchain.com/langsmith" },
      { name: "OpenAI / Anthropic / Gemini / xAI", desc: "Provedores de LLMs. xAI Grok se consolidou como quarta opção relevante em 2026.", example: "Toda a indústria", isNew: false, link: "https://openai.com" },
    ]
  },
  {
    cat: "Deploy & DevOps",
    icon: "🚀",
    items: [
      { name: "Vercel", desc: "Melhor experiência para hospedar Frontend e Next.js. Zero-config deploys e edge global.", example: "Patreon, HashiCorp", isNew: false, link: "https://vercel.com" },
      { name: "Railway", desc: "Deployment simples para Backend e BDs. Suporta processos longos e Docker nativo.", example: "startups globais", isNew: false, link: "https://railway.app" },
      { name: "Docker", desc: "Containerização para rodar seu app em qualquer servidor com consistência.", example: "todo o mercado", isNew: false, link: "https://www.docker.com" },
      { name: "GitHub Actions", desc: "CI/CD integrado ao repositório. Padrão de mercado para pipelines.", example: "Microsoft, Vercel", isNew: false, link: "https://github.com/features/actions" },
      { name: "Upstash", desc: "Redis e Cron serverless. Ideal para rate limiting e jobs periódicos em edge.", example: "Vercel ecosystem", isNew: false, link: "https://upstash.com" },
      { name: "Terraform", desc: "Infrastructure as Code para definir recursos cloud em arquivos versionados.", example: "HashiCorp, Airbnb", isNew: true, link: "https://www.terraform.io" },
      { name: "Kubernetes", desc: "Orquestração de containers para escala. Relevante a partir de ~10k usuários.", example: "Spotify, Stripe", isNew: true, link: "https://kubernetes.io" },
    ]
  },
  {
    cat: "Background Jobs",
    icon: "⚡",
    items: [
      { name: "BullMQ", desc: "Fila de jobs assíncronos baseada em Redis para Node.js. Para emails, webhooks e tarefas de IA.", example: "Taskade, Docusign", isNew: true, link: "https://bullmq.io" },
      { name: "Inngest", desc: "Funções serverless em background com retry e observabilidade sem infraestrutura.", example: "Vercel ecosystem", isNew: true, link: "https://www.inngest.com" },
    ]
  },
  {
    cat: "Gestão & Produtividade",
    icon: "🏗️",
    items: [
      { name: "Linear", desc: "Gestão de tickets ultra-rápida para times de tecnologia.", example: "Vercel, Arc", isNew: false, link: "https://linear.app" },
      { name: "Notion", desc: "Wiki e documentação central para processos e roadmaps.", example: "Loom, Figma", isNew: false, link: "https://notion.so" },
      { name: "Loom", desc: "Comunicação em vídeo assíncrona para demos e feedbacks.", example: "Figma, HubSpot", isNew: false, link: "https://www.loom.com" },
    ]
  },
  {
    cat: "Analytics & Monitoramento",
    icon: "📈",
    items: [
      { name: "PostHog", desc: "Analytics self-hostable com gravação de sessão, funis, feature flags e A/B testing.", example: "Y Combinator startups", isNew: false, link: "https://posthog.com" },
      { name: "Sentry", desc: "Monitoramento de erros em tempo real com stack trace completo.", example: "Disney, GitHub", isNew: false, link: "https://sentry.io" },
      { name: "UptimeRobot", desc: "Monitoramento de disponibilidade com alertas de downtime.", example: "PMEs globais", isNew: false, link: "https://uptimerobot.com" },
      { name: "Datadog", desc: "APM completo para métricas de CPU, memória, latência e logs em produção.", example: "Samsung, Peloton", isNew: true, link: "https://www.datadoghq.com" },
      { name: "Plausible", desc: "Analytics de tráfego leve e privado sem cookies. Alternativa ao PostHog.", example: "Basecamp, Ghost", isNew: true, link: "https://plausible.io" },
    ]
  },
  {
    cat: "Testes & Qualidade",
    icon: "🧪",
    items: [
      { name: "Playwright", desc: "Automação de testes E2E no navegador. Suporta Chrome, Firefox e Safari.", example: "Microsoft, BBC", isNew: false, link: "https://playwright.dev" },
      { name: "Postman", desc: "Ferramenta para testar, simular e documentar APIs REST.", example: "todo o mercado", isNew: false, link: "https://www.postman.com" },
    ]
  },
  {
    cat: "Legal & Compliance",
    icon: "🏛️",
    items: [
      { name: "Vanta", desc: "Automação de conformidade para SOC2 e ISO 27001. Acelera vendas enterprise.", example: "Vercel, Segment", isNew: false, link: "https://www.vanta.com" },
      { name: "Termly", desc: "Gerador de termos de uso, privacidade e banners de LGPD/GDPR.", example: "startups globais", isNew: false, link: "https://termly.io" },
    ]
  },
  {
    cat: "Suporte ao Cliente",
    icon: "🛠️",
    items: [
      { name: "Intercom", desc: "Chat de suporte, onboarding e engajamento com AI integrada.", example: "Atlassian, Shopify", isNew: false, link: "https://www.intercom.com" },
      { name: "Crisp", desc: "Chat leve para suporte ao cliente. Boa opção custo-benefício.", example: "startups europeias", isNew: false, link: "https://crisp.chat" },
      { name: "Zendesk", desc: "Tickets de suporte em escala com SLA, macros e relatórios.", example: "Airbnb, Shopify", isNew: false, link: "https://www.zendesk.com" },
    ]
  },
  // NOVOS SERVIDORES MCP 2026
  {
    cat: "Fundação & Protocolo",
    icon: "🧱",
    items: [
      { name: "MCP Reference Servers", desc: "Servidores de referência oficiais mantidos pelo steering group do protocolo. Inclui Filesystem, Git, Memory, Fetch e Sequential Thinking.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers", docLabel: "GitHub oficial" },
      { name: "MCP Registry", desc: "Diretório oficial de servidores MCP publicados. Mais de 1.200 servidores verificados e organizados por categoria.", isNew: false, isMCP: true, doc: "https://registry.mcp.so", docLabel: "registry.mcp.so" },
      { name: "MCP SDK (TypeScript)", desc: "SDK oficial para construir seus próprios servidores MCP em TypeScript/Node.js.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/typescript-sdk", docLabel: "GitHub SDK TS" },
      { name: "MCP SDK (Python)", desc: "SDK oficial para construir servidores MCP em Python. Ideal para times com stack FastAPI/Django.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/python-sdk", docLabel: "GitHub SDK Python" },
    ]
  },
  {
    cat: "MCP: Desenvolvimento",
    icon: "💻",
    items: [
      { name: "GitHub MCP", desc: "Conecta a IA diretamente a repositórios para gerenciar commits, PRs, issues e branches.", isNew: false, isMCP: true, doc: "https://github.com/github/github-mcp-server", docLabel: "GitHub oficial" },
      { name: "Filesystem MCP", desc: "Acesso seguro ao sistema de arquivos local com controles de permissão granulares.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem", docLabel: "Documentação" },
      { name: "Git MCP", desc: "Ferramentas para ler, buscar e manipular repositórios Git locais.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/git", docLabel: "Documentação" },
      { name: "Docker MCP", desc: "Controla containers Docker: build, logs, inspeção e gerenciamento via agente.", isNew: false, isMCP: true, doc: "https://github.com/docker/mcp-servers", docLabel: "Docker oficial" },
      { name: "Context7 MCP", desc: "Fornece documentação atualizada de milhares de bibliotecas e frameworks para a IA.", isNew: false, isMCP: true, doc: "https://github.com/upstash/context7", docLabel: "GitHub" },
    ]
  },
  {
    cat: "MCP: Bancos de Dados",
    icon: "📥",
    items: [
      { name: "PostgreSQL MCP", desc: "Conecta a IA a bancos PostgreSQL para queries e análise de schema.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres", docLabel: "Documentação" },
      { name: "Supabase MCP", desc: "Gerencia tabelas, migrações e edge functions via commands em linguagem natural.", isNew: false, isMCP: true, doc: "https://supabase.com/docs/guides/getting-started/mcp", docLabel: "Supabase Docs" },
      { name: "MongoDB MCP", desc: "Integração oficial com instâncias MongoDB e Atlas.", isNew: false, isMCP: true, doc: "https://github.com/mongodb-labs/mongodb-mcp-server", docLabel: "GitHub oficial" },
      { name: "Redis MCP", desc: "Permite que agentes interajam com instâncias Redis.", isNew: false, isMCP: true, doc: "https://github.com/redis/mcp-redis", docLabel: "GitHub oficial" },
    ]
  },
  {
    cat: "MCP: Web & Scraping",
    icon: "🌍",
    items: [
      { name: "Firecrawl MCP", desc: "Transforma qualquer site em dados limpos para a IA com JS rendering.", isNew: false, isMCP: true, doc: "https://docs.firecrawl.dev/mcp-server", docLabel: "Firecrawl Docs" },
      { name: "Fetch MCP", desc: "Servidor oficial para buscar e converter conteúdo web em formato otimizado para LLMs.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch", docLabel: "Documentação" },
      { name: "Brave Search MCP", desc: "Busca web em tempo real usando a API do Brave Search.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search", docLabel: "Documentação" },
      { name: "Playwright MCP", desc: "Automação de browser completa para a IA: screenshots e preenchimento de forms.", isNew: false, isMCP: true, doc: "https://github.com/microsoft/playwright-mcp", docLabel: "Microsoft GitHub" },
    ]
  },
  {
    cat: "MCP: Workspace",
    icon: "📅",
    items: [
      { name: "Notion MCP", desc: "Expõe páginas e databases do Notion para a IA em tempo real.", isNew: false, isMCP: true, doc: "https://github.com/makenotion/notion-mcp-server", docLabel: "GitHub oficial" },
      { name: "Slack MCP", desc: "Captura threads e metadados do Slack para respostas contextuais.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/slack", docLabel: "Documentação" },
      { name: "Linear MCP", desc: "Conecta a IA ao rastreador de issues do Linear.", isNew: false, isMCP: true, doc: "https://linear.app/docs/mcp", docLabel: "Linear Docs" },
      { name: "Google Drive MCP", desc: "Acesso a documentos, planilhas e apresentações da organização.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive", docLabel: "Documentação" },
    ]
  },
  {
    cat: "MCP: Business",
    icon: "🪙",
    items: [
      { name: "Stripe MCP", desc: "Permite que agentes consultem clientes, assinaturas e faturas via linguagem natural.", isNew: false, isMCP: true, doc: "https://github.com/stripe/agent-toolkit", docLabel: "Stripe Agent Toolkit" },
      { name: "Zapier MCP", desc: "Expõe milhares de automações e workflows do Zapier para a IA.", isNew: false, isMCP: true, doc: "https://zapier.com/mcp", docLabel: "Zapier Docs" },
      { name: "n8n MCP", desc: "Ponte entre a IA e fluxos de automação no n8n.", isNew: false, isMCP: true, doc: "https://docs.n8n.io/advanced-ai/mcp/", docLabel: "n8n Docs" },
    ]
  },
  {
    cat: "MCP: Memória & IA",
    icon: "🧠",
    items: [
      { name: "Memory MCP", desc: "Sistema de memória persistente baseado em knowledge graph.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory", docLabel: "Documentação" },
      { name: "Chroma MCP", desc: "Busca semântica e gestão de documentos com vector search.", isNew: false, isMCP: true, doc: "https://docs.trychroma.com/integrations/mcp", docLabel: "Chroma Docs" },
      { name: "Qdrant MCP", desc: "Memória contextual para agentes via busca vetorial de alta performance.", isNew: false, isMCP: true, doc: "https://github.com/qdrant/mcp-server-qdrant", docLabel: "GitHub oficial" },
    ]
  },
  {
    cat: "MCP: Observabilidade",
    icon: "👁️",
    items: [
      { name: "Sentry MCP", desc: "Acesso a rastreamento de erros e telemetria de performance do Sentry.", isNew: false, isMCP: true, doc: "https://docs.sentry.io/product/sentry-mcp/", docLabel: "Sentry Docs" },
      { name: "AgentOps MCP", desc: "Observabilidade e tracing específico para agentes de IA.", isNew: false, isMCP: true, doc: "https://docs.agentops.ai/mcp", docLabel: "AgentOps Docs" },
      { name: "Sequential Thinking MCP", desc: "Servidor para raciocínio dinâmico e reflexivo.", isNew: false, isMCP: true, doc: "https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking", docLabel: "Documentação" },
    ]
  },
];
