import Link from "next/link";
import { MessageCircleIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { inquiryCta } from "@/lib/data/home";
import {
  hasContactDetails,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/data/site";

export function InquiryCTA() {
  const { contact } = siteConfig;
  const phoneLink = telHref(contact.phoneTel || contact.phone);
  const whatsappLink = whatsappHref(
    contact.whatsapp,
    "Hi, I would like to get a best price quote.",
  );
  const showDirectContact = hasContactDetails(contact);

  return (
    <section
      aria-labelledby="home-inquiry-heading"
      className="border-y border-white/10 bg-ink-elevated text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-8 lg:py-16">
        <div className="max-w-xl">
          <h2
            id="home-inquiry-heading"
            className="type-h2 text-balance text-white"
          >
            {inquiryCta.title}
          </h2>
          <p className="mt-3 type-lead text-pretty text-white/90">
            {inquiryCta.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            render={<Link href={inquiryCta.primaryHref} />}
            nativeButton={false}
            size="lg"
            className="bg-brand px-5 text-white hover:bg-brand-dark"
          >
            {inquiryCta.primaryLabel}
          </Button>

          {showDirectContact && contact.phone && phoneLink ? (
            <Button
              render={<a href={phoneLink} />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <PhoneIcon data-icon="inline-start" />
              {contact.phone}
            </Button>
          ) : null}

          {showDirectContact && contact.whatsapp && whatsappLink ? (
            <Button
              render={
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-white/50 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              <MessageCircleIcon data-icon="inline-start" />
              WhatsApp
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
