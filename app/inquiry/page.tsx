import type { Metadata } from "next";
import Link from "next/link";

import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Button } from "@/components/ui/button";
import {
  parseInquirySearchParams,
  resolveInquiryCategoryLabel,
  resolveInquiryProductLabel,
} from "@/lib/inquiry";
import { siteConfig } from "@/lib/data/site";

type InquiryPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata: Metadata = {
  title: "Get Best Price",
  description:
    "Request pricing and availability for hydraulic pumps, valves, hoses, cylinders, and more from Rishabh Hydro Tech Engineers.",
  alternates: { canonical: "/inquiry" },
  openGraph: {
    title: `Get Best Price | ${siteConfig.name}`,
    description:
      "Share the make, type, and specs you need. We will reply with pricing and availability.",
    type: "website",
  },
};

export default async function InquiryPage({ searchParams }: InquiryPageProps) {
  const params = await searchParams;
  const defaults = parseInquirySearchParams(params);
  const categoryLabel = resolveInquiryCategoryLabel(defaults.category);
  const productLabel = resolveInquiryProductLabel(defaults.product);

  const contextBits = [
    productLabel,
    categoryLabel ? `${categoryLabel} category` : null,
  ].filter(Boolean);

  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="type-overline mb-2 text-brand">Inquiry</p>
          <h1 className="type-h1 text-balance text-neutral-dark">
            Get Best Price
          </h1>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            Tell us what you need. We will reply with pricing and stock for
            plant and OEM buyers.
            {contextBits.length > 0
              ? ` Pre-filled for ${contextBits.join(", ")}.`
              : null}
          </p>
          <div className="mt-6">
            <Button
              render={<Link href="/products/hydraulic" />}
              nativeButton={false}
              variant="outline"
            >
              Browse catalogue
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <InquiryForm
          key={[
            defaults.division,
            defaults.category,
            defaults.product,
            defaults.brand,
          ].join("|")}
          defaults={defaults}
        />
      </div>
    </div>
  );
}
