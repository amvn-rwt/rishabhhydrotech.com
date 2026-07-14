import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { hydraulicTaxonomy } from "@/lib/data/taxonomy";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const quickLinks = hydraulicTaxonomy.slice(0, 6);

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="type-overline mb-2 text-brand">404</p>
        <h1 className="type-h1 text-balance text-neutral-dark">
          Page not found
        </h1>
        <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
          The page you requested does not exist or has moved. Browse the
          catalogue or send an inquiry and we will point you to the right
          product.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            className="bg-brand text-white hover:bg-brand-dark"
          >
            Go to homepage
          </Button>
          <Button
            render={<Link href="/products/hydraulic" />}
            nativeButton={false}
            variant="outline"
          >
            Browse catalogue
          </Button>
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            variant="outline"
          >
            Contact us
          </Button>
        </div>

        <nav aria-label="Popular categories" className="mt-10">
          <h2 className="type-h4 text-neutral-dark">Popular categories</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {quickLinks.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products/hydraulic/${category.slug}`}
                  className="type-body-sm inline-block border border-border bg-white px-3 py-1.5 text-neutral-dark transition-colors hover:border-brand/40 hover:bg-brand-muted hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
