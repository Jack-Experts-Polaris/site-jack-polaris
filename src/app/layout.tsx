import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { providers, resources } from "@/content";
import { absoluteUrl, jsonLd, site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Geist({ variable: "--font-display-face", subsets: ["latin"], weight: ["400", "500"] });
const mono = Geist_Mono({ variable: "--font-mono-face", subsets: ["latin"] });

const ogImage = { url: "/images/og-image.png", width: 1200, height: 630, alt: "Jack Polaris — Governança de IA para empresas" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "text/markdown": [{ url: "/llms.txt", title: "Jack Polaris para LLMs" }] },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
    images: [ogImage],
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#060317",
  colorScheme: "dark",
};

const organizationId = absoluteUrl("/#organization");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: site.name,
      url: site.url,
      logo: absoluteUrl("/brand/polaris-mark-256.png"),
      email: site.email,
      description: site.description,
      areaServed: { "@type": "Country", name: "Brasil" },
      knowsAbout: ["Governança de IA", "IA generativa", "LGPD", "LLM gateway", "FinOps", "Segurança de IA"],
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["Portuguese"] },
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: site.url,
      name: site.name,
      description: site.shortDescription,
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
    },
    {
      "@type": "SoftwareApplication",
      "@id": absoluteUrl("/#software"),
      name: site.name,
      url: site.url,
      image: absoluteUrl(ogImage.url),
      description: site.description,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI Gateway / Governança de IA",
      operatingSystem: "Kubernetes, Docker, Linux",
      inLanguage: "pt-BR",
      publisher: { "@id": organizationId },
      featureList: resources.map((r) => r.title),
      keywords: site.keywords.join(", "),
      softwareRequirements: "Kubernetes ou docker compose, PostgreSQL, Redis, KMS",
      isAccessibleForFree: false,
      audience: { "@type": "BusinessAudience", name: "Empresas brasileiras que usam IA generativa" },
      mentions: providers.map((name) => ({ "@type": "Organization", name })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${display.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-hidden">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
