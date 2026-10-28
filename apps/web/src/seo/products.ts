import type { Locale } from "@/i18n/config";

// ── App landing pages: Chess Rescue and Quietly ──
// Every claim below restates copy that is already published and verified
// elsewhere on the site: the work cards, the release notes in `updates.ts`
// (checked against the live Google Play listings) and the Terms. Nothing here
// describes unreleased behaviour, and the pages deliberately make no claim
// about ads, analytics, network use, languages or ratings, so they stay true
// across releases until a verified store listing says otherwise. RPS Duel's
// page predates this file and keeps its own copy in `content.ts`.

export type AppLandingContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  highlightsHeading: string;
  highlights: string[];
  /** Optional short note under the highlights, e.g. a rights reminder. */
  note?: string;
  builtWithHeading: string;
  legalHeading: string;
  privacyLabel: string;
  termsLabel: string;
  backLabel: string;
};

type ProductMeta = Record<Locale, { title: string; description: string }>;

/** Internal landing page for each app that has one, keyed by work-card slug. */
export const PRODUCT_DETAIL_PATHS: Record<string, string> = {
  "rps-duel": "/work/rps-duel",
  "chess-rescue": "/work/chess-rescue",
  quietly: "/work/quietly",
};

/**
 * Dictionary key of each app's store-badge label ("Get Chess Rescue on Google
 * Play"), so every badge on a page has a distinct accessible name.
 */
export const PRODUCT_BADGE_LABEL_KEYS: Record<string, string> = {
  "rps-duel": "games_cta.rps_badge_label",
  "chess-rescue": "games_cta.chess_badge_label",
  quietly: "apps_cta.quietly_badge_label",
};

/**
 * Closing Google Play call to action on every app landing page. `{name}` is
 * replaced with the app name; the Turkish copy needs no suffix after it.
 */
export const PRODUCT_PLAY_CTA: Record<Locale, { heading: string; body: string }> = {
  en: {
    heading: "{name} for Android",
    body: "{name} is available on Google Play.",
  },
  tr: {
    heading: "Android için {name}",
    body: "{name}, Google Play'de yayında.",
  },
  es: {
    heading: "{name} para Android",
    body: "{name} está disponible en Google Play.",
  },
};

export const CHESS_RESCUE_PRODUCT: Record<Locale, AppLandingContent> = {
  en: {
    eyebrow: "Lunexa Games",
    heading: "Chess Rescue",
    lead: "A calm, single-player chess-rules puzzle game for Android. Its rescue-style puzzles start from positions where defeat feels close, and each one turns on finding the one move that changes everything — no account needed, and your progress is saved on your device.",
    highlightsHeading: "What's in it",
    highlights: [
      "Rescue-style puzzles built on chess rules",
      "Puzzles that start from positions where defeat feels close",
      "Find the one move that changes everything",
      "Clearer guidance in the opening levels",
      "Single-player",
      "No account — progress is stored on your device",
    ],
    builtWithHeading: "Built with",
    legalHeading: "Legal",
    privacyLabel: "Privacy policy",
    termsLabel: "Terms of service",
    backLabel: "All work",
  },
  tr: {
    eyebrow: "Lunexa Games",
    heading: "Chess Rescue",
    lead: "Android için sakin, tek oyunculu, satranç kurallı bir bulmaca oyunu. Kurtarma bulmacaları yenilginin yakın hissedildiği pozisyonlardan başlar ve her bulmacada amaç, her şeyi değiştiren tek hamleyi bulmaktır — hesap gerekmez, ilerlemen cihazına kaydedilir.",
    highlightsHeading: "Neler var",
    highlights: [
      "Satranç kurallarına dayanan kurtarma bulmacaları",
      "Yenilginin yakın hissedildiği pozisyonlardan başlayan bulmacalar",
      "Her şeyi değiştiren tek hamleyi bul",
      "Açılış seviyelerinde daha net rehberlik",
      "Tek oyunculu",
      "Hesap yok — ilerlemen cihazında saklanır",
    ],
    builtWithHeading: "Nelerle yapıldı",
    legalHeading: "Yasal",
    privacyLabel: "Gizlilik politikası",
    termsLabel: "Kullanım şartları",
    backLabel: "Tüm işler",
  },
  es: {
    eyebrow: "Lunexa Games",
    heading: "Chess Rescue",
    lead: "Un juego de rompecabezas tranquilo, para un solo jugador y con reglas de ajedrez, para Android. Sus rompecabezas de rescate parten de posiciones en las que la derrota parece cercana, y en cada uno el objetivo es encontrar la jugada que lo cambia todo; no necesitas cuenta y tu progreso se guarda en tu dispositivo.",
    highlightsHeading: "Qué incluye",
    highlights: [
      "Rompecabezas de rescate basados en las reglas del ajedrez",
      "Rompecabezas que parten de posiciones en las que la derrota parece cercana",
      "Encuentra la jugada que lo cambia todo",
      "Una guía más clara en los primeros niveles",
      "Para un solo jugador",
      "Sin cuenta: tu progreso se guarda en tu dispositivo",
    ],
    builtWithHeading: "Hecho con",
    legalHeading: "Legal",
    privacyLabel: "Política de privacidad",
    termsLabel: "Términos de servicio",
    backLabel: "Todo el trabajo",
  },
};

export const QUIETLY_PRODUCT: Record<Locale, AppLandingContent> = {
  en: {
    eyebrow: "Lunexa Apps",
    heading: "Quietly",
    lead: "An Android media saver for direct public links. Paste a link, preview the media and save it to your device gallery. Quietly only fetches links you paste or choose to save, at your request — no scraping, and no logged-in or DRM-protected content.",
    highlightsHeading: "What's in it",
    highlights: [
      "Save direct public media from a pasted link to your gallery, with a preview first",
      "A history of the items you save",
      "A sequential save queue for your downloads",
      "Unfinished saves can be retried or removed after the app restarts",
      "Safer history cleanup, with a confirmation before private copies are deleted",
      "No account needed",
    ],
    note: "Only save media you have the right to save.",
    builtWithHeading: "Built with",
    legalHeading: "Legal",
    privacyLabel: "Privacy policy",
    termsLabel: "Terms of service",
    backLabel: "All work",
  },
  tr: {
    eyebrow: "Lunexa Apps",
    heading: "Quietly",
    lead: "Doğrudan halka açık bağlantılar için bir Android medya kaydedici. Bir bağlantı yapıştır, medyayı önizle ve cihazının galerisine kaydet. Quietly yalnızca senin isteğinle, yapıştırdığın veya kaydetmeyi seçtiğin bağlantıları getirir — kazıma yok, oturum açılmış veya DRM korumalı içerik yok.",
    highlightsHeading: "Neler var",
    highlights: [
      "Yapıştırdığın bir bağlantıdaki doğrudan halka açık medyayı önce önizleyip galerine kaydet",
      "Kaydettiğin öğelerin geçmişi",
      "İndirmelerin için sıralı bir kayıt kuyruğu",
      "Tamamlanmamış kayıtlar, uygulama yeniden başladıktan sonra yeniden denenebilir veya kaldırılabilir",
      "Özel kopyalar silinmeden önce onay isteyen, daha güvenli geçmiş temizliği",
      "Hesap gerekmez",
    ],
    note: "Yalnızca kaydetme hakkına sahip olduğun medyayı kaydet.",
    builtWithHeading: "Nelerle yapıldı",
    legalHeading: "Yasal",
    privacyLabel: "Gizlilik politikası",
    termsLabel: "Kullanım şartları",
    backLabel: "Tüm işler",
  },
  es: {
    eyebrow: "Lunexa Apps",
    heading: "Quietly",
    lead: "Un guardador de medios para Android para enlaces públicos directos. Pega un enlace, previsualiza el medio y guárdalo en la galería de tu dispositivo. Quietly solo descarga, a petición tuya, los enlaces que pegas o eliges guardar: sin scraping y sin contenido protegido por inicio de sesión o DRM.",
    highlightsHeading: "Qué incluye",
    highlights: [
      "Guarda en tu galería medios públicos directos de un enlace pegado, con vista previa antes de guardar",
      "Un historial de los elementos que guardas",
      "Una cola de guardado secuencial para tus descargas",
      "Los guardados sin terminar se pueden reintentar o quitar después de reiniciar la aplicación",
      "Limpieza del historial más segura, con una confirmación antes de eliminar las copias privadas",
      "No necesitas cuenta",
    ],
    note: "Guarda solo medios sobre los que tengas derechos.",
    builtWithHeading: "Hecho con",
    legalHeading: "Legal",
    privacyLabel: "Política de privacidad",
    termsLabel: "Términos de servicio",
    backLabel: "Todo el trabajo",
  },
};

export const CHESS_RESCUE_PRODUCT_META: ProductMeta = {
  en: {
    title: "Chess Rescue — Chess Puzzle Game for Android",
    description:
      "Chess Rescue is a calm, single-player chess-rules puzzle game for Android by Lunexa Games. Start from positions where defeat feels close and find the one move that changes everything. No account needed.",
  },
  tr: {
    title: "Chess Rescue — Android için Satranç Bulmaca Oyunu",
    description:
      "Chess Rescue, Lunexa Games'in Android için sakin, tek oyunculu ve satranç kurallı bulmaca oyunu. Yenilginin yakın hissedildiği pozisyonlardan başla ve her şeyi değiştiren tek hamleyi bul. Hesap gerekmez.",
  },
  es: {
    title: "Chess Rescue — Rompecabezas de ajedrez para Android",
    description:
      "Chess Rescue es un juego de rompecabezas tranquilo, para un solo jugador y con reglas de ajedrez, para Android, de Lunexa Games. Parte de posiciones en las que la derrota parece cercana y encuentra la jugada que lo cambia todo. No requiere cuenta.",
  },
};

export const QUIETLY_PRODUCT_META: ProductMeta = {
  en: {
    title: "Quietly — Media Saver App for Android",
    description:
      "Quietly is an Android media saver by Lunexa. Paste a direct public link, preview the media and save it to your gallery, with a history and a save queue. No account, no scraping, no logged-in or DRM-protected content.",
  },
  tr: {
    title: "Quietly — Android için Medya Kaydetme Uygulaması",
    description:
      "Quietly, Lunexa'nın Android medya kaydedicisi. Doğrudan halka açık bir bağlantı yapıştır, medyayı önizle ve galerine kaydet; geçmiş ve kayıt kuyruğu dahil. Hesap yok, kazıma yok, oturum açılmış veya DRM korumalı içerik yok.",
  },
  es: {
    title: "Quietly — App para guardar medios en Android",
    description:
      "Quietly es un guardador de medios para Android de Lunexa. Pega un enlace público directo, previsualiza el medio y guárdalo en tu galería, con historial y cola de guardado. Sin cuenta, sin scraping y sin contenido protegido por inicio de sesión o DRM.",
  },
};
