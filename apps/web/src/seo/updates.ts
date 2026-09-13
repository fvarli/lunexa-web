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
export const UPDATES: UpdateEntry[] = [
  {
    /*
     * Verified against the live Google Play listing, not the mobile repository.
     *
     * The listing exposes a single timestamp and no version field, so the id is
     * keyed on the date. Its release note opens "Initial public release of RPS
     * Duel." — deliberately not repeated here as a historical claim: internal
     * build numbering had already reached 1.0.3, and the listing cannot say
     * whether any earlier build was ever public. What *is* verified is that this
     * is the release the public can install.
     *
     * The bullets describe the build that is on the store, which is behind the
     * tip of the mobile repository. Everything merged after this date is
     * excluded — including a later rename of one achievement, which is why no
     * achievement is named here.
     */
    id: "rps-duel-2026-07-07",
    productId: "rps-duel",
    /** Google Play, "Updated on": Jul 7, 2026. */
    date: "2026-07-07",
    // No `version`: the listing shows none, and the store is the only source.
    title: {
      en: "RPS Duel is live on Google Play",
      tr: "RPS Duel Google Play'de yayında",
      es: "RPS Duel ya está disponible en Google Play",
    },
    summary: {
      en: "The public Google Play release: single-player rounds against a built-in opponent, with everything kept on the device.",
      tr: "Google Play'deki genel sürüm: dahili bir rakibe karşı tek kişilik turlar; her şey cihazda saklanır.",
      es: "La versión pública en Google Play: rondas para un jugador contra un oponente integrado, con todo guardado en el dispositivo.",
    },
    changes: [
      {
        category: "new",
        text: {
          en: "Single-player Rock Paper Scissors against a built-in opponent.",
          tr: "Dahili bir rakibe karşı tek kişilik Taş Kâğıt Makas.",
          es: "Piedra, papel o tijera para un jugador contra un oponente integrado.",
        },
      },
      {
        category: "new",
        text: {
          en: "Three difficulty levels: Easy, Normal and Hard.",
          tr: "Üç zorluk seviyesi: Kolay, Normal ve Zor.",
          es: "Tres niveles de dificultad: Fácil, Normal y Difícil.",
        },
      },
      {
        category: "new",
        text: {
          en: "A daily challenge with a new objective each local day.",
          tr: "Her yerel günde yeni bir hedef sunan Günlük Görev.",
          es: "Un reto diario con un nuevo objetivo cada día local.",
        },
      },
      {
        category: "new",
        text: {
          en: "Four achievements, a records screen and memorable match moments.",
          tr: "Dört başarım, bir kayıtlar ekranı ve unutulmaz maç anları.",
          es: "Cuatro logros, una pantalla de registros y momentos memorables de partida.",
        },
      },
      {
        category: "new",
        text: {
          en: "Plays offline. No account, and progress stays on the device.",
          tr: "Çevrimdışı oynanır. Hesap gerekmez; ilerleme cihazda kalır.",
          es: "Funciona sin conexión. Sin cuenta, y el progreso permanece en el dispositivo.",
        },
      },
      {
        category: "new",
        text: {
          en: "Available in English, Turkish and Spanish.",
          tr: "İngilizce, Türkçe ve İspanyolca dillerinde kullanılabilir.",
          es: "Disponible en inglés, turco y español.",
        },
      },
      {
        category: "improved",
        text: {
          en: "Sound, animation and accessibility polish throughout.",
          tr: "Ses, animasyon ve erişilebilirlik iyileştirmeleri.",
          es: "Mejoras de sonido, animación y accesibilidad.",
        },
      },
      {
        category: "improved",
        text: {
          en: "Stability and performance improvements.",
          tr: "Kararlılık ve performans iyileştirmeleri.",
          es: "Mejoras de estabilidad y rendimiento.",
        },
      },
    ],
  },
];

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
