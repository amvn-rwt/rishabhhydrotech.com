import Image from "next/image";
import Link from "next/link";

import { DesktopNav } from "@/components/layout/DesktopNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { TopBar } from "@/components/layout/TopBar";
import { SearchBar } from "@/components/search/SearchBar";
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

          <SearchBar
            id="header-search"
            className="mx-auto hidden min-w-0 flex-1 md:block lg:max-w-md xl:max-w-lg"
          />

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <DesktopNav />
            <MobileNav />
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-2 md:hidden sm:px-6">
          <SearchBar id="header-search-mobile" />
        </div>
      </div>
    </header>
  );
}
