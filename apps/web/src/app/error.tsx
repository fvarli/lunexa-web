"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useT } from "@/i18n/provider";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useT();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {t("error.eyebrow")}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t("error.heading")}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {t("error.body")}
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-xs text-muted/60">
            {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            {t("error.retry")}
          </button>
          <Link
            href="/"
            className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-colors hover:border-muted"
          >
            {t("error.home")}
          </Link>
        </div>
      </div>
    </main>
  );
}
