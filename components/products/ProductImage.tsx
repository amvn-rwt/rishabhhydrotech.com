"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
  src?: string;
  alt: string;
  /** Tailwind aspect class, e.g. aspect-square or aspect-4/3 */
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a catalogue product photo when the file exists under /public.
 * Missing files fall back to the muted placeholder (same look as before images).
 */
export function ProductImage({
  src,
  alt,
  aspectClassName = "aspect-square",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  priority = false,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative overflow-hidden border-b border-border bg-brand-muted ${aspectClassName}`}
      aria-hidden={showImage ? undefined : true}
    >
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-center"
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
