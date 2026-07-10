/**
 * Homepage hero slides — product-image driven (client direction).
 * Set `imageSrc` when product photos are available; until then the slider
 * renders an industrial placeholder for each slide.
 */

export type HeroSlide = {
  id: string;
  /** Product / category name shown as the visual anchor when no image yet */
  productLabel: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Path under /public — omit until client delivers product photos */
  imageSrc?: string;
  imageAlt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "pumps",
    productLabel: "Hydraulic Pumps",
    headline: "Hydraulic Pumps — Yuken, Rexroth, Vickers",
    subtext:
      "Gear, piston, and vane pumps from leading OEM brands — stocked for plant maintenance and OEM builds.",
    ctaLabel: "Browse Pumps",
    ctaHref: "/products/hydraulic/pumps",
    secondaryCtaLabel: "Get Best Price",
    secondaryCtaHref: "/inquiry",
    imageSrc: "/hero/pumps.png",
    imageAlt: "Hydraulic pumps from Yuken, Rexroth, and Vickers",
  },
  {
    id: "power-packs",
    productLabel: "Power Packs",
    headline: "Custom Hydraulic Power Packs",
    subtext:
      "Complete power pack units configured for your pressure, flow, and duty cycle requirements.",
    ctaLabel: "View Power Packs",
    ctaHref: "/products/hydraulic/power-packs",
    secondaryCtaLabel: "Get Best Price",
    secondaryCtaHref: "/inquiry",
    imageSrc: "/hero/power-packs.png",
    imageAlt: "Custom hydraulic power pack unit",
  },
  {
    id: "hoses",
    productLabel: "Hoses & Fittings",
    headline: "Hoses & Fittings — Parker, Gates",
    subtext:
      "High-pressure hoses and precision fittings for reliable hydraulic and pneumatic lines.",
    ctaLabel: "Browse Hoses",
    ctaHref: "/products/hydraulic/hoses",
    secondaryCtaLabel: "Get Best Price",
    secondaryCtaHref: "/inquiry",
    imageSrc: "/hero/hoses.png",
    imageAlt: "Hydraulic hoses and fittings from Parker and Gates",
  },
  {
    id: "cylinders",
    productLabel: "Hydraulic Cylinders",
    headline: "Hydraulic Cylinders Built to Spec",
    subtext:
      "Single-acting, double-acting, and custom bore/stroke cylinders for industrial machinery.",
    ctaLabel: "Browse Cylinders",
    ctaHref: "/products/hydraulic/cylinders",
    secondaryCtaLabel: "Get Best Price",
    secondaryCtaHref: "/inquiry",
    imageSrc: "/hero/cylinders.png",
    imageAlt: "Double-acting hydraulic cylinder",
  },
  {
    id: "pneumatic",
    productLabel: "Pneumatic Solutions",
    headline: "Pneumatic Cylinders, Valves & FRL",
    subtext:
      "Festo, SMC, Janatics and more — cylinders, solenoid valves, tubing, and air preparation.",
    ctaLabel: "Browse Pneumatic",
    ctaHref: "/products/pneumatic",
    secondaryCtaLabel: "Get Best Price",
    secondaryCtaHref: "/inquiry",
    imageSrc: "/hero/pneumatic.png",
    imageAlt: "Pneumatic cylinders, valves, and FRL units",
  },
];
