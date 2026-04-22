import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "@/i18n/config";

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function detectLocaleFromAcceptLanguage(header: string | null): Locale | null {
  if (!header) return null;
  const entries = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? parseFloat(q.slice(2)) : 1;
      return { tag: tag.toLowerCase(), quality: isNaN(quality) ? 1 : quality };
    })
    .sort((a, b) => b.quality - a.quality);
  for (const { tag } of entries) {
    const primary = tag.split("-")[0];
    if (isLocale(primary)) return primary;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix → pass through, but expose the locale to downstream
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", maybeLocale);
    return NextResponse.next({ request: { headers } });
  }

  // No locale prefix → pick one and redirect
  const cookieLocale = request.cookies.get(STORAGE_KEY)?.value;
  const resolved =
    (cookieLocale && isLocale(cookieLocale) ? cookieLocale : null) ??
    detectLocaleFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${resolved}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, { status: 307 });
}

export const config = {
  matcher: [
    // Run on everything except API, Next internals, static files, and the named public assets
    "/((?!api|_next/static|_next/image|icon\\.svg|apple-icon\\.svg|opengraph-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|favicon\\.ico).*)",
  ],
};
