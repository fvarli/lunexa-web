import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/i18n/config";

const BASE = "https://uselunexa.com";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  es: "es_ES",
};

/**
 * Build the public URL for a (locale, path) pair.
 * DEFAULT_LOCALE (English) has no prefix — its canonical is /path.
 * Other locales are prefixed: /tr/path, /es/path.
 */
export function urlFor(locale: Locale, path: string): string {
  const suffix = path === "/" ? "" : path;
  if (locale === DEFAULT_LOCALE) {
    return suffix ? `${BASE}${suffix}` : BASE;
  }
  return `${BASE}/${locale}${suffix}`;
}

export function alternatesFor(path: string, locale: Locale) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = urlFor(l, path);
  }
  languages["x-default"] = urlFor(DEFAULT_LOCALE, path);

  return {
    canonical: urlFor(locale, path),
    languages,
  };
}

export function openGraphLocale(locale: Locale) {
  return {
    locale: OG_LOCALE[locale],
    alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
  };
}

type PageCopy = Record<Locale, { title: string; description: string }>;

export const HOME_META: PageCopy = {
  en: {
    title: "Digital Product Studio — Mobile, Web & AI",
    description:
      "Lunexa is a digital product studio. We design and build mobile apps, web platforms, and AI-powered systems — with clarity, precision, and craft.",
  },
  tr: {
    title: "Dijital Ürün Stüdyosu — Mobil, Web ve AI",
    description:
      "Lunexa, dijital ürün stüdyosudur. Mobil uygulamalar, web platformları ve AI destekli sistemler geliştiriyoruz — netlik, hassasiyet ve zanaatla.",
  },
  es: {
    title: "Estudio de Productos Digitales — Móvil, Web e IA",
    description:
      "Lunexa es un estudio de productos digitales. Diseñamos y construimos apps móviles, plataformas web y sistemas con IA — con claridad, precisión y artesanía.",
  },
};

export const CONTACT_META: PageCopy = {
  en: {
    title: "Contact",
    description:
      "Get in touch with Lunexa. We'd love to hear about your project and explore how we can help.",
  },
  tr: {
    title: "İletişim",
    description:
      "Lunexa ile iletişime geçin. Projeniz hakkında sohbet etmeyi ve size nasıl yardımcı olabileceğimizi keşfetmeyi çok isteriz.",
  },
  es: {
    title: "Contacto",
    description:
      "Contacta con Lunexa. Nos encantaría escuchar sobre tu proyecto y explorar cómo podemos ayudarte.",
  },
};

export const PRIVACY_META: PageCopy = {
  en: {
    title: "Privacy Policy",
    description:
      "How Lunexa handles your data. Our privacy policy explains what we collect, why, and your rights.",
  },
  tr: {
    title: "Gizlilik Politikası",
    description:
      "Lunexa verilerinizi nasıl işler. Gizlilik politikamız neleri topladığımızı, neden topladığımızı ve haklarınızı açıklar.",
  },
  es: {
    title: "Política de Privacidad",
    description:
      "Cómo gestiona Lunexa tus datos. Nuestra política de privacidad explica qué recopilamos, por qué, y tus derechos.",
  },
};

export const RPS_DUEL_PRIVACY_META: PageCopy = {
  en: {
    title: "RPS Duel — Privacy Policy",
    description:
      "Privacy policy for RPS Duel by Lunexa Games. Version 1.0.5 shows ads: which data the app collects and shares for advertising, and what it stores on your device.",
  },
  tr: {
    title: "RPS Duel — Gizlilik Politikası",
    description:
      "Lunexa Games'in RPS Duel oyunu için gizlilik politikası. 1.0.5 sürümü reklam gösterir: reklam için toplanan ve paylaşılan veriler ile cihazında saklananlar.",
  },
  es: {
    title: "RPS Duel — Política de Privacidad",
    description:
      "Política de privacidad de RPS Duel (Lunexa Games). La versión 1.0.5 muestra anuncios: datos que recopila y comparte para publicidad y qué guarda en tu dispositivo.",
  },
};

export const QUIETLY_PRIVACY_META: PageCopy = {
  en: {
    title: "Quietly — Privacy Policy",
    description:
      "Privacy policy for Quietly, a media-saver Android app by Lunexa. Saves direct public media from URLs you paste. No account, no ads, no analytics, no scraping. Network use includes the server of the URL you paste, any servers it redirects to, and a Google connectivity check.",
  },
  tr: {
    title: "Quietly — Gizlilik Politikası",
    description:
      "Quietly için gizlilik politikası — Lunexa tarafından geliştirilen Android medya kaydedici uygulaması. Yapıştırdığın URL'lerdeki doğrudan halka açık medyayı kaydeder. Hesap yok, reklam yok, analitik yok, kazıma yok. Ağ kullanımı; yapıştırdığın URL'nin sunucusunu, yönlendirdiği sunucuları ve bir Google bağlantı kontrolünü içerir.",
  },
  es: {
    title: "Quietly — Política de Privacidad",
    description:
      "Política de privacidad de Quietly, una app Android de guardado de medios por Lunexa. Guarda medios públicos directos desde las URLs que pegas. Sin cuenta, sin anuncios, sin analítica, sin scraping. El uso de red incluye el servidor de la URL que pegas, los servidores a los que redirige y una comprobación de conectividad de Google.",
  },
};

export const CHESS_RESCUE_PRIVACY_META: PageCopy = {
  en: {
    title: "Chess Rescue — Privacy Policy",
    description:
      "Privacy policy for Chess Rescue (com.lunexa.games.chessrescue), a single-player offline puzzle game by Lunexa Games. No account, no backend, no ads, no analytics, no personal data collected.",
  },
  tr: {
    title: "Chess Rescue — Gizlilik Politikası",
    description:
      "Chess Rescue için gizlilik politikası (com.lunexa.games.chessrescue) — Lunexa Games tarafından geliştirilen tek oyunculu, çevrimdışı bulmaca oyunu. Hesap yok, sunucu yok, reklam yok, analitik yok, kişisel veri toplanmaz.",
  },
  es: {
    title: "Chess Rescue — Política de Privacidad",
    description:
      "Política de privacidad de Chess Rescue (com.lunexa.games.chessrescue), un juego de rompecabezas para un solo jugador y sin conexión de Lunexa Games. Sin cuenta, sin backend, sin anuncios, sin analítica, sin datos personales.",
  },
};

// Scoped to the website, matching what the page body actually says. Each app
// carries its own terms at /terms/<product>.
export const TERMS_META: PageCopy = {
  en: {
    title: "Terms of Use",
    description:
      "Terms and conditions for using the uselunexa.com website. Lunexa apps have their own product-specific terms.",
  },
  tr: {
    title: "Kullanım Şartları",
    description:
      "uselunexa.com web sitesini kullanma koşulları. Lunexa uygulamalarının kendi ürüne özel şartları vardır.",
  },
  es: {
    title: "Términos de Uso",
    description:
      "Términos y condiciones para usar el sitio web uselunexa.com. Las apps de Lunexa tienen sus propios términos por producto.",
  },
};

export const RPS_DUEL_PRODUCT_META: PageCopy = {
  en: {
    title: "RPS Duel — Android Game by Lunexa Games",
    description:
      "RPS Duel is a single-player Rock Paper Scissors game for Android by Lunexa Games. Daily challenge, four achievements, three difficulty levels, and English / Turkish / Spanish support. No account needed.",
  },
  tr: {
    title: "RPS Duel — Lunexa Games'ten Android Oyunu",
    description:
      "RPS Duel, Lunexa Games tarafından geliştirilen Android için tek oyunculu bir Taş Kâğıt Makas oyunu. Günlük görev, dört başarı, üç zorluk seviyesi ve İngilizce / Türkçe / İspanyolca desteği. Hesap gerekmez.",
  },
  es: {
    title: "RPS Duel — Juego de Android de Lunexa Games",
    description:
      "RPS Duel es un juego de Piedra Papel Tijera para un solo jugador en Android, de Lunexa Games. Reto diario, cuatro logros, tres niveles de dificultad y soporte en inglés / turco / español. No requiere cuenta.",
  },
};

export const RPS_DUEL_SUPPORT_META: PageCopy = {
  en: {
    title: "RPS Duel — Support & FAQ",
    description:
      "Help for RPS Duel by Lunexa Games: accounts, offline play, languages, difficulty levels, the Daily Challenge, achievements, and how to reset the scoreboard without losing your records.",
  },
  tr: {
    title: "RPS Duel — Destek ve SSS",
    description:
      "Lunexa Games'ten RPS Duel için yardım: hesaplar, çevrimdışı oynanış, diller, zorluk seviyeleri, Günlük Görev, başarımlar ve kayıtlarınızı kaybetmeden skor tablosunu sıfırlama.",
  },
  es: {
    title: "RPS Duel — Soporte y preguntas frecuentes",
    description:
      "Ayuda para RPS Duel de Lunexa Games: cuentas, juego sin conexión, idiomas, niveles de dificultad, el Reto Diario, logros y cómo reiniciar el marcador sin perder tus récords.",
  },
};

export const RPS_DUEL_TERMS_META: PageCopy = {
  en: {
    title: "RPS Duel — Terms of Service",
    description:
      "Terms of service for RPS Duel (com.lunexa.games.rpsduel), a single-player Rock Paper Scissors game by Lunexa Games. Entertainment only — no gambling, no wagering, no prizes.",
  },
  tr: {
    title: "RPS Duel — Kullanım Şartları",
    description:
      "RPS Duel için kullanım şartları (com.lunexa.games.rpsduel) — Lunexa Games tarafından geliştirilen tek oyunculu Taş Kâğıt Makas oyunu. Yalnızca eğlence amaçlı — kumar yok, bahis yok, ödül yok.",
  },
  es: {
    title: "RPS Duel — Términos de Servicio",
    description:
      "Términos de servicio de RPS Duel (com.lunexa.games.rpsduel), un juego de Piedra Papel Tijera para un solo jugador de Lunexa Games. Solo entretenimiento: sin juegos de azar, sin apuestas, sin premios.",
  },
};

export const CHESS_RESCUE_TERMS_META: PageCopy = {
  en: {
    title: "Chess Rescue — Terms of Service",
    description:
      "Terms of service for Chess Rescue (com.lunexa.games.chessrescue), a single-player offline puzzle game by Lunexa Games. Entertainment only — not a chess training or certification product.",
  },
  tr: {
    title: "Chess Rescue — Kullanım Şartları",
    description:
      "Chess Rescue için kullanım şartları (com.lunexa.games.chessrescue) — Lunexa Games tarafından geliştirilen tek oyunculu, çevrimdışı bulmaca oyunu. Yalnızca eğlence amaçlı — satranç eğitimi veya sertifikasyon ürünü değildir.",
  },
  es: {
    title: "Chess Rescue — Términos de Servicio",
    description:
      "Términos de servicio de Chess Rescue (com.lunexa.games.chessrescue), un juego de rompecabezas para un solo jugador y sin conexión de Lunexa Games. Solo entretenimiento: no es un producto de entrenamiento ni certificación de ajedrez.",
  },
};

export const QUIETLY_TERMS_META: PageCopy = {
  en: {
    title: "Quietly — Terms of Service",
    description:
      "Terms of service for Quietly, a media-saver Android app by Lunexa. Authorised use only — save only media you own or have permission to save. No rights granted to third-party media.",
  },
  tr: {
    title: "Quietly — Kullanım Şartları",
    description:
      "Quietly için kullanım şartları — Lunexa tarafından geliştirilen Android medya kaydedici uygulaması. Yalnızca yetkili kullanım — yalnızca sahibi olduğunuz veya kaydetme izniniz olan medyayı kaydedin. Üçüncü taraf medya üzerinde hak verilmez.",
  },
  es: {
    title: "Quietly — Términos de Servicio",
    description:
      "Términos de servicio de Quietly, una app Android de guardado de medios por Lunexa. Solo uso autorizado: guarda únicamente medios que te pertenezcan o tengas permiso para guardar. No se conceden derechos sobre medios de terceros.",
  },
};

export const ABOUT_META: PageCopy = {
  en: {
    title: "About Lunexa",
    description:
      "Lunexa is a digital product studio blending design craft, engineering rigor, and applied intelligence. Learn about our story, values, and how we work.",
  },
  tr: {
    title: "Hakkımızda",
    description:
      "Lunexa; tasarım zanaatını, mühendislik titizliğini ve uygulamalı zekayı birleştiren bir dijital ürün stüdyosudur. Hikayemizi, değerlerimizi ve nasıl çalıştığımızı öğrenin.",
  },
  es: {
    title: "Acerca de Lunexa",
    description:
      "Lunexa es un estudio de productos digitales que combina artesanía de diseño, rigor de ingeniería e inteligencia aplicada. Conoce nuestra historia, valores y forma de trabajar.",
  },
};

export const WORK_META: PageCopy = {
  en: {
    title: "Our Work — Lunexa Products",
    description:
      "Products from the Lunexa studio: RPS Duel, Chess Rescue and Quietly on Google Play, plus TechChefDelights, a multilingual recipe web platform.",
  },
  tr: {
    title: "İşlerimiz — Lunexa Ürünleri",
    description:
      "Lunexa stüdyosunun ürünleri: Google Play'de yayında olan RPS Duel, Chess Rescue ve Quietly ile çok dilli tarif web platformu TechChefDelights.",
  },
  es: {
    title: "Nuestro Trabajo — Productos Lunexa",
    description:
      "Productos del estudio Lunexa: RPS Duel, Chess Rescue y Quietly en Google Play, además de TechChefDelights, una plataforma web de recetas multilingüe.",
  },
};

export const SERVICES_META: PageCopy = {
  en: {
    title: "Custom Software Development Services",
    description:
      "Custom software development by Lunexa: mobile apps, web platforms, and intelligent systems. From first wireframe to production traffic, end-to-end.",
  },
  tr: {
    title: "Özel Yazılım Geliştirme Hizmetleri",
    description:
      "Lunexa'dan özel yazılım geliştirme: mobil uygulamalar, web platformları ve akıllı sistemler. İlk wireframe'den üretim trafiğine uçtan uca.",
  },
  es: {
    title: "Servicios de Desarrollo de Software a Medida",
    description:
      "Desarrollo de software a medida por Lunexa: apps móviles, plataformas web y sistemas inteligentes. Del primer wireframe al tráfico en producción, de principio a fin.",
  },
};

export const SERVICES_MOBILE_META: PageCopy = {
  en: {
    title: "Mobile App Development Agency",
    description:
      "Mobile app development agency building native and cross-platform iOS and Android apps. Swift, Kotlin, React Native — shipped with craft and performance.",
  },
  tr: {
    title: "Mobil Uygulama Geliştirme Ajansı",
    description:
      "Native ve cross-platform iOS ve Android uygulamaları geliştiren mobil uygulama ajansı. Swift, Kotlin, React Native — zanaat ve performansla teslim edilir.",
  },
  es: {
    title: "Agencia de Desarrollo de Apps Móviles",
    description:
      "Agencia de desarrollo de apps móviles construyendo apps nativas y multiplataforma para iOS y Android. Swift, Kotlin, React Native — con artesanía y rendimiento.",
  },
};

export const SERVICES_WEB_META: PageCopy = {
  en: {
    title: "Web Platform Development",
    description:
      "Web platform development with Next.js, React, and modern infrastructure. Fast, accessible, SEO-optimized — from marketing sites to complex SaaS dashboards.",
  },
  tr: {
    title: "Web Platformu Geliştirme",
    description:
      "Next.js, React ve modern altyapı ile web platformu geliştirme. Hızlı, erişilebilir, SEO uyumlu — pazarlama sitelerinden karmaşık SaaS panellerine.",
  },
  es: {
    title: "Desarrollo de Plataformas Web",
    description:
      "Desarrollo de plataformas web con Next.js, React e infraestructura moderna. Rápidas, accesibles y optimizadas para SEO — desde sitios de marketing hasta SaaS complejo.",
  },
};

export const SERVICES_INTELLIGENT_META: PageCopy = {
  en: {
    title: "AI Integration Services",
    description:
      "AI integration services for real products: LLM-powered features, retrieval augmented generation, and workflow automation. Pragmatic intelligence, shipped.",
  },
  tr: {
    title: "AI Entegrasyon Hizmetleri",
    description:
      "Gerçek ürünler için AI entegrasyon hizmetleri: LLM tabanlı özellikler, retrieval augmented generation ve iş akışı otomasyonu. Pragmatik, teslim edilen zekâ.",
  },
  es: {
    title: "Servicios de Integración de IA",
    description:
      "Servicios de integración de IA para productos reales: funciones con LLM, generación aumentada por recuperación y automatización. Inteligencia pragmática, entregada.",
  },
};

export const UPDATES_META: PageCopy = {
  en: {
    title: "Product Updates — App & Game Release Notes",
    description:
      "Release notes for Lunexa's Android apps and games on Google Play: Quietly, Chess Rescue and RPS Duel. What's new, improved and fixed in each version.",
  },
  tr: {
    title: "Ürün Güncellemeleri — Uygulama ve Oyun Sürüm Notları",
    description:
      "Lunexa'nın Google Play'deki Android uygulama ve oyunlarının sürüm notları: Quietly, Chess Rescue ve RPS Duel. Yenilikler, iyileştirmeler ve düzeltmeler.",
  },
  es: {
    title: "Actualizaciones — Notas de Versión de Apps y Juegos",
    description:
      "Notas de versión de las apps y juegos Android de Lunexa en Google Play: Quietly, Chess Rescue y RPS Duel. Qué hay de nuevo, qué mejoró y qué se corrigió.",
  },
};

export const BLOG_INDEX_META: PageCopy = {
  en: {
    title: "Blog",
    description:
      "Notes on building digital products at Lunexa — craft, tools, decisions, and lessons from the trenches.",
  },
  tr: {
    title: "Blog",
    description:
      "Lunexa'da dijital ürün geliştirmeye dair notlar — zanaat, araçlar, kararlar ve sahadan dersler.",
  },
  es: {
    title: "Blog",
    description:
      "Notas sobre cómo construir productos digitales en Lunexa — artesanía, herramientas, decisiones y lecciones desde la trinchera.",
  },
};

const OG_IMAGE = {
  url: `${BASE}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Lunexa — Digital Product Studio",
};

export function buildPageMetadata(
  locale: Locale,
  path: string,
  copy: PageCopy
): Metadata {
  const t = copy[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(path, locale),
    openGraph: {
      title: t.title,
      description: t.description,
      url: urlFor(locale, path),
      siteName: "Lunexa",
      type: "website",
      images: [OG_IMAGE],
      ...openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [OG_IMAGE.url],
    },
  };
}
