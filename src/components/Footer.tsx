import { AuroraDivider } from "./fx/LightBeam";
import Image from "next/image";
import Link from "next/link";
import { mailto, site } from "@/lib/site";
import { Container, Logo } from "./ui";

const cols = [
  {
    title: "Produto",
    links: [
      { href: "/#solucao", label: "Como funciona" },
      { href: "/recursos", label: "Recursos" },
      { href: "/#casos", label: "Casos de uso" },
      { href: "/#faq", label: "Perguntas frequentes" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/recursos#api", label: "API compatível com OpenAI" },
      { href: "/recursos#roteamento", label: "Roteamento e fallback" },
      { href: "/recursos#lgpd", label: "Proteção de dados e LGPD" },
      { href: "/recursos#custos", label: "Custos sob controle" },
    ],
  },
  {
    title: "Contato",
    links: [
      { href: "/#contato", label: "Fale com um especialista" },
      { href: mailto("Demonstração do Jack Polaris"), label: "Agende uma demonstração" },
      { href: mailto("Jack Polaris: falar com vendas"), label: "Fale com vendas" },
      { href: mailto(), label: site.email },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/[0.04]">
      <AuroraDivider />
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-[14px] leading-relaxed text-fog">
            Governança de IA para empresas brasileiras. Todos os modelos, todas as regras, uma única porta.
          </p>
          <a
            href="https://jackexperts.com.br"
            target="_blank"
            rel="noopener"
            className="mt-2 flex w-fit items-center gap-3 text-[13px] text-steel opacity-80 transition-opacity hover:opacity-100"
          >
            <span>by</span>
            <Image src="/brand/jack-experts-white.png" alt="Jack Experts" width={112} height={56} />
          </a>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="font-display mb-4 text-[13px] text-lilac">{c.title}</h3>
            <ul className="flex flex-col gap-3">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-fog transition-colors hover:text-lilac">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-white/[0.04] py-6 text-[13px] text-steel sm:flex-row">
        <span>© 2026 Jack Polaris. Todos os direitos reservados.</span>
        <span>Feito no Brasil · LGPD desde a concepção</span>
      </Container>
    </footer>
  );
}
