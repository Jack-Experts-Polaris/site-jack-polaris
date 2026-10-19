@AGENTS.md

# Jack Polaris website

Static marketing site for Jack Polaris (enterprise AI governance platform). Next.js 16 App Router, React 19, Tailwind CSS v4 (via `@tailwindcss/turbopack`), `motion` for animations, `lucide-react` for icons. Package manager: pnpm.

## Commands

- `pnpm dev` — dev server on http://localhost:3000
- `pnpm build` — static export to `out/`
- `pnpm lint` — ESLint

There are no tests. Validate changes with `pnpm lint` and `pnpm build`.

## Hosting: GitHub Pages (static export)

The site is deployed to https://polaris.jackexperts.com by `.github/workflows/deploy.yml` on every push to `main`. `next.config.ts` sets `output: "export"`, which imposes hard constraints:

- No server features: no Server Actions, cookies/headers, `proxy`, rewrites, redirects, ISR, or dynamic routes without `generateStaticParams`.
- Every route handler and metadata route (`robots.ts`, `sitemap.ts`, `manifest.ts`, `*/route.ts`) must export `export const dynamic = "force-static";`, otherwise the build fails.
- `images.unoptimized` is on; `next/image` serves files as-is, so keep assets in `public/` reasonably sized.
- `cacheComponents` is intentionally disabled: it rejects the `dynamic` segment config that static export requires.
- `public/CNAME` holds the custom domain; do not remove it.
- No `basePath`: the site is served from the domain root.

## Code layout

- `src/content.ts` — all user-facing copy (Brazilian Portuguese). Edit text here, not in components.
- `src/lib/site.ts` — site name, URL (`NEXT_PUBLIC_SITE_URL`), SEO keywords, `absoluteUrl()` and `jsonLd()` helpers.
- `src/lib/llms.ts` — builds `/llms.txt` and `/llms-full.txt` from `content.ts`.
- `src/app/` — `page.tsx` (home), `recursos/` (features page), metadata routes, JSON-LD in `layout.tsx`.
- `src/components/home/` — home sections; `anim/` — animated components; `fx/` — visual effects.

## Conventions

- Site copy is pt-BR; code, comments, commits and docs are in English.
- Use the `@/` import alias for `src/`.
- Keep SEO/structured data in sync when adding pages: update `sitemap.ts` and, if relevant, `llms.ts`.

## Git

- Use Conventional Commits in English: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`, `ci:`, `build:`.
- Never mention AI tools (Claude, Anthropic, Copilot, etc.) in commits, PRs or issues, and never add `Co-Authored-By` trailers for AI.
