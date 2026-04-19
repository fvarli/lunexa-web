import type { Locale } from "./config";

type Dictionary = typeof en;

const en = {
  nav: {
    about: "About",
    work: "What We Build",
    principles: "Principles",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Digital craftsmanship",
    heading_1: "Simple. Fast.",
    heading_2: "Intelligent.",
    subtitle:
      "We design and build mobile and web applications with clarity, precision, and purpose.",
    cta_primary: "Get in Touch",
    cta_secondary: "Learn More",
  },
  about: {
    eyebrow: "Our Story",
    heading: "Born from light and scale",
    paragraph_1_prefix: "Lunexa comes from ",
    paragraph_1_luna: "Luna",
    paragraph_1_mid: " — the moon, a symbol of clarity in darkness — and ",
    paragraph_1_exa: "exa",
    paragraph_1_suffix:
      ", representing exponential scale. We exist to bring calm, focused technology to a noisy world.",
    paragraph_2:
      "Every product we build starts with a single question: does this make life simpler? If it doesn't, we rethink it.",
  },
  work: {
    eyebrow: "What We Build",
    heading: "Products that move with purpose",
    items: {
      mobile_title: "Mobile Applications",
      mobile_desc:
        "Native and cross-platform apps built for performance, reliability, and delightful user experiences.",
      web_title: "Web Platforms",
      web_desc:
        "Fast, accessible, and SEO-optimized web applications that scale from startup to enterprise.",
      ai_title: "Intelligent Systems",
      ai_desc:
        "Smart integrations and automation that reduce complexity and let teams focus on what matters.",
    },
  },
  principles: {
    eyebrow: "Principles",
    heading: "Why Lunexa",
    items: {
      clarity_title: "Clarity over complexity",
      clarity_desc:
        "We believe the best software feels invisible. No clutter, no confusion — just solutions that work the way you expect.",
      speed_title: "Speed as a feature",
      speed_desc:
        "Performance is not an afterthought. Every millisecond matters. We ship fast products built on fast foundations.",
      craft_title: "Craft at every layer",
      craft_desc:
        "From database schemas to pixel-level UI details, we treat every layer of the stack with the same care and attention.",
      global_title: "Global by default",
      global_desc:
        "We build products that work for people everywhere — accessible, performant, and culturally aware from day one.",
    },
  },
  coming_soon: {
    eyebrow: "Coming Soon",
    heading: "Something new is on the horizon",
    subtitle:
      "We are preparing our first wave of products. Stay close — the launch is near.",
    badge: "In development",
  },
  contact_section: {
    eyebrow: "Contact",
    heading: "Let's talk",
    subtitle:
      "Have a project in mind or just want to say hello? We'd love to hear from you.",
  },
  contact_page: {
    eyebrow: "Contact",
    heading: "Let's build something together",
    subtitle:
      "Whether you have a project in mind, a question about our work, or just want to say hello — we'd love to hear from you.",
    email_heading: "Email",
    support_heading: "For support",
    response_heading: "Response time",
    response_time: "We typically respond within one business day.",
    agreement_prefix: "By contacting us you agree to our ",
    privacy_link: "Privacy Policy",
    agreement_suffix: ".",
  },
  form: {
    name_label: "Name",
    name_placeholder: "Your name",
    email_label: "Email",
    email_placeholder: "you@example.com",
    message_label: "Message",
    message_placeholder: "Tell us about your project...",
    submit: "Send Message",
    submitting: "Sending...",
    success_title: "Message sent",
    success_body: "Thank you for reaching out. We'll get back to you soon.",
    send_another: "Send another message",
    errors: {
      name_min: "Name must be at least 2 characters",
      name_max: "Name must be at most 80 characters",
      email_required: "Email is required",
      message_min: "Message must be at least 10 characters",
      message_max: "Message must be at most 2000 characters",
      fix_above: "Please fix the errors above and try again.",
      network: "Could not reach the server. Please check your connection and try again.",
      rate_limit: "Too many requests. Please wait a few minutes.",
      captcha_required: "Please complete the captcha before submitting.",
      unexpected: "Received an unexpected response from the server.",
      generic: "Something went wrong. Please try again.",
    },
  },
  footer: {
    copyright: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
  cookie: {
    title: "Cookie Notice",
    description_prefix:
      "We use cookies to give you a better experience. Necessary cookies are required for the site to function. You can manage analytics and marketing cookies according to your preferences. For more information, see our ",
    privacy_link: "Privacy Policy",
    description_suffix: ".",
    necessary_title: "Necessary cookies",
    necessary_desc: "Required for core site functionality. Cannot be disabled.",
    analytics_title: "Analytics cookies",
    analytics_desc: "For page performance and usage statistics.",
    marketing_title: "Marketing cookies",
    marketing_desc: "For personalized content and advertising.",
    accept_all: "Accept All",
    reject: "Reject",
    manage: "Manage Preferences",
    save: "Save Preferences",
  },
  language: {
    switcher_label: "Language",
  },
};

const tr: Dictionary = {
  nav: {
    about: "Hakkımızda",
    work: "Neler Yapıyoruz",
    principles: "İlkelerimiz",
    contact: "İletişim",
  },
  hero: {
    eyebrow: "Dijital zanaat",
    heading_1: "Sade. Hızlı.",
    heading_2: "Akıllı.",
    subtitle:
      "Mobil ve web uygulamalarını netlik, hassasiyet ve amaçla tasarlar ve geliştiririz.",
    cta_primary: "İletişime Geç",
    cta_secondary: "Daha Fazla",
  },
  about: {
    eyebrow: "Hikayemiz",
    heading: "Işıktan ve ölçekten doğdu",
    paragraph_1_prefix: "Lunexa, ",
    paragraph_1_luna: "Luna",
    paragraph_1_mid:
      " — karanlıkta netliğin simgesi olan ay — ve üstel ölçeği temsil eden ",
    paragraph_1_exa: "exa",
    paragraph_1_suffix:
      " kelimelerinden geliyor. Gürültülü bir dünyaya sakin, odaklı teknoloji getirmek için varız.",
    paragraph_2:
      "Geliştirdiğimiz her ürün tek bir soruyla başlar: bu hayatı daha basit hale getiriyor mu? Eğer getirmiyorsa, yeniden düşünürüz.",
  },
  work: {
    eyebrow: "Neler Yapıyoruz",
    heading: "Amaç taşıyan ürünler",
    items: {
      mobile_title: "Mobil Uygulamalar",
      mobile_desc:
        "Performans, güvenilirlik ve keyifli kullanıcı deneyimi için geliştirilmiş native ve cross-platform uygulamalar.",
      web_title: "Web Platformları",
      web_desc:
        "Startup'tan kurumsala ölçeklenen, hızlı, erişilebilir ve SEO uyumlu web uygulamaları.",
      ai_title: "Akıllı Sistemler",
      ai_desc:
        "Karmaşıklığı azaltan ve ekiplerin önemli olana odaklanmasını sağlayan akıllı entegrasyonlar ve otomasyon.",
    },
  },
  principles: {
    eyebrow: "İlkelerimiz",
    heading: "Neden Lunexa",
    items: {
      clarity_title: "Karmaşa yerine netlik",
      clarity_desc:
        "En iyi yazılımın hissettirmeyen yazılım olduğuna inanırız. Dağınıklık yok, karışıklık yok — sadece beklediğiniz gibi çalışan çözümler.",
      speed_title: "Bir özellik olarak hız",
      speed_desc:
        "Performans sonradan düşünülecek bir şey değil. Her milisaniye önemli. Hızlı ürünleri hızlı temeller üzerine inşa ederiz.",
      craft_title: "Her katmanda zanaat",
      craft_desc:
        "Veritabanı şemalarından pixel seviyesindeki arayüz detaylarına kadar, her katmana aynı özen ve dikkatle yaklaşırız.",
      global_title: "Doğduğu gün global",
      global_desc:
        "Her yerdeki insanlar için çalışan ürünler geliştiririz — ilk günden erişilebilir, performanslı ve kültürel farkındalık taşıyan.",
    },
  },
  coming_soon: {
    eyebrow: "Çok Yakında",
    heading: "Ufukta yeni bir şey var",
    subtitle:
      "İlk ürün dalgamızı hazırlıyoruz. Yakın durun — lansman yaklaştı.",
    badge: "Geliştirme aşamasında",
  },
  contact_section: {
    eyebrow: "İletişim",
    heading: "Konuşalım",
    subtitle:
      "Aklınızda bir proje var mı ya da sadece merhaba demek mi istiyorsunuz? Sizi duymayı çok isteriz.",
  },
  contact_page: {
    eyebrow: "İletişim",
    heading: "Birlikte bir şey inşa edelim",
    subtitle:
      "İster aklınızda bir proje olsun, ister çalışmalarımız hakkında bir sorunuz olsun, ister sadece merhaba demek isteyin — sizi duymayı çok isteriz.",
    email_heading: "E-posta",
    support_heading: "Destek için",
    response_heading: "Yanıt süresi",
    response_time: "Genellikle bir iş günü içinde yanıtlıyoruz.",
    agreement_prefix: "Bize ulaşarak ",
    privacy_link: "Gizlilik Politikası",
    agreement_suffix: "'nı kabul etmiş olursunuz.",
  },
  form: {
    name_label: "İsim",
    name_placeholder: "Adınız",
    email_label: "E-posta",
    email_placeholder: "siz@ornek.com",
    message_label: "Mesaj",
    message_placeholder: "Projenizden bahsedin...",
    submit: "Mesaj Gönder",
    submitting: "Gönderiliyor...",
    success_title: "Mesajınız gönderildi",
    success_body: "Bize ulaştığınız için teşekkürler. Kısa süre içinde dönüş yapacağız.",
    send_another: "Başka bir mesaj gönder",
    errors: {
      name_min: "İsim en az 2 karakter olmalı",
      name_max: "İsim en fazla 80 karakter olabilir",
      email_required: "E-posta zorunlu",
      message_min: "Mesaj en az 10 karakter olmalı",
      message_max: "Mesaj en fazla 2000 karakter olabilir",
      fix_above: "Lütfen yukarıdaki hataları düzeltin ve tekrar deneyin.",
      network: "Sunucuya ulaşılamadı. Bağlantınızı kontrol edip tekrar deneyin.",
      rate_limit: "Çok fazla istek gönderildi. Birkaç dakika sonra tekrar deneyin.",
      captcha_required: "Göndermeden önce doğrulamayı tamamlayın.",
      unexpected: "Sunucudan beklenmeyen bir yanıt alındı.",
      generic: "Bir şeyler ters gitti. Tekrar deneyin.",
    },
  },
  footer: {
    copyright: "Tüm hakları saklıdır.",
    privacy: "Gizlilik",
    terms: "Şartlar",
  },
  cookie: {
    title: "Çerez Bildirimi",
    description_prefix:
      "Size daha iyi bir deneyim sunmak için çerezler kullanıyoruz. Zorunlu çerezler sitenin çalışması için gereklidir. Analitik ve pazarlama çerezlerini tercihlerinize göre yönetebilirsiniz. Detaylı bilgi için ",
    privacy_link: "Gizlilik Politikası",
    description_suffix: " sayfamızı inceleyebilirsiniz.",
    necessary_title: "Zorunlu çerezler",
    necessary_desc: "Sitenin temel işlevleri için gereklidir. Devre dışı bırakılamaz.",
    analytics_title: "Analitik çerezler",
    analytics_desc: "Sayfa performansı ve kullanım istatistikleri için.",
    marketing_title: "Pazarlama çerezleri",
    marketing_desc: "Kişiselleştirilmiş içerik ve reklam için.",
    accept_all: "Tümünü Kabul Et",
    reject: "Reddet",
    manage: "Tercihleri Yönet",
    save: "Tercihleri Kaydet",
  },
  language: {
    switcher_label: "Dil",
  },
};

const es: Dictionary = {
  nav: {
    about: "Nosotros",
    work: "Qué Hacemos",
    principles: "Principios",
    contact: "Contacto",
  },
  hero: {
    eyebrow: "Artesanía digital",
    heading_1: "Simple. Rápido.",
    heading_2: "Inteligente.",
    subtitle:
      "Diseñamos y construimos aplicaciones móviles y web con claridad, precisión y propósito.",
    cta_primary: "Contactar",
    cta_secondary: "Saber Más",
  },
  about: {
    eyebrow: "Nuestra Historia",
    heading: "Nacido de la luz y la escala",
    paragraph_1_prefix: "Lunexa viene de ",
    paragraph_1_luna: "Luna",
    paragraph_1_mid:
      " — símbolo de claridad en la oscuridad — y ",
    paragraph_1_exa: "exa",
    paragraph_1_suffix:
      ", que representa la escala exponencial. Existimos para aportar tecnología tranquila y enfocada a un mundo ruidoso.",
    paragraph_2:
      "Cada producto que construimos empieza con una pregunta: ¿hace la vida más simple? Si no lo hace, lo replanteamos.",
  },
  work: {
    eyebrow: "Qué Hacemos",
    heading: "Productos con propósito",
    items: {
      mobile_title: "Aplicaciones Móviles",
      mobile_desc:
        "Apps nativas y multiplataforma construidas para el rendimiento, la fiabilidad y experiencias de usuario agradables.",
      web_title: "Plataformas Web",
      web_desc:
        "Aplicaciones web rápidas, accesibles y optimizadas para SEO que escalan desde startup hasta empresa.",
      ai_title: "Sistemas Inteligentes",
      ai_desc:
        "Integraciones y automatización inteligentes que reducen la complejidad y permiten a los equipos centrarse en lo importante.",
    },
  },
  principles: {
    eyebrow: "Principios",
    heading: "Por qué Lunexa",
    items: {
      clarity_title: "Claridad sobre complejidad",
      clarity_desc:
        "Creemos que el mejor software se siente invisible. Sin desorden, sin confusión — solo soluciones que funcionan como esperas.",
      speed_title: "La velocidad como característica",
      speed_desc:
        "El rendimiento no es algo secundario. Cada milisegundo importa. Creamos productos rápidos sobre cimientos rápidos.",
      craft_title: "Artesanía en cada capa",
      craft_desc:
        "Desde los esquemas de base de datos hasta los detalles de UI a nivel de píxel, tratamos cada capa con el mismo cuidado y atención.",
      global_title: "Global por defecto",
      global_desc:
        "Construimos productos que funcionan para todos — accesibles, eficientes y culturalmente conscientes desde el primer día.",
    },
  },
  coming_soon: {
    eyebrow: "Próximamente",
    heading: "Algo nuevo en el horizonte",
    subtitle:
      "Estamos preparando nuestra primera ola de productos. Mantente cerca — el lanzamiento está próximo.",
    badge: "En desarrollo",
  },
  contact_section: {
    eyebrow: "Contacto",
    heading: "Hablemos",
    subtitle:
      "¿Tienes un proyecto en mente o solo quieres saludar? Nos encantaría saber de ti.",
  },
  contact_page: {
    eyebrow: "Contacto",
    heading: "Construyamos algo juntos",
    subtitle:
      "Ya sea que tengas un proyecto en mente, una pregunta sobre nuestro trabajo o solo quieras saludar — nos encantaría saber de ti.",
    email_heading: "Correo",
    support_heading: "Para soporte",
    response_heading: "Tiempo de respuesta",
    response_time: "Normalmente respondemos en un día laborable.",
    agreement_prefix: "Al contactarnos aceptas nuestra ",
    privacy_link: "Política de Privacidad",
    agreement_suffix: ".",
  },
  form: {
    name_label: "Nombre",
    name_placeholder: "Tu nombre",
    email_label: "Correo",
    email_placeholder: "tu@ejemplo.com",
    message_label: "Mensaje",
    message_placeholder: "Cuéntanos sobre tu proyecto...",
    submit: "Enviar Mensaje",
    submitting: "Enviando...",
    success_title: "Mensaje enviado",
    success_body: "Gracias por contactarnos. Responderemos pronto.",
    send_another: "Enviar otro mensaje",
    errors: {
      name_min: "El nombre debe tener al menos 2 caracteres",
      name_max: "El nombre debe tener máximo 80 caracteres",
      email_required: "El correo es obligatorio",
      message_min: "El mensaje debe tener al menos 10 caracteres",
      message_max: "El mensaje debe tener máximo 2000 caracteres",
      fix_above: "Corrige los errores de arriba e inténtalo de nuevo.",
      network: "No se pudo contactar con el servidor. Comprueba tu conexión.",
      rate_limit: "Demasiadas solicitudes. Espera unos minutos.",
      captcha_required: "Completa el captcha antes de enviar.",
      unexpected: "Respuesta inesperada del servidor.",
      generic: "Algo salió mal. Inténtalo de nuevo.",
    },
  },
  footer: {
    copyright: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
  },
  cookie: {
    title: "Aviso de Cookies",
    description_prefix:
      "Usamos cookies para ofrecerte una mejor experiencia. Las cookies necesarias son indispensables para el funcionamiento del sitio. Puedes gestionar las cookies de análisis y marketing según tus preferencias. Para más información, consulta nuestra ",
    privacy_link: "Política de Privacidad",
    description_suffix: ".",
    necessary_title: "Cookies necesarias",
    necessary_desc: "Requeridas para el funcionamiento básico. No se pueden desactivar.",
    analytics_title: "Cookies de análisis",
    analytics_desc: "Para rendimiento del sitio y estadísticas de uso.",
    marketing_title: "Cookies de marketing",
    marketing_desc: "Para contenido personalizado y publicidad.",
    accept_all: "Aceptar Todo",
    reject: "Rechazar",
    manage: "Gestionar Preferencias",
    save: "Guardar Preferencias",
  },
  language: {
    switcher_label: "Idioma",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, tr, es };
export type { Dictionary };
