import {
  Code2,
  FileWarning,
  Headset,
  KeyRound,
  Landmark,
  Lock,
  MessagesSquare,
  Receipt,
  Scale,
  ScanEye,
  ServerCog,
  ShieldCheck,
  Unplug,
  UserRound,
  Wallet,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/fx/SpotlightCard";
import { BeamBorder } from "@/components/fx/BeamBorder";
import { EffectScope } from "@/components/fx/EffectScope";
import { GridSquares } from "@/components/fx/GridSquares";
import { OrbitHorizon } from "@/components/fx/OrbitHorizon";
import { AuroraDivider, LightBeam } from "@/components/fx/LightBeam";
import { SilverText } from "@/components/fx/SilverText";
import { UseCaseVisual } from "@/components/fx/UseCaseVisual";
import { PipelineFlow } from "@/components/anim/PipelineFlow";
import { TerminalTyping } from "@/components/anim/TerminalTyping";
import { CountUp } from "@/components/anim/CountUp";
import { Reveal, RevealItem, RevealStagger } from "@/components/anim/Reveal";
import { faq, numbers, personas, problems, useCases } from "@/content";
import { Badge, Button, ChevronLink, Container, SectionHeader } from "@/components/ui";
import { ContactEmail } from "@/components/home/ContactEmail";
import { mailto } from "@/lib/site";

const icon = "size-5 text-lilac";
const stroke = 1.5;

/* ───────────────────────── O problema ───────────────────────── */

const problemIcons: LucideIcon[] = [KeyRound, Receipt, ScanEye, Unplug, FileWarning];

export function Problem() {
  return (
    <section className="relative py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            align="left"
            badge="O problema"
            title={
              <>
                A IA já está na sua empresa. <span className="text-fog">A governança, ainda não.</span>
              </>
            }
          />
          <p className="mt-8 max-w-md border-l border-lavender/40 pl-5 text-[17px] leading-relaxed text-ash">
            Cada time resolve do seu jeito, e ninguém enxerga o todo.{" "}
            <span className="text-lilac">Isso é um grande problema.</span>
          </p>
          <EffectScope decorative className="fx-floating-keys">
            {["sk-proj_••••••", "api_key=••••••", "token_••••••"].map((key, i) => (
              <div key={key} className="fx-floating-key fx-loop" style={{ left: `${i * 65}px`, top: `${20 + i * 30}px`, animationDelay: `${i * -2}s` }}>
                <KeyRound className="size-4 text-lavender" strokeWidth={1.5} />{key}
              </div>
            ))}
          </EffectScope>
        </Reveal>

        <EffectScope><RevealStagger className="flex flex-col gap-3">
          {problems.map((p, i) => {
            const Icon = problemIcons[i];
            return (
              <RevealItem key={p.title}>
                <SpotlightCard className="group flex gap-4 p-5 md:p-6">
                  <div style={{ animationDelay: `${i * -1.2}s` }} className="fx-problem-icon fx-loop flex size-10 shrink-0 items-center justify-center rounded-[5px] border border-white/[0.07] bg-void">
                    <Icon className={icon} strokeWidth={stroke} />
                  </div>
                  <p className="text-[16px] leading-relaxed text-fog">
                    <span className="font-medium text-lilac">{p.title}</span> {p.text}
                  </p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealStagger></EffectScope>
      </Container>
    </section>
  );
}

/* ───────────────────────── A solução ───────────────────────── */

export function Solution() {
  return (
    <section id="solucao" className="relative scroll-mt-24 py-24 md:py-32">
      <AuroraDivider />
      <Container>
        <Reveal>
          <SectionHeader
            badge="A solução"
            title="Uma plataforma. Todos os modelos. Todas as regras."
            subtitle="O Jack Polaris fica entre suas aplicações e os provedores de IA. Todo pedido passa por um pipeline fixo e auditável:"
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <PipelineFlow />
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="surface rim-top flex min-w-0 flex-col gap-6 rounded-[16px] p-6 md:p-8">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-lavender">
                <Code2 className="size-4" strokeWidth={stroke} /> Para quem desenvolve
              </div>
              <h3 className="font-display mt-3 text-[26px] leading-tight text-lilac">Nada muda.</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-fog">
                É a mesma API da OpenAI, com outra URL.
              </p>
            </div>
            <TerminalTyping
              title="app.py"
              className="mt-auto"
              lines={[
                { text: "from openai import OpenAI", tone: "code" },
                { text: "", tone: "code" },
                { text: "# só a URL e a chave mudam", tone: "comment" },
                {
                  text: 'client = OpenAI(base_url="https://api.suaempresa.com/v1", api_key="plrs_...")',
                  tone: "code",
                },
                {
                  text: 'client.responses.create(model="chat-padrao", input="Resuma este contrato em 3 itens")',
                  tone: "code",
                },
              ]}
            />
          </Reveal>

          <Reveal delay={0.1} className="surface rim-top flex min-w-0 flex-col gap-6 rounded-[16px] p-6 md:p-8">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-lavender">
                <ShieldCheck className="size-4" strokeWidth={stroke} /> Para quem governa
              </div>
              <h3 className="font-display mt-3 text-[26px] leading-tight text-lilac">
                Tudo fica visível e sob controle.
              </h3>
              <p className="mt-2 text-[16px] leading-relaxed text-fog">
                Cada requisição com custo, modelo e decisão registrados.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 font-mono text-[12.5px]">
              {[
                ["projeto", "atendimento-sac", ""],
                ["política", "lgpd-padrao · v14", "aplicada"],
                ["orçamento", "R$ 12.400 / R$ 20.000", "62%"],
                ["proteção de dados", "CPF, cartão mascarados", "2 itens"],
                ["modelo", "chat-padrao → claude · bedrock", "fallback"],
                ["custo", "R$ 0,0042", "registrado"],
              ].map(([k, v, s]) => (
                <div
                  key={k}
                  className="grid grid-cols-[120px_1fr_auto] items-center gap-3 rounded-[5px] border border-white/[0.05] bg-void/60 px-3 py-2"
                >
                  <span className="text-steel">{k}</span>
                  <span className="truncate text-lilac/90">{v}</span>
                  {s ? <span className="text-lavender">{s}</span> : <span />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Para quem é ───────────────────────── */

const personaIcons: LucideIcon[] = [ServerCog, Lock, Scale, Wallet, Code2, UserRound];

export function Personas() {
  return (
    <section id="para-quem" className="relative isolate scroll-mt-24 overflow-hidden py-24 md:py-32">
      <AuroraDivider />
      <LightBeam className="persona-light" />
      <Container>
        <Reveal className="persona-header">
          <SectionHeader
            badge="Para quem é"
            title="Cada área enxerga o que precisa."
            subtitle="Da plataforma ao financeiro, o Jack Polaris entrega a cada time o controle que ele procura."
          />
        </Reveal>
        <RevealStagger className="persona-cards mt-24 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personas.map((p, i) => {
            const Icon = personaIcons[i];
            return (
              <RevealItem key={p.role} className="h-full">
                <SpotlightCard className="group flex h-full flex-col gap-4 p-7 md:p-8">
                  <div className="flex items-center justify-between"><span className="flex size-11 items-center justify-center rounded-[12px] border border-lavender/15 bg-indigo/50 shadow-[inset_0_0_24px_rgba(255,255,255,.04)]"><Icon className="size-5 text-lavender" strokeWidth={stroke} /></span><span className="font-mono text-[11px] text-steel">0{i + 1}</span></div>
                  <div className="text-[12px] tracking-wide text-fog uppercase">Você é</div>
                  <h3 className="font-display -mt-2 text-[22px] text-lilac">{p.role}</h3>
                  <p className="text-[15px] leading-relaxed text-fog">{p.text}</p>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </Container>
    </section>
  );
}

/* ───────────────────────── Números ───────────────────────── */

export function Numbers() {
  return (
    <section className="numbers-light relative isolate overflow-hidden py-24 md:py-32">
      <AuroraDivider />
      <GridSquares />
      <Container className="relative">
        <Reveal>
          <SectionHeader title="Números que importam" />
        </Reveal>
        <RevealStagger className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-5">
          {numbers.map((n, i) => (
            <RevealItem key={n.text} className={`relative px-4 text-center ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}>
              {i > 0 && <div className="absolute top-2 bottom-2 left-0 hidden w-px bg-[linear-gradient(180deg,transparent,rgba(183,164,251,0.4),transparent)] md:block" />}
              <CountUp
                value={n.value}
                prefix={n.prefix}
                suffix=""
                className="font-display block text-[62px] leading-none tracking-[-2px] text-cosmic md:text-[72px]"
              />
              <span className="mt-2 block font-mono text-[13px] text-ash">{n.suffix.trim()}</span>
              <p className="mx-auto mt-4 max-w-[190px] text-[14px] leading-relaxed text-fog">{n.text}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

/* ───────────────────────── Casos de uso ───────────────────────── */

const caseIcons: LucideIcon[] = [Headset, Code2, Landmark, Bot, MessagesSquare];

export function UseCases() {
  return (
    <section id="casos" className="relative scroll-mt-24 py-24 md:py-32">
      <AuroraDivider />
      <Container>
        <Reveal>
          <SectionHeader
            badge="Casos de uso"
            title="Onde o Jack Polaris trabalha."
            subtitle="Do atendimento ao jurídico, a mesma porta segura para todos os usos de IA da empresa."
          />
        </Reveal>
        <RevealStagger className="mt-16 grid gap-4 md:grid-cols-6">
          {useCases.map((c, i) => {
            const Icon = caseIcons[i];
            const span = i < 2 ? "md:col-span-3" : "md:col-span-2";
            return (
              <RevealItem key={c.title} className={span}>
                <SpotlightCard className="group flex h-full flex-col overflow-hidden">
                  <UseCaseVisual index={i} />
                  <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
                  <Icon className="size-5 text-lavender" strokeWidth={stroke} />
                  <h3 className="font-display text-[22px] text-lilac">{c.title.replace(/\.$/, "")}</h3>
                  <p className="text-[15px] leading-relaxed text-fog">{c.text}</p>
                  </div>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealStagger>
        <Reveal className="mt-10 flex justify-center">
          <ChevronLink href="/recursos">Conheça todos os recursos</ChevronLink>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── FAQ ───────────────────────── */

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeader align="left" badge="Perguntas frequentes" title="Dúvidas comuns, respostas diretas." />
        </Reveal>
        <RevealStagger className="flex flex-col gap-2">
          {faq.map((f) => (
            <RevealItem key={f.q}>
              <SpotlightCard><details className="group rounded-[16px] px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium text-lilac">
                  {f.q}
                  <span className="relative size-4 shrink-0">
                    <span className="absolute top-1/2 left-0 h-px w-4 bg-lavender" />
                    <span className="absolute top-0 left-1/2 h-4 w-px bg-lavender transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-fog">{f.a}</p>
              </details></SpotlightCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

/* ───────────────────────── Chamada final ───────────────────────── */

export function FinalCta() {
  return (
    <section id="contato" className="final-cta relative isolate scroll-mt-24 overflow-hidden pt-8 md:pt-12">
      <Container className="relative z-10 flex flex-col items-center text-center">
        <EffectScope decorative className="final-cta-polaris">
          <div className="final-cta-starlight fx-loop" />
          <svg viewBox="0 0 104 112" fill="none" className="final-cta-star">
            <path d="M52 0 56.5 50 104 56 56.5 62 52 112 47.5 62 0 56 47.5 50Z" fill="currentColor" />
          </svg>
        </EffectScope>
        <Reveal>
          <BeamBorder className="!rounded-[32px]"><Badge>Vamos conversar</Badge></BeamBorder>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="final-cta-title font-display mt-7 max-w-[1000px] text-[40px] leading-[1.12] tracking-[-0.6px] text-balance text-lilac md:text-[56px]">
            <SilverText>Coloque a IA da sua empresa em órbita,</SilverText>{" "}
            <span className="text-cosmic">com os pés no chão.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ash md:text-[18px]">
            Converse com nosso time e veja o Jack Polaris funcionando com os seus modelos e as suas regras.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={mailto("Demonstração do Jack Polaris")}>Agende uma demonstração</Button>
          <Button href={mailto("Jack Polaris: falar com vendas")} variant="outline">
            Fale com vendas
          </Button>
        </Reveal>
        <Reveal delay={0.3} className="mt-6">
          <ContactEmail />
        </Reveal>
      </Container>
      <OrbitHorizon />
    </section>
  );
}
