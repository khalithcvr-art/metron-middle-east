# Expedia Business Services — Website Recovery Status

Recovery of the Expedia Business Services website (expediabusinessservices.com),
originally built with Claude Code. Files are being re-uploaded in batches.

**Stack:** Vite 5 + React 18 + TypeScript + Tailwind CSS 3 + React Router 7 + Three.js + Supabase
**Fonts:** Inter Variable, Sora Variable, Marcellus, IBM Plex Sans Arabic

## Recovered so far (batch 1 — 2026-07-21)

- [x] `package.json`
- [x] `package-lock.json`
- [x] `index.html` (full SEO/structured-data head + noscript fallback)
- [x] `tailwind.config.js` (brand navy/gold theme, champagne-gold amber remap)
- [x] `vite.config.ts`

## Still needed (please upload)

### Critical — app will not build without these
- [ ] `src/` folder — **everything inside it**, especially:
  - `src/main.tsx` (entry point referenced by index.html)
  - `src/App.tsx` and all page/section components
  - `src/index.css` (Tailwind entry + custom styles)
  - any Supabase client setup file (e.g. `src/lib/supabase.ts`)
- [ ] `scripts/prerender.mjs` (referenced by the `build` script)
- [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- [ ] `postcss.config.js`
- [ ] `eslint.config.js`

### Public assets (referenced by index.html)
- [ ] `public/favicon-32.png`, `public/favicon-512.png`, `public/apple-touch-icon.png`
- [ ] `public/site.webmanifest`
- [ ] `public/images/expedia-og.jpg`, `public/images/expedia-logo-color.png`
- [ ] `public/robots.txt`, `public/sitemap.xml` (if they existed)
- [ ] any other images/assets under `public/`

### Configuration (do NOT commit secrets — just note the values)
- [ ] Supabase project URL + anon key (env vars, e.g. `VITE_SUPABASE_URL`,
      `VITE_SUPABASE_ANON_KEY`) — keep these in a local `.env`, not in git
- [ ] Where the site is deployed/hosted (Netlify, Vercel, etc.) and the domain DNS setup
