# Rishabh Hydro Tech Engineers — Website Task List

> **Purpose:** Actionable checklist for completing the full website.  
> **Companion doc:** [WEBSITE_PLAN.md](./WEBSITE_PLAN.md) (design, content, and architecture reference)  
> **Last updated:** 12 July 2026 (Catalogue filters wired to URL + product list)

---

## Progress at a glance

| Area                          | Status                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| Design tokens & fonts         | ✅ Done — colors, spacing, typography tokens + Clash Grotesk / General Sans / JetBrains Mono + shadcn UI primitives |
| Global layout (header/footer) | ✅ Header + Footer shell done (TopBar, Header, MobileNav, Footer, skip link) |
| Homepage                      | ✅ Full layout wired (hero → categories → brands → featured → why us → about → inquiry CTA) |
| Product catalogue             | 🔶 Filters wired to URL; category hub / landings still open            |
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

- [x] **Tagline** — "Hydraulic & Pneumatic Solutions — Pumps, Valves, Hoses & More" (client selected)
- [ ] **Primary nav labels** — exact wording for Products dropdown, Brands link (optional), CTA label
- [ ] **Catalogue depth** — category pages only (recommended) vs individual SKU pages for v1
- [ ] **URL depth** — category + type pages with filters vs deeper slug trees
- [ ] **Form backend** — Resend + API route (recommended), Formspree, or WhatsApp-only
- [ ] **Floating WhatsApp button** — yes on mobile (recommended) or no
- [ ] **Search v1** — client-side JSON index (recommended) vs Fuse.js / Pagefind / Algolia
- [x] **Hosting** — Vercel (client confirmed)
- [ ] **Product images** — client photos, supplier catalogue, or stock photography
- [ ] **Language** — English only for v1 (recommended) vs bilingual
- [ ] **Dark mode** — no for v1 (recommended)
- [ ] **Analytics** — GA4, Search Console, optional Meta Pixel / call tracking
- [x] **Logo on dark backgrounds** — transparent logo; chrome uses ink (`#0c1017`) so mark reads without a white plate
- [x] **Typography** — Clash Grotesk (headings/actions) + General Sans (body) + JetBrains Mono (specs)

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
- [ ] **Pneumatic product list** — client will provide later; not a v1 blocker ([WEBSITE_PLAN.md §6.3](./WEBSITE_PLAN.md#63-pneumatic-products--deferred))

### A.3 Should-have client deliverables

- [ ] OEM brand logos (Yuken, Rexroth, Parker, Vickers, etc.) or usage permission
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

### B.1 Brand & design system ✅

- [x] Brand color tokens in `app/globals.css` (`--color-brand`, `--color-accent`, etc.)
- [x] Font roles via `next/font` in root layout: Clash Grotesk (`--font-heading`) for headings/actions, General Sans (`--font-sans`) for body, JetBrains Mono for specs
- [x] Base spacing tokens in `globals.css`
- [x] Favicon — `app/favicon.ico` generated from `public/logo.png`
- [x] Apple touch icon — `app/icon.png` (Next.js file-based metadata)
- [x] Site icons — file-based metadata in `app/` (`favicon.ico` + `icon.png`)
- [x] Full typography scale in `app/globals.css` — primitive tokens, semantic `--type-*` compositions, Tailwind `@theme` mappings, and `type-*` utility classes (display, H1–H4, body, lead, caption, button, spec) with family baked in per role
- [x] JetBrains Mono via `next/font` + `type-spec` utility (tabular nums for spec tables)
- [x] Zero border-radius theme — `--radius: 0` in `globals.css` + global override for hardcoded radii
- [x] Shared UI primitives in `components/ui/` (shadcn base-nova):
  - [x] `Button` (default, outline, ghost, secondary, destructive, link)
  - [x] `Card`
  - [x] `Badge`
  - [x] `Input`, `Textarea`, `Select`
  - [x] `Dialog` (inquiry modal) + `Sheet` (mobile drawer)
  - [x] `Field`, `Label`, `Checkbox`, `Separator` (forms & filters)
  - [x] `DropdownMenu` (header Products / Catalogue menus)

### B.2 Global layout shell ✅

- [x] `components/layout/TopBar.tsx` — phone, WhatsApp, email strip (optional; hidden until contact details in `lib/data/site.ts`)
- [x] `components/layout/Header.tsx` — logo + wordmark, search bar, catalogue CTA, primary nav, "Get Best Price"
- [x] `components/layout/DesktopNav.tsx` — desktop nav + Products / Catalogue dropdowns + active route state
- [x] `components/layout/MobileNav.tsx` — hamburger drawer, categories, contact shortcuts
- [x] `components/layout/SkipToContent.tsx` — skip-to-content link (accessibility)
- [x] `lib/data/site.ts` — company name, tagline, logo, contact / address / legal placeholders
- [x] `components/layout/Footer.tsx` — address, phone, email, WhatsApp, quick links, copyright
- [x] Wire header + footer into `app/layout.tsx` (all pages)
- [x] Active nav state for current route
- [x] Skip-to-content link wired to `#main-content` in root layout
- [ ] Responsive breakpoints tested (mobile-first)

### B.3 Data model & taxonomy ✅

- [x] `lib/types/product.types.ts` — Product, FilterGroup, CataloguePageConfig, Brand, taxonomy types
- [x] Sample products in `lib/data/products.ts` (hydraulic placeholders only; pneumatic deferred)
- [x] Sample filters in `lib/data/filters.ts` (hydraulic subset; pneumatic deferred)
- [x] `lib/data/navigation.ts` — primary nav, footer links, category quick links
- [x] `lib/data/brands.ts` — brand metadata (name, slug, logo, divisions)
- [x] Full **hydraulic taxonomy** (13 categories) as structured data in `lib/data/taxonomy.ts`:
  - [x] `pumps` — makes, types (gear / piston / vane + subtypes)
  - [x] `valves` — makes, types
  - [x] `hoses` — makes, types
  - [x] `fittings` — makes, types, sizes (metric, inches, BSW, UNF)
  - [x] `cylinders` — makes, types, bore/stroke ranges
  - [x] `power-packs` — makes, types
  - [x] `motors` — makes, sizes (100–3500 cc)
  - [x] `accumulators` — makes, types, sizes (1–50 L)
  - [x] `filters` — makes, types, micron sizes
  - [x] `seals` — types
  - [x] `manifolds` — types
  - [x] `pressure-gauges` — makes, types, dial sizes
  - [x] `heat-exchangers` — types
- [x] Category landing copy placeholders (title, intro, SEO blurb per category)
- [x] Expand product seed data to cover all categories (generated from taxonomy)

---

## C. Phase 1 — Homepage ✅

Target sections (top to bottom per [WEBSITE_PLAN.md §5](./WEBSITE_PLAN.md#5-homepage-sections-top-to-bottom)):

- [x] Replace placeholder `app/page.tsx` with full homepage layout (`lib/data/home.ts` + `components/home/*`)
- [x] **§1 Header** — global header from Phase 0 (wired in root layout)
- [x] **§2 Hero slider** (`components/home/HeroSlider.tsx`) (P0)
  - [x] 5 slides with headline, subtext, primary + secondary CTA (`lib/data/hero.ts`)
  - [x] Auto-rotate ~5s, dots/arrows, pause on hover/focus
  - [x] Image-ready: set `imageSrc` per slide when product photos arrive; first slide `priority`, others lazy via opacity mount
  - [x] Product-image placeholders until client photos (client direction: use product images for slider)
- [x] **§3 Quick category cards** (`components/home/CategoryCards.tsx`) (P0)
  - [x] Hydraulic catalogue CTA + top subcategory links (pumps, valves, hoses, cylinders, etc.)
  - [ ] Pneumatic card — only after client taxonomy (§6.3)
- [x] **§4 Brands we deal in** (`components/home/BrandsGrid.tsx`) (P1)
  - [x] Logo grid, grayscale treatment (text placeholders until OEM logos arrive)
  - [x] Link to `/brands` and `/brands/[slug]` (pages still Phase 4)
- [x] **§5 Featured products** (`components/home/FeaturedProducts.tsx`) (P1)
  - [x] Curated products from data layer (`lib/data/home.ts`)
  - [x] "Inquiry" button per card → `/inquiry` with pre-filled category (`lib/inquiry.ts`)
- [x] **§6 Why choose us** (`components/home/WhyChooseUs.tsx`) (P1)
  - [x] 4 columns: local stock, brands, experience, custom fabrication
- [x] **§7 About snippet** (`components/home/AboutSnippet.tsx`) (P1)
  - [x] Placeholder paragraphs + "Learn more" → `/about` (full copy pending client §A.2)
- [x] **§8 Inquiry CTA band** (`components/home/InquiryCTA.tsx`) (P0)
  - [x] Full-width ink band with brand CTA; phone + WhatsApp when contact details land
- [x] **§9 Footer** — global footer from Phase 0 (wired in root layout)
- [x] Homepage-specific `metadata` (title, description, OG basics; dedicated OG image still open)

---

## D. Phase 2 — Product catalogue

### D.1 Routes & pages (existing shell — extend)

| Route                           | Status | Remaining work                                         |
| ------------------------------- | ------ | ------------------------------------------------------ |
| `/products`                     | 🔶     | URL filters done; category hub UI                      |
| `/products/hydraulic`           | 🔶     | URL filters done; category grid for 13 categories      |
| `/products/hydraulic/[...slug]` | 🔶     | Slug + URL filters done; type pages / unique copy open |
| `/products/pneumatic`           | 🔒     | Deferred — add when client delivers taxonomy (§6.3)    |

### D.2 Catalogue components (existing — extend)

- [x] `CatalogueLayout.tsx` — header + sidebar + grid shell
- [x] `CatalogueHeader.tsx` — breadcrumbs, title, description, count
- [x] `FilterSidebar.tsx` — URL-driven checkboxes (read/write query params)
- [x] `ProductGrid.tsx` + `ProductCard.tsx` — basic card with image placeholder
- [x] **Wire filters** — server filters from path + `?category=&brand=&type=`; sidebar updates URL
- [ ] Mobile filter drawer / chip bar alternative to sidebar
- [ ] `ProductCard` — brand badge, category, link to inquiry with pre-fill
- [ ] Category landing view — show subcategory/type cards when at category level (not only product grid)
- [ ] Brands strip on category pages (logos for makes in category)
- [ ] Inquiry CTA block on every catalogue page ("Get Best Price for [category]")
- [ ] Related categories cross-links at bottom
- [ ] SEO body copy section (150–300 words) per major category
- [ ] `generateStaticParams` for all category/type slugs (SSG)
- [x] Empty state when filters match no products
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

### D.4 Pneumatic catalogue — deferred

Client will provide the full pneumatic taxonomy later. Do not invent categories or pages. When received: document in [WEBSITE_PLAN.md §6.3](./WEBSITE_PLAN.md#63-pneumatic-products--deferred), then add routes, nav, filters, and seed data.

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
- [x] WhatsApp link in TopBar, Footer, MobileNav (shows when `siteConfig.contact.whatsapp` is set)
- [x] Phone link in TopBar, Footer, MobileNav (shows when phone is set)
- [ ] "Get Best Price" buttons site-wide → `/inquiry` or modal (header + footer done; product pages pending)

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
- [ ] Priority brands: Rexroth, Yuken, Parker, Vickers (pneumatic brands when taxonomy arrives)

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
- [ ] Color contrast check — brand CTA on white/ink, white text on ink chrome
- [ ] Form labels, `aria-invalid`, error announcements
- [ ] Screen reader test on nav + inquiry flow

### H.3 Cross-browser & device QA

- [ ] iOS Safari — phone links, WhatsApp, form
- [ ] Android Chrome
- [ ] Desktop Chrome, Firefox, Safari
- [ ] Tablet layout for catalogue filters + grid

### H.4 Content & legal

- [x] Copyright year in footer
- [ ] Privacy note for inquiry form (data use) if required
- [ ] 404 page (`app/not-found.tsx`) with links home + catalogue + contact
- [ ] 500 / error boundary styling

### H.5 Deployment & launch

- [ ] Production environment on Vercel
- [ ] Domain DNS → Vercel (`rishabhhydrotech.com`)
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
- [ ] **Pneumatic catalogue** — after client delivers taxonomy (plan §6.3)

---

## J. Suggested build order

Use this when picking up work; reorder as client deliverables arrive.

1. ✅ Header + TopBar + MobileNav + root layout integration (Phase 0)
2. ✅ Footer + wire into root layout (Phase 0)
3. ✅ UI primitives (`Button`, `Input`, `DropdownMenu`, etc.) (Phase 0)
4. ✅ Favicon + site metadata icons (Phase 0)
5. ✅ Full hydraulic taxonomy in `lib/data/` (Phase 0)
6. ✅ Wire catalogue filters to URL + product list (Phase 2)
7. ⬜ Hydraulic division landing — category card grid (Phase 2)
8. ✅ Hero slider + full homepage sections (Phase 1)
9. ⬜ Inquiry form + `/inquiry` page (Phase 3)
10. ⬜ Contact page with map placeholders (Phase 3)
11. ⬜ Search results page `/search` with JSON index (Phase 4) — header search form already posts to `/search`

---

## K. File & folder checklist

Planned structure from [WEBSITE_PLAN.md §11.3](./WEBSITE_PLAN.md#113-component-architecture-planned) — create missing paths as work proceeds.

```
components/
  layout/       ✅ Header, DesktopNav, TopBar, MobileNav, SkipToContent, Footer
  ui/           ✅ Button, Card, Badge, Input, Textarea, Select, Dialog, Sheet, Field, Label, Checkbox, Separator, DropdownMenu
  home/         ✅ HeroSlider, CategoryCards, BrandsGrid, FeaturedProducts, WhyChooseUs, AboutSnippet, InquiryCTA
  products/     🔶 CatalogueLayout, FilterSidebar, ProductGrid, ProductCard (+ more)
  inquiry/      ⬜ InquiryForm, WhatsAppButton
  search/       ⬜ SearchBar, SearchResults (header search form exists; results page pending)
lib/
  data/         ✅ products.ts, filters.ts, filter-params.ts, catalogue.ts, navigation.ts, site.ts, brands.ts, taxonomy.ts, hero.ts, home.ts
  types/        ✅ product.types.ts
  inquiry.ts    ✅ inquiryHref() for pre-filled quote links
app/
  page.tsx      ✅ full homepage layout + metadata
  layout.tsx    ✅ root layout + header + footer + skip link + #main-content
  favicon.ico   ✅
  icon.png      ✅
  products/     🔶 catalogue routes
  inquiry/      ⬜
  contact/      ⬜
  about/        ⬜
  brands/       ⬜
  search/       ⬜
  api/inquiry/  ⬜
public/
  logo.png      ✅
```

---

_Update checkboxes and status symbols as tasks complete. When a section is fully done, add ✅ to the heading and note the date in a commit or changelog._
