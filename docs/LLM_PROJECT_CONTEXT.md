# Rishabh Hydro Tech Engineers — LLM Project Context

## 1. What this is

**Business:** Rishabh Hydro Tech Engineers (`rishabhhydrotech.com`) — Indian B2B manufacturer/supplier of hydraulic and pneumatic industrial equipment.

**Site type:** Local industrial **catalogue + lead generation**. Not e-commerce (no cart, checkout, or payments).

**Primary goal:** Help plant maintenance engineers, procurement buyers, and OEMs find products by category/brand/type and submit a quote inquiry ("Get Best Price").

**Secondary goal:** Credibility via OEM brands stocked, clear catalogue structure, and local contact paths (phone, WhatsApp, email — when client delivers details).

**Domain / production URL:** `https://rishabhhydrotech.com`

**Hosting:** Vercel (confirmed).

---

## 2. Tech stack (as implemented)

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 16.2** (App Router) |
| UI | **React 19** |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 4** + CSS variables in `app/globals.css` |
| Components | **shadcn/ui** (`base-nova` style), **Base UI** (`@base-ui/react`), **lucide-react** |
| Fonts | Local: **Clash Grotesk** (headings/actions), **General Sans** (body); Google: **JetBrains Mono** (specs) |
| Data | Static TypeScript modules in `lib/data/` (no DB/CMS yet) |
| Search | Client-side JSON index (`lib/data/search-index.ts`) |
| Forms | Inquiry UI ready; **backend not wired** (API/email provider still open) |

**Critical agent note:** This is a modern Next.js with APIs that may differ from older training data. Prefer `node_modules/next/dist/docs/` and project skills over assumptions. See `AGENTS.md` / `CLAUDE.md`.

---

## 3. Repo layout (mental map)

```
app/                    Routes (App Router)
  layout.tsx            Root layout: fonts, Header, Footer, JSON-LD
  page.tsx              Homepage
  products/             Catalogue hub + hydraulic catch-all
  brands/               Brand index + [slug]
  inquiry/              Get Best Price form page
  contact/ about/ search/
  sitemap.ts robots.ts
components/
  layout/               Header, Footer, TopBar, MobileNav, Breadcrumbs
  home/                 Hero, categories, brands, featured, why-us, CTAs
  products/             Catalogue layout, filters, grids, cards
  inquiry/              InquiryForm, InquiryModal
  search/               SearchBar, SearchResults
  seo/                  JsonLd
  ui/                   shadcn primitives
lib/
  data/                 site, taxonomy, products, catalogue, brands, filters, search, home, hero, navigation
  types/product.types.ts
  inquiry.ts seo.ts utils.ts
docs/
  WEBSITE_PLAN.md       Design/architecture source of truth
  WEBSITE_TODO.md       Task checklist + progress
public/
  logo.png
  products/{category}/*.png   Catalogue images
  hero/
fonts/                  ClashGrotesk + GeneralSans variable woff2
.cursor/rules/          Agent rules (e.g. visible copy)
.agents/skills/         shadcn, vercel-react-best-practices, web-design-guidelines
```

Path alias: `@/` → project root (`tsconfig`).

---

## 4. Routes

| Path | Purpose |
|------|---------|
| `/` | Homepage |
| `/products` | Catalogue hub |
| `/products/hydraulic` | Hydraulic division landing |
| `/products/hydraulic/[...slug]` | Category → type → subtype (SSG via `generateStaticParams`) |
| `/products/pneumatic` | Pneumatic division landing |
| `/products/pneumatic/[...slug]` | Category → type (SSG via `generateStaticParams`) |
| `/brands`, `/brands/[slug]` | Brand directory / brand landing |
| `/inquiry` | Full inquiry form (query pre-fill: `category`, `product`, `brand`, `division`) |
| `/contact`, `/about` | Contact / about (thin until client copy arrives) |
| `/search` | Search results |

**Catalogue URL pattern:**

```
/products/{division}/{category}
/products/{division}/{category}/{type}
/products/hydraulic/{category}/{type}/{subtype}
```

Example: `/products/hydraulic/pumps/piston-pump/variable-displacement-piston-pump`  
Example: `/products/pneumatic/valves/solenoid-valves`

Query filters (e.g. `?brand=yuken,rexroth`) are handled in `lib/data/filter-params.ts` + catalogue builders.

---

## 5. Data model & catalogue logic

**Source of truth for products:** `lib/data/taxonomy.ts` — `hydraulicTaxonomy` (13 categories) and `pneumaticTaxonomy` (12 categories) from the client brief. Do **not** invent makes, types, or SKUs.

**Seed products:** Generated in `lib/data/products.ts` from taxonomy (one card per type/subtype, or per make when a category has no types). Images: `/products/{category}/{slug}.png`.

**Page assembly:** `lib/data/catalogue.ts` → `buildCatalogueConfig()` returns `CataloguePageConfig` (title, breadcrumbs, filters, products, landing cards, brands strip, inquiry CTA, SEO body, related categories).

**Key types** (`lib/types/product.types.ts`): `Product`, `ProductDivision` (`"hydraulic" | "pneumatic"`), `Brand`, `CategoryTaxonomy` / `HydraulicCategoryTaxonomy` / `PneumaticCategoryTaxonomy`, `CataloguePageConfig`, filter groups.

**Hydraulic categories (slugs):**  
`pumps`, `valves`, `hoses`, `fittings`, `cylinders`, `power-packs`, `motors`, `accumulators`, `filters`, `seals`, `manifolds`, `pressure-gauges`, `heat-exchangers`.

**Pneumatic categories (slugs):**  
`air-preparation`, `pressure-gauges`, `cylinders`, `valves`, `fittings`, `tubing`, `air-blow-equipment`, `vacuum-components`, `accessories`, `air-compressors`, `tools`, `industrial-automation`.

**OEM makes (examples):** Hydraulic: Yuken, Vickers, Rexroth, Daikin, Parker, Gates, Hydac, Danfoss, house brand = company name from `siteConfig`. Pneumatic: Festo, SMC, Aventics (Emerson), Camozzi, AirTAC, Parker Hannifin, Norgren (IMI), ASCO (Emerson), and others in §6.3.

**Site config:** `lib/data/site.ts` — name, URL, tagline, logo, contact/address/legal (many fields still empty strings pending client).

---

## 6. UX / conversion model

- Every catalogue surface should push **inquiry**, not purchase.
- Inquiry touchpoints: dedicated `/inquiry`, modal (`InquiryModal`), catalogue CTA bands, homepage CTA.
- Form fields (see `lib/inquiry.ts`): name, phone, email, company, category, brand, quantity, message, optional attachment; honeypot `website`.
- Contact helpers: `telHref`, `whatsappHref`, `mailtoHref` — only useful once `siteConfig.contact` is filled.
- Search: header bar + `/search`; keyboard shortcuts exist in search UI.

---

## 7. Design system (current)

**Logo:** `public/logo.png` — bold 3D "R" in metallic oval (client-provided). Header pairs mark + wordmark.

**Brand colors (logo-aligned, in `globals.css`):**

- Brand: `#5c6f9e` / dark `#4a5e87` / light `#8a9bbf` / muted `#e8eaed`
- Accent / CTA (from plan): safety orange `#E85D04` (verify accent tokens in `globals.css` when changing theme)
- Structure: steel blue + metallic gray; CTAs should contrast (orange), not compete with blue chrome

**Typography:**

- Headings / buttons: Clash Grotesk (`--font-heading`)
- Body: General Sans (`--font-sans`)
- Specs / model numbers: JetBrains Mono (`type-spec`)
- Semantic type utilities: `type-display`, `type-h1`…`type-h4`, `type-body`, `type-lead`, `type-caption`, `type-button`, `type-spec`

**UI character:** Industrial B2B; prefer sharp geometry. Radius tokens exist; project has pushed toward low/zero radius industrial look — check `globals.css` before assuming rounded cards.

**shadcn:** `components.json` → style `base-nova`, RSC, CSS variables, lucide icons.

**Dark mode:** Not planned for v1.

---

## 8. Content & copy rules (mandatory for UI strings)

Cursor rule: `.cursor/rules/visible-copy-no-ai-tells.mdc`

For **user-facing** copy (UI, headlines, CTAs, alt, placeholders, `lib/data/` strings that render):

- No em dashes (`—`) or en dashes (`–`); use period, comma, colon, or ASCII hyphen `-`.
- No fancy ellipsis `…`.
- No stock AI marketing ("seamless", "elevate", "unlock", "cutting-edge", etc.).
- No meta/process voice aimed at visitors ("placeholder", "coming soon once confirmed").
- Tone: straight, technical B2B; facts over fluff.
- **Do not invent** years in business, certifications, or client claims.

Docs/comments/metadata titles may use different punctuation; visible page copy must follow the rule.

**Tagline (client selected):**  
"Hydraulic & Pneumatic Solutions — Pumps, Valves, Hoses & More"  
(Note: stored in `siteConfig`; when editing *visible* variants, prefer ASCII-hyphen style per copy rule.)

---

## 9. Homepage composition (top → bottom)

1. Header (logo, nav, search, catalogue CTA)
2. Hero slider (product imagery)
3. Category cards
4. Brands grid
5. Featured products
6. Why choose us
7. About snippet
8. Inquiry CTA band
9. Footer

Data largely in `lib/data/home.ts`, `lib/data/hero.ts`.

---

## 10. SEO / a11y (implemented direction)

- `metadataBase`, title template, canonicals on catalogue pages
- `sitemap.ts`, `robots.ts`
- Organization + WebSite JSON-LD (`lib/seo.ts`, `components/seo/JsonLd.tsx`)
- Skip link, semantic `<main id="main-content">`
- Still open: OG images, analytics (GA4 / Search Console), full local SEO once address/phone exist

---

## 11. Implementation status (high level)

From `docs/WEBSITE_TODO.md` (as of mid-July 2026):

| Area | Status |
|------|--------|
| Design tokens, fonts, shadcn primitives | Done |
| Header / footer / mobile nav | Done |
| Homepage wiring | Done |
| Hydraulic catalogue (landings, filters, SSG, SEO shell) | Mostly done; some SEO copy refinement open |
| Inquiry UI + `/inquiry` + modal | Done; **email/API backend open** |
| Search | Done |
| About / contact / brands | Minimal; full content blocked on client |
| Client contact details, address, WhatsApp, map, hours | **Blocked** |
| Pneumatic catalogue | Done (client taxonomy wired) |
| Analytics, floating WhatsApp, form provider | Open decisions |

---

## 12. Open decisions / blockers for agents

Do **not** invent these; leave empty or keep stubs until client delivers:

- Phone, WhatsApp, email, physical address, maps URL
- Logo SVG; OEM brand logo assets
- Inquiry form backend (Resend + API recommended in plan; Formspree / WhatsApp-only also listed)
- Floating WhatsApp button
- Analytics
- Unique SEO paragraphs per type (category-level SEO body exists in taxonomy for majors)
- Whether v1 needs individual SKU pages vs category/type landings (current: taxonomy-driven landings + filters, not full SKU commerce pages)

---

## 13. Conventions for code changes

1. **Data first:** Taxonomy/products/copy live in `lib/data/`; pages compose via catalogue builders.
2. **Match existing patterns:** Server Components by default; client only for interactivity (filters, search, forms, slider, modals).
3. **Next.js 16:** `params` / `searchParams` are often `Promise<>` — await them (see catalogue pages).
4. **Performance:** Follow `.agents/skills/vercel-react-best-practices` (avoid waterfalls, barrel-import pitfalls, unnecessary client bundles).
5. **UI:** Prefer existing shadcn primitives; use project shadcn skill before inventing components.
6. **Scope:** Incremental B2B site — no unrelated refactors, no fake CMS, no e-commerce.
7. **Images:** Product PNGs under `public/products/...`; missing images use placeholders in `ProductCard` / `ProductImage`.
8. **Git:** Only commit when the user asks.

---

## 14. Key files to read first (for a new agent)

1. `docs/WEBSITE_PLAN.md` — product/business/design decisions
2. `docs/WEBSITE_TODO.md` — what's done vs open
3. `lib/data/site.ts` — company config
4. `lib/data/taxonomy.ts` — hydraulic + pneumatic trees
5. `lib/data/catalogue.ts` + `lib/types/product.types.ts` — page model
6. `app/globals.css` — design tokens
7. `app/layout.tsx` — shell + fonts
8. `.cursor/rules/visible-copy-no-ai-tells.mdc` — copy constraints

---

## 15. One-line summary for system prompts

> Static Next.js 16 App Router B2B hydraulic and pneumatic catalogue for Rishabh Hydro Tech Engineers: TypeScript taxonomy-driven product landings, client-side search, inquiry-led conversion (no cart), shadcn + Tailwind 4, Vercel host; contact details and form backend still pending; never invent SKUs, certifications, or AI-flavored marketing copy.
