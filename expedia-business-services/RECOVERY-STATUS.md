# Expedia Business Services — Website Recovery Status

Recovery of the Expedia Business Services website (expediabusinessservices.com),
originally built with Claude Code. Files are being re-uploaded in batches.

**Stack:** Vite 5 + React 18 + TypeScript + Tailwind CSS 3 + React Router 7 + Three.js + Supabase
**Fonts:** Inter Variable, Sora Variable, Marcellus, IBM Plex Sans Arabic

## Recovered so far

### Batch 1 (2026-07-21)
- [x] `package.json`
- [x] `package-lock.json`
- [x] `index.html` (full SEO/structured-data head + noscript fallback)
- [x] `tailwind.config.js` (brand navy/gold theme, champagne-gold amber remap)
- [x] `vite.config.ts`

### Batch 2 (2026-07-21)
- [x] `postcss.config.js`
- [x] `src/main.tsx`
- [x] `src/App.tsx` (routes: `/`, `/services`, `/blog`, `/blog/:slug`, `/ar`, `/:slug`)
- [x] `src/index.css` (+ `index.css.bak` backup)

## Still needed (please upload)

### Components — `src/components/` (all imported by App.tsx)
- [ ] `Navbar.tsx`
- [ ] `Hero.tsx`
- [ ] `TrustBar.tsx`
- [ ] `Services.tsx`
- [ ] `ServicesShowcase.tsx`
- [ ] `HowItWorks.tsx`
- [ ] `ChannelPartners.tsx`
- [ ] `CostCalculator.tsx`
- [ ] `WhyUs.tsx`
- [ ] `Testimonials.tsx`
- [ ] `FAQ.tsx`
- [ ] `Contact.tsx`
- [ ] `Footer.tsx`
- [ ] `MouseFollowCursor.tsx`
- [ ] `FloatingWhatsApp.tsx`
- [ ] `MobileCTABar.tsx`
- [ ] `ScrollToTop.tsx`
- [ ] plus any other files in `src/components/` (helpers, sub-components)

### Pages — `src/pages/` (all imported by App.tsx)
- [ ] `ZonePage.tsx`
- [ ] `Blog.tsx`
- [ ] `BlogPost.tsx`
- [ ] `ArabicHome.tsx`
- [ ] `ServicesPage.tsx`

### Other source files
- [ ] anything in `src/lib/` or `src/data/` (Supabase client, blog data, zone data, etc.)
- [ ] `scripts/prerender.mjs` (referenced by the `build` script — build fails without it)
- [ ] `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
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
