"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";

// Shown next to the mailto buttons: some devices have no mail app configured, so the address must be readable and copyable.
export function ContactEmail() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the address stays selectable as plain text.
    }
  }

  return (
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-fog">
      <span>Ou escreva para</span>
      <span className="select-all font-medium text-lilac">{site.email}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "E-mail copiado" : "Copiar e-mail"}
        className="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[13px] text-steel transition-colors hover:bg-white/5 hover:text-lilac focus-visible:outline-2 focus-visible:outline-lavender"
      >
        {copied ? <Check className="size-3.5" strokeWidth={1.5} /> : <Copy className="size-3.5" strokeWidth={1.5} />}
        <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
      </button>
    </p>
  );
}
