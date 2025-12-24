# SAHAR-Web

Preview

## Sanity CMS
- Studio schemas live in `studio/schemas` and are wired via `studio/schemaTypes`.
- Configure environment vars in `.env.local`:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=...`
  - `NEXT_PUBLIC_SANITY_DATASET=production`
  - `NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01` (optional)
  - `SANITY_API_TOKEN=...` (only if you need drafts/mutations server-side)
- To create/run the Studio: `npx sanity@latest init --env --output-path studio` (use existing project/dataset), then `cd studio && npm install && npm run dev`.
- The events page now queries Sanity; seed some `event` documents (title, slug, date, category, location, summary, image+alt, registerUrl) to see data rendered.
