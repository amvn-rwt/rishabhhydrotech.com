export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

/** Primary header navigation (exact labels still open — see WEBSITE_TODO §A.1). */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All Products", href: "/products" },
      { label: "Hydraulic Products", href: "/products/hydraulic" },
      // Pneumatic Products — add when client delivers taxonomy (WEBSITE_PLAN §6.3)
    ],
  },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaNav: NavLink = {
  label: "Get Best Price",
  href: "/inquiry",
};

/** Quick category links for mobile drawer (top hydraulic categories). */
export const mobileCategoryLinks: NavLink[] = [
  { label: "Hydraulic Pumps", href: "/products/hydraulic/pumps" },
  { label: "Hydraulic Valves", href: "/products/hydraulic/valves" },
  { label: "Hydraulic Hoses", href: "/products/hydraulic/hoses" },
  { label: "Hydraulic Cylinders", href: "/products/hydraulic/cylinders" },
  { label: "Power Packs", href: "/products/hydraulic/power-packs" },
];

/** Footer quick links. */
export const footerProductLinks: NavLink[] = [
  { label: "Hydraulic Products", href: "/products/hydraulic" },
  { label: "Full Catalogue", href: "/products" },
];

export const footerCompanyLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Brands", href: "/brands" },
  { label: "Contact", href: "/contact" },
  { label: "Get Best Price", href: "/inquiry" },
];

export function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
