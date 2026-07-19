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
      { label: "Pneumatic Products", href: "/products/pneumatic" },
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

/** Quick category links for mobile drawer (top categories across divisions). */
export const mobileCategoryLinks: NavLink[] = [
  { label: "Hydraulic Pumps", href: "/products/hydraulic/pumps" },
  { label: "Hydraulic Valves", href: "/products/hydraulic/valves" },
  { label: "Hydraulic Cylinders", href: "/products/hydraulic/cylinders" },
  { label: "Pneumatic Cylinders", href: "/products/pneumatic/cylinders" },
  { label: "Pneumatic Valves", href: "/products/pneumatic/valves" },
  { label: "Pneumatic Fittings", href: "/products/pneumatic/fittings" },
];

/** Footer quick links. */
export const footerProductLinks: NavLink[] = [
  { label: "Hydraulic Products", href: "/products/hydraulic" },
  { label: "Pneumatic Products", href: "/products/pneumatic" },
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
