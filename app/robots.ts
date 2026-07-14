import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Query-driven results pages; canonical content lives in the catalogue.
      disallow: "/search",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
