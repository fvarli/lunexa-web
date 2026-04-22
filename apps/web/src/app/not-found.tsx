import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Global 404. Runs outside the [locale] segment so it must not depend on
 * LanguageProvider context. Content stays English; a future iteration
 * could parse the cookie/Accept-Language server-side for localization.
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          404
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
