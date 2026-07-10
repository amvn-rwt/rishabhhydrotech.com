/**
 * Site-wide company and contact config.
 * Phone / WhatsApp / email / address are empty until the client delivers them (see WEBSITE_TODO §A.2).
 */
export const siteConfig = {
  name: "Rishabh Hydro Tech Engineers",
  shortName: "Rishabh",
  tagline: "Hydraulic & Pneumatic Solutions — Pumps, Valves, Hoses & More",
  logo: {
    src: "/logo.png",
    alt: "Rishabh Hydro Tech Engineers logo",
    width: 40,
    height: 40,
  },
  contact: {
    /** Display string, e.g. "+91 98XXX XXXXX" */
    phone: "" as string,
    /** Digits only for tel: / wa.me links, e.g. "9198XXXXXXXX" */
    phoneTel: "" as string,
    /** Digits only for wa.me, e.g. "9198XXXXXXXX" */
    whatsapp: "" as string,
    email: "" as string,
  },
  address: {
    /** Display lines, e.g. ["Street", "City, State PIN"] */
    lines: [] as readonly string[],
    /** Optional Google Maps URL */
    mapsUrl: "" as string,
  },
  /** Optional identifiers for footer display (see WEBSITE_TODO §A.3). */
  legal: {
    gst: "" as string,
    msme: "" as string,
  },
} as const;

export type SiteContact = typeof siteConfig.contact;
export type SiteAddress = typeof siteConfig.address;
export type SiteLegal = typeof siteConfig.legal;

export function hasContactDetails(contact: SiteContact = siteConfig.contact) {
  return Boolean(contact.phone || contact.whatsapp || contact.email);
}

export function hasAddress(address: SiteAddress = siteConfig.address) {
  return address.lines.length > 0;
}

export function hasLegalIds(legal: SiteLegal = siteConfig.legal) {
  return Boolean(legal.gst || legal.msme);
}

export function telHref(phoneTel: string) {
  return phoneTel ? `tel:+${phoneTel.replace(/^\+/, "")}` : undefined;
}

export function whatsappHref(whatsapp: string, text?: string) {
  if (!whatsapp) return undefined;
  const base = `https://wa.me/${whatsapp.replace(/^\+/, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoHref(email: string) {
  return email ? `mailto:${email}` : undefined;
}
