# Jack Polaris — Website

Marketing site for **Jack Polaris**, an enterprise AI governance platform. Built with Next.js (App Router), React 19 and Tailwind CSS v4, exported as a fully static site and hosted on GitHub Pages at **https://polaris.jackexperts.com**.

## Requirements

- Node.js 22+
- pnpm 10 (`corepack enable` picks up the version pinned in `package.json`)

## Running locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command      | What it does                                         |
| ------------ | ---------------------------------------------------- |
| `pnpm dev`   | Start the dev server with hot reload                 |
| `pnpm build` | Build the static export into `out/`                  |
| `pnpm lint`  | Run ESLint                                           |

`pnpm start` does not apply: the project uses `output: "export"`, so there is no Node server in production.

## Previewing the production build

```bash
pnpm build
npx serve out
```

## Environment variables

| Variable               | Default                        | Used for                                        |
| ---------------------- | ------------------------------ | ----------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://jackpolaris.com.br`   | Canonical URLs, Open Graph, sitemap, JSON-LD    |

The deploy workflow sets it to `https://polaris.jackexperts.com`.

## Project structure

```
src/
  app/            Routes: home, /recursos, robots, sitemap, manifest, llms.txt
  components/     UI: home sections, animations (anim/), visual effects (fx/)
  content.ts      All page copy (pt-BR)
  lib/site.ts     Site metadata and URL helpers
  lib/llms.ts     Generates llms.txt / llms-full.txt from content.ts
public/           Static assets, CNAME for the custom domain
```

To change site text, edit `src/content.ts`.

## Deployment

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static export and publishes `out/` to GitHub Pages.

One-time setup in the GitHub repository:

1. **Settings → Pages → Source**: select **GitHub Actions**.
2. **Settings → Pages → Custom domain**: `polaris.jackexperts.com` (also kept in `public/CNAME`), then enable **Enforce HTTPS**.
3. In the DNS of `jackexperts.com`, create a `CNAME` record `polaris` → `jack-experts-polaris.github.io`.

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), written in English (e.g. `feat: add pricing section`, `fix: correct hero spacing`).
