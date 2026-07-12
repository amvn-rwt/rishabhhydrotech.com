import Image from "next/image";
import Link from "next/link";
import {
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";

import {
  footerCompanyLinks,
  footerProductLinks,
} from "@/lib/data/navigation";
import {
  hasAddress,
  hasContactDetails,
  hasLegalIds,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/data/site";

export function Footer() {
  const { contact, address, legal } = siteConfig;
  const showContact = hasContactDetails(contact) || hasAddress(address);
  const showLegal = hasLegalIds(legal);

  const phoneLink = telHref(contact.phoneTel || contact.phone);
  const whatsappLink = whatsappHref(
    contact.whatsapp,
    "Hi, I would like to inquire about your products."
  );
  const emailLink = mailtoHref(contact.email);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.75fr)_repeat(3,minmax(0,1fr))] lg:gap-10 lg:px-8">
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="flex w-fit items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="size-14 shrink-0 object-contain"
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-heading text-sm font-semibold leading-none tracking-tight sm:text-base">
                {siteConfig.name}
              </span>
              <span className="mt-0.5 block text-xs leading-none text-white/65">
                {siteConfig.shortTagline}
              </span>
            </span>
          </Link>
          <p className="max-w-xs type-body-sm text-white/80">
            Hydraulic and pneumatic products for industrial maintenance,
            procurement, and OEM applications.
          </p>
        </div>

        <nav aria-label="Footer products" className="flex flex-col gap-3">
          <p className="type-overline text-white/60">Products</p>
          <ul className="flex flex-col gap-2">
            {footerProductLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-body-sm text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer company" className="flex flex-col gap-3">
          <p className="type-overline text-white/60">Company</p>
          <ul className="flex flex-col gap-2">
            {footerCompanyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="type-body-sm text-white/90 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="type-overline text-white/60">Contact</p>
          {showContact ? (
            <ul className="flex flex-col gap-2.5">
              {hasAddress(address) ? (
                <li>
                  {address.mapsUrl ? (
                    <a
                      href={address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-2 type-body-sm text-white/90 transition-colors hover:text-white"
                    >
                      <MapPinIcon
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      <span>
                        {address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex items-start gap-2 type-body-sm text-white/90">
                      <MapPinIcon
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      <span>
                        {address.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </span>
                    </span>
                  )}
                </li>
              ) : null}
              {contact.phone && phoneLink ? (
                <li>
                  <a
                    href={phoneLink}
                    className="inline-flex items-center gap-2 type-body-sm text-white/90 transition-colors hover:text-white"
                  >
                    <PhoneIcon className="size-4 shrink-0" aria-hidden />
                    <span>{contact.phone}</span>
                  </a>
                </li>
              ) : null}
              {contact.whatsapp && whatsappLink ? (
                <li>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 type-body-sm text-white/90 transition-colors hover:text-white"
                  >
                    <MessageCircleIcon
                      className="size-4 shrink-0"
                      aria-hidden
                    />
                    <span>WhatsApp</span>
                  </a>
                </li>
              ) : null}
              {contact.email && emailLink ? (
                <li>
                  <a
                    href={emailLink}
                    className="inline-flex items-center gap-2 type-body-sm text-white/90 transition-colors hover:text-white"
                  >
                    <MailIcon className="size-4 shrink-0" aria-hidden />
                    <span>{contact.email}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          ) : (
            <p className="type-body-sm text-white/80">
              <Link
                href="/contact"
                className="underline underline-offset-2 transition-colors hover:text-white"
              >
                Contact us
              </Link>{" "}
              for quotes and product inquiries.
            </p>
          )}

          {showLegal ? (
            <ul className="mt-2 flex flex-col gap-1 border-t border-white/15 pt-3 type-caption text-white/70">
              {legal.gst ? <li>GST: {legal.gst}</li> : null}
              {legal.msme ? <li>MSME: {legal.msme}</li> : null}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="bg-ink-elevated">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 type-caption text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p suppressHydrationWarning>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/55">{siteConfig.shortTagline}</p>
        </div>
      </div>
    </footer>
  );
}
