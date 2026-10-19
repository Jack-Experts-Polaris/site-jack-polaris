import { Hero } from "@/components/home/Hero";
import { StepsShowcase } from "@/components/anim/StepsShowcase";
import { WhySection } from "@/components/anim/WhySection";
import {
  Faq,
  FinalCta,
  Numbers,
  Personas,
  Problem,
  Solution,
  UseCases,
} from "@/components/home/Sections";
import { faq } from "@/content";
import { absoluteUrl, jsonLd } from "@/lib/site";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": absoluteUrl("/#faq"),
  inLanguage: "pt-BR",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <Hero />
      <Problem />
      <Solution />
      <Personas />
      <Numbers />
      <StepsShowcase />
      <WhySection />
      <UseCases />
      <Faq />
      <FinalCta />
    </main>
  );
}
