# Rishabh Hydro Tech — Website Task List

> **Purpose:** Actionable checklist for completing the full website.  
> **Companion doc:** [WEBSITE_PLAN.md](./WEBSITE_PLAN.md) (design, content, and architecture reference)  
> **Last updated:** July 2026

---

## Progress at a glance

| Area                          | Status                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| Design tokens & fonts         | 🔶 Partial — colors + Inter in place; favicon, full type scale pending |
| Global layout (header/footer) | ⬜ Not started                                                         |
| Homepage                      | ⬜ Placeholder only                                                    |
| Product catalogue             | 🔶 Shell + sample data; filters not wired; taxonomy incomplete         |
| Inquiry & contact             | ⬜ Not started                                                         |
| Search                        | ⬜ Not started                                                         |
| About & brands                | ⬜ Not started                                                         |
| SEO & launch                  | ⬜ Not started                                                         |
| Client content                | 🔒 Mostly blocked on client deliverables                               |

**Legend:** ✅ Done · 🔶 In progress / partial · ⬜ Todo · 🔒 Blocked on client/decision

---

## A. Client & stakeholder (before / during build)

These unblock content, copy, and several technical choices. Track in meetings; mark ✅ when received.

### A.1 Open decisions `[DECIDE]`

- [ ] **Tagline** — pick one from options in [WEBSITE_PLAN.md §3.1](./WEBSITE_PLAN.md#31-company-positioning-draft--refine-with-client)
- [ ] **Primary nav labels** — exact wording for Products dropdown, Brands link (optional), CTA label
- [ ] **Catalogue depth** — category pages only (recommended) vs individual SKU pages for v1
- [ ] **URL depth** — category + type pages with filters vs deeper slug trees
- [ ] **Form backend** — Resend + API route (recommended), Formspree, or WhatsApp-only
- [ ] **Floating WhatsApp button** — yes on mobile (recommended) or no
- [ ] **Search v1** — client-side JSON index (recommended) vs Fuse.js / Pagefind / Algolia
- [ ] **Hosting** — Vercel (recommended) or client preference
- [ ] **Product images** — client photos, supplier catalogue, or stock photography
- [ ] **Language** — English only for v1 (recommended) vs bilingual
- [ ] **Dark mode** — no for v1 (recommended)
- [ ] **Analytics** — GA4, Search Console, optional Meta Pixel / call tracking
- [ ] **Logo on dark backgrounds** — needed or not (footer/header use steel blue)
- [ ] **Typography** — confirm Inter for headings + body (recommended in plan)

### A.2 Must-have client deliverables (launch blockers)

- [x] Logo PNG (`public/logo.png`)
- [ ] Logo SVG (sharper at all sizes)
- [ ] Business phone number(s)
- [ ] WhatsApp number
- [ ] Email address(es) for inquiries
- [ ] Full physical address + Google Maps pin
- [ ] Preferred inquiry email recipient
- [ ] Company description for About page
- [ ] 5–10 hero slider images (pumps, cylinders, power packs, hoses, etc.)
- [ ] **Pneumatic product list** — confirm or replace draft taxonomy in [WEBSITE_PLAN.md §6.3](./WEBSITE_PLAN.md#63-pneumatic-products--full-taxonomy)

### A.3 Should-have client deliverables

- [ ] OEM brand logos (Yuken, Rexroth, Parker, Vickers, Festo, SMC, etc.) or usage permission
- [ ] Product photos per major hydraulic category
- [ ] 1–2 SEO paragraphs per hydraulic category (pumps, valves, hoses, cylinders, power packs first)
- [ ] Business hours
- [ ] Google Business Profile URL
- [ ] GST / MSME numbers (optional footer display)

### A.4 Nice-to-have client deliverables

- [ ] Client testimonials
- [ ] Industry / customer logos
- [ ] Facility and warehouse photos
- [ ] Certification scans (ISO, MSME, etc.)
- [ ] Social media links (LinkedIn, etc.)

---

## B. Phase 0 — Foundation

### B.1 Brand & design system

- [x] Brand color tokens in `app/globals.css` (`--color-brand`, `--color-accent`, etc.)
- [x] Inter font via `next/font` in root layout
- [x] Base spacing tokens in `globals.css`
- [ ] Favicon — square crop of logo "R" mark
- [ ] Apple touch icon
- [ ] `metadata` icons in root layout
- [ ] Full typography scale utilities (H1–H3, body, caption, button) documented in CSS/Tailwind
- [ ] JetBrains Mono or tabular nums for spec tables (optional)
- [ ] Shared UI primitives in `components/ui/`:
  - [ ] `Button` (primary accent, secondary outline, ghost)
  - [ ] `Card`
  - [ ] `Badge`
  - [ ] `Input`, `Textarea`, `Select`
  - [ ] `Modal` (for inquiry on product pages)

### B.2 Global layout shell

- [ ] `components/layout/TopBar.tsx` — phone, WhatsApp, email strip (optional)
- [ ] `components/layout/Header.tsx` — logo + wordmark, nav, search bar, "Products Catalogue", "Get Best Price"
- [ ] `components/layout/MobileNav.tsx` — hamburger drawer, categories, contact shortcuts
- [ ] `components/layout/Footer.tsx` — address, phone, email, WhatsApp, quick links, copyright
- [ ] Wire header/footer into `app/layout.tsx` (all pages)
- [ ] Active nav state for current route
- [ ] Skip-to-content link (accessibility)
- [ ] Responsive breakpoints tested (mobile-first)

### B.3 Data model & taxonomy

- [x] `lib/types/product.types.ts` — Product, FilterGroup, CataloguePageConfig
- [x] Sample products in `lib/data/products.ts` (9 hydraulic + 9 pneumatic placeholders)
- [x] Sample filters in `lib/data/filters.ts` (subset of categories/brands/types)
- [ ] `lib/data/navigation.ts` — primary nav, footer links, category quick links
- [ ] `lib/data/brands.ts` — brand metadata (name, slug, logo, divisions)
- [ ] Full **hydraulic taxonomy** (13 categories) as structured data:
  - [ ] `pumps` — makes, types (gear / piston / vane + subtypes)
  - [ ] `valves` — makes, types
  - [ ] `hoses` — makes, types
  - [ ] `fittings` — makes, types, sizes (metric, inches, BSW, UNF)
  - [ ] `cylinders` — makes, types, bore/stroke ranges
  - [ ] `power-packs` — makes, types
  - [ ] `motors` — makes, sizes (100–3500 cc)
  - [ ] `accumulators` — makes, types, sizes (1–50 L)
  - [ ] `filters` — makes, types, micron sizes
  - [ ] `seals` — types
  - [ ] `manifolds` — types
  - [ ] `pressure-gauges` — makes, types, dial sizes
  - [ ] `heat-exchangers` — types
- [ ] Category landing copy placeholders (title, intro, SEO blurb per category)
- [ ] Expand product seed data to cover all categories (or generate from taxonomy)

---

## C. Phase 1 — Homepage

Target sections (top to bottom per [WEBSITE_PLAN.md §5](./WEBSITE_PLAN.md#5-homepage-sections-top-to-bottom)):

- [ ] Replace placeholder `app/page.tsx` with full homepage layout
- [ ] **§1 Header** — depends on Phase 0 layout (P0)
- [ ] **§2 Hero slider** (`components/home/HeroSlider.tsx`) (P0)
  - [ ] 3–5 slides with headline, subtext, CTA
  - [ ] Auto-rotate ~5s, dots/arrows, pause on hover
  - [ ] WebP images, lazy-load non-first slides
  - [ ] Client hero images or approved placeholders
- [ ] **§3 Quick category cards** (`components/home/CategoryCards.tsx`) (P0)
  - [ ] Hydraulic / Pneumatic primary cards
  - [ ] Top subcategory links (pumps, valves, hoses, cylinders, etc.)
- [ ] **§4 Brands we deal in** (`components/home/BrandsGrid.tsx`) (P1)
  - [ ] Logo grid, grayscale treatment
  - [ ] Link to `/brands` or brand pages when built
- [ ] **§5 Featured products** (`components/home/FeaturedProducts.tsx`) (P1)
  - [ ] Curated products from data layer
  - [ ] "Inquiry" button per card → `/inquiry` with pre-filled category
- [ ] **§6 Why choose us** (`components/home/WhyChooseUs.tsx`) (P1)
  - [ ] 3–4 columns: local stock, brands, experience, custom fabrication
- [ ] **§7 About snippet** (`components/home/AboutSnippet.tsx`) (P1)
  - [ ] 2–3 paragraphs + "Learn more" → `/about`
- [ ] **§8 Inquiry CTA band** (`components/home/InquiryCTA.tsx`) (P0)
  - [ ] Full-width orange band, phone + WhatsApp + form link
- [ ] **§9 Footer** — depends on Phase 0 layout (P0)
- [ ] Homepage-specific `metadata` (title, description, OG image)

---

## D. Phase 2 — Product catalogue

### D.1 Routes & pages (existing shell — extend)

| Route                           | Status | Remaining work                                         |
| ------------------------------- | ------ | ------------------------------------------------------ |
| `/products`                     | 🔶     | Filter products by URL params; category hub UI         |
| `/products/hydraulic`           | 🔶     | Category grid for all 13 hydraulic categories          |
| `/products/hydraulic/[...slug]` | 🔶     | Filter products by slug; type-level pages; unique copy |
| `/products/pneumatic`           | 🔶     | Category grid; blocked on confirmed taxonomy           |
| `/products/pneumatic/[...slug]` | 🔶     | Same as hydraulic; use client-confirmed data           |

### D.2 Catalogue components (existing — extend)

- [x] `CatalogueLayout.tsx` — header + sidebar + grid shell
- [x] `CatalogueHeader.tsx` — breadcrumbs, title, description, count
- [x] `FilterSidebar.tsx` — static disabled checkboxes
- [x] `ProductGrid.tsx` + `ProductCard.tsx` — basic card with image placeholder
- [ ] **Wire filters** — read/write URL search params; filter `products` client- or server-side
- [ ] Mobile filter drawer / chip bar alternative to sidebar
- [ ] `ProductCard` — brand badge, category, link to inquiry with pre-fill
- [ ] Category landing view — show subcategory/type cards when at category level (not only product grid)
- [ ] Brands strip on category pages (logos for makes in category)
- [ ] Inquiry CTA block on every catalogue page ("Get Best Price for [category]")
- [ ] Related categories cross-links at bottom
- [ ] SEO body copy section (150–300 words) per major category
- [ ] `generateStaticParams` for all category/type slugs (SSG)
- [ ] Empty state when filters match no products
- [ ] Loading / suspense boundaries if client filters added

### D.3 Hydraulic category pages (13 total)

- [ ] `/products/hydraulic/pumps`
- [ ] `/products/hydraulic/valves`
- [ ] `/products/hydraulic/hoses`
- [ ] `/products/hydraulic/fittings`
- [ ] `/products/hydraulic/cylinders`
- [ ] `/products/hydraulic/power-packs`
- [ ] `/products/hydraulic/motors`
- [ ] `/products/hydraulic/accumulators`
- [ ] `/products/hydraulic/filters`
- [ ] `/products/hydraulic/seals`
- [ ] `/products/hydraulic/manifolds`
- [ ] `/products/hydraulic/pressure-gauges`
- [ ] `/products/hydraulic/heat-exchangers`
- [ ] Type-level pages where taxonomy has subtypes (e.g. `pumps/piston-pump`, `pumps/gear-pump/internal-gear-pump`)

### D.4 Pneumatic category pages (13 draft — confirm with client)

- [ ] Replace draft taxonomy with client-confirmed data
- [ ] `/products/pneumatic/cylinders`
- [ ] `/products/pneumatic/valves`
- [ ] `/products/pneumatic/frl-units`
- [ ] `/products/pneumatic/tubing`
- [ ] `/products/pneumatic/fittings`
- [ ] `/products/pneumatic/air-blowers`
- [ ] `/products/pneumatic/vacuum`
- [ ] `/products/pneumatic/grippers`
- [ ] `/products/pneumatic/pumps`
- [ ] `/products/pneumatic/silencers`
- [ ] `/products/pneumatic/pressure-gauges`
- [ ] `/products/pneumatic/seals`
- [ ] `/products/pneumatic/accessories`
- [ ] Type-level subpages per confirmed taxonomy

---

## E. Phase 3 — Inquiry & contact

### E.1 Inquiry form

- [ ] `components/inquiry/InquiryForm.tsx` — reusable form component
- [ ] `app/inquiry/page.tsx` — dedicated full inquiry page
- [ ] Form fields: name*, phone*, email, company, product/category (dropdown or pre-filled), message
- [ ] Optional: quantity, brand preference, file attachment (drawing/photo)
- [ ] Client-side validation + accessible error messages
- [ ] Pre-fill category/product from query params (`?category=pumps&division=hydraulic`)
- [ ] Inline inquiry modal on product/category pages
- [ ] Thank-you page or success state after submit

### E.2 Form backend

- [ ] Choose backend (Resend recommended — see plan §11.7)
- [ ] `app/api/inquiry/route.ts` — POST handler, rate limiting, honeypot/spam protection
- [ ] Email template to client with inquiry details
- [ ] Auto-reply to submitter (optional)
- [ ] Environment variables documented (`.env.example`)
- [ ] Parallel WhatsApp deep link with pre-filled message (optional CTA)

### E.3 Contact page

- [ ] `app/contact/page.tsx`
- [ ] NAP block (name, address, phone) — consistent with footer
- [ ] Embedded Google Map
- [ ] Business hours
- [ ] Inquiry form embed or link
- [ ] Click-to-call (`tel:`) and click-to-email (`mailto:`) links

### E.4 Contact shortcuts (site-wide)

- [ ] `components/inquiry/WhatsAppButton.tsx` — floating button on mobile (if approved)
- [ ] WhatsApp link in header, footer, top bar
- [ ] Phone link in header/footer
- [ ] "Get Best Price" buttons site-wide → `/inquiry` or modal

---

## F. Phase 4 — Search & brands

### F.1 Search

- [ ] `components/search/SearchBar.tsx` in header (all pages)
- [ ] `lib/data/search-index.ts` — flatten categories, types, brands, keywords
- [ ] `app/search/page.tsx` — results page with query param `?q=`
- [ ] Client-side search (Phase 1) or Fuse.js integration
- [ ] No-results state with category suggestions + contact CTA
- [ ] Popular search chips ("Rexroth pump", "Parker hose", "Hydraulic cylinder")
- [ ] Keyboard navigation (/ to focus, escape to close) for search UI

### F.2 Brand pages (optional hub)

- [ ] `app/brands/page.tsx` — A–Z brand listing (optional)
- [ ] `app/brands/[slug]/page.tsx` — e.g. `/brands/rexroth`
- [ ] Brand hero, logo, divisions served, linked categories/products
- [ ] Inquiry CTA per brand page
- [ ] Priority brands: Rexroth, Yuken, Parker, Vickers, Festo, SMC

---

## G. Phase 5 — About, SEO & metadata

### G.1 About page

- [ ] `app/about/page.tsx`
- [ ] Sections: history, what we do, industries served, geographic reach, differentiators
- [ ] Team / facility photos (when available)
- [ ] Certifications block
- [ ] Mission / values
- [ ] CTA to contact and catalogue

### G.2 On-page SEO (every public page)

- [ ] Unique `<title>` and meta description per page (use metadata API)
- [ ] One H1 per page, logical heading hierarchy
- [ ] Canonical URLs
- [ ] Open Graph + Twitter card images (default + per major page)
- [ ] Alt text on all images

### G.3 Structured data

- [ ] `LocalBusiness` / `Organization` JSON-LD on homepage and contact
- [ ] `BreadcrumbList` on catalogue pages
- [ ] `WebSite` with `SearchAction` when search ships

### G.4 Technical SEO

- [ ] `app/sitemap.ts` — dynamic sitemap for all routes
- [ ] `app/robots.ts` — allow crawling, point to sitemap
- [ ] `public/robots.txt` if needed beyond `robots.ts`
- [ ] Internal linking audit (homepage → categories → inquiry)
- [ ] Priority SEO copy for: homepage, `/products/hydraulic`, pumps, valves, hoses, cylinders, power packs, top brand pages

### G.5 Analytics (post-staging)

- [ ] Google Analytics 4 script
- [ ] Google Search Console verification + sitemap submit
- [ ] Optional: Meta Pixel, call tracking

---

## H. Phase 6 — Polish, performance & launch

### H.1 Performance

- [ ] Lighthouse Performance ≥ 90 on homepage and a category page
- [ ] LCP < 2.5s — optimize hero and largest images
- [ ] All images via `next/image`, WebP, responsive `sizes`
- [ ] Font subsetting verified (Latin only)
- [ ] Reduce unused JS; dynamic import heavy client components if any

### H.2 Accessibility (WCAG 2.1 AA target)

- [ ] Keyboard navigable menus, modals, filters
- [ ] Focus visible styles on interactive elements
- [ ] Color contrast check — orange CTA on white, white text on steel blue header
- [ ] Form labels, `aria-invalid`, error announcements
- [ ] Screen reader test on nav + inquiry flow

### H.3 Cross-browser & device QA

- [ ] iOS Safari — phone links, WhatsApp, form
- [ ] Android Chrome
- [ ] Desktop Chrome, Firefox, Safari
- [ ] Tablet layout for catalogue filters + grid

### H.4 Content & legal

- [ ] Copyright year in footer
- [ ] Privacy note for inquiry form (data use) if required
- [ ] 404 page (`app/not-found.tsx`) with links home + catalogue + contact
- [ ] 500 / error boundary styling

### H.5 Deployment & launch

- [ ] Production environment on Vercel (or chosen host)
- [ ] Domain DNS → hosting (`rishabhhydrotech.com`)
- [ ] SSL verified
- [ ] Production env vars (email API, analytics)
- [ ] Smoke test all forms and links on production URL
- [ ] Submit sitemap to Search Console
- [ ] Google Business Profile updated with website URL

---

## I. Post-launch (optional / Phase 2+)

- [ ] Individual SKU/product detail pages for top sellers
- [ ] Headless CMS (Sanity, Contentful) if client needs self-service edits
- [ ] Admin panel or dashboard for inquiry volume
- [ ] Full-text search upgrade (Pagefind, Algolia)
- [ ] Hindi or regional language
- [ ] Blog / application notes for long-tail SEO
- [ ] Customer testimonials section on homepage
- [ ] Live chat integration

---

## J. Suggested build order (next 10 tasks)

Use this when picking up work; reorder as client deliverables arrive.

1. ⬜ Header + Footer + root layout integration (Phase 0)
2. ⬜ UI primitives (`Button`, `Input`, etc.) (Phase 0)
3. ⬜ Favicon + site metadata icons (Phase 0)
4. ⬜ Full hydraulic taxonomy in `lib/data/` (Phase 0)
5. ⬜ Wire catalogue filters to URL + product list (Phase 2)
6. ⬜ Hydraulic division landing — category card grid (Phase 2)
7. ⬜ Hero slider + category cards on homepage (Phase 1)
8. ⬜ Inquiry form + `/inquiry` page (Phase 3)
9. ⬜ Contact page with map placeholders (Phase 3)
10. ⬜ Search bar + `/search` with JSON index (Phase 4)

---

## K. File & folder checklist

Planned structure from [WEBSITE_PLAN.md §11.3](./WEBSITE_PLAN.md#113-component-architecture-planned) — create missing paths as work proceeds.

```
components/
  layout/       ⬜ Header, Footer, TopBar, MobileNav
  ui/           ⬜ Button, Card, Badge, Input, Select, Modal
  home/         ⬜ HeroSlider, CategoryCards, BrandsGrid, InquiryCTA, etc.
  products/     🔶 CatalogueLayout, FilterSidebar, ProductGrid, ProductCard (+ more)
  inquiry/      ⬜ InquiryForm, WhatsAppButton
  search/       ⬜ SearchBar, SearchResults
lib/
  data/         🔶 products.ts, filters.ts, catalogue.ts (+ brands, navigation, taxonomy)
  types/        ✅ product.types.ts
app/
  page.tsx      🔶 placeholder homepage
  layout.tsx    🔶 root layout, no header/footer yet
  products/     🔶 catalogue routes
  inquiry/      ⬜
  contact/      ⬜
  about/        ⬜
  brands/       ⬜
  search/       ⬜
  api/inquiry/  ⬜
public/
  logo.png      ✅
  favicon.ico   ⬜
```

---

_Update checkboxes and status symbols as tasks complete. When a section is fully done, add ✅ to the heading and note the date in a commit or changelog._
