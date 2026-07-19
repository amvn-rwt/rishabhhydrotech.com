import type { MetadataRoute } from "next";

import { getAllBrands } from "@/lib/data/brands";
import {
  getAllHydraulicCatalogueSlugPaths,
  getAllPneumaticCatalogueSlugPaths,
} from "@/lib/data/taxonomy";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/products/hydraulic"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/products/pneumatic"), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/inquiry"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/brands"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];

  const hydraulicRoutes: MetadataRoute.Sitemap =
    getAllHydraulicCatalogueSlugPaths().map((slug) => ({
      url: absoluteUrl(`/products/hydraulic/${slug.join("/")}`),
      lastModified,
      changeFrequency: "weekly",
      priority: slug.length === 1 ? 0.8 : 0.6,
    }));

  const pneumaticRoutes: MetadataRoute.Sitemap =
    getAllPneumaticCatalogueSlugPaths().map((slug) => ({
      url: absoluteUrl(`/products/pneumatic/${slug.join("/")}`),
      lastModified,
      changeFrequency: "weekly",
      priority: slug.length === 1 ? 0.8 : 0.6,
    }));

  const brandRoutes: MetadataRoute.Sitemap = getAllBrands().map((brand) => ({
    url: absoluteUrl(`/brands/${brand.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...hydraulicRoutes,
    ...pneumaticRoutes,
    ...brandRoutes,
  ];
}
