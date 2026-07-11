import type { Metadata } from "next";

import { AboutSnippet } from "@/components/home/AboutSnippet";
import { BrandsGrid } from "@/components/home/BrandsGrid";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSlider } from "@/components/home/HeroSlider";
import { InquiryCTA } from "@/components/home/InquiryCTA";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | ${siteConfig.tagline}`,
  },
  description:
    "Browse hydraulic pumps, valves, hoses, cylinders, power packs, and more. Request a quote from Rishabh Hydro Tech Engineers.",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.tagline,
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeroSlider />
      <CategoryCards />
      <BrandsGrid />
      <FeaturedProducts />
      <WhyChooseUs />
      <AboutSnippet />
      <InquiryCTA />
    </div>
  );
}
