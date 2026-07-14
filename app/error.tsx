"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col bg-brand-muted">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <p className="type-overline mb-2 text-brand">Error</p>
        <h1 className="type-h1 text-balance text-neutral-dark">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-prose type-lead text-pretty text-muted-foreground">
          The page failed to load. Try again, or go back to the homepage and
          browse from there.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={reset}
            className="bg-brand text-white hover:bg-brand-dark"
          >
            Try again
          </Button>
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            variant="outline"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
