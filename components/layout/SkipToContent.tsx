import Link from "next/link";

/** Visually hidden until focused — first focusable element in the document. */
export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:type-button focus:text-brand focus:shadow-md focus:outline-none focus:ring-2 focus:ring-brand"
    >
      Skip to content
    </Link>
  );
}
