# Rishabh Hydro Tech Engineers — Website Planning Document

> **Purpose:** Single source of truth for design, content, structure, and technical decisions before incremental development begins.  
> **Status:** Draft — decisions marked with `[DECIDE]` need client/stakeholder input.  
> **Last updated:** July 2026

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| **Business** | Manufacturer & supplier of hydraulic and pneumatic equipment |
| **Domain** | rishabhhydrotech.com |
| **Site type** | Local B2B industrial catalogue + lead generation (not e-commerce) |
| **Primary goal** | Help buyers find products by category/brand and submit inquiries |
| **Secondary goal** | Establish credibility (brands stocked, years in business, applications served) |
| **Tech stack (current)** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **Development approach** | Incremental — build section by section, not one-shot |

### What success looks like

- A factory manager or maintenance engineer can find "Rexroth variable piston pump" or "Parker high pressure hose" within 2–3 clicks
- Every product/category page has a clear **Get Best Price** / **Inquiry** CTA
- Site loads fast on mobile (many buyers will search on phone)
- Contact via phone, WhatsApp, or email is always one tap away
- Google shows the business for local hydraulic/pneumatic searches

---

## 2. Target Audience

| Persona | Needs | Site response |
|---------|-------|---------------|
| **Plant maintenance engineer** | Exact part replacement, specs, fast quote | Search, filter by make/type/size, inquiry form |
| **Purchase/procurement** | Multiple items, brand preference, price comparison | Catalogue browse, bulk inquiry, brand pages |
| **Machine builder / OEM** | Cylinders, power packs, custom manifolds | Category deep-dives, custom solution CTA |
| **Local walk-in customer** | Address, phone, hours | Footer, contact page, click-to-call |
| **Export/domestic distributor** | Range overview, company credibility | About, brands, applications |

---

## 3. Brand Identity

### 3.1 Company positioning

**Tagline** ✅ client selected:
- "Hydraulic & Pneumatic Solutions — Pumps, Valves, Hoses & More"

**Other options considered:**
- "Your Partner for Industrial Hydraulics & Pneumatics"
- "Quality Components. Trusted Brands. Local Support."

**Tone of voice:** Professional, technical but accessible, confident, service-oriented. Avoid marketing fluff; engineers trust specs and brand names.

### 3.2 Logo

**Asset:** `public/logo.png` (client-provided)

| Item | Detail |
|------|--------|
| **Mark** | Bold 3D capital **"R"** (for Rishabh) inside a tilted metallic oval ring |
| **Style** | Embossed/beveled — light from top-left, shadows bottom-right. Industrial, machined-metal feel |
| **"R" color** | Muted steel blue / periwinkle with metallic gradient |
| **Ring color** | Silver-to-charcoal metallic gray gradient |
| **Background** | Light off-white gray (logo was designed for light backgrounds) |
| **Placement** | Top-left in header, links to homepage |
| **Min display height** | 40px (header), 48px+ on homepage hero if used standalone |
| **Clear space** | Keep at least the height of the "R" as padding on all sides |

**Variants needed during build:**

| Variant | Status | Use |
|---------|--------|-----|
| Full color on light bg | ✅ Have (`public/logo.png`) | Header, footer, About |
| Favicon (square crop of "R") | `[TODO]` — crop from logo | Browser tab |
| Dark-bg version | `[DECIDE]` | Only if footer/header uses dark blue — may need flat/reversed mark |
| SVG | `[NEED FROM CLIENT]` | Sharper at all sizes; request from designer if available |

**Header pairing:** Logo alone may not read as "Rishabh Hydro Tech Engineers" — show **wordmark text beside logo** in header:
`[R logo]  Rishabh Hydro Tech Engineers` (company name in bold sans-serif, optional tagline below in smaller gray text).

**Note:** The mark closely resembles the [R Project](https://www.r-project.org/logo/) logo (programming language). It works well as an **"R" monogram for Rishabh**, but confirm with the client that this is their intended long-term brand mark and they are comfortable with it.

### 3.3 Color palette

**Derived from the logo** — steel blue + metallic gray, with a warm accent for CTAs.

#### Logo source colors (reference)

| Swatch | Hex | Source |
|--------|-----|--------|
| Steel blue (R highlight) | `#9AACCC` | Top-left bevel highlight on "R" |
| Steel blue (R base) | `#6B7FA8` | Main "R" face |
| Steel blue (R shadow) | `#4A5E87` | Bottom-right shadow on "R" |
| Silver (ring highlight) | `#D4D8DC` | Ring top edge |
| Gray (ring mid) | `#8E9499` | Ring body |
| Charcoal (ring shadow) | `#5A5F63` | Ring bottom edge |
| Logo background | `#E8EAED` | Light gray behind mark |

#### Website palette (logo-aligned)

| Role | Hex | Name | Usage |
|------|-----|------|-------|
| **Primary** | `#5C6F9E` | Rishabh steel blue | Header bg, H1/H2, nav links, footer bg |
| **Primary dark** | `#4A5E87` | Steel blue shadow | Hover states, active nav, footer depth |
| **Primary light** | `#8A9BBF` | Steel blue light | Subtle backgrounds, icon tints, badges |
| **Secondary** | `#6B7280` | Metallic gray | Secondary text, borders, ring-inspired UI chrome |
| **Secondary light** | `#E8EAED` | Logo gray bg | Section alternates, card backgrounds |
| **Accent / CTA** | `#E85D04` | Safety orange | "Get Best Price", "Inquiry", primary buttons |
| **Accent hover** | `#C44D03` | Deep orange | Button hover |
| **Accent alt** | `#D4A017` | Industrial amber | Highlights, featured badges (optional) |
| **Neutral dark** | `#1F2937` | Charcoal | Body text |
| **Neutral mid** | `#6B7280` | Mid gray | Captions, meta text |
| **White** | `#FFFFFF` | White | Cards, main content, header text on blue |
| **Success** | `#16A34A` | Green | Form success, WhatsApp context |
| **Border** | `#D1D5DB` | Light border | Cards, inputs, dividers |

#### Design rules

- **Header/footer:** Primary steel blue (`#5C6F9E`) with white text — echoes the logo's blue "R" on a professional base
- **CTAs:** Orange accent stands out against blue-gray palette without clashing with logo colors
- **Cards & sections:** White cards on `#E8EAED` or `#F9FAFB` alternating sections — matches logo's light gray background
- **Depth:** Subtle shadows on cards/buttons (`box-shadow` with gray, not heavy 3D) — nods to logo's beveled style without skeuomorphism overload
- **Avoid:** Flat Material-style primary buttons in logo blue — blue buttons on blue header disappear; reserve blue for structure, orange for actions

#### Tailwind CSS tokens (for Phase 0)

```css
/* app/globals.css — @theme block */
--color-brand: #5C6F9E;
--color-brand-dark: #4A5E87;
--color-brand-light: #8A9BBF;
--color-brand-muted: #E8EAED;
--color-accent: #E85D04;
--color-accent-hover: #C44D03;
```

### 3.4 Typography

The logo uses a **bold, heavy sans-serif "R"** — headings should feel similarly strong and industrial; body text stays clean and readable.

**Recommended pairing** `[DECIDE]`:

| Role | Font | Fallback | Notes |
|------|------|----------|-------|
| **Headings** | [Inter](https://fonts.google.com/specimen/Inter) weight 700–800 | system-ui, sans-serif | Matches logo's bold sans feel; Inter 800 for H1 |
| **Body** | Inter | system-ui, sans-serif | Excellent readability at small sizes |
| **Mono (specs)** | JetBrains Mono or tabular nums in Inter | monospace | For bore sizes, micron ratings, model numbers |

**Type scale (Tailwind-aligned):**

| Element | Size | Weight |
|---------|------|--------|
| H1 (page title) | 2.25–3rem | 700 |
| H2 (section) | 1.75–2rem | 600 |
| H3 (card title) | 1.25–1.5rem | 600 |
| Body | 1rem (16px) | 400 |
| Small / caption | 0.875rem | 400 |
| Button | 0.875–1rem | 600 |
| Spec tables | 0.875rem | 400, tabular nums |

**Line height:** 1.5 for body, 1.2 for headings.  
**Max content width:** ~72ch for prose; full width for product grids.

### 3.5 Imagery style

| Type | Guidance |
|------|----------|
| **Product photos** | Clean background (white or light grey), consistent aspect ratio (4:3 or 1:1) |
| **Hero slider** | High-quality shots of pumps, cylinders, power packs, hose assemblies |
| **Brand logos** | Grayscale row of OEM logos (Yuken, Rexroth, Parker, etc.) builds trust |
| **Factory/team** | Optional for About — humanizes local business |
| **Placeholders** | Use category-appropriate stock until client provides photos `[NEED FROM CLIENT]` |

`[DECIDE]` Photo shoot vs supplier catalogue images vs stock photography?

---

## 4. Site Architecture

### 4.1 Page map

```
/                           Homepage
/products                   All products (catalogue hub)
/products/hydraulic         Hydraulic category landing
/products/hydraulic/[...]   Hydraulic subcategory pages (see §5)
/products/pneumatic         Pneumatic category landing          ← content TBD from client
/products/pneumatic/[...]   Pneumatic subcategory pages         ← content TBD from client
/brands                     All brands A–Z (optional hub)
/brands/[slug]              Brand-specific landing (e.g. /brands/rexroth)
/about                      About the company
/contact                    Contact page + inquiry form
/inquiry                    Dedicated inquiry / get best price page
/search                     Search results
```

### 4.2 Global components (every page)

| Component | Description |
|-----------|-------------|
| **Top bar** | Optional: phone number + WhatsApp + email strip |
| **Header** | Logo, main nav, search bar, "Products Catalogue" button |
| **Mobile nav** | Hamburger → drawer with categories + contact shortcuts |
| **Footer** | Address, phone, email, WhatsApp, quick links, copyright |
| **Floating WhatsApp** | Fixed bottom-right on mobile `[DECIDE]` |
| **Inquiry CTA** | Sticky or repeated "Get Best Price" on product pages |

### 4.3 Navigation structure

**Primary nav** `[DECIDE exact labels]`:
1. Home
2. Products ▾
   - Hydraulic Products
   - Pneumatic Products
3. Brands `[optional]`
4. About
5. Contact
6. **Get Best Price** (button style, accent color)

**Footer columns:**
- Products (top categories)
- Company (About, Contact)
- Contact (phone, email, WhatsApp, address)
- `[optional]` Certifications / GST / MSME

---

## 5. Homepage Sections (top to bottom)

Build in this order during development:

| # | Section | Content | Priority |
|---|---------|---------|----------|
| 1 | **Header** | Logo, search, catalogue button, nav | P0 |
| 2 | **Hero image slider** | 3–5 slides: flagship products/applications + overlay CTA | P0 |
| 3 | **Quick category cards** | Hydraulic / Pneumatic + top subcategories (pumps, valves, hoses…) | P0 |
| 4 | **Brands we deal in** | Logo grid of OEM brands | P1 |
| 5 | **Featured products** | Curated items with "Inquiry" button | P1 |
| 6 | **Why choose us** | Local stock, brands, experience, custom power packs/cylinders | P1 |
| 7 | **About snippet** | 2–3 paragraphs + "Learn more" → /about | P1 |
| 8 | **Inquiry CTA band** | Full-width: "Get Best Price" + phone/WhatsApp | P0 |
| 9 | **Footer** | Contact details, links | P0 |

### Hero slider specs

- 3–5 images, auto-rotate ~5s, manual dots/arrows
- Each slide: headline, subtext, CTA button
- Example slides: "Hydraulic Pumps — Yuken, Rexroth, Vickers", "Custom Power Packs", "Hoses & Fittings — Parker, Gates"
- Optimize images (WebP), lazy load non-first slides

---

## 6. Product Catalogue Structure

### 6.1 URL pattern

```
/products/hydraulic/{category}
/products/hydraulic/{category}/{type}
/products/hydraulic/{category}/{type}/{subtype}   ← where applicable

/products/pneumatic/{category}
/products/pneumatic/{category}/{type}
/products/pneumatic/{category}/{type}/{subtype}   ← where applicable
```

Examples:
- `/products/hydraulic/pumps/piston-pump/variable-displacement-piston-pump`
- `/products/pneumatic/cylinders/compact-cylinder`

`[DECIDE]` How deep should URLs go vs flat pages with filters? Recommendation: **category + type pages** with filters for make/size (better SEO, less page sprawl).

### 6.2 Hydraulic products — full taxonomy

#### Pumps
| Level | Items |
|-------|-------|
| **Makes** | Yuken, Vickers, Rexroth, Daikin, Veljan, THM Haude, Nachi, Eckerle, Voith |
| **Types** | Gear pump, Piston pump, Vane pump |
| ↳ Gear pump | Internal gear pump, External gear pump |
| ↳ Piston pump | Variable displacement piston pump |
| ↳ Vane pump | Fixed vane pump, Variable vane pump |

#### Valves
| Level | Items |
|-------|-------|
| **Makes** | Yuken, Vickers, Rexroth, Daikin, THM Haude, Nachi |
| **Types** | Direction control valve, Check valve, Pressure reducing valve, Non-return valve, Sequence valve, Balancing valve, Pressure switch, Pressure relief valve |

#### Hoses
| Level | Items |
|-------|-------|
| **Makes** | Parker, Gates, Polyhose |
| **Types** | Low pressure, Medium pressure, High pressure, Jack hose, Spiral hose, Vacuum hose, Suction hose, Thermoplastic hose, Steam hose, Gas hose, Water hose, Carbon free hose, Teflon hose, SS bellow hose |

#### Fittings
| Level | Items |
|-------|-------|
| **Makes** | Parker, Hydromatic, Fitwell, Hyfit, Hyloc |
| **Types** | Elbow, Straight, Tee, Banjo, Union, Bulkhead, All swivel types |
| **Sizes** | Metric, Inches, BSW, UNF |

#### Cylinders
| Level | Items |
|-------|-------|
| **Makes** | Parker Taiyo, SMC, Rishabh Hydro Tech |
| **Types** | Single acting, Double acting, SS magnetic cylinder with sensor, Telescopic cylinder |
| **Sizes** | Bore: 25–450 mm, Stroke: 5–6000 mm |

#### Power packs
| Level | Items |
|-------|-------|
| **Makes** | Rishabh Hydro Tech Engineers |
| **Types** | AC driven (industrial consistent power), DC driven (mobile battery operated), High pressure heavy duty power pack |

#### Motors
| Level | Items |
|-------|-------|
| **Makes** | Danfoss, THM Haude, Entermote, SAI, Vickers, Rexroth, Eagle |
| **Sizes** | 100–3500 cc |

#### Accumulators & charging kits
| Level | Items |
|-------|-------|
| **Makes** | Hydac, EPE, Parker, Oliver, Rishabh Hydro Tech |
| **Types** | Diaphragm, Piston, Bladder |
| **Sizes** | 1–50 litre |

#### Filters
| Level | Items |
|-------|-------|
| **Makes** | Rexroth, MP Filter, Donaldson, Hydac, Hydroline, Mahle |
| **Types** | Pressure line, Suction, Return line |
| **Sizes** | 3–250 micron |

#### Seals & O-rings
| Level | Items |
|-------|-------|
| **Types** | Rod seal, Piston seal, Guide rings, O-ring kits, Mechanical seal, Oil seal |

#### Manifolds & blocks
| Level | Items |
|-------|-------|
| **Types** | Hydraulic valve manifolds, Custom manifolds, Control block |

#### Pressure gauges
| Level | Items |
|-------|-------|
| **Types** | Analog glycerine filled, Digital pressure gauge |
| **Makes** | H-Guru, Micro, Wika, Mass |
| **Dial sizes** | 2.5–4 inches |

#### Heat exchangers
| Level | Items |
|-------|-------|
| **Types** | Air cooled hydraulic oil cooler, Water cooled hydraulic heat exchanger |

### 6.3 Pneumatic products — full taxonomy

**Status: `[DRAFT — CONFIRM WITH CLIENT]`**

The client's requirements mention **Hydraulic products / Pneumatic products** as catalogue options, but only the hydraulic line was itemized in detail. The taxonomy below is a **draft structure** typical for Indian hydraulics & pneumatics dealers — same format as §6.2. **Replace, add, or remove categories/makes once the client provides their actual pneumatic range.**

#### Cylinders
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Parker, Janatics, CKD, Airtac, Camozzi `[confirm]` |
| **Types** | Round line cylinder, Compact cylinder, Rodless cylinder, Guided cylinder, Tandem cylinder, ISO cylinder |
| ↳ Round line | Single acting, Double acting |
| ↳ Compact | Single acting, Double acting |
| ↳ Rodless | Band type, Magnetically coupled |
| ↳ Guided | Twin rod, Slide bearing |
| **Bore sizes** | 6–320 mm `[confirm]` |
| **Stroke lengths** | 5–2000 mm `[confirm]` |

#### Valves
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Parker, Janatics, Norgren, CKD, Airtac `[confirm]` |
| **Types** | Solenoid valve, Directional control valve, Flow control valve, Check valve / non-return valve, Quick exhaust valve, Shuttle valve, Hand valve, Foot valve |
| ↳ Solenoid | 2-way, 3-way, 5/2-way, 5/3-way |
| ↳ Directional | Manual, Mechanical, Pilot operated, Direct acting |
| ↳ Flow control | Needle type, One-way flow control |

#### FRL units (air preparation)
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Parker, Janatics, Norgren `[confirm]` |
| **Types** | Filter, Regulator, Lubricator, FRL combination unit, Filter-regulator (FR unit) |
| ↳ Filter | Standard, Coalescing, Active carbon |
| ↳ Regulator | Precision, Booster, Locking type |
| ↳ Lubricator | Oil fog, Micro fog |
| **Port sizes** | 1/8", 1/4", 3/8", 1/2", 3/4", 1" `[confirm]` |

#### Tubing & hoses
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Parker, Polyhose `[confirm]` |
| **Types** | PU tube, Nylon tube, PE tube, PTFE tube, Spiral tube (recoil), Anti-spark tube, Silicone tube |
| **Sizes** | Metric (4–16 mm OD), Inch `[confirm]` |
| **Colors** | Blue, black, red, yellow, transparent `[if relevant]` |

#### Fittings
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Parker, Janatics, Legris, Camozzi `[confirm]` |
| **Types** | Push-in fitting, Compression fitting, Barbed fitting, Quick connect, Bulkhead, Elbow, Tee, Y-connector, Union, Reducer |
| ↳ Push-in | Straight, Elbow, Tee, Banjo |
| **Thread types** | Metric, NPT, BSP, UNF `[confirm]` |
| **Tube sizes** | 4, 6, 8, 10, 12, 14, 16 mm `[confirm]` |

#### Air blowers & air guns
| Level | Items |
|-------|-------|
| **Types** | Air gun, Air blower nozzle, Safety air gun |

#### Vacuum equipment
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Piab `[confirm]` |
| **Types** | Vacuum generator (ejector), Vacuum cup / suction pad, Vacuum filter, Vacuum valve |
| ↳ Vacuum cup | Flat, Bellows, Oval, Foam pad |
| ↳ Vacuum generator | Single stage, Multi stage |

#### Grippers & rotary actuators
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Schunk, Parker `[confirm]` |
| **Types** | Parallel gripper, Angular gripper, 3-finger gripper, Rotary actuator, Rack & pinion rotary |
| ↳ Parallel gripper | 2-finger, 3-finger |
| ↳ Angular gripper | 180°, 90° |

#### Pneumatic pumps & boosters
| Level | Items |
|-------|-------|
| **Types** | Diaphragm pump, Piston pump, Air booster |

#### Silencers & exhaust cleaners
| Level | Items |
|-------|-------|
| **Types** | Plastic silencer, Sintered metal silencer, Exhaust cleaner / oil mist separator |

#### Pressure gauges & sensors
| Level | Items |
|-------|-------|
| **Makes** | SMC, Festo, Wika, Mass `[confirm]` |
| **Types** | Analog pressure gauge, Digital pressure switch, Pressure sensor / transmitter |
| **Ranges** | 0–1 MPa, 0–10 bar `[confirm]` |

#### Seals & spare kits
| Level | Items |
|-------|-------|
| **Types** | Cylinder repair kit, Valve seal kit, O-ring kit, Piston seal, Rod seal |

#### Pneumatic accessories
| Level | Items |
|-------|-------|
| **Types** | Silencer, Flow meter, Pressure switch, Shuttle valve, Speed controller, Check valve, Quick coupling, Manifold block |

**Client action required:** Send pneumatic product list in the same format as hydraulics (makes, types, sizes per category) so this draft can be replaced with confirmed data.

### 6.4 Product page template (each category/type)

| Block | Content |
|-------|---------|
| Breadcrumb | Home → Hydraulic → Pumps → Piston pump |
| Title + intro | H1, 1–2 sentence description |
| Filter sidebar / chips | Make, type, size (where applicable) |
| Product grid or spec table | `[DECIDE]` individual SKU pages vs category listing only |
| Brands strip | Logos for makes in this category |
| Inquiry CTA | Form or button: "Get Best Price for [category]" |
| Related categories | Cross-links |
| SEO text | 150–300 words unique copy per major category `[NEED CONTENT]` |

`[DECIDE]` **Catalogue depth:**
- **Option A — Category pages only:** One page per type with filters; inquiry for any spec. Faster to build.
- **Option B — Individual product pages:** Each model/SKU gets a page. Better SEO, much more content work.
- **Recommendation:** Start with **Option A**, add SKU pages later for top sellers.

---

## 7. Inquiry & Lead Generation

### 7.1 Inquiry touchpoints

| Location | Type |
|----------|------|
| Header | "Get Best Price" button |
| Hero slider | CTA per slide |
| Every product/category page | Inline inquiry form or modal |
| Dedicated `/inquiry` page | Full form |
| Footer | Email, phone, WhatsApp links |
| Floating button (mobile) | WhatsApp `[DECIDE]` |

### 7.2 Inquiry form fields

**Minimum viable:**
- Name *
- Phone *
- Email
- Company name
- Product/category of interest (dropdown or pre-filled from page)
- Message / requirements (free text)
- `[optional]` Quantity, brand preference, attachment (drawing/photo)

**Submit behavior** `[DECIDE]`:
- **Option A:** Email to client (e.g. Resend, Nodemailer, Formspree)
- **Option B:** WhatsApp deep link with pre-filled message
- **Option C:** Both — form email + optional WhatsApp
- **Recommendation:** Form → email + thank-you page; WhatsApp as parallel channel

### 7.3 Contact details needed from client

| Field | Status |
|-------|--------|
| Business phone(s) | `[NEED FROM CLIENT]` |
| WhatsApp number | `[NEED FROM CLIENT]` |
| Email(s) | `[NEED FROM CLIENT]` |
| Physical address | `[NEED FROM CLIENT]` |
| Google Maps pin | `[NEED FROM CLIENT]` |
| Business hours | `[NEED FROM CLIENT]` |
| GST number | `[optional]` |
| Social media (LinkedIn, etc.) | `[optional]` |

---

## 8. Search

| Requirement | Approach |
|-------------|----------|
| Search bar in header | Global, visible on all pages |
| Search scope | Categories, types, brand names, keywords |
| Implementation `[DECIDE]` | **Phase 1:** Client-side filter over JSON index. **Phase 2:** Full-text (e.g. Fuse.js, Pagefind, or Algolia) |
| No results state | Suggest categories + "Contact us" CTA |
| Popular searches | Chips below search: "Rexroth pump", "Parker hose", "Hydraulic cylinder" |

---

## 9. About Page Content Outline

`[NEED FROM CLIENT]` — gather via questionnaire:

1. **Company history** — founded year, founder story
2. **What you do** — trading vs manufacturing (power packs, cylinders under own brand)
3. **Industries served** — steel, cement, packaging, mobile hydraulics, etc.
4. **Geographic reach** — city, state, pan-India, export?
5. **Differentiators** — stock availability, custom fabrication, after-sales
6. **Team / facility** — photos of shop floor, warehouse
7. **Certifications** — ISO, MSME, etc.
8. **Mission / values** — brief

---

## 10. SEO & Local Business

### 10.1 On-page SEO checklist

- Unique `<title>` and meta description per page
- H1 per page, logical heading hierarchy
- Schema.org: `LocalBusiness`, `Organization`, `BreadcrumbList`
- Open Graph images for social sharing
- XML sitemap, robots.txt
- Canonical URLs

### 10.2 Local SEO

- Google Business Profile link `[NEED FROM CLIENT]`
- NAP consistency (Name, Address, Phone) across site and footer
- Embed Google Map on contact page
- Target keywords: "hydraulic pumps [city]", "pneumatic equipment [city]", brand + product combos

### 10.3 Content SEO priorities

Build unique copy for these high-value pages first:
1. Homepage
2. /products/hydraulic
3. Top categories: pumps, valves, hoses, cylinders, power packs
4. Brand pages for Rexroth, Yuken, Parker, Vickers

---

## 11. Technical Decisions

### 11.1 Stack (confirmed)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Hosting `[DECIDE]` | Vercel (default for Next.js) or client preference |
| Domain DNS | Point to hosting when ready |

### 11.2 Data strategy

| Approach | Description |
|----------|-------------|
| **Phase 1** | Product taxonomy as TypeScript/JSON files in repo — simple, version-controlled |
| **Phase 2** `[optional]` | Headless CMS (Sanity, Contentful) if client needs to edit without developer |
| **Phase 3** `[optional]` | Admin panel for inquiries if volume grows |

**Recommendation:** Start with **JSON/TS constants** for catalogue; migrate to CMS only if client needs frequent self-service edits.

### 11.3 Component architecture (planned)

```
components/
  layout/       Header, Footer, TopBar, MobileNav
  ui/           Button, Card, Badge, Input, Select, Modal
  home/         HeroSlider, CategoryCards, BrandsGrid, InquiryCTA
  products/     ProductGrid, FilterSidebar, Breadcrumb, CategoryHero
  inquiry/      InquiryForm, WhatsAppButton
  search/       SearchBar, SearchResults
lib/
  data/         products.ts, brands.ts, navigation.ts
  types/        product.types.ts
```

### 11.4 Performance targets

- Lighthouse Performance: ≥ 90
- LCP: < 2.5s
- Images: Next.js `<Image>`, WebP, responsive sizes
- Fonts: `next/font` with subsetting

### 11.5 Accessibility

- WCAG 2.1 AA target
- Keyboard navigable menus and forms
- Alt text on all product images
- Sufficient color contrast (verify orange CTA on white)

### 11.6 Analytics & tracking `[DECIDE]`

- Google Analytics 4
- Google Search Console
- `[optional]` Meta Pixel, call tracking

### 11.7 Form backend `[DECIDE]`

| Option | Pros | Cons |
|--------|------|------|
| Resend + API route | Professional emails, own domain | Needs API key |
| Formspree | Zero backend | Free tier limits, less control |
| EmailJS | Client-side only | Keys exposed |
| WhatsApp only | Zero setup | No CRM trail |

---

## 12. Content Inventory — Client Deliverables

Use this as a checklist when meeting the client:

### Must have before launch
- [x] Logo (PNG — `public/logo.png`; SVG still `[NEED FROM CLIENT]`)
- [ ] Phone, WhatsApp, email, full address
- [ ] Company description (About)
- [ ] 5–10 product photos for hero slider
- [ ] Confirmation of pneumatic product list
- [ ] Preferred inquiry email recipient

### Should have
- [ ] OEM brand logos (or permission to use)
- [ ] Photos per major category (pumps, valves, hoses, etc.)
- [ ] 1–2 paragraphs per hydraulic category for SEO
- [ ] Business hours
- [ ] Google Business Profile URL

### Nice to have
- [ ] Client testimonials
- [ ] Industry logos (companies served)
- [ ] Facility/warehouse photos
- [ ] Certifications scans
- [ ] Price list (usually NOT public — inquiry only)

---

## 13. Development Phases (incremental build order)

### Phase 0 — Foundation
- [ ] Finalize brand colors, fonts, logo
- [ ] Design tokens in Tailwind (colors, typography)
- [ ] Base layout: Header, Footer, responsive shell
- [ ] Product data model + hydraulic taxonomy in JSON/TS

### Phase 1 — Homepage
- [ ] Hero image slider
- [ ] Category cards (Hydraulic / Pneumatic)
- [ ] Inquiry CTA band
- [ ] Footer with contact placeholders

### Phase 2 — Catalogue shell
- [ ] /products hub page
- [ ] /products/hydraulic landing
- [ ] Category pages for all 12 hydraulic categories
- [ ] Breadcrumbs, filters (make, type), inquiry CTA on each

### Phase 3 — Inquiry & contact
- [ ] Inquiry form component + /inquiry page
- [ ] Email/WhatsApp integration
- [ ] /contact page with map
- [ ] Click-to-call, click-to-WhatsApp

### Phase 4 — Search & brands
- [ ] Search bar + results page
- [ ] Brand hub pages (optional)

### Phase 5 — About & content
- [ ] /about page
- [ ] SEO copy for top categories
- [ ] Schema markup, sitemap

### Phase 6 — Pneumatic catalogue + polish
- [ ] Replace draft pneumatic taxonomy (§6.3) with client-confirmed data
- [ ] /products/pneumatic landing + category pages
- [ ] Performance audit, accessibility pass
- [ ] Analytics, Search Console
- [ ] Launch

---

## 14. Open Decisions Summary

| # | Decision | Options | Recommendation |
|---|----------|---------|----------------|
| 1 | Brand colors | Logo-derived palette (§3.3) | ✅ Steel blue + gray from logo; orange for CTAs |
| 2 | Catalogue depth | Category pages vs individual SKUs | Category pages first |
| 3 | Pneumatic products | Draft taxonomy in §6.3 | Confirm makes/types with client |
| 4 | Form backend | Resend / Formspree / WhatsApp | Resend + WhatsApp parallel |
| 5 | CMS | Static files vs headless CMS | Static files for v1 |
| 6 | Floating WhatsApp | Yes / No | Yes on mobile |
| 7 | Hindi/regional language | English only vs bilingual | English first `[DECIDE]` |
| 8 | Dark mode | Yes / No | No — unnecessary for B2B industrial |
| 9 | Hosting | Vercel / other | Vercel |
| 10 | Product images | Client photos / stock | Client photos where possible |

---

## 15. Wireframe Notes (textual)

### Header (desktop)
```
[Logo]  [  Search products...  🔍]  [Products Catalogue ▾]  Home  Products  About  Contact  [Get Best Price]
```

### Homepage layout
```
┌─────────────────────────────────────────────┐
│  TOP BAR: 📞 Phone | WhatsApp | ✉ Email     │
├─────────────────────────────────────────────┤
│  HEADER (logo, search, nav, CTA)            │
├─────────────────────────────────────────────┤
│  HERO SLIDER (full width, 3-5 slides)       │
├─────────────────────────────────────────────┤
│  CATEGORY CARDS: [Hydraulic] [Pneumatic]    │
│  + subcategory icons grid                   │
├─────────────────────────────────────────────┤
│  BRANDS LOGO GRID                           │
├─────────────────────────────────────────────┤
│  FEATURED PRODUCTS (cards + Inquiry btn)    │
├─────────────────────────────────────────────┤
│  WHY CHOOSE US (3-4 icon columns)           │
├─────────────────────────────────────────────┤
│  ABOUT SNIPPET                              │
├─────────────────────────────────────────────┤
│  INQUIRY CTA BAND (orange bg)               │
├─────────────────────────────────────────────┤
│  FOOTER (4 columns + contact)               │
└─────────────────────────────────────────────┘
```

### Category page layout
```
Breadcrumb: Home > Hydraulic > Pumps
H1: Hydraulic Pumps
Intro paragraph
┌──────────┬──────────────────────────────────┐
│ FILTERS  │  Product/type cards grid         │
│ Make ▾   │  [Gear] [Piston] [Vane]         │
│ Type ▾   │  Brand logos row                 │
│          │  [Get Best Price — full width]   │
└──────────┴──────────────────────────────────┘
Related categories
```

---

## 16. Reference — Category Quick Lists

### Hydraulic (confirmed from client brief)

| # | Category | Slug |
|---|----------|------|
| 1 | Pumps | `pumps` |
| 2 | Valves | `valves` |
| 3 | Hoses | `hoses` |
| 4 | Fittings | `fittings` |
| 5 | Cylinders | `cylinders` |
| 6 | Power packs | `power-packs` |
| 7 | Motors | `motors` |
| 8 | Accumulators | `accumulators` |
| 9 | Filters | `filters` |
| 10 | Seals & O-rings | `seals` |
| 11 | Manifolds & blocks | `manifolds` |
| 12 | Pressure gauges | `pressure-gauges` |
| 13 | Heat exchangers | `heat-exchangers` |

### Pneumatic (draft — confirm with client)

| # | Category | Slug |
|---|----------|------|
| 1 | Cylinders | `cylinders` |
| 2 | Valves | `valves` |
| 3 | FRL units | `frl-units` |
| 4 | Tubing & hoses | `tubing` |
| 5 | Fittings | `fittings` |
| 6 | Air blowers & guns | `air-blowers` |
| 7 | Vacuum equipment | `vacuum` |
| 8 | Grippers & rotary actuators | `grippers` |
| 9 | Pneumatic pumps & boosters | `pumps` |
| 10 | Silencers & exhaust cleaners | `silencers` |
| 11 | Pressure gauges & sensors | `pressure-gauges` |
| 12 | Seals & spare kits | `seals` |
| 13 | Pneumatic accessories | `accessories` |

---

## 17. Next Steps

> **Task tracker:** See [WEBSITE_TODO.md](./WEBSITE_TODO.md) for the full actionable checklist (phases, components, routes, client deliverables, and current build status).

1. **Review this document** with client — fill `[DECIDE]` and `[NEED FROM CLIENT]` items
2. **Collect logo + contact details + hero images**
3. **Confirm pneumatic product list** — review draft in §6.3, send client's actual makes/types/sizes
4. **Approve color palette and fonts**
5. **Begin Phase 0** — design tokens + layout shell in codebase

---

*This document should be updated as decisions are made. Tag sections with ✅ when complete.*
