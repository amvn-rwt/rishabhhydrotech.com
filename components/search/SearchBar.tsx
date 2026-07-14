"use client";

import { useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  /** Unique input id so desktop + mobile instances keep separate labels. */
  id: string;
  className?: string;
};

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/**
 * Header search form. Submits natively to `/search?q=`.
 * Keyboard: `/` focuses the visible instance, Escape clears then blurs.
 */
export function SearchBar({ id, className }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey)
        return;
      if (isEditableTarget(event.target)) return;

      const input = inputRef.current;
      // Two instances render (desktop + mobile); only one is visible.
      if (!input || input.offsetParent === null) return;

      event.preventDefault();
      input.focus();
      input.select();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <form
      action="/search"
      method="get"
      role="search"
      className={cn("relative", className)}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <Input
        ref={inputRef}
        id={id}
        name="q"
        type="search"
        placeholder="Search products..."
        autoComplete="off"
        className="h-9 border-white/15 bg-ink-elevated pr-9 text-white placeholder:text-white/55 focus-visible:border-white/35 focus-visible:ring-white/25"
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          const input = event.currentTarget;
          if (input.value) {
            input.value = "";
          } else {
            input.blur();
          }
        }}
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 -translate-y-1/2 text-white/55 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label="Submit search"
      >
        <SearchIcon className="size-4" aria-hidden />
      </button>
    </form>
  );
}
