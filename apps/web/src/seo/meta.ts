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

export const TERMS_META: PageCopy = {
  en: {
    title: "Terms of Use",
    description:
      "Terms and conditions for using the Lunexa website and services.",
  },
  tr: {
    title: "Kullanım Şartları",
    description: "Lunexa web sitesini ve hizmetlerini kullanma koşulları.",
  },
  es: {
    title: "Términos de Uso",
    description:
      "Términos y condiciones para usar el sitio web y los servicios de Lunexa.",
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
      "Products built by Lunexa. Real software shipped to real users — TechChefDelights and what comes next. Every project demonstrates the studio's stack and standards in production.",
  },
  tr: {
    title: "İşlerimiz — Lunexa Ürünleri",
    description:
      "Lunexa tarafından üretilen ürünler. Gerçek kullanıcılara gönderilmiş gerçek yazılımlar — TechChefDelights ve devamı. Her proje stüdyonun stack'ini ve standartlarını üretimde gösteriyor.",
  },
  es: {
    title: "Nuestro Trabajo — Productos Lunexa",
    description:
      "Productos creados por Lunexa. Software real enviado a usuarios reales — TechChefDelights y lo que viene. Cada proyecto demuestra el stack y los estándares del estudio en producción.",
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
