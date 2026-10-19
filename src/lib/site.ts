export const site = {
  name: "Jack Polaris",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://jackpolaris.com.br").replace(/\/$/, ""),
  email: "contato@jackpolaris.com.br",
  locale: "pt_BR",
  title: "Jack Polaris — Plataforma de Governança de IA para empresas",
  shortDescription: "Gateway de IA corporativo com governança, LGPD, controle de custos e API compatível com OpenAI.",
  description:
    "Jack Polaris é a plataforma brasileira de governança de IA generativa: um gateway único para OpenAI, Anthropic, AWS Bedrock, Azure OpenAI e Google Vertex, com mascaramento de dados pessoais (LGPD), controle de custos por projeto, fallback automático, trilha de auditoria e API compatível com a OpenAI. Roda na sua infraestrutura.",
  keywords: [
    "governança de IA",
    "gateway de IA",
    "AI gateway",
    "LLM gateway",
    "IA generativa corporativa",
    "LGPD e IA",
    "proxy OpenAI",
    "API compatível com OpenAI",
    "controle de custos de IA",
    "FinOps de IA",
    "mascaramento de dados pessoais",
    "prompt injection",
    "guardrails",
    "MCP gateway",
    "chat corporativo seguro",
    "RAG corporativo",
    "multi-LLM",
    "fallback de modelos",
    "auditoria de IA",
    "IA on-premise Kubernetes",
  ],
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
