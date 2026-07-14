import type { Metadata } from "next";
import {
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";

import { InquiryForm } from "@/components/inquiry/InquiryForm";
import {
  hasAddress,
  hasContactDetails,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Rishabh Hydro Tech Engineers for hydraulic pumps, valves, hoses, cylinders, and power packs. Send an inquiry for pricing and availability.",
  alternates: { canonical: "/contact" },
};

/**
 * Contact details render as they land in `lib/data/site.ts` (WEBSITE_TODO §A.2).
 * Map embed and business hours follow with the client deliverables (§E.3).
 */
function ContactDetails() {
  const { contact, address } = siteConfig;
  if (!hasContactDetails(contact) && !hasAddress(address)) return null;

  const phoneLink = telHref(contact.phoneTel || contact.phone);
  const whatsappLink = whatsappHref(
    contact.whatsapp,
    "Hi, I would like to inquire about your products.",
  );
  const emailLink = mailtoHref(contact.email);

  return (
    <section aria-labelledby="contact-details-heading">
      <h2 id="contact-details-heading" className="type-h3 text-neutral-dark">
        Reach us directly
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {hasAddress(address) ? (
          <li className="flex items-start gap-2.5">
            <MapPinIcon
              className="mt-0.5 size-4 shrink-0 text-brand"
              aria-hidden
            />
            <span className="type-body text-neutral-dark">
              {address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {address.mapsUrl ? (
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-body-sm text-brand underline underline-offset-2 hover:text-brand-dark"
                >
                  Open in Google Maps
                </a>
              ) : null}
            </span>
          </li>
        ) : null}
        {contact.phone && phoneLink ? (
          <li>
            <a
              href={phoneLink}
              className="inline-flex items-center gap-2.5 type-body text-neutral-dark transition-colors hover:text-brand-dark"
            >
              <PhoneIcon className="size-4 shrink-0 text-brand" aria-hidden />
              {contact.phone}
            </a>
          </li>
        ) : null}
        {contact.whatsapp && whatsappLink ? (
          <li>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 type-body text-neutral-dark transition-colors hover:text-brand-dark"
            >
              <MessageCircleIcon
                className="size-4 shrink-0 text-brand"
                aria-hidden
              />
              WhatsApp
            </a>
          </li>
        ) : null}
        {contact.email && emailLink ? (
          <li>
            <a
              href={emailLink}
              className="inline-flex items-center gap-2.5 type-body text-neutral-dark transition-colors hover:text-brand-dark"
            >
              <MailIcon className="size-4 shrink-0 text-brand" aria-hidden />
              {contact.email}
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="type-overline mb-2 text-brand">Contact</p>
          <h1 className="type-h1 text-balance text-neutral-dark">
            Contact us
          </h1>
          <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
            Send the product, make, and specs you need. We reply with pricing
            and availability for plant and OEM buyers.
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <ContactDetails />
        <InquiryForm />
      </div>
    </div>
  );
}
