import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/i18n/config";

const BASE = "https://uselunexa.com";

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  tr: "tr_TR",
  es: "es_ES",
};

export function alternatesFor(path: string, locale: Locale) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE}/${l}${suffix}`;
  }
  languages["x-default"] = `${BASE}/en${suffix}`;

  return {
    canonical: `${BASE}/${locale}${suffix}`,
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
    title: "Lunexa — Simple, Fast, Intelligent Digital Products",
    description:
      "Lunexa is a digital product studio. We design and build mobile apps, web platforms, and intelligent systems with clarity, precision, and purpose.",
  },
  tr: {
    title: "Lunexa — Sade, Hızlı, Akıllı Dijital Ürünler",
    description:
      "Lunexa, dijital ürün stüdyosudur. Mobil uygulamalar, web platformları ve akıllı sistemleri netlik, hassasiyet ve amaçla tasarlar ve geliştiririz.",
  },
  es: {
    title: "Lunexa — Productos Digitales Simples, Rápidos e Inteligentes",
    description:
      "Lunexa es un estudio de productos digitales. Diseñamos y construimos aplicaciones móviles, plataformas web y sistemas inteligentes con claridad, precisión y propósito.",
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

export const SERVICES_META: PageCopy = {
  en: {
    title: "Services — What We Build",
    description:
      "Mobile applications, web platforms, and intelligent systems built with modern stacks and delivered with care. Explore what Lunexa can build for you.",
  },
  tr: {
    title: "Hizmetler — Neler Yapıyoruz",
    description:
      "Modern yığınlarla inşa edilmiş ve özenle teslim edilen mobil uygulamalar, web platformları ve akıllı sistemler. Lunexa'nın sizin için neler yapabileceğini keşfedin.",
  },
  es: {
    title: "Servicios — Qué Construimos",
    description:
      "Aplicaciones móviles, plataformas web y sistemas inteligentes construidos con stacks modernos y entregados con cuidado. Descubre qué puede construir Lunexa para ti.",
  },
};

export const SERVICES_MOBILE_META: PageCopy = {
  en: {
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile app development by Lunexa. iOS and Android with performance, reliability, and great UX at the core.",
  },
  tr: {
    title: "Mobil Uygulamalar",
    description:
      "Lunexa tarafından native ve cross-platform mobil uygulama geliştirme. Performans, güvenilirlik ve harika kullanıcı deneyimi merkezde olacak şekilde iOS ve Android.",
  },
  es: {
    title: "Aplicaciones Móviles",
    description:
      "Desarrollo de aplicaciones móviles nativas y multiplataforma por Lunexa. iOS y Android con rendimiento, fiabilidad y gran UX en el centro.",
  },
};

export const SERVICES_WEB_META: PageCopy = {
  en: {
    title: "Web Platforms",
    description:
      "Fast, accessible, SEO-optimized web platforms built with Next.js, React, and modern infrastructure. From marketing sites to complex SaaS.",
  },
  tr: {
    title: "Web Platformları",
    description:
      "Next.js, React ve modern altyapıyla inşa edilmiş hızlı, erişilebilir, SEO uyumlu web platformları. Pazarlama sitelerinden karmaşık SaaS'lara kadar.",
  },
  es: {
    title: "Plataformas Web",
    description:
      "Plataformas web rápidas, accesibles y optimizadas para SEO construidas con Next.js, React y infraestructura moderna. Desde sitios de marketing hasta SaaS complejo.",
  },
};

export const SERVICES_INTELLIGENT_META: PageCopy = {
  en: {
    title: "Intelligent Systems",
    description:
      "AI integrations, LLM-powered features, retrieval augmented generation, and automation. We help teams apply modern intelligence to real products.",
  },
  tr: {
    title: "Akıllı Sistemler",
    description:
      "AI entegrasyonları, LLM tabanlı özellikler, retrieval augmented generation ve otomasyon. Ekiplerin modern zekayı gerçek ürünlere uygulamasına yardımcı oluyoruz.",
  },
  es: {
    title: "Sistemas Inteligentes",
    description:
      "Integraciones de IA, funciones potenciadas por LLM, generación aumentada por recuperación y automatización. Ayudamos a los equipos a aplicar inteligencia moderna a productos reales.",
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
      url: `${BASE}/${locale}${path === "/" ? "" : path}`,
      siteName: "Lunexa",
      type: "website",
      ...openGraphLocale(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}
