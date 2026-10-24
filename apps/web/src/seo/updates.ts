import type { Locale } from "@/i18n/config";
import {
  CHESS_RESCUE_PLAY_URL,
  QUIETLY_PLAY_URL,
  RPS_DUEL_PLAY_URL,
} from "@/seo/content";

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
  "chess-rescue": { name: "Chess Rescue", storeUrl: CHESS_RESCUE_PLAY_URL },
  quietly: { name: "Quietly", storeUrl: QUIETLY_PLAY_URL },
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
     * Verified against the live Google Play listing (version 1.1.0, "Updated
     * on" Oct 24, 2026). The bullets restate its release note only. Backup and
     * device-transfer behaviour is excluded until it is verified on devices.
     */
    id: "quietly-1-1-0",
    productId: "quietly",
    /** Google Play, "Updated on": Oct 24, 2026. */
    date: "2026-10-24",
    version: "1.1.0",
    title: {
      en: "A save queue and safer history cleanup",
      tr: "Kayıt kuyruğu ve daha güvenli geçmiş temizliği",
      es: "Cola de guardado y limpieza del historial más segura",
    },
    changes: [
      {
        category: "improved",
        text: {
          en: "Download management with a sequential save queue.",
          tr: "Sıralı bir kayıt kuyruğuyla indirme yönetimi.",
          es: "Gestión de descargas con una cola de guardado secuencial.",
        },
      },
      {
        category: "new",
        text: {
          en: "Unfinished saves can be retried or removed after the app restarts.",
          tr: "Tamamlanmamış kayıtlar, uygulama yeniden başladıktan sonra yeniden denenebilir veya kaldırılabilir.",
          es: "Los guardados sin terminar se pueden reintentar o quitar después de reiniciar la aplicación.",
        },
      },
      {
        category: "improved",
        text: {
          en: "Safer history cleanup, with a confirmation before private copies are deleted.",
          tr: "Özel kopyalar silinmeden önce onay isteyen, daha güvenli geçmiş temizliği.",
          es: "Limpieza del historial más segura, con una confirmación antes de eliminar las copias privadas.",
        },
      },
    ],
  },
  {
    /*
     * Verified against the live Google Play listing (version 1.2.1, "Updated
     * on" Oct 24, 2026). A corrective release: the bullets restate its release
     * note and claim nothing about network use or analytics.
     */
    id: "chess-rescue-1-2-1",
    productId: "chess-rescue",
    /** Google Play, "Updated on": Oct 24, 2026. */
    date: "2026-10-24",
    version: "1.2.1",
    title: {
      en: "Puzzle fixes and clearer opening guidance",
      tr: "Bulmaca düzeltmeleri ve daha net açılış rehberliği",
      es: "Correcciones de rompecabezas y una guía inicial más clara",
    },
    changes: [
      {
        category: "fixed",
        text: {
          en: "Incorrect moves and rescue scenarios in several puzzles.",
          tr: "Birçok bulmacadaki hatalı hamleler ve kurtarma senaryoları.",
          es: "Movimientos y escenarios de rescate incorrectos en varios rompecabezas.",
        },
      },
      {
        category: "improved",
        text: {
          en: "Clearer guidance in the opening levels.",
          tr: "Açılış seviyelerinde daha net rehberlik.",
          es: "Una guía más clara en los primeros niveles.",
        },
      },
      {
        category: "fixed",
        text: {
          en: "Gameplay issues, for a smoother experience.",
          tr: "Daha akıcı bir deneyim için oynanış sorunları.",
          es: "Problemas de juego, para una experiencia más fluida.",
        },
      },
    ],
  },
  {
    /*
     * Verified against the live Google Play listing. Its release note calls
     * this "This first production release". The listing shows the version name
     * only; the build number is not public, so none is claimed.
     *
     * The bullets describe the build on the store. Later development — History
     * media deletion, backup changes — is excluded until it ships.
     */
    id: "quietly-1-0-4",
    productId: "quietly",
    /** Google Play, "Updated on": Oct 20, 2026. */
    date: "2026-10-20",
    version: "1.0.4",
    title: {
      en: "Quietly is live on Google Play",
      tr: "Quietly Google Play'de yayında",
      es: "Quietly ya está disponible en Google Play",
    },
    summary: {
      en: "The first public release on Google Play: an Android media saver for direct public links.",
      tr: "Google Play'deki ilk genel sürüm: doğrudan halka açık bağlantılar için bir Android medya kaydedici.",
      es: "La primera versión pública en Google Play: un guardador de medios para Android para enlaces públicos directos.",
    },
    changes: [
      {
        category: "new",
        text: {
          en: "Save direct public media from a pasted link to the device gallery, with a preview before saving.",
          tr: "Yapıştırılan bir bağlantıdaki doğrudan halka açık medyayı, kaydetmeden önce önizleyerek cihaz galerisine kaydetme.",
          es: "Guarda en la galería del dispositivo medios públicos directos de un enlace pegado, con vista previa antes de guardar.",
        },
      },
      {
        category: "new",
        text: {
          en: "A history of the items you save.",
          tr: "Kaydedilen öğelerin geçmişi.",
          es: "Un historial de los elementos guardados.",
        },
      },
      {
        category: "new",
        text: {
          en: "Fetches only the links you paste — no scraping, and no logged-in or DRM-protected content.",
          tr: "Yalnızca yapıştırılan bağlantıları getirir; kazıma yok, oturum açılmış veya DRM korumalı içerik yok.",
          es: "Solo descarga los enlaces que se pegan: sin scraping y sin contenido protegido por inicio de sesión o DRM.",
        },
      },
      {
        category: "new",
        text: {
          en: "No account and no ads.",
          tr: "Hesap yok, reklam yok.",
          es: "Sin cuenta y sin anuncios.",
        },
      },
      {
        category: "improved",
        text: {
          en: "Stability improvements and a clean, easy-to-use interface.",
          tr: "Kararlılık iyileştirmeleri ve sade, kullanımı kolay bir arayüz.",
          es: "Mejoras de estabilidad y una interfaz limpia y fácil de usar.",
        },
      },
    ],
  },
  {
    /*
     * Verified against the live Google Play listing. Its release note calls
     * this "our first public release". The listing shows the version name
     * only; the build number is not public, so none is claimed.
     *
     * No offline, network or analytics claim is made here while the store
     * build's network behaviour is still being confirmed, and the later
     * analytics work is excluded until it ships.
     */
    id: "chess-rescue-1-2-0",
    productId: "chess-rescue",
    /** Google Play, "Updated on": Oct 14, 2026. */
    date: "2026-10-14",
    version: "1.2.0",
    title: {
      en: "Chess Rescue is live on Google Play",
      tr: "Chess Rescue Google Play'de yayında",
      es: "Chess Rescue ya está disponible en Google Play",
    },
    summary: {
      en: "The first public release on Google Play: calm, single-player puzzles built on chess rules.",
      tr: "Google Play'deki ilk genel sürüm: satranç kurallarına dayanan sakin, tek kişilik bulmacalar.",
      es: "La primera versión pública en Google Play: rompecabezas tranquilos para un jugador basados en las reglas del ajedrez.",
    },
    changes: [
      {
        category: "new",
        text: {
          en: "Rescue-style puzzles that start from positions where defeat feels close.",
          tr: "Yenilginin yakın hissedildiği pozisyonlardan başlayan kurtarma bulmacaları.",
          es: "Rompecabezas de rescate que parten de posiciones en las que la derrota parece cercana.",
        },
      },
      {
        category: "new",
        text: {
          en: "Each puzzle turns on finding the one move that changes everything.",
          tr: "Her bulmacada amaç, her şeyi değiştiren tek hamleyi bulmak.",
          es: "En cada rompecabezas, el objetivo es encontrar la jugada que lo cambia todo.",
        },
      },
      {
        category: "new",
        text: {
          en: "No account needed, and progress is saved on the device.",
          tr: "Hesap gerekmez; ilerleme cihazda saklanır.",
          es: "Sin cuenta, y el progreso se guarda en el dispositivo.",
        },
      },
    ],
  },
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
