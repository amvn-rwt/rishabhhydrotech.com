/**
 * Build `/inquiry` URLs with optional pre-fill query params
 * (consumed by the inquiry form when Phase 3 lands — WEBSITE_TODO §E).
 */
export function inquiryHref(opts?: {
  category?: string;
  division?: string;
  product?: string;
}): string {
  if (!opts) return "/inquiry";

  const params = new URLSearchParams();
  if (opts.division) params.set("division", opts.division);
  if (opts.category) params.set("category", opts.category);
  if (opts.product) params.set("product", opts.product);

  const qs = params.toString();
  return qs ? `/inquiry?${qs}` : "/inquiry";
}
