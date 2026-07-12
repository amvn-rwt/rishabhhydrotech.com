import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { TopBar } from "@/components/layout/TopBar";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <TopBar />
      <div className="bg-ink text-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="size-10 object-contain"
              priority
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-heading text-sm font-semibold leading-none tracking-tight sm:text-base">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 hidden text-xs leading-none text-white/65 sm:block">
                {siteConfig.shortTagline}
              </span>
            </span>
          </Link>

          <form
            action="/search"
            method="get"
            role="search"
            className="relative mx-auto hidden min-w-0 flex-1 md:block lg:max-w-md xl:max-w-lg"
          >
            <label htmlFor="header-search" className="sr-only">
              Search products
            </label>
            <Input
              id="header-search"
              name="q"
              type="search"
              placeholder="Search products..."
              className="h-9 border-white/15 bg-ink-elevated pr-9 text-white placeholder:text-white/45 focus-visible:border-white/35 focus-visible:ring-white/25"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-white/45 transition-colors hover:text-white"
              aria-label="Submit search"
            >
              <SearchIcon className="size-4" />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <DesktopNav />
            <MobileNav />
          </div>
        </div>

        <form
          action="/search"
          method="get"
          role="search"
          className="border-t border-white/10 px-4 py-2 md:hidden sm:px-6"
        >
          <label htmlFor="header-search-mobile" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <Input
              id="header-search-mobile"
              name="q"
              type="search"
              placeholder="Search products..."
              className="h-9 border-white/15 bg-ink-elevated pr-9 text-white placeholder:text-white/45 focus-visible:border-white/35 focus-visible:ring-white/25"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-white/45 transition-colors hover:text-white"
              aria-label="Submit search"
            >
              <SearchIcon className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}
