"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { heroSlides, type HeroSlide } from "@/lib/data/hero";
import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";

const AUTO_ROTATE_MS = 5000;

type HeroSliderProps = {
  slides?: HeroSlide[];
};

export function HeroSlider({ slides = heroSlides }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const count = slides.length;
  const active = slides[index] ?? slides[0];

  const goTo = useEffectEvent((next: number) => {
    if (count === 0) return;
    setIndex(((next % count) + count) % count);
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || count <= 1) return;

    const id = window.setInterval(() => {
      goTo(index + 1);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(id);
  }, [paused, reducedMotion, count, index]);

  if (!active || count === 0) return null;

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative isolate w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!regionRef.current?.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="relative min-h-[min(72vh,36rem)] w-full sm:min-h-[min(78vh,40rem)] lg:min-h-[min(82vh,44rem)]">
        {slides.map((slide, i) => (
          <SlidePanel
            key={slide.id}
            slide={slide}
            active={i === index}
            priority={i === 0}
          />
        ))}

        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-r from-ink/92 via-ink/55 to-ink/10" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-ink/75 via-transparent to-ink/35" />

        <div className="absolute inset-0 z-20 flex flex-col justify-end">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-16 pt-20 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
            <p className="type-overline mb-3 text-white/70">{siteConfig.name}</p>

            <div
              aria-live="polite"
              aria-atomic="true"
              className="flex max-w-2xl flex-col gap-4"
            >
              <h1 className="type-display text-balance text-white">
                {active.headline}
              </h1>
              <p className="type-lead max-w-prose text-pretty text-white/80">
                {active.subtext}
              </p>
              <div className="pointer-events-auto mt-2 flex flex-wrap items-center gap-3">
                <Button
                  render={<Link href={active.ctaHref} />}
                  nativeButton={false}
                  size="lg"
                  className="bg-white px-5 text-ink hover:bg-white/90"
                >
                  {active.ctaLabel}
                </Button>
                {active.secondaryCtaHref && active.secondaryCtaLabel ? (
                  <Button
                    render={<Link href={active.secondaryCtaHref} />}
                    nativeButton={false}
                    size="lg"
                    variant="outline"
                    className="border-white/45 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
                  >
                    {active.secondaryCtaLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-30">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div
                className="flex items-center gap-2"
                role="tablist"
                aria-label="Slide controls"
              >
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-controls={`hero-slide-${slide.id}`}
                    aria-label={`Show slide ${i + 1}: ${slide.productLabel}`}
                    className={cn(
                      "h-1.5 transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                      i === index
                        ? "w-8 bg-white"
                        : "w-4 bg-white/30 hover:bg-white/50"
                    )}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Previous slide"
                  className="border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => goTo(index - 1)}
                >
                  <ChevronLeftIcon aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Next slide"
                  className="border-white/35 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  onClick={() => goTo(index + 1)}
                >
                  <ChevronRightIcon aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SlidePanel({
  slide,
  active,
  priority,
}: {
  slide: HeroSlide;
  active: boolean;
  priority: boolean;
}) {
  return (
    <div
      id={`hero-slide-${slide.id}`}
      role="tabpanel"
      aria-hidden={!active}
      className={cn(
        "absolute inset-0 transition-opacity duration-700 ease-out",
        active ? "opacity-100" : "opacity-0"
      )}
    >
      {slide.imageSrc ? (
        <Image
          src={slide.imageSrc}
          alt={slide.imageAlt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : (
        <ProductImagePlaceholder
          label={slide.productLabel}
          active={active}
        />
      )}
    </div>
  );
}

/** Temporary visual until client product photos are wired via `imageSrc`. */
function ProductImagePlaceholder({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div
      className="absolute inset-0 bg-[linear-gradient(135deg,#0c1017_0%,#151b26_42%,#1f2937_68%,#0c1017_100%)]"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(92,111,158,0.28),transparent_55%)]" />
      <div
        className={cn(
          "absolute inset-y-0 right-0 flex w-full items-center justify-end pr-6 sm:pr-12 lg:w-[55%] lg:pr-20",
          "transition-transform duration-700 ease-out",
          active ? "translate-x-0" : "translate-x-6"
        )}
      >
        <p className="max-w-[12ch] text-right text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white/15 select-none">
          {label}
        </p>
      </div>
    </div>
  );
}
