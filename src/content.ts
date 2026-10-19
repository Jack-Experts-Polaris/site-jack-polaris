export const problems = [
  {
    title: "Chaves de API espalhadas",
    text: "em repositórios, planilhas e conversas, sem dono e sem prazo de validade.",
  },
  {
    title: "Custos que só aparecem na fatura",
    text: "sem saber qual time, projeto ou aplicação gastou.",
  },
  {
    title: "Dados pessoais indo para fora",
    text: "em prompts que ninguém revisou: CPF, cartão, e-mail, telefone, etc...",
  },
  {
    title: "Dependência de um único fornecedor",
    text: "quando o provedor cai, o seu produto cai junto.",
  },
  {
    title: "Nenhuma trilha de auditoria",
    text: "para responder ao jurídico, ao DPO ou ao auditor.",
  },
];

export const personas = [
  {
    role: "CTO / Head de Plataforma",
    text: "Um ponto único de acesso a IA, sem dependência de fornecedor, com alta disponibilidade e configuração como código",
  },
  {
    role: "CISO / Segurança",
    text: "Mascaramento de dados pessoais, bloqueio de prompt injection, SSO com MFA, trilha de auditoria imutável e controle de cada chave",
  },
  {
    role: "DPO / Jurídico",
    text: "Base legal e finalidade por projeto, retenção configurável, zero retention, localização e exclusão de dados do titular com recibo",
  },
  {
    role: "FinOps / Financeiro",
    text: "Orçamento por projeto com bloqueio, showback e chargeback por centro de custo, previsão de estouro e reconciliação com a fatura",
  },
  {
    role: "Desenvolvedores",
    text: "API compatível com OpenAI, chaves em autosserviço, primeira chamada em menos de 15 minutos",
  },
  {
    role: "Usuários de negócio",
    text: "Um chat corporativo seguro, com os modelos aprovados pela empresa, ferramentas habilitadas e as bases de conhecimento do time",
  },
];

export const numbers = [
  { value: 15, prefix: "< ", suffix: " min", text: "da criação do projeto à primeira chamada de um desenvolvedor" },
  { value: 5, prefix: "≤ ", suffix: " s", text: "para uma chave revogada parar de funcionar em todas as réplicas" },
  { value: 30, prefix: "≤ ", suffix: " s", text: "para uma mudança de regra valer em toda a plataforma" },
  { value: 1, prefix: "", suffix: " clique", text: "para voltar à versão anterior de um modelo" },
  { value: 0, prefix: "", suffix: " linhas", text: "de código alteradas para trocar de provedor" },
];

export const steps = [
  {
    title: "Conecte seus provedores.",
    text: "Cadastre as credenciais uma vez; elas ficam no cofre da plataforma.",
  },
  {
    title: "Crie aliases.",
    text: "Dê nomes estáveis aos modelos (`chat-padrao`, `resumo-rapido`) e defina fallback e rollout.",
  },
  {
    title: "Defina as regras.",
    text: "Orçamentos, limites, proteção de dados e acesso, por organização, time, projeto e ambiente.",
  },
  {
    title: "Libere o acesso.",
    text: "Usuários entram com o SSO da empresa; desenvolvedores criam suas chaves no Portal.",
  },
  {
    title: "Acompanhe.",
    text: "Custos, economia, qualidade e auditoria em tempo real.",
  },
];

export const reasons = [
  { title: "Sem dependência de fornecedor.", text: "Troque ou combine modelos quando quiser." },
  { title: "Governança que não atrapalha.", text: "Desenvolvedores continuam usando a API que já conhecem." },
  {
    title: "Feito para o Brasil.",
    text: "Dados pessoais brasileiros, LGPD, custos em reais e interface em português.",
  },
  {
    title: "Seus dados, sua infraestrutura.",
    text: "Roda no seu Kubernetes, com as suas chaves de criptografia.",
  },
  { title: "Transparência total.", text: "Cada requisição com custo, modelo e decisão registrados." },
];

export const faq = [
  {
    q: "Preciso mudar o código das minhas aplicações?",
    a: "Não. Se a aplicação usa um SDK da OpenAI (ou da Anthropic), basta trocar a URL base e a chave.",
  },
  {
    q: "Quais modelos posso usar?",
    a: "Os de OpenAI, Azure OpenAI, Anthropic, AWS Bedrock, Google Vertex e provedores compatíveis com a API da OpenAI. Você pode combinar vários atrás do mesmo nome.",
  },
  {
    q: "O que acontece se um provedor cair?",
    a: "O Jack Polaris passa automaticamente para o próximo modelo da lista, respeitando as regiões permitidas e a janela de contexto, sem a aplicação perceber.",
  },
  {
    q: "Meus dados vão para o provedor?",
    a: "Só o necessário, e com os dados pessoais mascarados conforme a política do projeto. Com zero retention, nada do conteúdo fica armazenado na plataforma.",
  },
  {
    q: "Como controlo os custos?",
    a: "Com orçamentos por projeto que bloqueiam ao atingir o limite, alertas antecipados, limites por minuto, cache e economia de tokens, e relatórios por centro de custo.",
  },
  {
    q: "Onde roda?",
    a: "Na sua infraestrutura, em Kubernetes ou docker compose. Os dados ficam no seu banco, no seu cache e no seu KMS.",
  },
  {
    q: "Os usuários precisam de outra senha?",
    a: "Não. O acesso é pelo SSO da empresa, com MFA.",
  },
];

export const useCases = [
  {
    title: "Atendimento ao cliente.",
    text: "Assistentes que consultam a base de conhecimento, com CPF e cartão mascarados antes de chegar ao modelo e custo atribuído ao centro de custo do atendimento.",
  },
  {
    title: "Desenvolvimento de software.",
    text: "Times usam o modelo mais adequado para cada tarefa, com chaves em autosserviço, limites por projeto e economia de tokens ligada nos modelos mais caros.",
  },
  {
    title: "Jurídico e compliance.",
    text: "Análise de contratos com documentos anexados, zero retention, trilha de auditoria e residência de dados no Brasil.",
  },
  {
    title: "Agentes de operação.",
    text: "Agentes que executam ferramentas internas via MCP, com aprovação humana para ações sensíveis e proteção contra ferramentas adulteradas.",
  },
  {
    title: "Chat corporativo.",
    text: "Uma alternativa segura às ferramentas de IA de consumo, com os modelos aprovados pela empresa e as conversas protegidas.",
  },
];

export const providers = ["OpenAI", "Anthropic", "AWS Bedrock", "Azure OpenAI", "Google Vertex", "NVIDIA"];

export type Feature = { title: string; text?: string };
export type Resource = {
  slug: string;
  title: string;
  tagline: string;
  intro?: string[];
  items: Feature[];
};

export const resources: Resource[] = [
  {
    slug: "api",
    title: "Uma API para todos os modelos",
    tagline: "Troque de modelo sem trocar de código.",
    items: [
      {
        title: "Compatível com a API da OpenAI",
        text: "Chat Completions, Responses, Embeddings, Models e Batches. Qualquer SDK da OpenAI funciona trocando só a `base_url`.",
      },
      { title: "Compatível com a API Messages da Anthropic", text: "para quem já usa o SDK da Anthropic." },
      {
        title: "Vários provedores atrás da mesma interface",
        text: "OpenAI, Azure OpenAI, Anthropic, AWS Bedrock, Google Vertex e modelos compatíveis com OpenAI, como os da NVIDIA.",
      },
      {
        title: "Tradução automática",
        text: "de mensagens, imagens, ferramentas (function calling) e saída estruturada para o formato de cada provedor.",
      },
      { title: "Streaming de ponta a ponta", text: "sem esperar a resposta inteira." },
      {
        title: "Saída estruturada garantida",
        text: "valida a resposta contra o JSON Schema e pede correção ao modelo quando ela vem fora do formato.",
      },
      {
        title: "Contexto no servidor",
        text: "a Responses API guarda a conversa com isolamento por chave, e a memória de sessão continua conversas sem reenviar o histórico.",
      },
      {
        title: "Erros padronizados e transparência",
        text: "cada resposta informa o modelo que atendeu, tokens, custo estimado, status do cache e quota restante.",
      },
    ],
  },
  {
    slug: "roteamento",
    title: "Roteamento inteligente e resiliência",
    tagline: "Seu produto no ar, mesmo quando o provedor não está.",
    items: [
      {
        title: "Aliases com versões imutáveis",
        text: "suas aplicações chamam um padrão, e você decide qual modelo atende, sem deploy.",
      },
      { title: "Fallback automático", text: "para o próximo modelo quando um provedor falha ou demora." },
      {
        title: "Circuit breaker",
        text: "que tira do ar o provedor com problema e o devolve quando ele se recupera, com sondas ativas de saúde.",
      },
      {
        title: "Hedge de requisições",
        text: "dispara uma segunda tentativa quando a primeira demora, e vence a mais rápida.",
      },
      {
        title: "Estratégias de roteamento",
        text: "por prioridade, peso, latência ou custo, e regras condicionais por tamanho de prompt, uso de ferramentas ou imagens.",
      },
      {
        title: "Rollout gradual com rollback em um clique",
        text: "libere um modelo novo para 10% do tráfego, compare latência, erro, custo e feedback, e avance para 100% com segurança.",
      },
      { title: "Shadow traffic", text: "teste um modelo candidato com tráfego real, sem afetar o usuário." },
      { title: "Residência de dados", text: "o fallback nunca sai das regiões permitidas para o projeto." },
      { title: "Janela de contexto respeitada", text: "conversas longas só vão para modelos em que cabem." },
    ],
  },
  {
    slug: "custos",
    title: "Custos sob controle",
    tagline: "Cada centavo com dono, antes de virar fatura.",
    items: [
      {
        title: "Orçamentos por projeto e por período",
        text: "com alertas em 80% e 95% e bloqueio ao atingir o limite.",
      },
      {
        title: "Quotas, rate limit e concorrência",
        text: "por projeto, ambiente, chave ou usuário: requisições por minuto, tokens por minuto e chamadas simultâneas.",
      },
      { title: "Showback e chargeback por centro de custo", text: "com relatórios agendados." },
      { title: "Previsão de estouro", text: "pela tendência de consumo do período." },
      {
        title: "Reconciliação com a fatura",
        text: "do provedor e histórico de preços e câmbio (US$ → R$).",
      },
      { title: "Custo por requisição, por modelo, por projeto e por usuário", text: "em tempo real." },
      { title: "Pedidos de aumento de quota", text: "feitos pelo próprio usuário e aprovados no console." },
    ],
  },
  {
    slug: "economia",
    title: "Economia de tokens",
    tagline: "Pague menos pelo mesmo resultado.",
    intro: [
      "O administrador liga, modelo a modelo, estratégias que reduzem os tokens enviados ao provedor.",
    ],
    items: [
      {
        title: "Painel de economia",
        text: "mostra a porcentagem economizada por modelo, por estratégia e ao longo do tempo, e quanto isso representa em dinheiro.",
      },
    ],
  },
  {
    slug: "lgpd",
    title: "Proteção de dados e LGPD",
    tagline: "Dados pessoais não saem da empresa por acidente.",
    items: [
      {
        title: "Detecção e mascaramento de dados pessoais brasileiros",
        text: "CPF, CNPJ, RG, cartão de crédito, e-mail, telefone e chaves de API, antes de o texto chegar ao provedor e aos logs.",
      },
      {
        title: "Bloqueio de prompt injection e jailbreak",
        text: "em português e inglês, inclusive em conteúdo vindo de documentos e ferramentas.",
      },
      { title: "Moderação de conteúdo", text: "e listas de bloqueio por projeto." },
      { title: "Filtro no streaming", text: "a resposta é verificada enquanto é gerada." },
      {
        title: "Modo shadow",
        text: "para calibrar regras novas sem bloquear ninguém, e marcação de falsos positivos.",
      },
      { title: "Testador de guardrails", text: "no console, para validar uma regra antes de publicar." },
      { title: "Detectores externos", text: "plugáveis por webhook." },
      { title: "Base legal e finalidade", text: "registradas em cada projeto." },
      { title: "Zero retention", text: "e retenção configurável de prompts, sempre mascarados." },
      {
        title: "Direitos do titular",
        text: "localizar e excluir os dados de uma pessoa, com recibo de exclusão.",
      },
      { title: "Criptografia por tenant", text: "das conversas, com chave mestra em KMS." },
    ],
  },
  {
    slug: "seguranca",
    title: "Segurança de nível corporativo",
    tagline: "Confiança zero, controle total.",
    items: [
      {
        title: "SSO (OIDC)",
        text: "com MFA obrigatório no console e reautenticação para ações críticas.",
      },
      {
        title: "Chaves virtuais",
        text: "por projeto e ambiente: o segredo dos provedores nunca sai da plataforma. Cada chave pode ter modelos permitidos, ferramentas permitidas, IPs de origem, validade e limites próprios.",
      },
      {
        title: "Rotação sem downtime e revogação em até 5 segundos",
        text: "duas chaves válidas em paralelo, e revogação em todas as réplicas, inclusive em massa.",
      },
      {
        title: "Hierarquia de tenants",
        text: "(organização → time → projeto → ambiente) com políticas herdadas que só podem ficar mais restritivas.",
      },
      {
        title: "Políticas finas por atributo (ABAC)",
        text: "com suporte a motor externo de políticas.",
      },
      {
        title: "Permissões temporárias e fluxos de aprovação",
        text: "com prazo para acabar, e aprovação para acessos, projetos, ferramentas e orçamentos.",
      },
      {
        title: "Configuração assinada digitalmente",
        text: "as réplicas só aceitam regras publicadas pela plataforma.",
      },
    ],
  },
  {
    slug: "borda",
    title: "Borda da API",
    tagline: "Proteção na porta de entrada, configurada em segundos.",
    items: [
      {
        title: "Rate limit por IP e por chave",
        text: "global e com limites próprios para chaves escolhidas: mais folga para um cliente grande, menos para conter uma chave suspeita.",
      },
      {
        title: "Bloqueio por IP e faixa (CIDR)",
        text: "lista de origens permitidas, bloqueio de chave e de user-agent.",
      },
      { title: "Tudo pelo console", text: "aplicado em segundos, sem reiniciar nada." },
      { title: "Respostas no padrão da OpenAI", text: "os SDKs já sabem lidar." },
      { title: "IP real do cliente", text: "mesmo atrás de CDN, e proteção que ninguém contorna." },
    ],
  },
  {
    slug: "mcp",
    title: "Agentes e ferramentas (MCP)",
    tagline: "Deixe a IA agir, com rédea curta.",
    items: [
      {
        title: "Proxy MCP",
        text: "(Model Context Protocol) com catálogo de servidores e ferramentas aprovadas.",
      },
      { title: "Nega por padrão", text: "cada projeto só vê as ferramentas autorizadas." },
      {
        title: "Fixação por hash",
        text: "da definição de cada ferramenta: qualquer alteração no servidor bloqueia a chamada (proteção contra tool poisoning).",
      },
      {
        title: "Aprovação humana",
        text: "para ferramentas sensíveis, e confirmação do usuário no chat antes de executar.",
      },
      {
        title: "Guardrails nos argumentos e nos resultados",
        text: "com detecção de injeção indireta.",
      },
      { title: "Métricas por ferramenta", text: "chamadas, erros e latência." },
    ],
  },
  {
    slug: "rag",
    title: "Conhecimento da empresa (RAG)",
    tagline: "Respostas com base nos seus documentos, e com citação.",
    items: [
      {
        title: "Bases de conhecimento",
        text: "liberadas por projeto, consultadas automaticamente a cada pergunta.",
      },
      { title: "Citações", text: "em cada resposta, para conferir a fonte." },
      { title: "Anexos no chat", text: "PDFs e documentos lidos e usados como contexto." },
      { title: "Modelos de prompt", text: "reutilizáveis, com variáveis, num catálogo compartilhado." },
    ],
  },
  {
    slug: "portal",
    title: "Portal do usuário",
    tagline: "O chat corporativo que as pessoas querem usar.",
    items: [
      {
        title: "Chat com streaming",
        text: "parar e retomar respostas, e retomada após queda de conexão.",
      },
      {
        title: "Conversas organizadas",
        text: "pastas, fixadas, arquivadas, busca, ramos (“e se eu perguntasse de outro jeito?”) e conversas temporárias que não ficam salvas.",
      },
      { title: "Compartilhamento", text: "de conversas com colegas, com controle de acesso." },
      {
        title: "Transparência",
        text: "custo de cada resposta, uso da janela de contexto e quota sempre visível.",
      },
      { title: "Feedback", text: "em cada resposta, que alimenta a avaliação dos modelos." },
      { title: "Meu consumo", text: "custos por dia, por projeto e por modelo." },
      {
        title: "Solicitações",
        text: "pedir acesso a projetos, ferramentas e mais quota, e acompanhar o andamento.",
      },
      {
        title: "Segurança da conta",
        text: "sessões ativas em todos os dispositivos, com encerramento remoto em até 5 segundos.",
      },
      { title: "Acessível", text: "(WCAG 2.1 AA), temas claro e escuro, e funciona no celular." },
    ],
  },
  {
    slug: "desenvolvedor",
    title: "Área do desenvolvedor",
    tagline: "Da ideia à primeira chamada em 15 minutos.",
    items: [
      {
        title: "Autosserviço de chaves",
        text: "crie projetos, emita, rotacione e revogue quantas chaves precisar.",
      },
      { title: "Início rápido", text: "com código pronto em Python, JavaScript e curl." },
      { title: "Playground", text: "com “código equivalente” para copiar." },
      { title: "Logs e consumo", text: "das suas próprias chamadas." },
      { title: "CLI (`polarisctl`)", text: "com login pela conta do usuário." },
    ],
  },
  {
    slug: "console",
    title: "Console administrativo",
    tagline: "Toda a operação de IA da empresa em uma tela.",
    items: [
      { title: "Início", text: "saúde, alertas, aprovações pendentes e custo do mês." },
      { title: "Tenants", text: "estrutura da organização, membros, chaves e política efetiva." },
      {
        title: "Aprovações",
        text: "fila única de projetos, acessos, ferramentas, orçamentos e aumentos de quota.",
      },
      {
        title: "Modelos",
        text: "provedores e credenciais, deployments, saúde, circuit breakers, preços e depreciação.",
      },
      {
        title: "Aliases",
        text: "editor com rascunho, diff lado a lado, versões, rollout, shadow e comparação.",
      },
      {
        title: "Políticas",
        text: "quotas, rate limit, roteamento, cache, guardrails, contexto e retenção.",
      },
      { title: "Ferramentas MCP", text: "servidores, ferramentas, autorização e métricas." },
      { title: "Custos", text: "orçamentos, previsão, showback e chargeback, reconciliação." },
      { title: "Economia de tokens", text: "quanto cada modelo e cada estratégia economizaram." },
      {
        title: "Auditoria e logs",
        text: "requisições, linha do tempo por pessoa, trilha de auditoria, incidentes e runbooks prontos.",
      },
      {
        title: "Configurações",
        text: "borda da API, canais de notificação, snapshots e réplicas, GitOps.",
      },
      { title: "Playground administrativo e testador de guardrails" },
      { title: "Tempo real", text: "o painel atualiza sozinho quando algo muda." },
    ],
  },
  {
    slug: "config",
    title: "Configuração como código",
    tagline: "Do console ou do Git, você escolhe.",
    items: [
      {
        title: "Tudo em YAML",
        text: "versionado, com validação antes de publicar (`polarisctl validate`).",
      },
      { title: "Exportação para GitOps", text: "e aplicação pelo pipeline." },
      {
        title: "Snapshots assinados",
        text: "com histórico, propagação acompanhada em tempo real e rollback.",
      },
      { title: "Admin API", text: "completa e documentada (OpenAPI)." },
    ],
  },
  {
    slug: "observabilidade",
    title: "Observabilidade e auditoria",
    tagline: "Responda “quem fez o quê, quando e quanto custou” em segundos.",
    items: [
      {
        title: "Métricas",
        text: "de latência (p95, tempo até o primeiro token), taxa de erro, requisições por segundo, cache e overhead do gateway.",
      },
      {
        title: "Trilha de auditoria encadeada por hash",
        text: "nenhum registro pode ser alterado ou apagado sem deixar rastro.",
      },
      { title: "Cada mudança com autor e diff" },
      { title: "Linha do tempo por pessoa", text: "logins, mudanças e uso em um só lugar." },
      {
        title: "Incidentes e runbooks",
        text: "de queda de provedor, vazamento de chave, estouro de custo e incidente de dados.",
      },
      { title: "Alertas", text: "por e-mail, Slack, Microsoft Teams e webhook." },
      {
        title: "Integrações",
        text: "pronto para integrar com Prometheus, OpenTelemetry, Kafka, Langfuse e Splunk.",
      },
    ],
  },
  {
    slug: "infra",
    title: "Feito para rodar na sua infraestrutura",
    tagline: "",
    items: [
      { title: "Kubernetes", text: "com Helm chart pronto, alta disponibilidade e escala automática." },
      { title: "Atualizações sem interromper", text: "respostas em andamento." },
      {
        title: "Mudanças de configuração sem deploy",
        text: "publicadas em até 30 segundos em todas as réplicas.",
      },
      { title: "Isolamento de rede", text: "entre componentes e menor privilégio para cada segredo." },
      { title: "Seus dados na sua nuvem", text: "PostgreSQL, Redis e KMS do seu ambiente." },
    ],
  },
];
