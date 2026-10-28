import type { Locale } from "@/i18n/config";

// Names for the BreadcrumbList JSON-LD on every page. English keeps the names
// the pages always used; Turkish and Spanish follow each page's own heading
// or nav label, so search results show breadcrumbs in the page's language.
// Product names (RPS Duel, Chess Rescue, Quietly) are never translated.
type BreadcrumbLabels = {
  home: string;
  work: string;
  services: string;
  mobile: string;
  web: string;
  intelligent: string;
  blog: string;
  about: string;
  contact: string;
  updates: string;
  privacy: string;
  terms: string;
  support: string;
};

export const BREADCRUMB_LABELS: Record<Locale, BreadcrumbLabels> = {
  en: {
    home: "Home",
    work: "Work",
    services: "Services",
    mobile: "Mobile",
    web: "Web",
    intelligent: "Intelligent Systems",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    updates: "Updates",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    support: "Support",
  },
  tr: {
    home: "Ana Sayfa",
    work: "İşlerimiz",
    services: "Hizmetler",
    mobile: "Mobil",
    web: "Web",
    intelligent: "Akıllı Sistemler",
    blog: "Blog",
    about: "Hakkımızda",
    contact: "İletişim",
    updates: "Güncellemeler",
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Şartları",
    support: "Destek",
  },
  es: {
    home: "Inicio",
    work: "Nuestro Trabajo",
    services: "Servicios",
    mobile: "Móvil",
    web: "Web",
    intelligent: "Sistemas Inteligentes",
    blog: "Blog",
    about: "Acerca de",
    contact: "Contacto",
    updates: "Actualizaciones",
    privacy: "Política de Privacidad",
    terms: "Términos de Uso",
    support: "Soporte",
  },
};
