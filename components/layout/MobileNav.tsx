"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MailIcon,
  MenuIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ctaNav,
  isNavActive,
  mobileCategoryLinks,
  primaryNav,
} from "@/lib/data/navigation";
import {
  hasContactDetails,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { contact } = siteConfig;

  const phoneLink = telHref(contact.phoneTel || contact.phone);
  const whatsappLink = whatsappHref(
    contact.whatsapp,
    "Hi, I would like to inquire about your products."
  );
  const emailLink = mailtoHref(contact.email);

  function close() {
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          />
        }
      >
        <MenuIcon />
        <span className="sr-only">Open menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
        <SheetHeader className="border-b border-border p-4">
          <SheetTitle>{siteConfig.name}</SheetTitle>
          <SheetDescription>{siteConfig.tagline}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4">
          <nav aria-label="Mobile primary" className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <div key={item.href} className="flex flex-col gap-1">
                <Link
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "px-2 py-2 type-button text-foreground transition-colors hover:bg-muted",
                    isNavActive(pathname, item.href) && "bg-muted"
                  )}
                  aria-current={
                    isNavActive(pathname, item.href) ? "page" : undefined
                  }
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="flex flex-col gap-0.5 border-l border-border pl-3 ml-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={close}
                        className={cn(
                          "px-2 py-1.5 type-body-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                          isNavActive(pathname, child.href) &&
                            "bg-muted text-foreground"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <Button
            render={<Link href={ctaNav.href} onClick={close} />}
            nativeButton={false}
            className="w-full justify-center bg-accent text-white hover:bg-accent-hover"
          >
            {ctaNav.label}
          </Button>

          <div className="flex flex-col gap-2">
            <p className="type-overline text-muted-foreground">Categories</p>
            <div className="flex flex-col gap-0.5">
              {mobileCategoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    "px-2 py-1.5 type-body-sm text-foreground transition-colors hover:bg-muted",
                    isNavActive(pathname, link.href) && "bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {hasContactDetails(contact) ? (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <p className="type-overline text-muted-foreground">Contact</p>
                {contact.phone && phoneLink ? (
                  <a
                    href={phoneLink}
                    className="inline-flex items-center gap-2 px-2 py-1.5 type-body-sm text-foreground hover:bg-muted"
                  >
                    <PhoneIcon className="size-4" aria-hidden />
                    {contact.phone}
                  </a>
                ) : null}
                {contact.whatsapp && whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-2 py-1.5 type-body-sm text-foreground hover:bg-muted"
                  >
                    <MessageCircleIcon className="size-4" aria-hidden />
                    WhatsApp
                  </a>
                ) : null}
                {contact.email && emailLink ? (
                  <a
                    href={emailLink}
                    className="inline-flex items-center gap-2 px-2 py-1.5 type-body-sm text-foreground hover:bg-muted"
                  >
                    <MailIcon className="size-4" aria-hidden />
                    {contact.email}
                  </a>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
