import {
  Activity,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  FileClock,
  GitBranch,
  Home,
  KeyRound,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const nav = [
  { icon: Home, label: "Início", active: true },
  { icon: BadgeCheck, label: "Aprovações", count: 3 },
  { icon: Boxes, label: "Modelos" },
  { icon: GitBranch, label: "Aliases" },
  { icon: ShieldCheck, label: "Políticas" },
  { icon: Wrench, label: "Ferramentas MCP" },
  { icon: CircleDollarSign, label: "Custos" },
  { icon: FileClock, label: "Auditoria" },
  { icon: KeyRound, label: "Chaves" },
];

const kpis = [
  { label: "Custo do mês", value: "R$ 48.215", sub: "62% do orçamento" },
  { label: "Economia de tokens", value: "R$ 9.870", sub: "−17% de tokens" },
  { label: "Requisições (24h)", value: "1,24 mi", sub: "p95 1,8 s" },
  { label: "Dados mascarados", value: "3.412", sub: "CPF, cartão, e-mail" },
];

const logs = [
  { t: "14:02:11", alias: "chat-padrao", model: "claude · bedrock", cost: "R$ 0,0042", tag: "fallback" },
  { t: "14:02:10", alias: "resumo-rapido", model: "gpt-mini · azure", cost: "R$ 0,0003", tag: "cache" },
  { t: "14:02:09", alias: "chat-padrao", model: "gpt · openai", cost: "R$ 0,0061", tag: "PII mascarado" },
  { t: "14:02:07", alias: "juridico-contratos", model: "gemini · vertex", cost: "R$ 0,0190", tag: "zero retention" },
  { t: "14:02:05", alias: "chat-padrao", model: "gpt · openai", cost: "R$ 0,0038", tag: "ok" },
];

const bars = [28, 34, 30, 42, 38, 50, 46, 58, 54, 61, 57, 66, 63, 70];

export function ConsoleMockup() {
  return (
    <div className="hero-console surface-strong relative overflow-hidden rounded-[16px] text-left">
      {/* barra da janela */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-steel/70" />
          <span className="size-2.5 rounded-full bg-steel/50" />
          <span className="size-2.5 rounded-full bg-steel/30" />
        </div>
        <div className="mx-auto rounded-[5px] border border-white/[0.06] bg-void/60 px-3 py-1 font-mono text-[11px] text-fog">
          console.suaempresa.com
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
        <aside className="hidden flex-col gap-0.5 border-r border-white/[0.06] p-3 md:flex">
          <div className="mb-3 flex items-center gap-2 rounded-[5px] px-2 py-1.5 text-[12px] text-fog">
            <span className="size-5 rounded-[5px] bg-indigo text-center text-[10px] leading-5 text-lavender">A</span>
            Acme · Produção
          </div>
          {nav.map(({ icon: Icon, label, active, count }) => (
            <div
              key={label}
              className={`flex items-center gap-2.5 rounded-[5px] px-2 py-1.5 text-[12.5px] ${
                active ? "bg-white/[0.05] text-lilac" : "text-fog"
              }`}
            >
              <Icon className="size-3.5" strokeWidth={1.5} />
              {label}
              {count && (
                <span className="ml-auto rounded-[32px] bg-iris/30 px-1.5 text-[10px] text-lavender">{count}</span>
              )}
            </div>
          ))}
        </aside>

        <div className="flex flex-col gap-4 p-4 md:p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-fog">Início</div>
              <div className="font-display text-[18px] text-lilac">Operação de IA</div>
            </div>
            <div className="flex items-center gap-2 rounded-[32px] border border-white/[0.06] px-2.5 py-1 text-[11px] text-fog">
              <Activity className="size-3 text-lavender" strokeWidth={1.5} />
              tempo real
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-[5px] border border-white/[0.06] bg-void/50 p-3">
                <div className="text-[11px] text-fog">{k.label}</div>
                <div className="mt-1 font-display text-[18px] text-lilac tabular-nums">{k.value}</div>
                <div className="mt-0.5 text-[10.5px] text-fog/75">{k.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-2.5 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[5px] border border-white/[0.06] bg-void/50 p-3">
              <div className="flex items-center justify-between text-[11px] text-fog">
                <span>Consumo por centro de custo</span>
                <span className="text-fog/75">out/2026</span>
              </div>
              <div className="mt-3 flex h-[92px] items-end gap-1.5">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="fx-console-bar fx-loop flex-1 rounded-t-[3px]"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * -.35}s`,
                      background:
                        i === bars.length - 1
                          ? "linear-gradient(180deg,#ba9cff,#5046e4)"
                          : "linear-gradient(180deg,rgba(147,130,255,0.45),rgba(80,70,228,0.12))",
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                <div className="h-full w-[62%] rounded-full bg-lavender/70" />
              </div>
              <div className="mt-1.5 flex justify-between text-[10.5px] text-fog/75">
                <span>Orçamento · Atendimento</span>
                <span>alerta em 80%</span>
              </div>
            </div>

            <div className="rounded-[5px] border border-white/[0.06] bg-void/50 p-3">
              <div className="mb-2 text-[11px] text-fog">Requisições</div>
              <div className="flex flex-col">
                {logs.map((l, i) => (
                  <div
                    key={l.t}
                    style={{ animationDelay: `${i * -1.5}s` }}
                    className="fx-console-log fx-loop grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-2 border-t border-white/[0.04] py-1.5 font-mono text-[10.5px] first:border-t-0"
                  >
                    <span className="text-fog/75">{l.t}</span>
                    <span className="truncate text-lilac/90">
                      {l.alias} <span className="text-fog/75">→ {l.model}</span>
                    </span>
                    <span className="rounded-[32px] border border-lavender/25 px-1.5 text-[9.5px] text-lavender">
                      {l.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
