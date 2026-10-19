"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { StarField } from "@/components/anim/StarField";
import { providers } from "@/content";
import { Badge, Button, Container } from "@/components/ui";
import { BeamBorder } from "@/components/fx/BeamBorder";
import { EffectScope } from "@/components/fx/EffectScope";
import { PolarisTrails } from "@/components/fx/PolarisTrails";
import { ConsoleMockup } from "./ConsoleMockup";

const ease = [0.22, 1, 0.36, 1] as const;
const words = ["IA", "generativa", "com", "governança", "corporativa."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.97, 1]);
  const fadeUp = (delay: number) => ({
    initial: reduce ? false as const : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <StarField density={0.45} />
        <div className="absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(80,70,228,0.12),transparent_70%)]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div {...fadeUp(0)}><Badge>Governança de IA para empresas</Badge></motion.div>
        <h1 className="font-display mt-6 max-w-[1060px] text-[43px] leading-[1.08] tracking-[-1.5px] sm:text-[60px] md:text-[72px]">
          <span className="sr-only">IA generativa com governança corporativa.</span>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <span key={word}>
                {i === 3 && <br className="hidden sm:block" />}
                <span className={`hero-word inline-block ${i < 3 ? "text-silver" : "text-cosmic"}`} style={{ animationDelay: `${0.1 + i * 0.09}s` }}>{word}</span>{i !== words.length - 1 && " "}
              </span>
            ))}
          </span>
        </h1>
        <motion.p {...fadeUp(0.35)} className="mt-6 max-w-[680px] text-[16px] leading-[1.65] text-ash md:text-[17px]">
          <strong className="font-medium text-lilac">Jack Polaris</strong> é a plataforma de governança de IA que
          coloca todos os modelos da sua empresa atrás de uma única porta: segura, auditada, com custo sob
          controle e compatível com a API da OpenAI.
        </motion.p>
        <motion.p {...fadeUp(0.43)} className="mt-3 max-w-[620px] text-[15px] leading-[1.65] text-fog">
          Seus times usam o melhor modelo para cada tarefa. Você define as regras, acompanha o consumo e dorme tranquilo.
        </motion.p>
        <motion.div {...fadeUp(0.52)} className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Button href="#contato">Fale com um especialista <ArrowRight className="size-4" strokeWidth={1.5} /></Button>
          <Button href="#solucao" variant="outline">Veja como funciona</Button>
        </motion.div>
      </Container>

      <div ref={ref} className="hero-product relative mt-28 md:mt-44">
        <PolarisTrails />
        <Container style={{ perspective: "1600px" }}>
          <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }} className="relative mx-auto max-w-[1080px]">
            <div className="hero-console-light" aria-hidden="true" />
            <BeamBorder><ConsoleMockup /></BeamBorder>
          </motion.div>
        </Container>
      </div>

      <Container className="mt-14 flex flex-col items-center gap-6 text-center md:mt-16">
        <p className="max-w-xl text-[12px] leading-relaxed text-fog md:text-[13px]">
          Compatível com OpenAI, Anthropic, AWS Bedrock, Azure OpenAI, Google Vertex, NVIDIA entre outros.
        </p>
        <EffectScope className="relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <div className="marquee flex w-max gap-14 pr-14" aria-label={providers.join(", ")}>
            {[...providers, ...providers, ...providers, ...providers].map((p, i) => <span aria-hidden="true" key={i} className="font-display whitespace-nowrap text-[20px] text-lilac/45">{p}</span>)}
          </div>
        </EffectScope>
      </Container>
    </section>
  );
}
