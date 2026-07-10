"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  catalogueNav,
  ctaNav,
  isNavActive,
  primaryNav,
  type NavItem,
} from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

function NavDropdown({
  item,
  triggerClassName,
}: {
  item: NavItem;
  triggerClassName?: string;
}) {
  const pathname = usePathname();
  const active =
    isNavActive(pathname, item.href) ||
    item.children?.some((child) => isNavActive(pathname, child.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1 type-button text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
          active && "text-white",
          triggerClassName
        )}
      >
        {item.label}
        <ChevronDownIcon className="size-3.5 opacity-80" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        <DropdownMenuGroup>
          {item.children?.map((child) => (
            <DropdownMenuItem
              key={child.href}
              render={<Link href={child.href} />}
              className={cn(
                isNavActive(pathname, child.href) &&
                  "bg-muted font-medium text-foreground"
              )}
            >
              {child.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-5 lg:flex xl:gap-6"
    >
      <NavDropdown
        item={catalogueNav}
        triggerClassName="border border-white/25 bg-white/10 px-2.5 py-1.5 hover:bg-white/15"
      />

      {primaryNav.map((item) =>
        item.children ? (
          <NavDropdown key={item.href} item={item} />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "type-button text-white/90 transition-colors hover:text-white",
              isNavActive(pathname, item.href) && "text-white underline underline-offset-4"
            )}
            aria-current={isNavActive(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        )
      )}

      <Button
        render={<Link href={ctaNav.href} />}
        nativeButton={false}
        className="bg-accent text-white hover:bg-accent-hover"
      >
        {ctaNav.label}
      </Button>
    </nav>
  );
}
