import type { Locale } from "@/i18n/config";
import { RPS_DUEL_PLAY_URL } from "@/seo/content";

/**
 * Public product changelog.
 *
 * Scope rule: an entry exists **only** for a verified public store release, or
 * for a product becoming publicly available for the first time. Website work —
 * support pages, legal edits, product pages, SEO, infrastructure — never earns
 * an entry, and neither does development that has not shipped to users.
 *
 * That rule is enforced by the shape rather than by a flag: there is no
 * `draft`, no `status` and no `publishAt`, so an unreleased change has nowhere
 * to be staged and cannot leak onto the page.
 *
 * Versions and dates always come from the store listing, never from the mobile
 * repository — a checked-in `pubspec.yaml` is routinely ahead of what users can
 * actually install.
 */

export type ProductId = "rps-duel" | "chess-rescue" | "quietly";

/**
 * Stable, locale-independent product facts. Deliberately narrow: `status` stays
 * in `WORK`, and the store URL is referenced from its existing constant rather
 * than copied, so this cannot become a competing source of truth.
 */
type Product = {
  name: string;
  /** Internal product page, when one exists. */
  workPath?: string;
  /** Public store listing, when the product has shipped. */
  storeUrl?: string;
};

export const PRODUCTS: Record<ProductId, Product> = {
  "rps-duel": {
    name: "RPS Duel",
    workPath: "/work/rps-duel",
    storeUrl: RPS_DUEL_PLAY_URL,
  },
  "chess-rescue": { name: "Chess Rescue" },
  quietly: { name: "Quietly" },
};

export type ChangeCategory = "new" | "improved" | "fixed";

export type UpdateChange = {
  category: ChangeCategory;
  text: Record<Locale, string>;
};

export type UpdateEntry = {
  /** Anchor id, e.g. "rps-duel-1-0-4". Never reused and never renamed — it is a public URL fragment. */
  id: string;
  productId: ProductId;
  /** ISO yyyy-mm-dd: the day the release became publicly available. */
  date: string;
  /** Version exactly as the store listing shows it. Omitted only when the listing shows none. */
  version?: string;
  title: Record<Locale, string>;
  summary?: Record<Locale, string>;
  changes: UpdateChange[];
};

/**
 * Newest first. The date, version and change categories sit outside the
 * per-locale text so they cannot drift between translations, and so every
 * locale is guaranteed the same number of bullets.
 *
 * Empty until a release is verified against its store listing. While it is
 * empty the route 404s and the page is absent from the sitemap and the footer —
 * every one of those surfaces reads `HAS_PUBLISHED_UPDATES`, so adding the first
 * entry here switches the whole surface on with no other edit.
 */
export const UPDATES: UpdateEntry[] = [];

export const HAS_PUBLISHED_UPDATES = UPDATES.length > 0;

/** Reverse-chronological. `sort` is stable, so same-day entries keep source order. */
export function sortedUpdates(): UpdateEntry[] {
  return [...UPDATES].sort((a, b) => b.date.localeCompare(a.date));
}

type UpdatesPageCopy = {
  eyebrow: string;
  heading: string;
  lead: string;
  categoryLabels: Record<ChangeCategory, string>;
  storeLabel: string;
  productLabel: string;
};

export const UPDATES_PAGE: Record<Locale, UpdatesPageCopy> = {
  en: {
    eyebrow: "Lunexa",
    heading: "Product updates",
    lead: "Releases for the apps we publish. Each entry describes a version that is live on the store — nothing here is a preview of unreleased work.",
    categoryLabels: { new: "New", improved: "Improved", fixed: "Fixed" },
    storeLabel: "Get it on Google Play",
    productLabel: "Product page",
  },
  tr: {
    eyebrow: "Lunexa",
    heading: "Ürün güncellemeleri",
    lead: "Yayınladığımız uygulamaların sürümleri. Buradaki her kayıt, mağazada yayında olan bir sürümü anlatır; yayınlanmamış çalışmaların önizlemesi yer almaz.",
    categoryLabels: { new: "Yeni", improved: "İyileştirildi", fixed: "Düzeltildi" },
    storeLabel: "Google Play'den edinin",
    productLabel: "Ürün sayfası",
  },
  es: {
    eyebrow: "Lunexa",
    heading: "Actualizaciones de producto",
    lead: "Versiones de las aplicaciones que publicamos. Cada entrada describe una versión disponible en la tienda; aquí no se adelanta trabajo sin publicar.",
    categoryLabels: { new: "Nuevo", improved: "Mejorado", fixed: "Corregido" },
    storeLabel: "Disponible en Google Play",
    productLabel: "Página del producto",
  },
};
