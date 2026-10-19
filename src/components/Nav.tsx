"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button, Logo } from "./ui";

const links = [
  { href: "/#solucao", label: "Como funciona" },
  { href: "/#para-quem", label: "Para quem é" },
  { href: "/#casos", label: "Casos de uso" },
  { href: "/recursos", label: "Recursos" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-[860px] items-center justify-between rounded-[999px] border py-1.5 pr-1.5 pl-5 backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-white/[0.08] bg-midnight/80 shadow-[inset_0_0_24px_rgba(255,255,255,0.05)]"
            : "border-white/[0.05] bg-midnight/40 shadow-[inset_0_0_24px_rgba(255,255,255,0.03)]"
        }`}
      >
        <Link href="/" aria-label="Jack Polaris — início" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-[999px] px-3 py-1.5 text-[14px] text-lilac/80 transition-colors hover:bg-white/[0.04] hover:text-lilac"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <Button href="/#contato" className="!hidden !rounded-[999px] !px-4 !py-2 !text-[14px] sm:!inline-flex">
            Fale com um especialista
          </Button>
          <button
            type="button"
            className="ml-1 rounded-full p-2 text-lilac md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="surface absolute inset-x-4 top-[72px] rounded-[16px] p-2 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-[5px] px-4 py-3 text-[15px] text-lilac/90 hover:bg-white/[0.04]"
            >
              {l.label}
            </Link>
          ))}
          <Button href="/#contato" className="mt-2 w-full sm:hidden">
            Fale com um especialista
          </Button>
        </div>
      )}
    </header>
  );
}
