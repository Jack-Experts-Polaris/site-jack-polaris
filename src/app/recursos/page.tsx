import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { Portal } from "@/components/fx/Portal";
import { AuroraDivider } from "@/components/fx/LightBeam";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { SilverText } from "@/components/fx/SilverText";
import { StarField } from "@/components/anim/StarField";
import { Reveal, RevealItem, RevealStagger } from "@/components/anim/Reveal";
import { FinalCta } from "@/components/home/Sections";
import { Badge, Button, Container, RichText } from "@/components/ui";
import { resources } from "@/content";
import { absoluteUrl, jsonLd, site } from "@/lib/site";

const title = "Recursos do gateway de IA: API, roteamento, custos, LGPD e segurança";
const description =
  "Todos os recursos do Jack Polaris: API única compatível com OpenAI e Anthropic, roteamento com fallback, controle de custos e FinOps, economia de tokens, mascaramento de dados pessoais (LGPD), segurança corporativa, MCP, RAG, portal do usuário e operação na sua infraestrutura.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recursos" },
  openGraph: { url: "/recursos", title: `${title} — ${site.name}`, description },
  twitter: { title: `${title} — ${site.name}`, description },
};

const pageLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": absoluteUrl("/recursos#webpage"),
      url: absoluteUrl("/recursos"),
      name: title,
      description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": absoluteUrl("/#website") },
      about: { "@id": absoluteUrl("/#software") },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Recursos", item: absoluteUrl("/recursos") },
      ],
    },
    {
      "@type": "ItemList",
      name: `Recursos do ${site.name}`,
      numberOfItems: resources.length,
      itemListElement: resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: r.title,
        description: [r.tagline, ...r.items.map((it) => it.title)].filter(Boolean).join(". "),
        url: absoluteUrl(`/recursos#${r.slug}`),
      })),
    },
  ],
};

export default function RecursosPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(pageLd)} />
      <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44">
        <div className="absolute inset-0 -z-10">
          <StarField density={0.3} />
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(55%_50%_at_50%_0%,rgba(80,70,228,0.2),transparent_70%)]" />
        </div>
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <Badge>Recursos</Badge>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display text-[44px] leading-[1.06] tracking-[-1px] text-lilac md:text-[68px]">
                <SilverText>Tudo que a IA da empresa precisa,</SilverText> <span className="text-cosmic">em uma única porta.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="max-w-xl text-[17px] leading-relaxed text-ash md:text-[18px]">
                Quinze frentes de governança, da API compatível com OpenAI à operação na sua própria
                infraestrutura.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <Button href="/#contato">Fale com um especialista</Button>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="resources-art">
            <Portal className="resources-portal" />
            <div className="resources-core"><ShieldCheck size={38} strokeWidth={1.5} /></div>
            <div className="resources-core-label"><ScrambleText text="UMA PORTA. TODAS AS REGRAS." /></div>
          </Reveal>
        </Container>
      </section>

      <Container className="grid gap-12 pb-12 lg:grid-cols-[240px_1fr]">
        <nav className="sticky top-28 hidden self-start lg:block" aria-label="Índice de recursos">
          <ol className="flex flex-col gap-0.5 border-l border-white/[0.06]">
            {resources.map((r, i) => (
              <li key={r.slug}>
                <a
                  href={`#${r.slug}`}
                  className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-[13.5px] text-fog transition-colors hover:border-lavender hover:text-lilac"
                >
                  <span className="font-mono text-[11px] text-steel tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {r.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-24">
          {resources.map((r, i) => (
            <section key={r.slug} id={r.slug} className="relative scroll-mt-28 pt-10">
              <AuroraDivider className="!inset-x-0" />
              <Reveal>
                <div className="font-mono text-[12px] text-lavender">{String(i + 1).padStart(2, "0")}</div>
                <h2 className="font-display mt-2 text-[32px] leading-[1.15] tracking-[-0.3px] text-silver md:text-[42px]">
                  {r.title}
                </h2>
                {r.tagline && <p className="text-cosmic mt-2 inline-block text-[18px]">{r.tagline}</p>}
                {r.intro?.map((p) => (
                  <p key={p} className="mt-4 max-w-2xl text-[16px] leading-relaxed text-fog">
                    {p}
                  </p>
                ))}
              </Reveal>
              <RevealStagger className="mt-8 grid gap-3 sm:grid-cols-2">
                {r.items.map((it) => (
                  <RevealItem key={it.title} className="h-full">
                    <SpotlightCard className="h-full p-5">
                      <h3 className="font-display text-[16px] text-lilac">
                        <RichText text={it.title} />
                      </h3>
                      {it.text && (
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-fog">
                          <RichText text={it.text} />
                        </p>
                      )}
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealStagger>
            </section>
          ))}
        </div>
      </Container>

      <FinalCta />
    </main>
  );
}
