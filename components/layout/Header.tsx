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
      <div className="bg-brand text-white shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <span className="flex size-10 shrink-0 items-center justify-center bg-white p-0.5">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                className="size-9 object-contain"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold leading-tight tracking-tight sm:text-base">
                {siteConfig.name}
              </span>
              <span className="hidden truncate text-xs text-white/75 sm:block">
                {siteConfig.tagline}
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
              className="h-9 border-white/20 bg-white pr-9 text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
              className="h-9 border-white/20 bg-white pr-9 text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
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
