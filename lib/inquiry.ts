import {
  formatCategoryLabel,
  getProductById,
} from "@/lib/data/products";
import {
  getHydraulicCategory,
  hydraulicTaxonomy,
} from "@/lib/data/taxonomy";
import type { ProductDivision } from "@/lib/types/product.types";

/** Values used to pre-fill the inquiry form (URL params or modal props). */
export type InquiryFormDefaults = {
  division?: ProductDivision | string;
  category?: string;
  product?: string;
  brand?: string;
};

export type InquiryFormValues = {
  name: string;
  phone: string;
  email: string;
  company: string;
  category: string;
  brand: string;
  quantity: string;
  message: string;
  /** Honeypot — leave empty. Checked when E.2 wires the API. */
  website: string;
};

export type InquiryFieldErrors = Partial<
  Record<keyof InquiryFormValues | "attachment", string>
>;

export type InquiryPayload = InquiryFormValues & {
  division?: string;
  productId?: string;
  productName?: string;
  attachmentName?: string;
  attachmentSize?: number;
  attachmentType?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Build `/inquiry` URLs with optional pre-fill query params.
 */
export function inquiryHref(opts?: {
  category?: string;
  division?: string;
  product?: string;
  brand?: string;
}): string {
  if (!opts) return "/inquiry";

  const params = new URLSearchParams();
  if (opts.division) params.set("division", opts.division);
  if (opts.category) params.set("category", opts.category);
  if (opts.product) params.set("product", opts.product);
  if (opts.brand) params.set("brand", opts.brand);

  const qs = params.toString();
  return qs ? `/inquiry?${qs}` : "/inquiry";
}

export function parseInquirySearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): InquiryFormDefaults {
  const first = (key: string) => {
    const value = searchParams[key];
    if (Array.isArray(value)) return value[0]?.trim() || undefined;
    return value?.trim() || undefined;
  };

  return {
    division: first("division"),
    category: first("category"),
    product: first("product"),
    brand: first("brand"),
  };
}

/** Parse defaults from an absolute or relative `/inquiry?...` href. */
export function inquiryDefaultsFromHref(href: string): InquiryFormDefaults {
  try {
    const url = new URL(href, "https://rishabhhydrotech.com");
    return parseInquirySearchParams(
      Object.fromEntries(url.searchParams.entries()),
    );
  } catch {
    return {};
  }
}

export function getInquiryCategoryOptions(): { value: string; label: string }[] {
  return hydraulicTaxonomy.map((category) => ({
    value: category.slug,
    label: category.name,
  }));
}

export function getInquiryBrandOptions(categorySlug?: string): string[] {
  if (categorySlug) {
    const category = getHydraulicCategory(categorySlug);
    if (category?.makes.length) {
      return [...category.makes].toSorted((a, b) => a.localeCompare(b));
    }
  }

  const names = new Set<string>();
  for (const category of hydraulicTaxonomy) {
    for (const make of category.makes) {
      names.add(make);
    }
  }
  return [...names].toSorted((a, b) => a.localeCompare(b));
}

export function resolveInquiryProductLabel(productId?: string): string | undefined {
  if (!productId) return undefined;
  return getProductById(productId)?.name;
}

export function resolveInquiryCategoryLabel(categorySlug?: string): string | undefined {
  if (!categorySlug) return undefined;
  return formatCategoryLabel(categorySlug);
}

export function emptyInquiryFormValues(
  defaults?: InquiryFormDefaults,
): InquiryFormValues {
  const brandOptions = getInquiryBrandOptions(defaults?.category);
  const brand =
    defaults?.brand && brandOptions.includes(defaults.brand)
      ? defaults.brand
      : "";

  return {
    name: "",
    phone: "",
    email: "",
    company: "",
    category: defaults?.category ?? "",
    brand,
    quantity: "",
    message: "",
    website: "",
  };
}

export function validateInquiryForm(
  values: InquiryFormValues,
): InquiryFieldErrors {
  const errors: InquiryFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your name.";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Enter a phone number.";
  } else if (digits.length < 10) {
    errors.phone = "Enter a phone number with at least 10 digits.";
  }

  if (values.email.trim() && !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.category) {
    errors.category = "Select a product category.";
  }

  if (values.website.trim()) {
    // Bot filled the honeypot — treat as invalid without revealing why.
    errors.name = "Unable to submit. Please try again.";
  }

  return errors;
}

/**
 * Client submit for E.1. E.2 will replace this with a POST to `/api/inquiry`
 * (Resend + rate limiting + spam protection).
 */
export async function submitInquiry(
  payload: InquiryPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (payload.website.trim()) {
    return { ok: true };
  }

  // Acknowledge locally until the inquiry API ships (WEBSITE_TODO §E.2).
  await new Promise((resolve) => setTimeout(resolve, 350));

  if (process.env.NODE_ENV === "development") {
    console.info("[inquiry] submission (pending API)", {
      name: payload.name,
      phone: payload.phone,
      email: payload.email || undefined,
      company: payload.company || undefined,
      division: payload.division || undefined,
      category: payload.category,
      brand: payload.brand || undefined,
      productId: payload.productId || undefined,
      productName: payload.productName || undefined,
      quantity: payload.quantity || undefined,
      message: payload.message || undefined,
      attachmentName: payload.attachmentName || undefined,
    });
  }

  return { ok: true };
}
