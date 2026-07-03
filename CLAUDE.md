# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SAHAHR — South Asian Heritage Association of Hamilton & Region. A public-facing website plus an embedded Sanity Studio for content management.

- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Sanity v3, shadcn/ui, Framer Motion, Lucide React.
- Hosting: Vercel with Vercel Analytics.
- CMS: Sanity Content Lake (`projectId` defaults to `ps1r2kj3`, dataset `production`).

## Common Commands

```bash
# Install dependencies (legacy peer deps are required due to React 19 / Sanity compatibility)
npm install --legacy-peer-deps

# Start dev server with Turbopack; site at http://localhost:3000, Studio at http://localhost:3000/studio
npm run dev

# Production build (do NOT add --turbo)
npm run build

# Start production build locally
npm run start

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

There are no test scripts or test files in the repo yet.

## Environment Variables

Create a `.env.local` in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="ps1r2kj3"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-05"
# Optional: enables draft/preview perspective server-side
SANITY_API_TOKEN="..."
```

## High-Level Architecture

### Route Groups

The app uses Next.js route groups to separate the public site from the embedded Sanity Studio:

- `src/app/(website)/` — Public pages (Home, About, Events, Blog, Gallery, Resources, Newsletter, Contact, Not Found). Shares `src/app/(website)/layout.tsx`, which renders `SiteHeader`, `<main id="main">`, and `SiteFooter`.
- `src/app/(studio)/` — The embedded Sanity Studio at `/studio`. Uses its own minimal `layout.tsx` with no header/footer.

### Server/Client Split

Most pages follow this pattern:

1. `page.tsx` is a server component that fetches data via `sanityFetch` and passes typed props to...
2. A `*-client.tsx` component marked with `"use client"` for interactivity (filters, motion, forms).

Examples:

- `src/app/(website)/page.tsx` → `home-client.tsx`
- `src/app/(website)/events/page.tsx` → `events-client.tsx`
- `src/app/(website)/blog/page.tsx` → `blog-client.tsx`
- `src/app/(website)/gallery/page.tsx` → `gallery-client.tsx`

### Data Fetching

All Sanity data goes through `src/lib/sanity.ts`:

- `sanityClient` is created with `useCdn: true`. If `SANITY_API_TOKEN` is present it uses the `previewDrafts` perspective; otherwise it reads `published` documents.
- `sanityFetch<ResponseType>({ query, params, revalidate })` wraps `client.fetch` with Next.js ISR caching. Default `revalidate` is `300` seconds.
- Pages set their own revalidation values (e.g., events use `0` for fresh data, site settings use `600`).

GROQ queries resolve Sanity image assets to `{ url, alt }` shapes and use `coalesce` for fallbacks.

### CMS Schemas

Schemas live in `src/sanity/schemas/` and are exported from `src/sanity/schemaTypes/index.ts`:

- `event` — title, slug, datetime, category, location, summary, portable-text body, image, registerUrl, featured flag.
- `post` — title, slug, date, categories, excerpt, cover image, portable-text content, `isNewsletter` flag.
- `galleryItem` — title, slug, category, culture group, image or video (URL/file), linked event.
- `resource` — title, slug, category, summary, link, contact, location, tags.
- `program` — title, slug, category, summary, CTA label/URL, hero image.
- `siteSettings` — impact stats and other global content (singleton intent, not enforced yet).
- `boardMember` — name, role, order, photo, bio, executive flag, social URLs.

`sanity.config.ts` mounts the Studio at `basePath: '/studio'` with `structureTool` and `visionTool`.

### Styling & UI

- Tailwind CSS v4 is configured via PostCSS (`postcss.config.mjs`). There is no `tailwind.config.*` file; theme tokens are CSS variables in `src/app/globals.css` inside `@theme inline`.
- Design tokens: brand rose (`--primary`), amber (`--secondary`), warm ivory (`--warm-ivory` in utilities), and Playfair Display for headings.
- shadcn/ui components are in `src/components/ui/` (`button`, `card`, `input`, `badge`, `skeleton`). `components.json` aliases use `@/components/ui` and `@/lib/utils`.
- `src/lib/utils.ts` exports `cn(...)` using `clsx` + `tailwind-merge`.
- `src/app/globals.css` also contains custom keyframes for the aurora background, asymmetric card radius utilities (`card-swoop-*`), and a `prefers-reduced-motion` reset.

### Fonts

Loaded in `src/app/(website)/layout.tsx` via `next/font/google`:

- Geist Sans → `--font-geist-sans`
- Geist Mono → `--font-geist-mono`
- Playfair Display → `--font-playfair`

### Images

- `next.config.ts` allows only `cdn.sanity.io` as a remote image hostname.
- Most pages use `next/image` with `fill` and `object-cover` inside fixed aspect-ratio containers.
- The About page board photos use `@sanity/image-url`'s `createImageUrlBuilder` with hotspot/crop and `fit("max")`, `auto("format")`.

### Fallback Content

The site is designed to degrade gracefully when Sanity content is missing:

- `src/app/(website)/page.tsx` uses fallback impact stats if no `siteSettings.impactStats` are returned.
- `src/app/(website)/about/page.tsx` has `FALLBACK_BOARD_MEMBERS` and shows a warning banner if Sanity board members cannot be loaded.
- `src/lib/posts.ts` still contains hardcoded sample posts used by the Blog page when Sanity posts are absent (verify current behavior in `blog-client.tsx`).

### Forms

Newsletter, feedback, and contact forms are presentational only — they have no wired backend or API route. Any future form submission should be implemented with an explicit backend integration (e.g., Resend, server action, or form service).

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/sanity.ts` | Sanity client and `sanityFetch` wrapper |
| `src/lib/types.ts` | Shared TypeScript types for Sanity documents |
| `src/app/(website)/layout.tsx` | Root website layout (header/footer/fonts/metadata) |
| `src/app/(website)/page.tsx` | Homepage server component |
| `src/app/(website)/home-client.tsx` | Homepage client UI |
| `sanity.config.ts` | Embedded Studio config |
| `src/sanity/schemaTypes/index.ts` | Schema registration |
| `src/app/globals.css` | Tailwind v4 theme tokens and custom utilities |
| `next.config.ts` | Next.js config (Sanity image remote pattern) |

## Important Notes

- Use `--legacy-peer-deps` for all `npm install` operations.
- Do not use `next build --turbo` for production; use plain `npm run build`.
- If dev crashes with cache errors, delete `.next/` and rerun `npm run dev`.
- The `studio/` directory at the repo root is ignored/excluded (`tsconfig.json` excludes `studio/**`) because the app uses the embedded Studio under `src/app/(studio)/`, not a separate standalone Studio.
