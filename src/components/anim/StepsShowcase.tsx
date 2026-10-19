"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Activity, ArrowDown, ArrowRight, Building2, Check, ChevronRight, Copy, Fingerprint, GitBranch, KeyRound, LockKeyhole, ShieldCheck, Sparkles, Terminal, type LucideIcon } from "lucide-react";
import { Badge, Container, RichText } from "@/components/ui";
import { providers, steps } from "@/content";

const ease = [0.22, 1, 0.36, 1] as const;
const sceneNames = ["Cofre de credenciais", "Roteamento de modelos", "Políticas da organização", "Portal de acesso", "Visão da operação"];
const sceneDescriptions = [
  "Seis provedores conectados ao cofre, com credenciais cifradas.",
  "Aliases chat-padrao e resumo-rapido, fallback de Claude para GPT e Gemini e rollout gradual.",
  "Regras herdadas da organização ao ambiente, orçamento com alertas em 80% e 95%, proteção de dados e limite por minuto.",
  "Acesso pelo SSO da empresa com autenticação em dois fatores e geração de uma chave no Portal.",
  "Exemplo de painel com custos em reais, economia de tokens e registro de requisições.",
];
const stepIcons: LucideIcon[] = [LockKeyhole, GitBranch, ShieldCheck, Fingerprint, Activity];

/** Only the visible scene advances; CSS animations share the same pause state. */
function useSceneClock(running: boolean, interval = 240) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), interval);
    return () => window.clearInterval(timer);
  }, [running, interval]);
  return tick;
}

function Status({ children }: { children: ReactNode }) {
  return <span className="ss-status"><span />{children}</span>;
}

function ProvidersScene({ running }: { running: boolean }) {
  const tick = useSceneClock(running);
  const cipher = "a7F2x9K4m8P3";
  const encrypted = tick % 32 > 9 || !running;
  const credential = encrypted ? "•••• •••• ••••" : Array.from({ length: 12 }, (_, i) => cipher[(i * 7 + tick * 3) % cipher.length]).join("");
  return (
    <div className="ss-providers">
      <div className="ss-scene-heading"><span>Seus modelos, conectados.</span><span className="ss-mono ss-muted">06 provedores</span></div>
      <div className="ss-provider-network">
        <svg className="ss-network-lines" viewBox="0 0 500 240" preserveAspectRatio="none" fill="none">
          {[35, 120, 205].flatMap((y, i) => [
            <path key={`left-${y}`} d={`M65 ${y} C170 ${y} 165 120 250 120`} className="ss-wire" />,
            <path key={`right-${y}`} d={`M435 ${y} C330 ${y} 335 120 250 120`} className="ss-wire" />,
            <path key={`packet-left-${y}`} d={`M65 ${y} C170 ${y} 165 120 250 120`} className="ss-packet" style={{ animationDelay: `${i * 1.1}s` }} pathLength="1" />,
            <path key={`packet-right-${y}`} d={`M435 ${y} C330 ${y} 335 120 250 120`} className="ss-packet" style={{ animationDelay: `${i * 1.1 + 0.5}s` }} pathLength="1" />,
          ])}
        </svg>
        <div className="ss-vault-halo" />
        <div className="ss-vault-orbit ss-vault-orbit-one" />
        <div className="ss-vault-orbit ss-vault-orbit-two" />
        {providers.map((provider, i) => (
          <div key={provider} className={`ss-provider ss-provider-${i < 3 ? "left" : "right"}`} style={{ top: `${[14.6, 50, 85.4][i % 3]}%`, "--ss-delay": `${i * 0.65}s`, "--ss-row": i % 3 - 1 } as CSSProperties}>
            <span className={`ss-provider-mark${i === 2 ? " ss-provider-mark-small" : ""}`}>{["◎", "A", "aws", "⊞", "G", "N"][i]}</span><span>{provider}</span>
          </div>
        ))}
        <div className="ss-vault"><LockKeyhole size={34} strokeWidth={1.5} /><span>COFRE</span></div>
      </div>
      <div className="ss-credential ss-panel">
        <div className="ss-credential-label"><KeyRound size={15} strokeWidth={1.5} /><span>Credencial protegida</span><span className="ss-mini-lock"><LockKeyhole size={12} strokeWidth={1.5} /></span></div>
        <div className="ss-between"><code className="ss-mono ss-key">sk-{credential}</code><Status>{encrypted ? "no cofre" : "cifrando"}</Status></div>
      </div>
    </div>
  );
}

function AliasesScene({ running }: { running: boolean }) {
  const tick = useSceneClock(running, 200);
  const rollout = !running ? 100 : [10, 50, 100][Math.floor((tick % 48) / 16)];
  return (
    <div className="ss-aliases">
      <div className="ss-scene-heading"><span>O nome fica. O modelo evolui.</span><GitBranch size={16} strokeWidth={1.5} /></div>
      <div className="ss-alias-grid">
        <div className="ss-panel ss-alias-primary"><span className="ss-eyebrow">ALIAS PRINCIPAL</span><code>chat-padrao</code><span className="ss-alias-version">v3 <span>·</span> em produção</span></div>
        <div className="ss-panel ss-alias-secondary"><span className="ss-eyebrow">ALIAS</span><code>resumo-rapido</code><span className="ss-alias-version">v1 <span>·</span> disponível</span></div>
      </div>
      <div className="ss-fallback-network">
        <svg viewBox="0 0 500 115" preserveAspectRatio="none" fill="none" className="ss-network-lines">
          <path className="ss-wire" d="M130 0 C130 28 80 12 80 43 M80 75 C80 110 250 110 250 75 M250 75 C250 110 420 110 420 75" />
          <path className="ss-packet ss-packet-slow" pathLength="1" d="M130 0 C130 28 80 12 80 43 M80 75 C80 110 250 110 250 75 M250 75 C250 110 420 110 420 75" />
        </svg>
        {["claude", "gpt", "gemini"].map((model, i) => <div key={model} className={`ss-model ss-model-${i}`}><span className="ss-model-dot" /><span className="ss-mono">{model}</span><span className="ss-model-order">0{i + 1}</span></div>)}
        <span className="ss-fallback-caption">fallback automático <ArrowRight size={12} strokeWidth={1.5} /></span>
      </div>
      <div className="ss-panel ss-rollout">
        <div className="ss-between"><span>Rollout gradual</span><span className="ss-mono ss-bright">{rollout}%</span></div>
        <div className="ss-slider"><motion.span initial={false} animate={{ scaleX: rollout / 100 }} transition={{ duration: running ? 1.4 : 0, ease }} /><motion.i initial={false} animate={{ left: `${rollout}%` }} transition={{ duration: running ? 1.4 : 0, ease }} /></div>
        <div className="ss-between ss-mono ss-muted ss-rollout-labels"><span>10%</span><span>50%</span><span>100%</span></div>
      </div>
    </div>
  );
}

function RulesScene({ running }: { running: boolean }) {
  const tick = useSceneClock(running, 200);
  const progress = Math.min(1, (tick % 40) / 24);
  const budget = running ? Math.round(36 + 48 * (1 - (1 - progress) ** 3)) : 84;
  return (
    <div className="ss-rules">
      <div className="ss-scene-heading"><span>Governança em cada camada.</span><ShieldCheck size={17} strokeWidth={1.5} /></div>
      <div className="ss-rules-grid">
        <div className="ss-hierarchy">
          {["Organização", "Time", "Projeto", "Ambiente"].map((level, i) => <div key={level} className="ss-hierarchy-row" style={{ "--ss-level": i, "--ss-delay": `${i * 0.45}s` } as CSSProperties}><span className="ss-hierarchy-node">{i === 0 ? <Building2 size={14} strokeWidth={1.5} /> : <span />}</span><span>{level}</span><Check size={12} className="ss-inherited-check" strokeWidth={1.5} /></div>)}
          <span className="ss-inheritance-note"><ArrowDown size={11} strokeWidth={1.5} /> Regras herdadas</span>
        </div>
        <div className="ss-budget ss-panel"><span className="ss-eyebrow">ORÇAMENTO</span><span className="ss-budget-value ss-mono">R$ {(budget * 100).toLocaleString("pt-BR")}</span><span className="ss-muted">de R$ 10.000</span><div className="ss-budget-chart"><motion.span className="ss-budget-fill" initial={false} animate={{ scaleX: budget / 100 }} transition={{ duration: running ? 0.2 : 0, ease: "linear" }} /><span className="ss-budget-marker ss-budget-marker-80"><i />80%</span><span className="ss-budget-marker ss-budget-marker-95"><i />95%</span></div><span className="ss-budget-caption">Limites antes da fatura.</span></div>
      </div>
      <div className="ss-policy-list ss-panel">
        {[{ title: "Proteção de dados", text: "Dados pessoais mascarados", Icon: ShieldCheck }, { title: "Limite por minuto", text: "Quota por projeto", Icon: Activity }].map(({ title, text, Icon }, i) => <div key={title} className="ss-policy"><Icon size={18} strokeWidth={1.5} /><div><span>{title}</span><small>{text}</small></div><span className="ss-toggle" style={{ "--ss-delay": `${i * 0.8}s` } as CSSProperties}><i /></span></div>)}
      </div>
    </div>
  );
}

function AccessScene({ running }: { running: boolean }) {
  const tick = useSceneClock(running);
  const phase = tick % 48;
  const unlocked = phase >= 19 || !running;
  const digits = Math.min(6, Math.floor(phase / 2));
  return (
    <div className="ss-access">
      <div className="ss-scene-heading"><span>O acesso certo, para cada pessoa.</span><Fingerprint size={18} strokeWidth={1.5} /></div>
      <div className="ss-access-card ss-panel">
        <div className="ss-access-emblem"><Fingerprint size={27} strokeWidth={1.5} /></div>
        <div className="ss-access-title font-display">Seu time está em casa.</div>
        <div className="ss-access-domain ss-mono">suaempresa.com.br</div>
        <div className="ss-access-content">
          <AnimatePresence mode="wait" initial={false}>
            {unlocked ? <motion.div key="portal" className="ss-access-state" initial={running ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
              <div className="ss-access-verified"><ShieldCheck size={15} strokeWidth={1.5} /> SSO + MFA verificados</div>
              <div className="ss-portal-label"><Terminal size={14} strokeWidth={1.5} /><span>Portal do desenvolvedor</span></div>
              <div className="ss-generated-key"><code className="ss-mono">plrs_••••_8f2a</code><span><Copy size={13} strokeWidth={1.5} /> copiar</span></div>
              <div className="ss-access-success"><Check size={14} strokeWidth={1.5} /> Chave criada com as regras do projeto</div>
            </motion.div> : <motion.div key="mfa" className="ss-access-state" initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3 }}>
              <div className="ss-access-verified"><Check size={14} strokeWidth={1.5} /> Identidade confirmada via SSO</div>
              <p className="ss-mfa-label">Autenticação em dois fatores</p>
              <div className="ss-otp">{"824617".split("").map((digit, i) => <span className={i < digits ? "ss-otp-filled" : ""} key={i}>{i < digits ? digit : "·"}</span>)}</div>
              <div className="ss-access-success">{digits === 6 ? <><Check size={14} strokeWidth={1.5} /> Identidade verificada</> : "Confirme seu código de segurança"}</div>
            </motion.div>}
          </AnimatePresence>
        </div>
      </div>
      <div className="ss-access-path"><span>SSO</span><ChevronRight size={13} strokeWidth={1.5} /><span>MFA</span><ChevronRight size={13} strokeWidth={1.5} /><span className={unlocked ? "ss-bright" : ""}>Portal</span></div>
    </div>
  );
}

const requests = [
  { alias: "chat-padrao", model: "claude", cost: "0,0042" },
  { alias: "resumo-rapido", model: "gemini", cost: "0,0018" },
  { alias: "chat-padrao", model: "gpt", cost: "0,0036" },
  { alias: "resumo-rapido", model: "claude", cost: "0,0024" },
  { alias: "chat-padrao", model: "gemini", cost: "0,0016" },
];

function DashboardScene({ running }: { running: boolean }) {
  const tick = useSceneClock(running, 2400);
  const id = useId().replace(/:/g, "");
  return (
    <div className="ss-dashboard">
      <div className="ss-scene-heading"><span>Visibilidade em tempo real.</span><Status>ao vivo</Status></div>
      <div className="ss-metrics"><div><span>Custo hoje</span><span className="ss-metric-value font-display">R$ {(124.8 + tick * 0.02).toFixed(2).replace(".", ",")}</span></div><div><span>Economia de tokens</span><span className="ss-metric-value font-display ss-bright">32<span className="ss-metric-unit">%</span></span></div><div><span>Requisições</span><span className="ss-metric-value font-display">{(1248 + tick).toLocaleString("pt-BR")}</span></div></div>
      <div className="ss-chart">
        <div className="ss-chart-legend"><span><i /> consumo</span><span className="ss-muted">últimas 24 horas</span></div>
        <svg viewBox="0 0 500 100" preserveAspectRatio="none" fill="none">
          <defs><linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#9382ff" stopOpacity="0.18" /><stop offset="1" stopColor="#9382ff" stopOpacity="0" /></linearGradient></defs>
          {[20, 50, 80].map((y) => <path key={y} d={`M0 ${y} H500`} stroke="rgba(244,240,255,.07)" strokeDasharray="3 5" />)}
          <path d="M0 82 C24 82 20 64 48 68 S80 50 100 57 S132 77 153 55 S182 61 205 38 S233 65 258 46 S288 49 307 31 S333 50 355 30 S387 40 411 21 S442 38 464 14 S490 19 500 9 V100 H0Z" fill={`url(#${id}-fill)`} />
          <path className="ss-chart-line" pathLength="1" d="M0 82 C24 82 20 64 48 68 S80 50 100 57 S132 77 153 55 S182 61 205 38 S233 65 258 46 S288 49 307 31 S333 50 355 30 S387 40 411 21 S442 38 464 14 S490 19 500 9" stroke="#ba9cff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="ss-between ss-chart-axis ss-mono"><span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>agora</span></div>
      </div>
      <div className="ss-requests ss-panel"><div className="ss-request-header"><span>Últimas requisições</span><span className="ss-mono">custo / chamada</span></div><div className="ss-request-rows"><AnimatePresence initial={false} mode="popLayout">{Array.from({ length: 3 }, (_, i) => { const request = requests[(tick + requests.length - i) % requests.length]; return <motion.div key={tick - i} layout={running ? "position" : false} initial={running ? { opacity: 0, y: -20 } : false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="ss-request-row"><Check size={12} strokeWidth={1.5} /><code>{request.alias}</code><span className="ss-request-model">{request.model}</span><span className="ss-request-cost ss-mono">R$ {request.cost}</span></motion.div>; })}</AnimatePresence></div></div>
    </div>
  );
}

function Scene({ index, running }: { index: number; running: boolean }) {
  switch (index) {
    case 0: return <ProvidersScene running={running} />;
    case 1: return <AliasesScene running={running} />;
    case 2: return <RulesScene running={running} />;
    case 3: return <AccessScene running={running} />;
    default: return <DashboardScene running={running} />;
  }
}

function Stage({ active, mobile = false }: { active: number; mobile?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const reduce = useReducedMotion();
  const running = inView && reduce === false;
  const Icon = stepIcons[active];
  return (
    <div ref={ref} className={`ss-stage${mobile ? " ss-stage-mobile" : ""}`} data-running={running} role="img" aria-label={sceneDescriptions[active]}>
      <div className="ss-stage-bloom" aria-hidden="true" />
      <div className="ss-stage-beam" aria-hidden="true" />
      <div className="ss-stage-floor" aria-hidden="true" />
      <div className="ss-stage-rim" aria-hidden="true" />
      <div className="ss-stage-topbar" aria-hidden="true"><span className="ss-stage-brand"><Sparkles size={14} strokeWidth={1.5} /> Jack Polaris</span><span className="ss-stage-demo">Demonstração</span><span className="ss-stage-counter ss-mono">0{active + 1}<span> / 05</span></span></div>
      <div className="ss-stage-window" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div key={active} className="ss-scene" initial={reduce ? false : { opacity: 0, scale: 0.975, filter: "blur(6px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: 1.015, filter: reduce ? "blur(0px)" : "blur(4px)" }} transition={{ duration: reduce ? 0 : 0.5, ease }}>
            <Scene index={active} running={running} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="ss-stage-footer" aria-hidden="true"><span><Icon size={14} strokeWidth={1.5} />{sceneNames[active]}</span><div className="ss-stage-dots">{steps.map((step, i) => <i key={step.title} data-active={i === active} />)}</div></div>
    </div>
  );
}

export function StepsShowcase() {
  const trackRef = useRef<HTMLOListElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start center", "end center"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (trackRef.current?.offsetParent === null) return;
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length))));
  });

  function goToStep(index: number) {
    stepRefs.current[index]?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "center" });
  }

  return (
    <section id="como-funciona" className="ss-section" aria-labelledby="ss-heading">
      <style>{styles}</style>
      <div className="ss-section-light" aria-hidden="true" />
      <Container>
        <div className="ss-heading"><Badge>Como funciona</Badge><h2 id="ss-heading" className="font-display">Do primeiro provedor à operação completa, em cinco passos.</h2></div>
        <div className="ss-desktop">
          <ol ref={trackRef} className="ss-step-list">
            <li className="ss-track" aria-hidden="true"><motion.span style={{ scaleY: lineScale }} /></li>
            {steps.map((step, i) => <li key={step.title} ref={(el) => { stepRefs.current[i] = el; }} className="ss-step" data-active={active === i} data-complete={active > i}>
              <button type="button" className="ss-step-button" onClick={() => goToStep(i)} aria-current={active === i ? "step" : undefined} aria-label={`Passo ${i + 1}: ${step.title}`}><span className="ss-step-number ss-mono">0{i + 1}</span><span className="ss-step-copy"><span className="ss-step-kicker ss-mono">PASSO 0{i + 1}</span><span className="ss-step-title font-display">{step.title}</span><span className="ss-step-description"><RichText text={step.text} /></span><span className="ss-step-cue">{sceneNames[i]}<ArrowRight size={14} strokeWidth={1.5} /></span></span></button>
            </li>)}
          </ol>
          <div className="ss-sticky"><Stage active={active} /></div>
        </div>
        <ol className="ss-mobile">{steps.map((step, i) => <li key={step.title}><div className="ss-mobile-copy"><span className="ss-step-number ss-mono">0{i + 1}</span><div><h3 className="ss-step-title font-display">{step.title}</h3><p className="ss-step-description"><RichText text={step.text} /></p></div></div><Stage active={i} mobile /></li>)}</ol>
      </Container>
    </section>
  );
}

const styles = `
.ss-section{position:relative;isolation:isolate;padding:112px 0 100px;scroll-margin-top:96px;color:var(--lilac)}
.ss-section *{box-sizing:border-box}
.ss-section-light{position:absolute;z-index:-1;pointer-events:none;inset:0 0 auto;height:650px;overflow:hidden;background:radial-gradient(ellipse 45% 50% at 55% 5%,rgba(80,70,228,.1),transparent 80%)}
.ss-section-light:before{content:"";position:absolute;top:0;left:22%;right:22%;height:1px;background:var(--gradient-aurora);opacity:.6}
.ss-heading{max-width:860px;margin:0 auto 72px;text-align:center}
.ss-heading h2{font-size:52px;line-height:1.13;letter-spacing:-1.5px;margin:25px 0 0;background:linear-gradient(180deg,#f4f0ff 24%,#a8a6b7 100%);background-clip:text;-webkit-background-clip:text;color:transparent}
.ss-desktop{display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:60px;align-items:start}
.ss-step-list{position:relative;list-style:none;margin:0;padding:0}
.ss-track{position:absolute;top:150px;bottom:150px;left:20px;width:1px;background:rgba(147,130,255,.12)}
.ss-track>span{position:absolute;inset:0;transform-origin:top;background:linear-gradient(180deg,#e59cff,#ba9cff,#9cb2ff);box-shadow:0 0 12px rgba(147,130,255,.4)}
.ss-step{position:relative;min-height:300px;display:flex;align-items:center;scroll-margin-top:0}
.ss-step-button{display:grid;grid-template-columns:42px minmax(0,1fr);gap:23px;align-items:center;width:100%;border:0;background:transparent;color:inherit;text-align:left;padding:16px 0;cursor:pointer;border-radius:5px}
.ss-step-button:focus-visible{outline:2px solid var(--lavender);outline-offset:8px}
.ss-step-number{position:relative;display:flex;justify-content:center;align-items:center;width:41px;height:41px;border:1px solid rgba(147,130,255,.17);border-radius:50%;background:var(--void);color:var(--steel);font-size:12px;transition:color .5s,border-color .5s,background .5s;z-index:1}
.ss-step-copy{display:flex;flex-direction:column;min-width:0}
.ss-step-kicker{font-size:10px;letter-spacing:2px;color:var(--lavender);margin-bottom:12px;opacity:0;transition:opacity .4s}
.ss-step-title{display:block;font-size:27px;line-height:1.22;letter-spacing:-.55px;color:var(--fog);transition:color .5s}
.ss-step-description{display:block;font-size:15px;line-height:1.75;color:var(--fog);margin-top:15px;opacity:.58;transition:opacity .5s}
.ss-step-cue{display:flex;align-items:center;gap:9px;font-size:12px;color:var(--lavender);margin-top:18px;opacity:0;transition:opacity .5s}
.ss-step[data-active=true] .ss-step-number,.ss-mobile .ss-step-number{color:var(--lilac);border-color:rgba(147,130,255,.6);background:var(--indigo);box-shadow:inset 0 0 18px rgba(147,130,255,.13)}
.ss-step[data-active=true] .ss-step-title{color:var(--lilac)}
.ss-step[data-active=true] .ss-step-description,.ss-step[data-active=true] .ss-step-kicker,.ss-step[data-active=true] .ss-step-cue{opacity:1}
.ss-step[data-complete=true] .ss-step-number{color:var(--lavender);border-color:rgba(147,130,255,.4)}
.ss-step-button:hover .ss-step-title{color:var(--lilac)}
.ss-sticky{position:sticky;top:max(108px,calc((100svh - 542px)/2))}
.ss-stage{position:relative;isolation:isolate;height:542px;border:1px solid rgba(147,130,255,.19);border-radius:16px;background:linear-gradient(145deg,rgba(16,9,58,.45),rgba(6,3,23,.98) 58%);box-shadow:inset 0 0 24px rgba(255,255,255,.04);overflow:hidden}
.ss-stage-bloom{position:absolute;z-index:-1;width:360px;height:260px;left:50%;top:-150px;transform:translateX(-50%);background:radial-gradient(ellipse,rgba(147,130,255,.62),rgba(80,70,228,.23) 45%,transparent 72%);filter:blur(24px);pointer-events:none}
.ss-stage-beam{position:absolute;z-index:-1;left:50%;top:-18px;width:200px;height:230px;transform:translateX(-50%);background:conic-gradient(from 156deg at 50% 0,transparent,rgba(147,130,255,.18) 12deg,rgba(244,240,255,.12) 24deg,rgba(147,130,255,.18) 36deg,transparent 48deg);filter:blur(10px);mask-image:linear-gradient(#000,transparent)}
.ss-stage-floor{position:absolute;z-index:-1;inset:58% -25% -130px;transform:perspective(340px) rotateX(56deg);transform-origin:center top;background-image:linear-gradient(rgba(147,130,255,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(147,130,255,.09) 1px,transparent 1px);background-size:35px 35px;mask-image:radial-gradient(ellipse,#000,transparent 67%);pointer-events:none}
.ss-stage-rim{position:absolute;top:0;left:10%;right:10%;height:1px;background:var(--gradient-aurora);opacity:.85}
.ss-stage-rim:after{content:"";position:absolute;left:0;top:0;width:26%;height:1px;background:linear-gradient(90deg,transparent,#f4f0ff,transparent);animation:ss-rim 7s ease-in-out infinite}
.ss-stage-topbar{height:58px;margin:0 26px;border-bottom:1px solid rgba(244,240,255,.07);display:flex;align-items:center;gap:14px;font-size:12px}
.ss-stage-brand{display:flex;align-items:center;gap:7px;color:var(--ash)}
.ss-stage-brand svg{color:var(--lavender)}
.ss-stage-demo{font-size:9px;letter-spacing:.8px;text-transform:uppercase;color:var(--steel);margin-left:auto}
.ss-stage-counter{font-size:10px;color:var(--lavender)}
.ss-stage-counter>span{color:var(--steel)}
.ss-stage-window{position:relative;height:425px;margin:0 30px}
.ss-scene{position:absolute;inset:0;padding-top:26px;will-change:opacity,transform}
.ss-scene-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px;font-weight:500;margin-bottom:20px;min-height:20px}
.ss-scene-heading>svg{color:var(--lavender)}
.ss-scene-heading>.ss-mono{font-size:10px;font-weight:400}
.ss-panel{background:rgba(6,3,23,.8);border:1px solid rgba(147,130,255,.16);border-radius:16px;box-shadow:inset 0 0 24px rgba(255,255,255,.04)}
.ss-mono,.ss-alias-grid code,.ss-request-row code{font-family:var(--font-mono-face),monospace;font-weight:400;font-variant-numeric:tabular-nums}
.ss-muted{color:var(--fog)}
.ss-bright{color:var(--lavender)}
.ss-between{display:flex;align-items:center;justify-content:space-between;gap:8px}
.ss-status{display:inline-flex;align-items:center;gap:6px;color:var(--lavender);white-space:nowrap;font-size:10px;font-weight:400}
.ss-status>span{height:4px;width:4px;border-radius:50%;background:var(--lavender);animation:ss-status 3s ease-in-out infinite}
.ss-stage-footer{display:flex;align-items:center;justify-content:space-between;height:58px;margin:0 26px;border-top:1px solid rgba(244,240,255,.07);gap:12px;font-size:11px;color:var(--fog)}
.ss-stage-footer>span{display:flex;align-items:center;gap:8px}
.ss-stage-footer svg{color:var(--lavender)}
.ss-stage-dots{display:flex;gap:5px}
.ss-stage-dots i{display:block;width:5px;height:5px;background:var(--steel);opacity:.4;border-radius:50%;transition:opacity .4s,background .4s}
.ss-stage-dots i[data-active=true]{background:var(--lavender);opacity:1}
.ss-provider-network{height:225px;position:relative;margin-top:-6px}
.ss-network-lines{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.ss-wire{stroke:rgba(147,130,255,.23);stroke-width:1;vector-effect:non-scaling-stroke}
.ss-packet{stroke:#ba9cff;stroke-width:1.3;stroke-dasharray:.07 .93;stroke-dashoffset:1;vector-effect:non-scaling-stroke;animation:ss-packet 3.8s linear infinite}
.ss-vault-halo{position:absolute;left:50%;top:50%;width:180px;height:180px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(147,130,255,.52),rgba(80,70,228,.25) 42%,transparent 70%);animation:ss-halo 5s ease-in-out infinite}
.ss-vault-orbit{position:absolute;left:50%;top:50%;border:1px solid rgba(147,130,255,.13);border-radius:50%;transform:translate(-50%,-50%)}
.ss-vault-orbit-one{width:142px;height:142px;border-color:rgba(186,156,255,.25)}.ss-vault-orbit-two{width:193px;height:193px;border-style:dashed;opacity:.5}
.ss-vault{position:absolute;left:50%;top:50%;width:86px;height:94px;transform:translate(-50%,-50%);border:1px solid rgba(186,156,255,.55);border-radius:16px;background:linear-gradient(155deg,#271e5c,#10093a 70%);box-shadow:inset 0 0 24px rgba(244,240,255,.16);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}
.ss-vault svg{color:var(--lilac);filter:drop-shadow(0 0 9px rgba(147,130,255,.6))}
.ss-vault>span{font-size:8px;letter-spacing:3px;color:var(--lavender)}
.ss-provider{position:absolute;width:27%;height:34px;margin-top:-17px;border:1px solid rgba(147,130,255,.2);background:#0c0723;border-radius:999px;display:flex;justify-content:center;align-items:center;gap:7px;color:var(--ash);font-size:10px;white-space:nowrap;animation:ss-provider 10s ease-in-out infinite;animation-delay:var(--ss-delay);--ss-flight:135%}
.ss-provider-left{left:0}.ss-provider-right{right:0;--ss-flight:-135%}
.ss-provider-mark{font-size:14px;color:var(--lilac);font-weight:500;letter-spacing:-.8px;min-width:14px;text-align:center}
.ss-provider-mark-small{font-size:10px}
.ss-credential{padding:13px 17px;margin-top:8px}
.ss-credential-label{display:flex;align-items:center;gap:7px;font-size:10px;color:var(--fog);margin-bottom:10px}
.ss-credential-label>svg{color:var(--lavender)}
.ss-mini-lock{margin-left:auto;color:var(--lavender)}
.ss-key{font-size:13px;letter-spacing:.7px;color:var(--ash)}
.ss-eyebrow{font-size:8px;letter-spacing:1.3px;color:var(--fog)}
.ss-alias-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ss-alias-grid>.ss-panel{padding:17px;display:flex;flex-direction:column;gap:10px}
.ss-alias-grid code{font-size:15px;color:var(--lilac);white-space:nowrap}
.ss-alias-primary{border-color:rgba(147,130,255,.5);background:linear-gradient(140deg,rgba(80,70,228,.14),rgba(6,3,23,.9))}
.ss-alias-secondary{opacity:.68}
.ss-alias-version{font-size:9px;color:var(--fog)}.ss-alias-version>span{padding:0 3px;color:var(--lavender)}
.ss-fallback-network{position:relative;height:110px}
.ss-model{position:absolute;top:39px;width:29%;height:35px;display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid rgba(147,130,255,.2);border-radius:5px;background:var(--midnight);font-size:11px}
.ss-model-0{left:1.5%;border-color:rgba(147,130,255,.45)}.ss-model-1{left:35.5%}.ss-model-2{left:69.5%}
.ss-model-dot{width:4px;height:4px;border-radius:50%;background:var(--lavender)}
.ss-model-order{color:var(--steel);font-size:8px;margin-left:3px}
.ss-fallback-caption{position:absolute;right:4px;bottom:1px;display:flex;align-items:center;gap:6px;font-size:9px;color:var(--fog);background:var(--midnight);padding-left:8px}
.ss-packet-slow{animation-duration:5s}
.ss-rollout{padding:16px 18px;margin-top:9px;font-size:11px}
.ss-slider{height:3px;background:rgba(147,130,255,.12);position:relative;margin:18px 0 12px}
.ss-slider>span{position:absolute;inset:0;transform-origin:left;background:linear-gradient(90deg,#e59cff,#ba9cff,#9cb2ff)}
.ss-slider>i{position:absolute;top:-3px;transform:translateX(-50%);width:9px;height:9px;border:2px solid #ba9cff;border-radius:50%;background:var(--indigo)}
.ss-rollout-labels{font-size:9px}
.ss-rules-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:20px;margin-bottom:16px}
.ss-hierarchy{padding:4px 0;position:relative}
.ss-hierarchy-row{--ss-indent:24px;--ss-node:24px;--ss-row:34px;position:relative;height:var(--ss-row);margin-left:calc(var(--ss-level)*var(--ss-indent));display:flex;align-items:center;gap:8px;font-size:11px;white-space:nowrap}
.ss-hierarchy-row:not(:first-child):before{content:"";position:absolute;box-sizing:border-box;left:calc(var(--ss-node)/2 - var(--ss-indent));top:calc(var(--ss-node)/2 - var(--ss-row)/2);width:calc(var(--ss-indent) - var(--ss-node)/2);height:calc(var(--ss-row) - var(--ss-node)/2 + 1px);border-left:1px solid rgba(147,130,255,.3);border-bottom:1px solid rgba(147,130,255,.3);border-bottom-left-radius:5px}
.ss-hierarchy-node{flex:none;width:var(--ss-node);height:var(--ss-node);display:flex;align-items:center;justify-content:center;border:1px solid rgba(147,130,255,.2);border-radius:5px;color:var(--lavender);background:var(--indigo)}
.ss-hierarchy-node>span{width:4px;height:4px;border-radius:50%;background:var(--lavender)}
.ss-inherited-check{margin-left:auto;margin-right:3px;color:var(--lavender);animation:ss-inherit 6s ease-in-out infinite;animation-delay:var(--ss-delay)}
.ss-inheritance-note{display:flex;align-items:center;gap:6px;font-size:9px;color:var(--fog);padding-top:12px;padding-left:6px}
.ss-budget{display:flex;flex-direction:column;padding:18px 16px;min-width:0;justify-content:center}
.ss-budget-value{font-size:20px;letter-spacing:-.6px;margin-top:15px;white-space:nowrap}
.ss-budget>.ss-muted{font-size:10px;margin-top:4px}
.ss-budget-chart{height:5px;background:rgba(147,130,255,.11);margin:31px 0 15px;position:relative}
.ss-budget-fill{position:absolute;inset:0;background:var(--lavender);transform-origin:left;transform:scaleX(.84)}
.ss-budget-marker{position:absolute;bottom:14px;transform:translateX(-50%);font-size:8px;color:var(--fog)}
.ss-budget-marker>i{position:absolute;width:1px;height:12px;background:rgba(244,240,255,.24);top:13px;left:50%}
.ss-budget-marker-80{left:80%}.ss-budget-marker-95{left:95%;bottom:-18px}.ss-budget-marker-95>i{top:-14px}
.ss-budget-caption{font-size:8px;color:var(--fog);margin-top:8px}
.ss-policy-list{padding:0 16px}
.ss-policy{display:flex;gap:10px;align-items:center;padding:12px 0}
.ss-policy+.ss-policy{border-top:1px solid rgba(244,240,255,.06)}
.ss-policy>svg{color:var(--lavender)}
.ss-policy>div{display:flex;flex-direction:column;gap:4px;font-size:11px}
.ss-policy small{font-size:9px;color:var(--fog)}
.ss-toggle{margin-left:auto;width:28px;height:16px;position:relative;border:1px solid rgba(147,130,255,.45);border-radius:999px;background:rgba(80,70,228,.4)}
.ss-toggle>i{position:absolute;width:10px;height:10px;top:2px;left:2px;border-radius:50%;background:#ba9cff;transform:translateX(11px);animation:ss-toggle 8s ease-in-out infinite;animation-delay:var(--ss-delay)}
.ss-access-card{position:relative;max-width:355px;margin:20px auto 0;padding:20px 22px 16px;background:linear-gradient(160deg,rgba(16,9,58,.85),rgba(6,3,23,.95));text-align:center}
.ss-access-emblem{display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:0 auto 15px;border:1px solid rgba(147,130,255,.35);border-radius:16px;box-shadow:inset 0 0 22px rgba(147,130,255,.15);color:#ba9cff}
.ss-access-title{font-size:21px;letter-spacing:-.4px}
.ss-access-domain{font-size:9px;color:var(--fog);margin-top:7px}
.ss-access-content{position:relative;height:144px;margin-top:20px}
.ss-access-state{position:absolute;inset:0}
.ss-access-verified{display:flex;align-items:center;justify-content:center;gap:6px;color:var(--lavender);font-size:10px}
.ss-mfa-label{font-size:11px;color:var(--ash);margin:18px 0 12px}
.ss-otp{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;max-width:260px;margin:auto}
.ss-otp>span{height:33px;display:flex;align-items:center;justify-content:center;border:1px solid rgba(147,130,255,.16);border-radius:5px;background:var(--void);font-size:15px;color:var(--steel);font-family:var(--font-mono-face),monospace;transition:border-color .3s,color .3s}
.ss-otp>.ss-otp-filled{color:var(--lilac);border-color:rgba(147,130,255,.5)}
.ss-access-success{display:flex;align-items:center;justify-content:center;gap:5px;font-size:9px;color:var(--fog);margin-top:15px}
.ss-portal-label{display:flex;align-items:center;justify-content:center;gap:6px;color:var(--ash);font-size:10px;margin-top:22px}
.ss-generated-key{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 10px;margin-top:13px;border-radius:5px;border:1px solid rgba(147,130,255,.3);background:var(--void)}
.ss-generated-key>code{font-size:12px;letter-spacing:.4px;color:#ba9cff}
.ss-generated-key>span{font-size:9px;display:flex;align-items:center;gap:5px;color:var(--fog)}
.ss-access-path{display:flex;align-items:center;justify-content:center;gap:15px;font-size:10px;color:var(--fog);margin:14px 0 0}
.ss-access-path svg{color:var(--steel)}
.ss-metrics{display:grid;grid-template-columns:1.15fr 1.15fr .8fr;margin-top:20px}
.ss-metrics>div{display:flex;flex-direction:column;gap:10px;padding-left:16px;border-left:1px solid rgba(147,130,255,.15)}
.ss-metrics>div:first-child{padding-left:0;border:0}
.ss-metrics>div>span:first-child{font-size:9px;color:var(--fog)}
.ss-metric-value{font-size:24px;line-height:1;letter-spacing:-.8px;font-variant-numeric:tabular-nums;white-space:nowrap}
.ss-metric-unit{font-size:17px}
.ss-chart{margin:20px 0 14px}
.ss-chart-legend{display:flex;align-items:center;justify-content:space-between;font-size:9px;color:var(--ash);margin-bottom:13px}
.ss-chart-legend>span:first-child{display:flex;align-items:center;gap:6px}
.ss-chart-legend i{display:inline-block;width:10px;height:2px;background:var(--lavender)}
.ss-chart svg{display:block;width:100%;height:86px;overflow:visible}
.ss-chart-line{stroke-dasharray:1;stroke-dashoffset:0;animation:ss-chart 9s ease-in-out infinite}
.ss-chart-axis{color:var(--steel);font-size:8px;margin-top:8px}
.ss-requests{padding:0 14px;overflow:hidden;border-radius:12px}
.ss-request-header{display:flex;align-items:center;justify-content:space-between;height:34px;font-size:9px;color:var(--ash);border-bottom:1px solid rgba(244,240,255,.07)}
.ss-request-header>.ss-mono{font-size:8px;color:var(--steel)}
.ss-request-rows{height:93px;position:relative;overflow:hidden}
.ss-request-row{display:grid;grid-template-columns:12px minmax(0,1fr) 45px 74px;align-items:center;gap:8px;height:31px;font-size:9px;border-bottom:1px solid rgba(244,240,255,.04)}
.ss-request-row>svg{color:var(--lavender)}
.ss-request-row>code{color:var(--ash);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ss-request-model{color:var(--fog);font-size:8px}
.ss-request-cost{text-align:right;color:var(--ash);font-size:9px}
.ss-mobile{display:none;list-style:none;margin:0;padding:0}
.ss-stage[data-running=false] *,.ss-stage[data-running=false] *:after{animation-play-state:paused!important}
@keyframes ss-rim{0%,100%{transform:translateX(0);opacity:0}15%,85%{opacity:1}90%{transform:translateX(300%)}}
@keyframes ss-status{0%,100%{opacity:.45}50%{opacity:1}}
@keyframes ss-packet{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
@keyframes ss-halo{0%,100%{opacity:.65;scale:.94}50%{opacity:1;scale:1.08}}
@keyframes ss-provider{0%,62%,100%{transform:translate(0,0) scale(1);opacity:1}70%{opacity:1}83%{transform:translate(var(--ss-flight),calc(var(--ss-row)*-80px)) scale(.4);opacity:0}84%{transform:translate(0,0) scale(.95);opacity:0}95%{opacity:1}}
@keyframes ss-toggle{0%,10%{transform:translateX(0);opacity:.5}22%,100%{transform:translateX(11px);opacity:1}}
@keyframes ss-inherit{0%,10%{opacity:.15}35%,100%{opacity:1}}
@keyframes ss-chart{0%{stroke-dashoffset:1}45%,100%{stroke-dashoffset:0}}
@media(min-width:1024px) and (max-width:1199px){.ss-desktop{gap:35px;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}.ss-step-button{gap:16px}.ss-step-title{font-size:25px}.ss-stage-window{margin:0 22px}.ss-provider{font-size:9px;gap:4px}.ss-key{font-size:11px}.ss-alias-grid code{font-size:13px}.ss-hierarchy-row{font-size:10px;--ss-indent:20px}.ss-metric-value{font-size:22px}}
@media(max-width:1023px){.ss-section{padding:85px 0}.ss-heading{max-width:680px;margin-bottom:58px}.ss-heading h2{font-size:42px}.ss-desktop{display:none}.ss-mobile{display:flex;flex-direction:column;gap:68px;max-width:600px;margin:0 auto}.ss-mobile-copy{display:grid;grid-template-columns:41px minmax(0,1fr);gap:17px;align-items:start;margin-bottom:26px}.ss-mobile .ss-step-number{margin-top:1px}.ss-mobile .ss-step-title{color:var(--lilac);font-size:26px}.ss-mobile .ss-step-description{opacity:1;font-size:15px;line-height:1.7;margin-top:12px}.ss-mobile .ss-stage{width:100%}}
@media(max-width:599px){.ss-section{padding:72px 0}.ss-heading{margin-bottom:48px;text-align:left}.ss-heading h2{font-size:35px;letter-spacing:-.9px;line-height:1.16;margin-top:22px;max-width:365px}.ss-mobile{gap:54px}.ss-mobile-copy{gap:13px;margin-bottom:23px;grid-template-columns:34px minmax(0,1fr)}.ss-mobile .ss-step-number{width:33px;height:33px;font-size:10px}.ss-mobile .ss-step-title{font-size:23px;letter-spacing:-.4px;padding-top:2px}.ss-mobile .ss-step-description{font-size:14px;line-height:1.75;margin-top:10px}.ss-stage{height:478px}.ss-stage-topbar{height:49px;margin:0 17px;gap:10px}.ss-stage-brand{font-size:11px;gap:6px}.ss-stage-demo{font-size:8px;letter-spacing:.3px}.ss-stage-counter{font-size:9px}.ss-stage-window{height:379px;margin:0 17px}.ss-stage-footer{height:49px;margin:0 17px;font-size:10px}.ss-scene{padding-top:21px}.ss-scene-heading{font-size:12px;margin-bottom:16px}.ss-scene-heading>.ss-mono{font-size:8px}.ss-provider-network{height:200px;margin-top:-5px}.ss-provider{font-size:8px;height:29px;margin-top:-14.5px;width:29%;gap:4px;--ss-flight:122%}.ss-provider-right{--ss-flight:-122%}.ss-provider-mark{font-size:11px;min-width:10px}.ss-vault{width:65px;height:77px;gap:9px;border-radius:16px}.ss-vault svg{width:27px;height:27px}.ss-vault>span{font-size:7px;letter-spacing:2px}.ss-vault-halo{width:142px;height:142px}.ss-vault-orbit-one{width:106px;height:106px}.ss-vault-orbit-two{width:145px;height:145px}.ss-credential{padding:12px 13px;margin-top:3px}.ss-key{font-size:11px;letter-spacing:.2px}.ss-status{font-size:9px;gap:5px}.ss-alias-grid{gap:9px}.ss-alias-grid>.ss-panel{padding:14px 12px;gap:9px;border-radius:12px}.ss-alias-grid code{font-size:12px}.ss-eyebrow{font-size:7px;letter-spacing:1px}.ss-alias-version{font-size:8px}.ss-fallback-network{height:110px}.ss-model{font-size:10px;gap:5px;height:32px}.ss-model-order{font-size:7px;margin-left:0}.ss-fallback-caption{font-size:8px}.ss-rollout{padding:15px;margin-top:10px;font-size:10px}.ss-slider{margin:16px 0 11px}.ss-rules-grid{gap:11px;margin-top:23px;margin-bottom:20px;grid-template-columns:1.05fr 1fr}.ss-hierarchy-row{font-size:9px;gap:6px;--ss-indent:18px;--ss-node:20px;--ss-row:32px}.ss-inherited-check{width:10px;margin-right:0}.ss-inheritance-note{font-size:8px;gap:4px}.ss-budget{padding:13px 12px;border-radius:12px}.ss-budget-value{font-size:17px;margin-top:14px}.ss-budget>.ss-muted{font-size:9px}.ss-budget-caption{font-size:7px}.ss-budget-chart{margin-top:29px}.ss-policy-list{padding:0 12px;border-radius:12px}.ss-policy{padding:12px 0;gap:8px}.ss-policy>div{font-size:10px}.ss-policy small{font-size:8px}.ss-policy>svg{width:16px;height:16px}.ss-access-card{padding:17px 17px 12px;margin-top:19px}.ss-access-emblem{width:43px;height:43px;margin-bottom:13px}.ss-access-title{font-size:20px}.ss-access-content{height:140px;margin-top:18px}.ss-access-domain{font-size:8px}.ss-access-path{margin-top:14px;font-size:9px}.ss-metrics{margin-top:16px;grid-template-columns:1.18fr 1.12fr .8fr}.ss-metrics>div{padding-left:9px;gap:10px}.ss-metrics>div>span:first-child{font-size:7.5px;white-space:nowrap}.ss-metric-value{font-size:21px;letter-spacing:-.7px}.ss-metric-unit{font-size:15px}.ss-chart{margin:18px 0 12px}.ss-chart svg{height:63px}.ss-chart-legend{font-size:8px}.ss-chart-axis{font-size:7px}.ss-requests{padding:0 10px}.ss-request-header{font-size:8px}.ss-request-header>.ss-mono{font-size:7px}.ss-request-row{grid-template-columns:10px minmax(0,1fr) 33px 66px;gap:5px;font-size:8px}.ss-request-model{font-size:7px}.ss-request-cost{font-size:8px}.ss-request-rows{height:90px}.ss-request-row{height:30px}}
@media(prefers-reduced-motion:reduce){.ss-section *,.ss-section *:after{animation:none!important;transition:none!important}.ss-step-kicker,.ss-step-cue{transition:none}.ss-chart-line{stroke-dashoffset:0}.ss-provider{transform:none;opacity:1}.ss-budget-fill{transform:scaleX(.84)}.ss-toggle>i{transform:translateX(11px)}.ss-stage-rim:after{display:none}}
`;
