import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-2.5 align-middle whitespace-nowrap ${className}`}>
      <Image
        src="/brand/polaris-mark-256.png"
        alt=""
        width={28}
        height={28}
        loading="eager"
        className="size-7 shrink-0 object-contain"
      />
      <span className="font-display text-[15px] tracking-tight text-lilac">Jack Polaris</span>
    </span>
  );
}

export function Badge({ children, icon = true }: { children: ReactNode; icon?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[32px] border border-lavender/25 bg-midnight px-3.5 py-1.5 text-[13px] font-medium text-lilac shadow-[inset_0_-7px_11px_rgba(164,143,255,0.12)]">
      {icon && <Sparkles className="size-3.5 text-lavender" strokeWidth={1.5} />}
      {children}
    </span>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "ghost" | "outline"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-[5px] px-4 py-2.5 text-[15px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender";
  const styles = {
    primary:
      "bg-iris text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(147,130,255,0.4)] hover:bg-[#5d54f0] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_32px_rgba(147,130,255,0.35)]",
    outline:
      "bg-midnight text-lilac border border-white/10 shadow-[inset_0_0_24px_rgba(255,255,255,0.04)] hover:border-lavender/40 hover:bg-indigo",
    ghost: "text-fog hover:text-lilac",
  }[variant];
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function ChevronLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-lavender transition-colors hover:text-lilac"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
    </Link>
  );
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
}: {
  badge?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${a}`}>
      {badge && <Badge>{badge}</Badge>}
      <h2 className="font-display text-[36px] leading-[1.14] tracking-[-0.4px] text-silver md:text-[52px]">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-[17px] leading-[1.6] text-fog md:text-[18px]">{subtitle}</p>}
    </div>
  );
}

/** Renderiza `código` inline a partir de texto simples. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") ? (
          <code
            key={i}
            className="whitespace-nowrap rounded-[5px] border border-white/10 bg-indigo/60 px-1.5 py-0.5 font-mono text-[0.88em] text-[#ba9cff]"
          >
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

export function Container({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`} style={style}>
      {children}
    </div>
  );
}
