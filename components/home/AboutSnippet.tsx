import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { aboutSnippet } from "@/lib/data/home";

export function AboutSnippet() {
  return (
    <section
      aria-labelledby="home-about-heading"
      className="border-b border-border bg-brand-muted/40"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="type-overline mb-2 text-brand">{aboutSnippet.overline}</p>
          <h2
            id="home-about-heading"
            className="type-h2 text-balance text-neutral-dark"
          >
            {aboutSnippet.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {aboutSnippet.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-prose type-body text-pretty text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
          <Button
            render={<Link href={aboutSnippet.ctaHref} />}
            nativeButton={false}
            variant="outline"
            size="lg"
            className="mt-2 w-fit border-brand/30 px-5 text-brand-dark hover:bg-white hover:text-brand-dark"
          >
            {aboutSnippet.ctaLabel}
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </section>
  );
}
