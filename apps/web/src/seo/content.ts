import type { Locale } from "@/i18n/config";

/**
 * Long-form content for non-homepage pages. Kept here (not in dictionaries.ts)
 * because it is page-scoped rather than UI-scoped, and the chunks are long
 * enough that mixing them with navigation labels would be noisy.
 */

type AboutContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  story: {
    title: string;
    paragraphs: string[];
  };
  philosophy: {
    title: string;
    items: { title: string; body: string }[];
  };
  cta_lead: string;
  cta_button: string;
};

type ServicesIndexContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  items: {
    slug: "mobile" | "web" | "intelligent";
    title: string;
    body: string;
    link_label: string;
  }[];
};

type ServiceDetailContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  audience_title: string;
  audience_body: string;
  delivery_title: string;
  delivery_items: string[];
  process_title: string;
  process_items: string[];
  cta_lead: string;
  cta_button: string;
};

type BlogIndexContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  empty: string;
};

type CtaBlockContent = {
  heading: string;
  body: string;
  button: string;
};

type RelatedServicesContent = {
  heading: string;
  back_label: string;
};

type AppPrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type AppPrivacyContent = {
  eyebrow: string;
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: AppPrivacySection[];
  contactTitle: string;
  contactBodyPrefix: string;
  contactBodySuffix: string;
};

// ── About ──

export const ABOUT: Record<Locale, AboutContent> = {
  en: {
    eyebrow: "About Lunexa",
    heading: "We build software that feels inevitable",
    lead:
      "Lunexa is a small digital product studio. We design, engineer, and ship mobile apps, web platforms, and intelligent systems for teams who care about how their software feels as much as what it does.",
    story: {
      title: "Our story",
      paragraphs: [
        "Lunexa was founded on a single idea: software should feel like it was always supposed to exist. The name pairs Luna — a symbol of clarity in darkness — with exa, for exponential scale. It is the guiding tension of our work: human-scale craft, global-scale reach.",
        "We came out of years spent building products inside agencies and startups — sometimes shipping breakthroughs, often watching thoughtful work get diluted by process. Lunexa exists to do the opposite: small teams, sharp decisions, durable outcomes.",
        "Today we help founders, product leaders, and growing companies turn ambitious ideas into working software. Every project is led end-to-end by senior practitioners, not a handoff chain.",
      ],
    },
    philosophy: {
      title: "How we work",
      items: [
        {
          title: "Clarity over complexity",
          body: "The best software feels invisible. We spend disproportionate effort removing what doesn't belong before adding what does.",
        },
        {
          title: "Speed as a feature",
          body: "Performance is not an afterthought. Every millisecond and every kilobyte is a product decision.",
        },
        {
          title: "Craft at every layer",
          body: "Database schemas, API contracts, pixel-level UI — we treat the whole stack as one deliverable.",
        },
        {
          title: "Accountable ownership",
          body: "We commit to outcomes, not tickets. If a release misses, we own the fix, not the excuse.",
        },
      ],
    },
    cta_lead: "Have a project in mind?",
    cta_button: "Let's talk",
  },
  tr: {
    eyebrow: "Lunexa Hakkında",
    heading: "Kaçınılmaz hissettiren yazılımlar yapıyoruz",
    lead:
      "Lunexa küçük bir dijital ürün stüdyosudur. Yazılımın ne yaptığı kadar nasıl hissettirdiğine de önem veren ekipler için mobil uygulamalar, web platformları ve akıllı sistemler tasarlar, geliştirir ve teslim ederiz.",
    story: {
      title: "Hikayemiz",
      paragraphs: [
        "Lunexa tek bir fikir üzerine kuruldu: yazılım, sanki hep var olmalıymış gibi hissettirmeli. İsim; karanlıkta netliğin simgesi Luna ile üstel ölçeği temsil eden exa'yı birleştiriyor. Bu, işimizin yönlendirici gerilimidir: insan ölçeğinde zanaat, küresel ölçekte erişim.",
        "Ajanslar ve startup'larda ürün geliştirerek geçen yılların birikimiyle çıktık — bazen çığır açan işler teslim ederken, çoğu zaman özenli çalışmanın süreçle seyreltildiğini gördük. Lunexa bunun tersini yapmak için var: küçük ekipler, keskin kararlar, kalıcı sonuçlar.",
        "Bugün kurucuların, ürün liderlerinin ve büyüyen şirketlerin iddialı fikirlerini çalışan yazılıma dönüştürmelerine yardımcı oluyoruz. Her proje uçtan uca kıdemli uygulayıcılar tarafından yürütülür, teslim zinciri değil.",
      ],
    },
    philosophy: {
      title: "Nasıl çalışıyoruz",
      items: [
        {
          title: "Karmaşa yerine netlik",
          body: "En iyi yazılım görünmez hissettirir. Eklemeden önce, ait olmayanı çıkarmak için orantısız çaba harcarız.",
        },
        {
          title: "Bir özellik olarak hız",
          body: "Performans sonradan düşünülecek bir şey değil. Her milisaniye ve her kilobayt bir ürün kararıdır.",
        },
        {
          title: "Her katmanda zanaat",
          body: "Veritabanı şemaları, API sözleşmeleri, piksel seviyesinde arayüz — tüm yığını tek bir teslimat olarak görürüz.",
        },
        {
          title: "Sahiplenen sorumluluk",
          body: "Biz tickets'a değil sonuçlara taahhüt ederiz. Bir sürüm ıskalarsa bahaneyi değil, düzeltmeyi üstleniriz.",
        },
      ],
    },
    cta_lead: "Aklınızda bir proje mi var?",
    cta_button: "Konuşalım",
  },
  es: {
    eyebrow: "Acerca de Lunexa",
    heading: "Construimos software que se siente inevitable",
    lead:
      "Lunexa es un pequeño estudio de productos digitales. Diseñamos, desarrollamos y entregamos aplicaciones móviles, plataformas web y sistemas inteligentes para equipos a los que les importa tanto cómo se siente su software como lo que hace.",
    story: {
      title: "Nuestra historia",
      paragraphs: [
        "Lunexa se fundó sobre una sola idea: el software debería sentirse como si siempre hubiera tenido que existir. El nombre combina Luna — símbolo de claridad en la oscuridad — con exa, por la escala exponencial. Es la tensión que guía nuestro trabajo: artesanía a escala humana, alcance a escala global.",
        "Salimos de años construyendo productos dentro de agencias y startups — a veces entregando avances, a menudo viendo cómo un trabajo cuidadoso se diluía en procesos. Lunexa existe para hacer lo contrario: equipos pequeños, decisiones afiladas, resultados duraderos.",
        "Hoy ayudamos a fundadores, líderes de producto y empresas en crecimiento a convertir ideas ambiciosas en software funcional. Cada proyecto lo lidera de principio a fin un profesional sénior, no una cadena de entregas.",
      ],
    },
    philosophy: {
      title: "Cómo trabajamos",
      items: [
        {
          title: "Claridad sobre complejidad",
          body: "El mejor software se siente invisible. Gastamos un esfuerzo desproporcionado en eliminar lo que no pertenece antes de añadir lo que sí.",
        },
        {
          title: "La velocidad como característica",
          body: "El rendimiento no es algo secundario. Cada milisegundo y cada kilobyte es una decisión de producto.",
        },
        {
          title: "Artesanía en cada capa",
          body: "Esquemas de base de datos, contratos de API, detalles a nivel de píxel — tratamos todo el stack como un único entregable.",
        },
        {
          title: "Responsabilidad asumida",
          body: "Nos comprometemos con resultados, no con tickets. Si una entrega falla, asumimos la solución, no la excusa.",
        },
      ],
    },
    cta_lead: "¿Tienes un proyecto en mente?",
    cta_button: "Hablemos",
  },
};

// ── Services index ──

export const SERVICES_INDEX: Record<Locale, ServicesIndexContent> = {
  en: {
    eyebrow: "Services",
    heading: "What we build",
    lead:
      "Three disciplines, one team. We ship mobile apps, web platforms, and AI-powered systems end-to-end — from first wireframe to production traffic.",
    items: [
      {
        slug: "mobile",
        title: "Mobile Applications",
        body: "iOS and Android apps that feel native, load fast, and survive real-world networks. Swift, Kotlin, React Native, Expo.",
        link_label: "Explore mobile",
      },
      {
        slug: "web",
        title: "Web Platforms",
        body: "Marketing sites, SaaS dashboards, content platforms. Next.js, React 19, Tailwind, edge-first deployment.",
        link_label: "Explore web",
      },
      {
        slug: "intelligent",
        title: "Intelligent Systems",
        body: "LLM-powered product features, retrieval augmented generation, workflow automation. Pragmatic AI, not demoware.",
        link_label: "Explore intelligent systems",
      },
    ],
  },
  tr: {
    eyebrow: "Hizmetler",
    heading: "Neler yapıyoruz",
    lead:
      "Üç disiplin, tek ekip. İlk wireframe'den üretim trafiğine kadar mobil uygulamalar, web platformları ve AI destekli sistemler teslim ederiz.",
    items: [
      {
        slug: "mobile",
        title: "Mobil Uygulamalar",
        body: "Native hissettiren, hızlı yüklenen ve gerçek dünya ağlarında ayakta kalan iOS ve Android uygulamaları. Swift, Kotlin, React Native, Expo.",
        link_label: "Mobili keşfedin",
      },
      {
        slug: "web",
        title: "Web Platformları",
        body: "Pazarlama siteleri, SaaS panelleri, içerik platformları. Next.js, React 19, Tailwind, edge-first deployment.",
        link_label: "Web'i keşfedin",
      },
      {
        slug: "intelligent",
        title: "Akıllı Sistemler",
        body: "LLM destekli ürün özellikleri, retrieval augmented generation, iş akışı otomasyonu. Gösterişli demolar değil, pragmatik AI.",
        link_label: "Akıllı sistemleri keşfedin",
      },
    ],
  },
  es: {
    eyebrow: "Servicios",
    heading: "Qué construimos",
    lead:
      "Tres disciplinas, un equipo. Entregamos aplicaciones móviles, plataformas web y sistemas con IA de principio a fin — del primer wireframe al tráfico en producción.",
    items: [
      {
        slug: "mobile",
        title: "Aplicaciones Móviles",
        body: "Apps para iOS y Android que se sienten nativas, cargan rápido y sobreviven a redes del mundo real. Swift, Kotlin, React Native, Expo.",
        link_label: "Explorar móvil",
      },
      {
        slug: "web",
        title: "Plataformas Web",
        body: "Sitios de marketing, dashboards SaaS, plataformas de contenido. Next.js, React 19, Tailwind, despliegue edge-first.",
        link_label: "Explorar web",
      },
      {
        slug: "intelligent",
        title: "Sistemas Inteligentes",
        body: "Funciones de producto con LLM, generación aumentada por recuperación, automatización de flujos. IA pragmática, no demos.",
        link_label: "Explorar sistemas inteligentes",
      },
    ],
  },
};

// ── Service detail (3 offerings) ──

export const SERVICE_MOBILE: Record<Locale, ServiceDetailContent> = {
  en: {
    eyebrow: "Services · Mobile",
    heading: "Mobile Applications",
    lead:
      "Ship a mobile product people want to keep on their home screen. We build native and cross-platform apps for startups, product teams, and established companies.",
    audience_title: "Who it's for",
    audience_body:
      "Founders validating an app-first idea. Product teams replacing a slow legacy app. Companies bringing an existing web product to iOS and Android.",
    delivery_title: "What we deliver",
    delivery_items: [
      "iOS (Swift) and Android (Kotlin) when platform-specific performance matters",
      "React Native / Expo when shared codebase and iteration speed matter more",
      "Offline-first sync, push notifications, deep links, biometrics",
      "CI, automated release pipelines, App Store and Play Store submissions",
      "Crash reporting, analytics, feature flags wired in from day one",
    ],
    process_title: "How we work",
    process_items: [
      "Discovery — align on users, constraints, and success metrics",
      "Design sprint — interactive prototype before a line of production code",
      "Incremental build — working app within two weeks, weekly stakeholder demos",
      "Production launch — monitored release, iteration backlog already scoped",
    ],
    cta_lead: "Planning a mobile launch?",
    cta_button: "Start a conversation",
  },
  tr: {
    eyebrow: "Hizmetler · Mobil",
    heading: "Mobil Uygulamalar",
    lead:
      "İnsanların ana ekranında tutmak isteyeceği bir mobil ürün teslim edin. Startup'lar, ürün ekipleri ve kurumsal şirketler için native ve cross-platform uygulamalar geliştiriyoruz.",
    audience_title: "Kimler için",
    audience_body:
      "App odaklı bir fikri doğrulayan kurucular. Yavaş legacy uygulamasını değiştiren ürün ekipleri. Mevcut web ürününü iOS ve Android'e taşıyan şirketler.",
    delivery_title: "Neler teslim ediyoruz",
    delivery_items: [
      "Platforma özgü performans önemli olduğunda iOS (Swift) ve Android (Kotlin)",
      "Paylaşılan kod tabanı ve iterasyon hızı önemliyse React Native / Expo",
      "Offline-first senkronizasyon, push bildirimler, deep link'ler, biyometri",
      "CI, otomatik release pipeline'ları, App Store ve Play Store gönderimleri",
      "İlk günden entegre crash raporlama, analitik, feature flag",
    ],
    process_title: "Nasıl çalışıyoruz",
    process_items: [
      "Keşif — kullanıcılar, kısıtlar ve başarı metrikleri üzerinde hizalanma",
      "Tasarım sprintı — tek satır prodüksiyon kodundan önce etkileşimli prototip",
      "Artırımlı geliştirme — iki hafta içinde çalışan uygulama, haftalık paydaş demoları",
      "Prodüksiyon lansmanı — izlenen sürüm, iterasyon backlog'u zaten kapsamlandı",
    ],
    cta_lead: "Mobil lansman mı planlıyorsunuz?",
    cta_button: "Sohbete başlayın",
  },
  es: {
    eyebrow: "Servicios · Móvil",
    heading: "Aplicaciones Móviles",
    lead:
      "Entrega un producto móvil que la gente quiera conservar en su pantalla de inicio. Construimos apps nativas y multiplataforma para startups, equipos de producto y empresas consolidadas.",
    audience_title: "Para quién es",
    audience_body:
      "Fundadores validando una idea app-first. Equipos de producto reemplazando una app legacy lenta. Empresas llevando un producto web existente a iOS y Android.",
    delivery_title: "Qué entregamos",
    delivery_items: [
      "iOS (Swift) y Android (Kotlin) cuando importa el rendimiento específico de plataforma",
      "React Native / Expo cuando importan más el código compartido y la velocidad de iteración",
      "Sincronización offline-first, notificaciones push, deep links, biometría",
      "CI, pipelines de release automatizados, envíos a App Store y Play Store",
      "Reporte de crashes, analítica y feature flags conectados desde el día uno",
    ],
    process_title: "Cómo trabajamos",
    process_items: [
      "Descubrimiento — alinearse en usuarios, restricciones y métricas de éxito",
      "Sprint de diseño — prototipo interactivo antes de una línea de código de producción",
      "Build incremental — app funcionando en dos semanas, demos semanales a stakeholders",
      "Lanzamiento a producción — release monitorizado, backlog de iteración ya planificado",
    ],
    cta_lead: "¿Planeas un lanzamiento móvil?",
    cta_button: "Iniciar conversación",
  },
};

export const SERVICE_WEB: Record<Locale, ServiceDetailContent> = {
  en: {
    eyebrow: "Services · Web",
    heading: "Web Platforms",
    lead:
      "Build the web product your brand deserves. We ship performance-first web platforms — marketing sites, SaaS dashboards, content hubs — on Next.js and modern infrastructure.",
    audience_title: "Who it's for",
    audience_body:
      "Companies upgrading from a legacy CMS. Startups shipping their first SaaS interface. Teams that want their product to feel as crafted as their pitch deck.",
    delivery_title: "What we deliver",
    delivery_items: [
      "Next.js 16 App Router with server components, streaming, and edge caching",
      "Tailwind CSS design system tuned to your brand, not template kitsch",
      "Auth, billing, roles, admin tooling — integrated, not bolted on",
      "SEO-first architecture: metadata, structured data, sitemap, hreflang",
      "Lighthouse 95+ on every core page as a shipping contract",
    ],
    process_title: "How we work",
    process_items: [
      "Foundations — strategy, information architecture, design tokens",
      "Design — component library + page compositions in Figma",
      "Build — weekly production deploys behind feature flags",
      "Launch — SEO migration plan, monitoring, handover docs",
    ],
    cta_lead: "Ready to ship something beautiful?",
    cta_button: "Start a conversation",
  },
  tr: {
    eyebrow: "Hizmetler · Web",
    heading: "Web Platformları",
    lead:
      "Markanızın hak ettiği web ürününü inşa edin. Pazarlama siteleri, SaaS panelleri, içerik merkezleri — Next.js ve modern altyapı üzerinde performans odaklı web platformları teslim ederiz.",
    audience_title: "Kimler için",
    audience_body:
      "Legacy CMS'den yükselten şirketler. İlk SaaS arayüzünü çıkaran startup'lar. Ürününün pitch deck'i kadar özenli hissettirmesini isteyen ekipler.",
    delivery_title: "Neler teslim ediyoruz",
    delivery_items: [
      "Server components, streaming ve edge caching ile Next.js 16 App Router",
      "Template klişelerine değil markanıza ayarlanmış Tailwind CSS tasarım sistemi",
      "Auth, faturalama, roller, admin araçları — sonradan eklenen değil entegre",
      "SEO odaklı mimari: metadata, structured data, sitemap, hreflang",
      "Her ana sayfada teslim sözleşmesi olarak Lighthouse 95+",
    ],
    process_title: "Nasıl çalışıyoruz",
    process_items: [
      "Temeller — strateji, bilgi mimarisi, design token'lar",
      "Tasarım — Figma'da component kütüphanesi + sayfa kompozisyonları",
      "Geliştirme — feature flag'lerin arkasında haftalık prodüksiyon deploy'ları",
      "Lansman — SEO migrasyon planı, monitoring, devir dokümanları",
    ],
    cta_lead: "Güzel bir şey teslim etmeye hazır mısınız?",
    cta_button: "Sohbete başlayın",
  },
  es: {
    eyebrow: "Servicios · Web",
    heading: "Plataformas Web",
    lead:
      "Construye el producto web que tu marca merece. Entregamos plataformas web con rendimiento prioritario — sitios de marketing, dashboards SaaS, hubs de contenido — sobre Next.js e infraestructura moderna.",
    audience_title: "Para quién es",
    audience_body:
      "Empresas migrando desde un CMS legacy. Startups lanzando su primera interfaz SaaS. Equipos que quieren que su producto se sienta tan cuidado como su pitch deck.",
    delivery_title: "Qué entregamos",
    delivery_items: [
      "Next.js 16 App Router con server components, streaming y caching en el edge",
      "Sistema de diseño Tailwind CSS afinado a tu marca, no a un template",
      "Auth, facturación, roles, herramientas de admin — integrados, no pegados",
      "Arquitectura SEO-first: metadata, datos estructurados, sitemap, hreflang",
      "Lighthouse 95+ en cada página clave como contrato de entrega",
    ],
    process_title: "Cómo trabajamos",
    process_items: [
      "Fundamentos — estrategia, arquitectura de información, design tokens",
      "Diseño — biblioteca de componentes + composiciones de página en Figma",
      "Construcción — deploys semanales a producción detrás de feature flags",
      "Lanzamiento — plan de migración SEO, monitoreo, documentación de entrega",
    ],
    cta_lead: "¿Listo para entregar algo hermoso?",
    cta_button: "Iniciar conversación",
  },
};

export const SERVICE_INTELLIGENT: Record<Locale, ServiceDetailContent> = {
  en: {
    eyebrow: "Services · Intelligent",
    heading: "Intelligent Systems",
    lead:
      "AI that ships. We integrate language models, vector search, and automation into real products — with evals, observability, and guardrails from day one.",
    audience_title: "Who it's for",
    audience_body:
      "Product teams adding AI features without sacrificing reliability. Founders building an AI-native product from scratch. Ops teams automating knowledge work.",
    delivery_title: "What we deliver",
    delivery_items: [
      "LLM-powered product features (chat, summarization, classification, extraction)",
      "Retrieval Augmented Generation with real embeddings and real evals",
      "Workflow automation connecting LLMs to your existing tools and data",
      "Prompt versioning, evaluation harnesses, cost + latency observability",
      "Fallback strategies — your product stays working when the model doesn't",
    ],
    process_title: "How we work",
    process_items: [
      "Scoping — frame the problem in terms of user outcomes, not model choice",
      "Eval-first — define success before a prompt is written",
      "Iteration — tight loop of prompt, eval, ship, measure",
      "Productionization — rate limits, caching, observability, cost guards",
    ],
    cta_lead: "Want AI that actually ships?",
    cta_button: "Start a conversation",
  },
  tr: {
    eyebrow: "Hizmetler · Akıllı",
    heading: "Akıllı Sistemler",
    lead:
      "Üretime giden AI. Dil modellerini, vektör aramayı ve otomasyonu gerçek ürünlere entegre ederiz — ilk günden eval'lar, observability ve guardrail'lerle.",
    audience_title: "Kimler için",
    audience_body:
      "Güvenilirlikten ödün vermeden AI özellikleri ekleyen ürün ekipleri. Sıfırdan AI-native ürün inşa eden kurucular. Bilgi işini otomatikleştiren operasyon ekipleri.",
    delivery_title: "Neler teslim ediyoruz",
    delivery_items: [
      "LLM destekli ürün özellikleri (sohbet, özetleme, sınıflandırma, veri çıkarma)",
      "Gerçek embedding'ler ve gerçek eval'larla Retrieval Augmented Generation",
      "LLM'leri mevcut araçlarınıza ve verilerinize bağlayan iş akışı otomasyonu",
      "Prompt versiyonlama, evaluation harness'ları, cost + latency observability",
      "Fallback stratejileri — model çalışmadığında ürününüz çalışmaya devam eder",
    ],
    process_title: "Nasıl çalışıyoruz",
    process_items: [
      "Kapsamlama — problemi model seçimi değil kullanıcı sonuçları cinsinden çerçeveleyin",
      "Eval-first — bir prompt yazılmadan önce başarı tanımlanır",
      "İterasyon — prompt, eval, teslim, ölç döngüsü",
      "Prodüksiyonlaştırma — rate limit'ler, caching, observability, maliyet koruması",
    ],
    cta_lead: "Gerçekten üretime giden AI mı istiyorsunuz?",
    cta_button: "Sohbete başlayın",
  },
  es: {
    eyebrow: "Servicios · Inteligente",
    heading: "Sistemas Inteligentes",
    lead:
      "IA que se entrega. Integramos modelos de lenguaje, búsqueda vectorial y automatización en productos reales — con evals, observabilidad y guardarraíles desde el día uno.",
    audience_title: "Para quién es",
    audience_body:
      "Equipos de producto añadiendo funciones de IA sin sacrificar fiabilidad. Fundadores construyendo un producto AI-native desde cero. Equipos de operaciones automatizando trabajo de conocimiento.",
    delivery_title: "Qué entregamos",
    delivery_items: [
      "Funciones de producto con LLM (chat, resumen, clasificación, extracción)",
      "Generación aumentada por recuperación con embeddings reales y evals reales",
      "Automatización de flujos conectando LLMs a tus herramientas y datos existentes",
      "Versionado de prompts, arneses de evaluación, observabilidad de costo + latencia",
      "Estrategias de respaldo — tu producto sigue funcionando cuando el modelo no",
    ],
    process_title: "Cómo trabajamos",
    process_items: [
      "Delimitación — enmarcar el problema en términos de resultados, no de modelo",
      "Eval-first — definir el éxito antes de escribir un prompt",
      "Iteración — ciclo ajustado de prompt, eval, entrega, medición",
      "Productivización — límites de tasa, caching, observabilidad, guardas de costo",
    ],
    cta_lead: "¿Quieres IA que realmente se entregue?",
    cta_button: "Iniciar conversación",
  },
};

// ── Blog index ──

export const BLOG_INDEX: Record<Locale, BlogIndexContent> = {
  en: {
    eyebrow: "Blog",
    heading: "Notes from the workshop",
    lead:
      "Occasional writing on building digital products at Lunexa — craft, tools, and lessons.",
    empty: "Posts are coming soon. Subscribe to the newsletter to get them when they land.",
  },
  tr: {
    eyebrow: "Blog",
    heading: "Atölyeden notlar",
    lead:
      "Lunexa'da dijital ürün geliştirmeye dair ara ara yazılar — zanaat, araçlar ve dersler.",
    empty:
      "Yazılar yakında geliyor. Yayınlandığında haberdar olmak için bültene abone olun.",
  },
  es: {
    eyebrow: "Blog",
    heading: "Notas del taller",
    lead:
      "Escritos ocasionales sobre cómo construir productos digitales en Lunexa — artesanía, herramientas y lecciones.",
    empty:
      "Los posts llegan pronto. Suscríbete al boletín para recibirlos cuando se publiquen.",
  },
};

// ── Reusable CTA block ──

export const CTA_BLOCK: Record<Locale, CtaBlockContent> = {
  en: {
    heading: "Have a project in mind?",
    body: "Tell us what you're building. We reply within two business days with a plan and a shortlist of next steps.",
    button: "Start a conversation",
  },
  tr: {
    heading: "Aklında bir proje mi var?",
    body: "Ne inşa ettiğini anlat. İki iş günü içinde bir planla ve sıradaki somut adımlarla dönüş yaparız.",
    button: "Konuşmaya başla",
  },
  es: {
    heading: "¿Tienes un proyecto en mente?",
    body: "Cuéntanos qué estás construyendo. Respondemos en dos días hábiles con un plan y los siguientes pasos concretos.",
    button: "Iniciar una conversación",
  },
};

// ── Related services section ──

export const RELATED_SERVICES: Record<Locale, RelatedServicesContent> = {
  en: {
    heading: "More of what we build",
    back_label: "← All services",
  },
  tr: {
    heading: "Neler daha yapıyoruz",
    back_label: "← Tüm hizmetler",
  },
  es: {
    heading: "Más de lo que construimos",
    back_label: "← Todos los servicios",
  },
};

// ── Work / showcase ──

type WorkItem = {
  /** Lowercase slug, used in DOM ids and the public page anchor */
  slug: string;
  /** Product name as it appears in the headline */
  name: string;
  /** Tagline shown under the product name */
  tagline: string;
  /** Short body — 2-3 sentences max */
  body: string;
  /** Live URL — opens external. Empty string when the product hasn't shipped to a public URL yet. */
  url: string;
  /** Stack chips shown under the body */
  stack: string[];
  /** Status badge: "Live", "In development", "Coming soon" */
  status: "live" | "development" | "coming_soon";
  /** Per-locale label for the status (renders as a chip) */
  statusLabel: string;
  /** Per-locale label for the live / visit / coming-soon line */
  visitLabel: string;
  /** Optional internal path to the product's privacy policy (e.g. `/privacy/rps-duel`). When set, renders an extra link on the card. */
  privacyPath?: string;
};

type WorkContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  items: WorkItem[];
  /** Per-locale label for the "Privacy policy" link inside a work card */
  privacyLabel: string;
  comingSoonHeading: string;
  comingSoonBody: string;
};

export const WORK: Record<Locale, WorkContent> = {
  en: {
    eyebrow: "Our Work",
    heading: "Products shipped from the Lunexa studio",
    lead: "Every product below is real software, in production, used by real people. The studio's standards — multi-locale, accessible, observable, secure — show up in each one. New products land here as they ship.",
    items: [
      {
        slug: "techchefdelights",
        name: "TechChefDelights",
        tagline: "A 3-language tested-recipe site with full Cook Mode",
        body: "EN/TR/ES recipe site with Cook Mode timers, per-locale full-text search, image manifest validation, and a JSON API ready for a future Flutter app. Built on the Lunexa stack with intentional divergence (next-intl, CSS Modules, systemd) where the product needed it.",
        url: "https://techchefdelights.com",
        stack: ["Next.js 16", "PostgreSQL + Prisma", "next-intl", "Cloudinary", "systemd"],
        status: "development",
        statusLabel: "Pre-launch — staging-ready",
        visitLabel: "Visit techchefdelights.com →",
      },
      {
        slug: "rps-duel",
        name: "RPS Duel",
        tagline: "A tactile rock-paper-scissors duel for iOS and Android",
        body: "Single-player Rock Paper Scissors against an adaptive CPU, with a daily challenge, four achievements, three difficulty levels, and full English / Turkish / Spanish support. The app runs entirely on your device — no account, no backend, no ads, no analytics.",
        url: "",
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "development",
        statusLabel: "Pre-launch — store submission ready",
        visitLabel: "Coming to App Store and Google Play soon",
        privacyPath: "/privacy/rps-duel",
      },
    ],
    privacyLabel: "Privacy policy",
    comingSoonHeading: "What's next",
    comingSoonBody: "More products are in development. The next one will land here when its public surface is ready. Want to follow along? Subscribe to the newsletter on the home page.",
  },
  tr: {
    eyebrow: "İşlerimiz",
    heading: "Lunexa stüdyosundan çıkmış ürünler",
    lead: "Aşağıdaki her ürün gerçek yazılım, üretimde, gerçek kullanıcılarla. Stüdyonun standartları — çok dilli, erişilebilir, izlenebilir, güvenli — her birinde görünüyor. Yeni ürünler yayına çıktıkça buraya iniyor.",
    items: [
      {
        slug: "techchefdelights",
        name: "TechChefDelights",
        tagline: "Tam Pişirme Modu olan 3 dilli, test edilmiş tarif sitesi",
        body: "EN/TR/ES tarif sitesi: Pişirme Modu zamanlayıcıları, locale başına full-text arama, görsel manifest doğrulaması ve gelecek Flutter uygulamasına hazır JSON API. Lunexa stack'i üzerine; ürünün gerektirdiği yerlerde bilinçli sapmalar (next-intl, CSS Modules, systemd) ile.",
        url: "https://techchefdelights.com",
        stack: ["Next.js 16", "PostgreSQL + Prisma", "next-intl", "Cloudinary", "systemd"],
        status: "development",
        statusLabel: "Lansman öncesi — staging hazır",
        visitLabel: "techchefdelights.com'u ziyaret et →",
      },
      {
        slug: "rps-duel",
        name: "RPS Duel",
        tagline: "iOS ve Android için dokunaklı bir taş kâğıt makas düellosu",
        body: "Uyarlanabilir CPU'ya karşı tek oyunculu Taş Kâğıt Makas; günlük meydan okuma, dört başarım, üç zorluk seviyesi ve tam İngilizce / Türkçe / İspanyolca destekle. Uygulama tamamen cihazında çalışır — hesap yok, sunucu yok, reklam yok, analitik yok.",
        url: "",
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "development",
        statusLabel: "Lansman öncesi — mağaza başvurusuna hazır",
        visitLabel: "Yakında App Store ve Google Play'de",
        privacyPath: "/privacy/rps-duel",
      },
    ],
    privacyLabel: "Gizlilik politikası",
    comingSoonHeading: "Sırada ne var",
    comingSoonBody: "Geliştirme aşamasında daha fazla ürün var. Bir sonraki, halka açık yüzü hazır olunca buraya inecek. Takip etmek istersen ana sayfadaki bültene abone ol.",
  },
  es: {
    eyebrow: "Nuestro Trabajo",
    heading: "Productos enviados desde el estudio Lunexa",
    lead: "Cada producto a continuación es software real, en producción, usado por personas reales. Los estándares del estudio — multi-idioma, accesibles, observables, seguros — aparecen en cada uno. Los nuevos productos llegan aquí cuando se publican.",
    items: [
      {
        slug: "techchefdelights",
        name: "TechChefDelights",
        tagline: "Sitio de recetas probadas en 3 idiomas con Modo Cocina completo",
        body: "Sitio de recetas EN/TR/ES con temporizadores de Modo Cocina, búsqueda full-text por idioma, validación de manifiesto de imágenes y una API JSON lista para una futura app Flutter. Construido sobre el stack Lunexa con divergencias intencionales (next-intl, CSS Modules, systemd) donde el producto las requería.",
        url: "https://techchefdelights.com",
        stack: ["Next.js 16", "PostgreSQL + Prisma", "next-intl", "Cloudinary", "systemd"],
        status: "development",
        statusLabel: "Pre-lanzamiento — listo para staging",
        visitLabel: "Visitar techchefdelights.com →",
      },
      {
        slug: "rps-duel",
        name: "RPS Duel",
        tagline: "Un duelo táctil de piedra papel tijera para iOS y Android",
        body: "Piedra Papel Tijera para un solo jugador contra una CPU adaptativa, con desafío diario, cuatro logros, tres niveles de dificultad y soporte completo en inglés / turco / español. La aplicación funciona enteramente en tu dispositivo — sin cuenta, sin backend, sin anuncios, sin analítica.",
        url: "",
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "development",
        statusLabel: "Pre-lanzamiento — listo para envío a tiendas",
        visitLabel: "Próximamente en App Store y Google Play",
        privacyPath: "/privacy/rps-duel",
      },
    ],
    privacyLabel: "Política de privacidad",
    comingSoonHeading: "Qué sigue",
    comingSoonBody: "Más productos están en desarrollo. El siguiente aterrizará aquí cuando su superficie pública esté lista. ¿Quieres seguir el avance? Suscríbete al boletín en la página principal.",
  },
};

// ── RPS Duel privacy policy ──
// App-specific privacy policy. Single source of truth for the policy that
// the Play Store / App Store listings link to. Honesty constraint: every
// negative claim ("no account", "no analytics", etc.) is verified against
// the current rps_duel Flutter codebase before authoring. Update this and
// bump `lastUpdated` whenever the app's data behaviour changes.

export const RPS_DUEL_PRIVACY: Record<Locale, AppPrivacyContent> = {
  en: {
    eyebrow: "RPS Duel · Privacy",
    heading: "RPS Duel — Privacy Policy",
    lastUpdated: "Last updated: 2026-05-25",
    intro:
      "RPS Duel is a single-player Rock Paper Scissors game made by Lunexa Studio (package id: com.lunexa.games.rpsduel). This policy describes what the app does — and, more importantly, what it does not do — with your information.",
    sections: [
      {
        title: "Summary",
        paragraphs: [
          "The app runs entirely on your device. It does not create accounts, does not contact a server, does not show ads, and does not include analytics or crash reporting. It plays a quick game of Rock Paper Scissors against a built-in opponent and remembers your progress locally.",
        ],
      },
      {
        title: "What we do not collect",
        paragraphs: [
          "As of the effective date of this policy, RPS Duel does not collect, transmit, or share any personal information. Specifically, the app does not collect:",
        ],
        bullets: [
          "Name, email address, phone number, or any account identifier",
          "Advertising identifiers (IDFA, AAID) or other device identifiers",
          "Location, contacts, microphone, camera, or sensor data",
          "Analytics events, usage telemetry, or crash reports",
          "Any data linked to your identity",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your progress and preferences between sessions, the app saves a small amount of gameplay data on your device only. This data never leaves your device.",
        ],
        bullets: [
          "Game scores and your last few round results",
          "Selected interface language (English, Turkish, or Spanish)",
          "Selected CPU difficulty (Easy, Normal, or Hard)",
          "Daily challenge progress for the current day (resets automatically at local midnight)",
          "Achievement flags (First Win, Streak 3, Scissors Specialist, 10 Rounds)",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "You can clear all locally stored gameplay data from inside the app via Settings → Reset data. You can also remove this data with your operating system's normal app controls: clear app data (Android) or uninstall the app (iOS / Android).",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "RPS Duel does not target children specifically and does not knowingly collect any personal information from children under 13. Because the app collects no personal information at all, no age-based data handling is required.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of RPS Duel changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about this policy can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "RPS Duel · Gizlilik",
    heading: "RPS Duel — Gizlilik Politikası",
    lastUpdated: "Son güncelleme: 25.05.2026",
    intro:
      "RPS Duel, Lunexa Studio tarafından geliştirilmiş tek oyunculu bir Taş Kâğıt Makas oyunudur (paket kimliği: com.lunexa.games.rpsduel). Bu politika, uygulamanın bilgilerinle ne yaptığını ve — daha önemlisi — ne yapmadığını açıklar.",
    sections: [
      {
        title: "Özet",
        paragraphs: [
          "Uygulama tamamen cihazında çalışır. Hesap oluşturmaz, herhangi bir sunucuyla iletişim kurmaz, reklam göstermez ve analitik veya çökme raporlama içermez. Yerleşik bir rakibe karşı kısa bir Taş Kâğıt Makas oyunu oynar ve ilerlemeni yalnızca cihazında hatırlar.",
        ],
      },
      {
        title: "Toplamadığımız veriler",
        paragraphs: [
          "Bu politikanın yürürlük tarihi itibarıyla RPS Duel hiçbir kişisel bilgiyi toplamaz, iletmez veya paylaşmaz. Açıkça belirtmek gerekirse, uygulama şunları toplamaz:",
        ],
        bullets: [
          "Ad, e-posta, telefon numarası veya herhangi bir hesap kimliği",
          "Reklam kimlikleri (IDFA, AAID) veya diğer cihaz kimlikleri",
          "Konum, kişiler, mikrofon, kamera veya sensör verileri",
          "Analitik olaylar, kullanım telemetrisi veya çökme raporları",
          "Kimliğinle ilişkilendirilmiş herhangi bir veri",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ilerlemeni ve tercihlerini hatırlamak için uygulama, yalnızca cihazına küçük miktarda oyun verisi kaydeder. Bu veriler cihazından asla çıkmaz.",
        ],
        bullets: [
          "Oyun skorları ve son birkaç el sonucu",
          "Seçili arayüz dili (İngilizce, Türkçe veya İspanyolca)",
          "Seçili CPU zorluğu (Kolay, Normal veya Zor)",
          "Bugünkü günlük meydan okuma ilerlemen (yerel gece yarısında otomatik sıfırlanır)",
          "Başarım bayrakları (İlk Galibiyet, 3'lü Seri, Makas Uzmanı, 10 El)",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Yerel olarak saklanan tüm oyun verilerini uygulama içinden Ayarlar → Verileri sıfırla ile silebilirsin. Aynı verileri işletim sisteminin normal uygulama kontrolleriyle de temizleyebilirsin: uygulama verilerini temizle (Android) veya uygulamayı kaldır (iOS / Android).",
        ],
      },
      {
        title: "Çocuklar",
        paragraphs: [
          "RPS Duel özellikle çocuklara yönelik değildir ve 13 yaşın altındaki çocuklardan bilerek herhangi bir kişisel bilgi toplamaz. Uygulama zaten hiç kişisel bilgi toplamadığı için yaşa bağlı bir veri işleme gerekmez.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "RPS Duel'in ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu politikayla ilgili soruları şu adrese yazabilirsin: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "RPS Duel · Privacidad",
    heading: "RPS Duel — Política de Privacidad",
    lastUpdated: "Última actualización: 2026-05-25",
    intro:
      "RPS Duel es un juego de Piedra Papel Tijera para un solo jugador creado por Lunexa Studio (id de paquete: com.lunexa.games.rpsduel). Esta política describe qué hace la aplicación con tu información y — más importante — qué no hace.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "La aplicación se ejecuta completamente en tu dispositivo. No crea cuentas, no se comunica con ningún servidor, no muestra anuncios y no incluye analítica ni informes de errores. Juega una partida rápida de Piedra Papel Tijera contra un oponente integrado y recuerda tu progreso únicamente en tu dispositivo.",
        ],
      },
      {
        title: "Lo que no recopilamos",
        paragraphs: [
          "En la fecha de entrada en vigor de esta política, RPS Duel no recopila, transmite ni comparte ningún dato personal. En concreto, la aplicación no recopila:",
        ],
        bullets: [
          "Nombre, correo electrónico, teléfono o ningún identificador de cuenta",
          "Identificadores publicitarios (IDFA, AAID) ni otros identificadores de dispositivo",
          "Ubicación, contactos, micrófono, cámara ni datos de sensores",
          "Eventos analíticos, telemetría de uso ni informes de errores",
          "Ningún dato vinculado a tu identidad",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tu progreso y preferencias entre sesiones, la aplicación guarda una pequeña cantidad de datos de juego únicamente en tu dispositivo. Estos datos nunca salen de tu dispositivo.",
        ],
        bullets: [
          "Puntuaciones y los resultados de las últimas rondas",
          "Idioma de interfaz seleccionado (inglés, turco o español)",
          "Dificultad de CPU seleccionada (Fácil, Normal o Difícil)",
          "Progreso del desafío diario actual (se reinicia automáticamente a medianoche local)",
          "Indicadores de logros (Primera Victoria, Racha de 3, Especialista en Tijera, 10 Rondas)",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Puedes borrar todos los datos de juego almacenados localmente desde la aplicación en Ajustes → Restablecer datos. También puedes eliminar estos datos con los controles habituales del sistema operativo: borrar datos de la aplicación (Android) o desinstalarla (iOS / Android).",
        ],
      },
      {
        title: "Niños",
        paragraphs: [
          "RPS Duel no está dirigida específicamente a niños y no recopila intencionalmente datos personales de menores de 13 años. Como la aplicación no recopila ningún dato personal, no se requiere tratamiento de datos por edad.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de RPS Duel cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre esta política pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

export const CHESS_RESCUE_PRIVACY: Record<Locale, AppPrivacyContent> = {
  en: {
    eyebrow: "Chess Rescue · Privacy",
    heading: "Chess Rescue — Privacy Policy",
    lastUpdated: "Last updated: 2026-05-29",
    intro:
      "Chess Rescue is a single-player, offline puzzle game made by Lunexa Games (package id: com.lunexa.games.chessrescue). This policy describes what the app does — and, more importantly, what it does not do — with your information.",
    sections: [
      {
        title: "Summary",
        paragraphs: [
          "The app runs entirely on your device. It does not create accounts, does not contact a server, does not show ads, and does not include analytics or crash reporting. It presents short chess-rescue puzzles offline and remembers your progress locally.",
        ],
      },
      {
        title: "What we do not collect",
        paragraphs: [
          "As of the effective date of this policy, Chess Rescue does not collect, transmit, or share any personal information. Specifically, the app does not collect:",
        ],
        bullets: [
          "Name, email address, phone number, or any account identifier",
          "Advertising identifiers (IDFA, AAID) or other device identifiers",
          "Location, contacts, microphone, camera, or sensor data",
          "Analytics events, usage telemetry, or crash reports",
          "Any data linked to your identity",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your progress between sessions, the app saves a small amount of gameplay data on your device only. This data never leaves your device.",
        ],
        bullets: [
          "Your current puzzle (how far you have progressed through the set)",
          "Which rescues you have already completed",
          "Whether you have seen the introduction",
          "A random seed used to lay out the puzzles",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "Chess Rescue does not include an in-app reset control. You can remove all locally stored progress using your operating system's normal app controls: clear the app's storage (on Android, Settings → Apps → Chess Rescue → Storage) or uninstall the app.",
        ],
      },
      {
        title: "Internet access",
        paragraphs: [
          "Chess Rescue does not request the internet permission and makes no network connections. The game is fully playable offline.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Chess Rescue does not target children specifically and does not knowingly collect any personal information from children under 13. Because the app collects no personal information at all, no age-based data handling is required.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of Chess Rescue changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about this policy can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "Chess Rescue · Gizlilik",
    heading: "Chess Rescue — Gizlilik Politikası",
    lastUpdated: "Son güncelleme: 29.05.2026",
    intro:
      "Chess Rescue, Lunexa Games tarafından geliştirilmiş tek oyunculu, çevrimdışı bir bulmaca oyunudur (paket kimliği: com.lunexa.games.chessrescue). Bu politika, uygulamanın bilgilerinle ne yaptığını ve — daha önemlisi — ne yapmadığını açıklar.",
    sections: [
      {
        title: "Özet",
        paragraphs: [
          "Uygulama tamamen cihazında çalışır. Hesap oluşturmaz, herhangi bir sunucuyla iletişim kurmaz, reklam göstermez ve analitik veya çökme raporlama içermez. Kısa satranç kurtarış bulmacalarını çevrimdışı sunar ve ilerlemeni yalnızca cihazında hatırlar.",
        ],
      },
      {
        title: "Toplamadığımız veriler",
        paragraphs: [
          "Bu politikanın yürürlük tarihi itibarıyla Chess Rescue hiçbir kişisel bilgiyi toplamaz, iletmez veya paylaşmaz. Açıkça belirtmek gerekirse, uygulama şunları toplamaz:",
        ],
        bullets: [
          "Ad, e-posta, telefon numarası veya herhangi bir hesap kimliği",
          "Reklam kimlikleri (IDFA, AAID) veya diğer cihaz kimlikleri",
          "Konum, kişiler, mikrofon, kamera veya sensör verileri",
          "Analitik olaylar, kullanım telemetrisi veya çökme raporları",
          "Kimliğinle ilişkilendirilmiş herhangi bir veri",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ilerlemeni hatırlamak için uygulama, yalnızca cihazına küçük miktarda oyun verisi kaydeder. Bu veriler cihazından asla çıkmaz.",
        ],
        bullets: [
          "Mevcut bulmacan (set içinde ne kadar ilerlediğin)",
          "Tamamladığın kurtarışlar",
          "Tanıtımı görüp görmediğin",
          "Bulmacaları dizmek için kullanılan rastgele bir tohum (seed)",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Chess Rescue, uygulama içinde bir sıfırlama denetimi içermez. Yerel olarak saklanan tüm ilerlemeyi işletim sisteminin normal uygulama kontrolleriyle kaldırabilirsin: uygulamanın verilerini temizle (Android'de Ayarlar → Uygulamalar → Chess Rescue → Depolama) veya uygulamayı kaldır.",
        ],
      },
      {
        title: "İnternet erişimi",
        paragraphs: [
          "Chess Rescue internet izni istemez ve hiçbir ağ bağlantısı kurmaz. Oyun tamamen çevrimdışı oynanabilir.",
        ],
      },
      {
        title: "Çocuklar",
        paragraphs: [
          "Chess Rescue özellikle çocuklara yönelik değildir ve 13 yaşın altındaki çocuklardan bilerek herhangi bir kişisel bilgi toplamaz. Uygulama zaten hiç kişisel bilgi toplamadığı için yaşa bağlı bir veri işleme gerekmez.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "Chess Rescue'nun ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu politikayla ilgili soruları şu adrese yazabilirsin: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "Chess Rescue · Privacidad",
    heading: "Chess Rescue — Política de Privacidad",
    lastUpdated: "Última actualización: 2026-05-29",
    intro:
      "Chess Rescue es un juego de rompecabezas para un solo jugador y sin conexión creado por Lunexa Games (id de paquete: com.lunexa.games.chessrescue). Esta política describe qué hace la aplicación con tu información y — más importante — qué no hace.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "La aplicación se ejecuta completamente en tu dispositivo. No crea cuentas, no se comunica con ningún servidor, no muestra anuncios y no incluye analítica ni informes de errores. Presenta breves rompecabezas de rescate de ajedrez sin conexión y recuerda tu progreso únicamente en tu dispositivo.",
        ],
      },
      {
        title: "Lo que no recopilamos",
        paragraphs: [
          "En la fecha de entrada en vigor de esta política, Chess Rescue no recopila, transmite ni comparte ningún dato personal. En concreto, la aplicación no recopila:",
        ],
        bullets: [
          "Nombre, correo electrónico, teléfono o ningún identificador de cuenta",
          "Identificadores publicitarios (IDFA, AAID) ni otros identificadores de dispositivo",
          "Ubicación, contactos, micrófono, cámara ni datos de sensores",
          "Eventos analíticos, telemetría de uso ni informes de errores",
          "Ningún dato vinculado a tu identidad",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tu progreso entre sesiones, la aplicación guarda una pequeña cantidad de datos de juego únicamente en tu dispositivo. Estos datos nunca salen de tu dispositivo.",
        ],
        bullets: [
          "Tu rompecabezas actual (cuánto has avanzado en el conjunto)",
          "Qué rescates has completado",
          "Si has visto la introducción",
          "Una semilla aleatoria usada para disponer los rompecabezas",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Chess Rescue no incluye un control de restablecimiento dentro de la aplicación. Puedes eliminar todo el progreso almacenado localmente con los controles habituales del sistema operativo: borra los datos de la aplicación (en Android, Ajustes → Aplicaciones → Chess Rescue → Almacenamiento) o desinstálala.",
        ],
      },
      {
        title: "Acceso a internet",
        paragraphs: [
          "Chess Rescue no solicita el permiso de internet y no realiza conexiones de red. El juego es totalmente jugable sin conexión.",
        ],
      },
      {
        title: "Niños",
        paragraphs: [
          "Chess Rescue no está dirigida específicamente a niños y no recopila intencionalmente datos personales de menores de 13 años. Como la aplicación no recopila ningún dato personal, no se requiere tratamiento de datos por edad.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de Chess Rescue cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre esta política pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

// ── Quietly privacy policy ──
// App-specific privacy policy for Quietly (media-saver Flutter app).
// Honesty constraint: every claim — including the two network endpoints,
// clipboard read, gallery write, and the exact stored items — is verified
// against the quietly_media_saver Flutter code before authoring. Update
// this block and bump `lastUpdated` whenever the app's data behaviour changes.
//
// Internal TODO (NOT for public body): the studio has no registered legal
// entity yet, so this policy intentionally omits a data-controller block
// and a standalone GDPR/KVKK rights-procedure section, matching the
// canonical RPS Duel / Chess Rescue pattern. Revisit if and when a
// registered controller name + address becomes required. Default posture
// remains: contact via hello@uselunexa.com.

export const QUIETLY_PRIVACY: Record<Locale, AppPrivacyContent> = {
  en: {
    eyebrow: "Quietly · Privacy",
    heading: "Quietly — Privacy Policy",
    lastUpdated: "Last updated: 2026-05-29",
    intro:
      "Quietly is a media saver made by Lunexa. The app saves direct public media from URLs you paste into your device gallery. It uses the internet to fetch the media you ask for and to check whether you have a connection — and nothing else. Quietly does not create accounts, does not show ads, and does not include analytics or crash reporting.",
    sections: [
      {
        title: "What we do not collect",
        paragraphs: [
          "As of the effective date of this policy, Quietly does not collect, transmit, or share any personal information. Specifically, the app does not collect:",
        ],
        bullets: [
          "Name, email address, phone number, or any account identifier",
          "Advertising identifiers (IDFA, AAID) or other device identifiers",
          "Location, contacts, microphone, camera, or sensor data",
          "Analytics events, usage telemetry, or crash reports",
          "Any data linked to your identity",
        ],
      },
      {
        title: "Network access",
        paragraphs: [
          "Quietly uses the internet for two purposes only, both initiated by you:",
        ],
        bullets: [
          "The URL you paste — fetched directly from its source so the media file can be downloaded",
          "https://www.gstatic.com/generate_204 — a small Google endpoint contacted only to detect whether your device currently has internet. No data is sent to it.",
        ],
      },
      {
        title: "Permissions and what we use them for",
        paragraphs: [
          "Quietly requests only the permissions it needs to do its job:",
        ],
        bullets: [
          "Internet — to download the media at the URL you paste",
          "Photos / media library (read and add) — to save downloaded files into your gallery and, when needed, to confirm the file landed there",
          "Clipboard read — to detect a URL when you paste; only the detected URL is stored in your history, never the rest of your clipboard",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your settings and saved media between sessions, the app stores a small amount of data on your device only. This data never leaves your device.",
        ],
        bullets: [
          "Your selected video quality",
          "Your toggles: ask for quality each time, save on Wi-Fi only, notification preference, and a first-run acknowledgment flag",
          "Your history of saved items — each entry holds an identifier, the media kind, a title, descriptive metadata, the time saved, the source URL identifier, and the file path on your device",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "Open Settings → Clear history to remove your saved history from inside the app. To remove the locally stored preferences as well, clear the app's storage from your operating system (Android: Settings → Apps → Quietly → Storage) or uninstall the app. Downloaded files remain in your gallery unless you delete them manually.",
        ],
      },
      {
        title: "What we do not do",
        paragraphs: [
          "Quietly does not perform page scraping or parse social-platform feeds. It does not access logged-in or DRM-protected content. It does not run background work to find or download media on your behalf. It only fetches what you paste, when you ask.",
        ],
      },
      {
        title: "Copyright and third-party content",
        paragraphs: [
          "Quietly does not authenticate or validate the copyright status of URLs you provide. You are solely responsible for ensuring you have the right to save the content you save. Some content may be subject to copyright, DRM, or the source platform's Terms of Service.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Quietly is not directed at children and does not knowingly collect any personal information from anyone under 13. Because the app collects no personal information at all, no age-based data handling is required.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of Quietly changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about this policy can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "Quietly · Gizlilik",
    heading: "Quietly — Gizlilik Politikası",
    lastUpdated: "Son güncelleme: 29.05.2026",
    intro:
      "Quietly, Lunexa tarafından geliştirilmiş bir medya kaydedicidir. Yapıştırdığın URL'lerdeki doğrudan halka açık medyayı cihazının galerisine kaydeder. İnterneti yalnızca senin istediğin medyayı indirmek ve bağlantın olup olmadığını kontrol etmek için kullanır — başka hiçbir şey için değil. Quietly hesap oluşturmaz, reklam göstermez ve analitik veya çökme raporlama içermez.",
    sections: [
      {
        title: "Toplamadığımız veriler",
        paragraphs: [
          "Bu politikanın yürürlük tarihi itibarıyla Quietly hiçbir kişisel bilgiyi toplamaz, iletmez veya paylaşmaz. Açıkça belirtmek gerekirse, uygulama şunları toplamaz:",
        ],
        bullets: [
          "Ad, e-posta, telefon numarası veya herhangi bir hesap kimliği",
          "Reklam kimlikleri (IDFA, AAID) veya diğer cihaz kimlikleri",
          "Konum, kişiler, mikrofon, kamera veya sensör verileri",
          "Analitik olaylar, kullanım telemetrisi veya çökme raporları",
          "Kimliğinle ilişkilendirilmiş herhangi bir veri",
        ],
      },
      {
        title: "Ağ erişimi",
        paragraphs: [
          "Quietly interneti yalnızca iki amaç için kullanır ve ikisini de sen başlatırsın:",
        ],
        bullets: [
          "Yapıştırdığın URL — medya dosyasını indirebilmek için doğrudan kaynağından çekilir",
          "https://www.gstatic.com/generate_204 — yalnızca cihazının şu an internete bağlı olup olmadığını tespit etmek için kullanılan küçük bir Google uç noktası. Bu adrese veri gönderilmez.",
        ],
      },
      {
        title: "İzinler ve ne için kullandığımız",
        paragraphs: [
          "Quietly yalnızca işini yapmak için gereken izinleri ister:",
        ],
        bullets: [
          "İnternet — yapıştırdığın URL'deki medyayı indirmek için",
          "Fotoğraflar / medya kitaplığı (okuma ve ekleme) — indirilen dosyaları galerine kaydetmek ve gerektiğinde dosyanın oraya ulaştığını doğrulamak için",
          "Pano okuma — yapıştırma sırasında URL'yi algılamak için; yalnızca algılanan URL geçmişine kaydedilir, panonun geri kalanı asla kaydedilmez",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ayarlarını ve kaydettiğin medyayı hatırlamak için uygulama, yalnızca cihazına küçük miktarda veri kaydeder. Bu veriler cihazından asla çıkmaz.",
        ],
        bullets: [
          "Seçtiğin video kalitesi",
          "Tercihlerin: her seferinde kalite sor, yalnızca Wi-Fi'de kaydet, bildirim tercihi ve ilk açılış onay bayrağı",
          "Kayıt geçmişin — her girdi şunları içerir: kimlik, medya türü, başlık, açıklayıcı metaveri, kayıt zamanı, kaynak URL kimliği ve cihazındaki dosya yolu",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Uygulama içinden geçmişini silmek için Settings → Clear history bölümünü aç. Yerel olarak saklanan tercihleri de kaldırmak için işletim sisteminin uygulama depolama kontrolünü kullan (Android: Ayarlar → Uygulamalar → Quietly → Depolama) veya uygulamayı kaldır. İndirilen dosyalar, sen elle silmediğin sürece galerinde kalır.",
        ],
      },
      {
        title: "Yapmadığımız şeyler",
        paragraphs: [
          "Quietly sayfa kazıma yapmaz ve sosyal platform akışlarını ayrıştırmaz. Oturum açılmış veya DRM korumalı içeriklere erişmez. Senin adına medya bulmak veya indirmek için arka planda iş yürütmez. Yalnızca sen istediğinde, yapıştırdığını getirir.",
        ],
      },
      {
        title: "Telif hakkı ve üçüncü taraf içeriği",
        paragraphs: [
          "Quietly, sağladığın URL'lerin telif hakkı durumunu doğrulamaz veya kontrol etmez. Kaydettiğin içeriği kaydetme hakkına sahip olduğundan emin olmak yalnızca senin sorumluluğundadır. Bazı içerikler telif hakkına, DRM'e veya kaynak platformun Kullanım Şartlarına tabi olabilir.",
        ],
      },
      {
        title: "Çocuklar",
        paragraphs: [
          "Quietly özellikle çocuklara yönelik değildir ve 13 yaşın altındaki kimseden bilerek herhangi bir kişisel bilgi toplamaz. Uygulama zaten hiç kişisel bilgi toplamadığı için yaşa bağlı bir veri işleme gerekmez.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "Quietly'nin ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu politikayla ilgili soruları şu adrese yazabilirsin: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "Quietly · Privacidad",
    heading: "Quietly — Política de Privacidad",
    lastUpdated: "Última actualización: 2026-05-29",
    intro:
      "Quietly es un guardador de medios creado por Lunexa. La aplicación guarda medios públicos directos desde URLs que pegas en la galería de tu dispositivo. Usa internet únicamente para descargar los medios que pides y para comprobar si tienes conexión — nada más. Quietly no crea cuentas, no muestra anuncios y no incluye analítica ni informes de errores.",
    sections: [
      {
        title: "Lo que no recopilamos",
        paragraphs: [
          "En la fecha de entrada en vigor de esta política, Quietly no recopila, transmite ni comparte ningún dato personal. En concreto, la aplicación no recopila:",
        ],
        bullets: [
          "Nombre, correo electrónico, teléfono ni ningún identificador de cuenta",
          "Identificadores publicitarios (IDFA, AAID) ni otros identificadores de dispositivo",
          "Ubicación, contactos, micrófono, cámara ni datos de sensores",
          "Eventos analíticos, telemetría de uso ni informes de errores",
          "Ningún dato vinculado a tu identidad",
        ],
      },
      {
        title: "Acceso a la red",
        paragraphs: [
          "Quietly usa internet únicamente con dos fines, ambos iniciados por ti:",
        ],
        bullets: [
          "La URL que pegas — se descarga directamente desde su origen para obtener el archivo de medios",
          "https://www.gstatic.com/generate_204 — un pequeño endpoint de Google contactado solo para detectar si tu dispositivo tiene conexión a internet. No se envía ningún dato a él.",
        ],
      },
      {
        title: "Permisos y para qué los usamos",
        paragraphs: [
          "Quietly solicita únicamente los permisos que necesita para funcionar:",
        ],
        bullets: [
          "Internet — para descargar el contenido en la URL que pegas",
          "Fotos / biblioteca de medios (leer y añadir) — para guardar los archivos descargados en tu galería y, cuando sea necesario, confirmar que el archivo llegó allí",
          "Lectura del portapapeles — para detectar una URL cuando pegas; solo la URL detectada se guarda en tu historial, nunca el resto del portapapeles",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tus ajustes y los medios guardados entre sesiones, la aplicación guarda una pequeña cantidad de datos únicamente en tu dispositivo. Estos datos nunca salen de tu dispositivo.",
        ],
        bullets: [
          "Tu calidad de vídeo seleccionada",
          "Tus interruptores: preguntar la calidad cada vez, guardar solo con Wi-Fi, preferencia de notificaciones y un indicador de primera ejecución",
          "Tu historial de elementos guardados — cada entrada incluye un identificador, el tipo de medio, un título, metadatos descriptivos, la hora en que se guardó, el identificador de URL de origen y la ruta del archivo en tu dispositivo",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Abre Settings → Clear history para borrar tu historial guardado desde dentro de la aplicación. Para eliminar también las preferencias almacenadas localmente, borra el almacenamiento de la aplicación desde tu sistema operativo (Android: Ajustes → Aplicaciones → Quietly → Almacenamiento) o desinstálala. Los archivos descargados permanecen en tu galería a menos que los borres manualmente.",
        ],
      },
      {
        title: "Lo que no hacemos",
        paragraphs: [
          "Quietly no realiza scraping de páginas ni parsea fuentes de plataformas sociales. No accede a contenido protegido por inicio de sesión o DRM. No ejecuta trabajo en segundo plano para encontrar o descargar medios en tu nombre. Solo descarga lo que tú pegas, cuando tú lo pides.",
        ],
      },
      {
        title: "Derechos de autor y contenido de terceros",
        paragraphs: [
          "Quietly no autentica ni valida el estado de derechos de autor de las URLs que proporcionas. Eres el único responsable de asegurarte de que tienes derecho a guardar el contenido que guardas. Algunos contenidos pueden estar sujetos a derechos de autor, DRM o a los Términos de Servicio de la plataforma de origen.",
        ],
      },
      {
        title: "Niños",
        paragraphs: [
          "Quietly no está dirigida específicamente a niños y no recopila intencionalmente datos personales de menores de 13 años. Como la aplicación no recopila ningún dato personal, no se requiere tratamiento de datos por edad.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de Quietly cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre esta política pueden enviarse a ",
    contactBodySuffix: ".",
  },
};
