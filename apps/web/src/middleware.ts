import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, STORAGE_KEY, type Locale } from "@/i18n/config";

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Non-default (prefixed) locales: everything except DEFAULT_LOCALE.
 * URL strategy: English (default) has no prefix; other locales get /<locale>/.
 */
const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

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
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  // 1. /en or /en/... — strip the prefix and 307 to the canonical unprefixed URL
  if (maybeLocale === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    const rest = segments.slice(2).join("/");
    url.pathname = rest ? `/${rest}` : "/";
    return NextResponse.redirect(url, { status: 307 });
  }

  // 2. /tr or /es prefix → pass through, expose x-locale so the root layout
  //    can mirror it to <html lang>
  if (maybeLocale && PREFIXED_LOCALES.includes(maybeLocale as Locale)) {
    const headers = new Headers(request.headers);
    headers.set("x-locale", maybeLocale);
    return NextResponse.next({ request: { headers } });
  }

  // 3. No locale prefix. Decide which locale this request should be served as.
  const cookieLocale = request.cookies.get(STORAGE_KEY)?.value;
  const preferred =
    (cookieLocale && isLocale(cookieLocale) ? cookieLocale : null) ??
    detectLocaleFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE;

  // 3a. If user prefers a non-default locale, redirect to /<locale>/... so the URL
  //     reflects the chosen language.
  if (preferred !== DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, { status: 307 });
  }

  // 3b. Otherwise serve English at the clean URL by internally rewriting to /en/...
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;

  const headers = new Headers(request.headers);
  headers.set("x-locale", DEFAULT_LOCALE);
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon\\.svg|apple-icon\\.svg|opengraph-image|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|favicon\\.ico).*)",
  ],
};
