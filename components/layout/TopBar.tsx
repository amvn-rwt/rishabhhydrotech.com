import { MailIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";

import {
  hasContactDetails,
  mailtoHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/data/site";

export function TopBar() {
  const { contact } = siteConfig;

  if (!hasContactDetails(contact)) {
    return null;
  }

  const phoneLink = telHref(contact.phoneTel || contact.phone);
  const whatsappLink = whatsappHref(
    contact.whatsapp,
    "Hi, I would like to inquire about your products."
  );
  const emailLink = mailtoHref(contact.email);

  return (
    <div className="bg-ink-elevated text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-end gap-x-4 gap-y-1 px-4 py-1.5 type-caption sm:px-6 lg:px-8">
        {contact.phone && phoneLink ? (
          <a
            href={phoneLink}
            className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
          >
            <PhoneIcon className="size-3.5" aria-hidden />
            <span>{contact.phone}</span>
          </a>
        ) : null}
        {contact.whatsapp && whatsappLink ? (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
          >
            <MessageCircleIcon className="size-3.5" aria-hidden />
            <span>WhatsApp</span>
          </a>
        ) : null}
        {contact.email && emailLink ? (
          <a
            href={emailLink}
            className="inline-flex items-center gap-1.5 text-white/90 transition-colors hover:text-white"
          >
            <MailIcon className="size-3.5" aria-hidden />
            <span>{contact.email}</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
