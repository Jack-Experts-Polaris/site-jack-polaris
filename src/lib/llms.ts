import { faq, personas, problems, providers, reasons, resources, steps, useCases } from "@/content";
import { absoluteUrl, site } from "@/lib/site";

const strip = (s: string) => s.replace(/\.$/, "");
const line = (title: string, text?: string) => `- **${strip(title)}**${text ? `: ${text}` : ""}`;

const summary = `> ${site.description}

Principais fatos:
- Categoria: plataforma de governança de IA / AI gateway / LLM gateway corporativo.
- Mercado: empresas brasileiras; interface em português, custos em reais, aderente à LGPD.
- Provedores suportados: ${providers.join(", ")} e qualquer provedor compatível com a API da OpenAI.
- Integração: API compatível com OpenAI (Chat Completions, Responses, Embeddings, Models, Batches) e com a API Messages da Anthropic. Basta trocar a \`base_url\` e a chave; nenhuma linha de código muda.
- Implantação: self-hosted na infraestrutura do cliente (Kubernetes com Helm ou docker compose), com PostgreSQL, Redis e KMS do próprio cliente.
- Contato comercial: ${site.email}`;

export function llmsTxt() {
  return `# ${site.name}

${summary}

## Páginas

- [Início](${absoluteUrl("/")}): visão geral, problemas que resolve, para quem é, como funciona, casos de uso e perguntas frequentes.
- [Recursos](${absoluteUrl("/recursos")}): lista completa de funcionalidades, em ${resources.length} frentes.
- [Conteúdo completo em Markdown](${absoluteUrl("/llms-full.txt")}): todo o conteúdo do site em um único arquivo.

## Recursos

${resources.map((r) => `- [${r.title}](${absoluteUrl(`/recursos#${r.slug}`)})${r.tagline ? `: ${r.tagline}` : ""}`).join("\n")}

## Perguntas frequentes

${faq.map((f) => line(f.q, f.a)).join("\n")}
`;
}

export function llmsFullTxt() {
  return `# ${site.name}: governança de IA para empresas

${summary}

## O problema

Sem governança, a IA generativa nas empresas costuma ter:
${problems.map((p) => line(p.title, p.text)).join("\n")}

## A solução

${site.name} coloca todos os modelos de IA da empresa atrás de uma única porta: segura, auditada, com custo sob controle e compatível com a API da OpenAI. Os times usam o melhor modelo para cada tarefa; a empresa define as regras e acompanha o consumo.

## Para quem é

${personas.map((p) => line(p.role, p.text)).join("\n")}

## Como funciona

${steps.map((s, i) => `${i + 1}. **${strip(s.title)}** ${s.text}`).join("\n")}

## Por que ${site.name}

${reasons.map((r) => line(r.title, r.text)).join("\n")}

## Casos de uso

${useCases.map((u) => line(u.title, u.text)).join("\n")}

## Recursos

${resources
  .map(
    (r) => `### ${r.title}

${r.tagline ? `${r.tagline}\n\n` : ""}${r.intro ? `${r.intro.join("\n\n")}\n\n` : ""}${r.items.map((it) => line(it.title, it.text)).join("\n")}`,
  )
  .join("\n\n")}

## Perguntas frequentes

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Contato

Fale com um especialista ou agende uma demonstração: ${site.email} · ${site.url}
`;
}
