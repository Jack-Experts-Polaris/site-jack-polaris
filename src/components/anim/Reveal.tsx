"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealTag = "div" | "section" | "article" | "span" | "li" | "header";
const revealComponents = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  span: motion.span,
  li: motion.li,
  header: motion.header,
};

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
}) {
  const reducedMotion = useReducedMotion();
  const Component = revealComponents[as];

  return (
    <Component
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function RevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "-10%" }}
      variants={{ shown: { transition: { staggerChildren: 0.06 } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reducedMotion ? {} : { opacity: 0, y: 16, filter: "blur(6px)" },
        shown: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
