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

// Shape shared by every per-product legal document — privacy policies and terms
// alike. Named for the shape rather than for privacy because the terms blocks
// below reuse it; both render through the same section-mapping component.
type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Paragraphs after the bullets (rendered by the RPS Duel and Quietly privacy pages). */
  afterBullets?: string[];
};

type LegalDocument = {
  eyebrow: string;
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactTitle: string;
  contactBodyPrefix: string;
  contactBodySuffix: string;
};

/** One legal document in every locale — the shape `LegalDocumentContent` renders. */
export type LegalDocumentCopy = Record<Locale, LegalDocument>;

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

/**
 * Canonical Play Store listing for RPS Duel. Defined once so the work card and
 * the home page cannot drift apart.
 */
export const RPS_DUEL_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.lunexa.games.rpsduel";

/** Canonical Play Store listing for Chess Rescue — same single-definition rule. */
export const CHESS_RESCUE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.lunexa.games.chessrescue";

/** Canonical Play Store listing for Quietly — same single-definition rule. */
export const QUIETLY_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.lunexa.quietly";

/**
 * The studio's Google Play developer profile, listing every published app. A
 * discovery link only — never a stand-in for an individual game's listing.
 */
export const LUNEXA_PLAY_DEVELOPER_URL =
  "https://play.google.com/store/apps/developer?id=Use+Lunexa";

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
  /** Optional internal path to the product's detail page (e.g. `/work/rps-duel`). Only products that have one. */
  detailPath?: string;
};

type WorkContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  items: WorkItem[];
  /** Per-locale label for the "Privacy policy" link inside a work card */
  privacyLabel: string;
  /** Per-locale label for the product-detail link inside a work card */
  detailsLabel: string;
  comingSoonHeading: string;
  comingSoonBody: string;
};

export const WORK: Record<Locale, WorkContent> = {
  en: {
    eyebrow: "Our Work",
    heading: "Products shipped from the Lunexa studio",
    lead: "These are real products from the studio: some are publicly available, and others are still in development — each card shows its current status. The studio's standards — multi-locale, accessible, observable, secure — show up in each one. New products land here as they ship.",
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
        tagline: "A tactile rock-paper-scissors duel for Android",
        body: "Single-player Rock Paper Scissors against a built-in CPU opponent, with a daily challenge, four achievements, three difficulty levels, and full English / Turkish / Spanish support. No account needed — your progress is saved on the device. Banner ads on the Records and Collection screens and a full-screen ad between matches; usage statistics depend on your region and your choices.",
        url: RPS_DUEL_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "live",
        statusLabel: "Live on Google Play",
        visitLabel: "Get it on Google Play →",
        privacyPath: "/privacy/rps-duel",
        detailPath: "/work/rps-duel",
      },
      {
        slug: "chess-rescue",
        name: "Chess Rescue",
        tagline: "A calm chess-rules puzzle game for Android",
        body: "Single-player chess-rules puzzles built around the feel of an emotional comeback. No account needed, and your progress is saved on your device. Ads appear outside puzzles, an optional video ad can offer help with a puzzle, and usage statistics stay off unless you allow them.",
        url: CHESS_RESCUE_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "shared_preferences"],
        status: "live",
        statusLabel: "Live on Google Play",
        visitLabel: "Get it on Google Play →",
        privacyPath: "/privacy/chess-rescue",
      },
      {
        slug: "quietly",
        name: "Quietly",
        tagline: "An Android media saver for direct public URLs",
        body: "Quietly saves direct public media from URLs you paste into your device gallery. It only fetches what you ask for — no scraping, no logged-in or DRM-protected content. No account. One ad from Google after a save, and usage statistics only if you turn them on. Your links, files and history are never sent with either.",
        url: QUIETLY_PLAY_URL,
        stack: ["Flutter", "Dart", "Riverpod", "http", "gal"],
        status: "live",
        statusLabel: "Live on Google Play",
        visitLabel: "Get it on Google Play →",
        privacyPath: "/privacy/quietly",
      },
    ],
    privacyLabel: "Privacy policy",
    detailsLabel: "View details",
    comingSoonHeading: "What's next",
    comingSoonBody: "More products are in development. The next one will land here when its public surface is ready. Want to follow along? Subscribe to the newsletter on the home page.",
  },
  tr: {
    eyebrow: "İşlerimiz",
    heading: "Lunexa stüdyosundan çıkmış ürünler",
    lead: "Bunlar stüdyonun gerçek ürünleri: bazıları herkesin kullanımına açık, bazıları ise hâlâ geliştiriliyor — her kartta güncel durumu yer alıyor. Stüdyonun standartları — çok dilli, erişilebilir, izlenebilir, güvenli — her birinde görünüyor. Yeni ürünler yayına çıktıkça buraya iniyor.",
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
        tagline: "Android için dokunaklı bir taş kâğıt makas düellosu",
        body: "Bilgisayara karşı oynanan Taş Kâğıt Makas; günlük görevler, kazanılabilecek dört başarı, üç zorluk seviyesi ve İngilizce, Türkçe, İspanyolca dil desteği. Hesap gerekmez — ilerlemen cihazında saklanır. Kayıtlar ve Koleksiyon ekranlarında banner reklamlar, maçlar arasında tam ekran bir reklam; kullanım istatistikleri bulunduğun bölgeye ve tercihlerine bağlıdır.",
        url: RPS_DUEL_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "live",
        statusLabel: "Google Play'de yayında",
        visitLabel: "Google Play'den indir →",
        privacyPath: "/privacy/rps-duel",
        detailPath: "/work/rps-duel",
      },
      {
        slug: "chess-rescue",
        name: "Chess Rescue",
        tagline: "Android için sakin, satranç kurallı bir bulmaca oyunu",
        body: "Duygusal bir geri dönüş hissi etrafında kurulmuş, satranç kurallı tek oyunculu bulmacalar. Hesap gerekmez; ilerlemen cihazına kaydedilir. Reklamlar bulmaca dışında görünür, isteğe bağlı bir video reklam bir bulmacada yardım önerebilir ve kullanım istatistikleri sen izin vermedikçe kapalı kalır.",
        url: CHESS_RESCUE_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "shared_preferences"],
        status: "live",
        statusLabel: "Google Play'de yayında",
        visitLabel: "Google Play'den indir →",
        privacyPath: "/privacy/chess-rescue",
      },
      {
        slug: "quietly",
        name: "Quietly",
        tagline: "Doğrudan halka açık URL'ler için bir Android medya kaydedici",
        body: "Quietly, yapıştırdığın URL'lerdeki doğrudan halka açık medyayı cihazının galerisine kaydeder. Yalnızca senin istediğini getirir — kazıma yok, oturum açılmış veya DRM korumalı içerik yok. Hesap yok. Kayıttan sonra Google'dan tek bir reklam; kullanım istatistikleri yalnızca sen açarsan. Bağlantıların, dosyaların ve geçmişin hiçbiriyle birlikte gönderilmez.",
        url: QUIETLY_PLAY_URL,
        stack: ["Flutter", "Dart", "Riverpod", "http", "gal"],
        status: "live",
        statusLabel: "Google Play'de yayında",
        visitLabel: "Google Play'den indir →",
        privacyPath: "/privacy/quietly",
      },
    ],
    privacyLabel: "Gizlilik politikası",
    detailsLabel: "Detayları gör",
    comingSoonHeading: "Sırada ne var",
    comingSoonBody: "Geliştirme aşamasında daha fazla ürün var. Bir sonraki, halka açık yüzü hazır olunca buraya inecek. Takip etmek istersen ana sayfadaki bültene abone ol.",
  },
  es: {
    eyebrow: "Nuestro Trabajo",
    heading: "Productos enviados desde el estudio Lunexa",
    lead: "Estos son productos reales del estudio: algunos ya están disponibles públicamente y otros siguen en desarrollo; cada tarjeta muestra su estado actual. Los estándares del estudio — multi-idioma, accesibles, observables, seguros — aparecen en cada uno. Los nuevos productos llegan aquí cuando se publican.",
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
        tagline: "Un duelo táctil de piedra papel tijera para Android",
        body: "Piedra Papel Tijera para un solo jugador contra una CPU integrada, con desafío diario, cuatro logros, tres niveles de dificultad y soporte completo en inglés / turco / español. No requiere cuenta — tu progreso se guarda en el dispositivo. Anuncios de banner en las pantallas Registros y Colección y un anuncio a pantalla completa entre partidos; las estadísticas de uso dependen de tu región y de tus elecciones.",
        url: RPS_DUEL_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "go_router", "shared_preferences"],
        status: "live",
        statusLabel: "Disponible en Google Play",
        visitLabel: "Consíguelo en Google Play →",
        privacyPath: "/privacy/rps-duel",
        detailPath: "/work/rps-duel",
      },
      {
        slug: "chess-rescue",
        name: "Chess Rescue",
        tagline: "Un juego de rompecabezas con reglas de ajedrez, tranquilo, para Android",
        body: "Rompecabezas con reglas de ajedrez para un solo jugador, construidos en torno a la sensación de un retorno emocional. No necesitas cuenta y tu progreso se guarda en tu dispositivo. Los anuncios aparecen fuera de los rompecabezas, un anuncio en vídeo opcional puede ofrecer ayuda con un rompecabezas y las estadísticas de uso siguen desactivadas salvo que las permitas.",
        url: CHESS_RESCUE_PLAY_URL,
        stack: ["Flutter", "Dart", "Material 3", "shared_preferences"],
        status: "live",
        statusLabel: "Disponible en Google Play",
        visitLabel: "Consíguelo en Google Play →",
        privacyPath: "/privacy/chess-rescue",
      },
      {
        slug: "quietly",
        name: "Quietly",
        tagline: "Un guardador de medios Android para URLs públicas directas",
        body: "Quietly guarda medios públicos directos desde las URLs que pegas en la galería de tu dispositivo. Solo descarga lo que tú pides — sin scraping, sin contenido protegido por inicio de sesión o DRM. Sin cuenta. Un anuncio de Google después de guardar, y estadísticas de uso solo si las activas. Tus enlaces, archivos e historial nunca se envían con ninguno de ellos.",
        url: QUIETLY_PLAY_URL,
        stack: ["Flutter", "Dart", "Riverpod", "http", "gal"],
        status: "live",
        statusLabel: "Disponible en Google Play",
        visitLabel: "Consíguelo en Google Play →",
        privacyPath: "/privacy/quietly",
      },
    ],
    privacyLabel: "Política de privacidad",
    detailsLabel: "Ver detalles",
    comingSoonHeading: "Qué sigue",
    comingSoonBody: "Más productos están en desarrollo. El siguiente aterrizará aquí cuando su superficie pública esté lista. ¿Quieres seguir el avance? Suscríbete al boletín en la página principal.",
  },
};

// ── RPS Duel product detail ──
// Copy for /work/rps-duel. Stack chips and the status label are NOT repeated
// here — the page reads them from the WORK item above so the card and the
// detail page cannot disagree. Every claim below is verified against the
// existing work copy, the privacy policy, and the shipped screenshots.

type ProductDetailContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  galleryHeading: string;
  galleryAlt: { main: string; roundResult: string; difficulty: string };
  highlightsHeading: string;
  highlights: string[];
  builtWithHeading: string;
  legalHeading: string;
  privacyLabel: string;
  termsLabel: string;
  supportLabel: string;
  backLabel: string;
};

export const RPS_DUEL_PRODUCT: Record<Locale, ProductDetailContent> = {
  en: {
    eyebrow: "Lunexa Games",
    heading: "RPS Duel",
    lead: "A single-player Rock Paper Scissors duel for Android. Play a quick round against a built-in opponent, chase the daily challenge, and unlock achievements — no account, and your progress is saved on the device.",
    galleryHeading: "A look at the game",
    galleryAlt: {
      main: "RPS Duel's main screen, showing the running score, a completed daily challenge, three of four achievements unlocked, and the rock, paper and scissors buttons.",
      roundResult: "A finished round: the player's scissors beat the opponent's paper, with the result added to the score above.",
      difficulty: "The difficulty picker, offering Easy, Normal and Hard.",
    },
    highlightsHeading: "What's in it",
    highlights: [
      "Single-player against a built-in opponent",
      "Three difficulty levels — Easy, Normal, Hard",
      "A daily challenge that resets at local midnight",
      "Four achievements to unlock",
      "English, Turkish and Spanish throughout",
      "No account — progress is stored on your device",
    ],
    builtWithHeading: "Built with",
    legalHeading: "Legal and support",
    privacyLabel: "Privacy policy",
    termsLabel: "Terms of service",
    supportLabel: "Support & FAQ",
    backLabel: "All work",
  },
  tr: {
    eyebrow: "Lunexa Games",
    heading: "RPS Duel",
    lead: "Android için tek oyunculu bir Taş Kâğıt Makas düellosu. Bilgisayara karşı kısa bir el oyna, günlük görevin peşinden git ve başarılar kazan — hesap yok, ilerlemen cihazında saklanır.",
    galleryHeading: "Oyundan görüntüler",
    galleryAlt: {
      main: "RPS Duel'in ana ekranı: güncel skor, tamamlanmış günlük görev, kazanılmış dört başarıdan üçü ve taş, kâğıt, makas düğmeleri.",
      roundResult: "Biten bir el: oyuncunun makası rakibin kâğıdını yener ve sonuç yukarıdaki skora eklenir.",
      difficulty: "Kolay, Normal ve Zor seçeneklerini sunan zorluk seçici.",
    },
    highlightsHeading: "Neler var",
    highlights: [
      "Bilgisayara karşı tek oyunculu",
      "Üç zorluk seviyesi — Kolay, Normal, Zor",
      "Yerel gece yarısında sıfırlanan günlük görev",
      "Kazanılacak dört başarı",
      "Baştan sona İngilizce, Türkçe ve İspanyolca",
      "Hesap yok — ilerleme cihazında saklanır",
    ],
    builtWithHeading: "Nelerle yapıldı",
    legalHeading: "Yasal ve destek",
    privacyLabel: "Gizlilik politikası",
    termsLabel: "Kullanım şartları",
    supportLabel: "Destek ve SSS",
    backLabel: "Tüm işler",
  },
  es: {
    eyebrow: "Lunexa Games",
    heading: "RPS Duel",
    lead: "Un duelo de Piedra Papel Tijera para un solo jugador en Android. Juega una ronda rápida contra un oponente integrado, persigue el reto diario y desbloquea logros: sin cuenta, y tu progreso se guarda en el dispositivo.",
    galleryHeading: "Un vistazo al juego",
    galleryAlt: {
      main: "La pantalla principal de RPS Duel: el marcador actual, un reto diario completado, tres de cuatro logros desbloqueados y los botones de piedra, papel y tijera.",
      roundResult: "Una ronda terminada: la tijera del jugador gana al papel del oponente y el resultado se suma al marcador de arriba.",
      difficulty: "El selector de dificultad, con Fácil, Normal y Difícil.",
    },
    highlightsHeading: "Qué incluye",
    highlights: [
      "Un solo jugador contra un oponente integrado",
      "Tres niveles de dificultad: Fácil, Normal, Difícil",
      "Un reto diario que se reinicia a medianoche local",
      "Cuatro logros por desbloquear",
      "Inglés, turco y español en toda la aplicación",
      "Sin cuenta: el progreso se guarda en tu dispositivo",
    ],
    builtWithHeading: "Hecho con",
    legalHeading: "Legal y soporte",
    privacyLabel: "Política de privacidad",
    termsLabel: "Términos de servicio",
    supportLabel: "Soporte y preguntas frecuentes",
    backLabel: "Todo el trabajo",
  },
};

// ── RPS Duel support ──
// Copy for /support/rps-duel. Every answer is verified against the shipped
// rps_duel Flutter app — its release manifest, engine, storage layer and ARB
// strings — rather than against general Android knowledge. In-app labels are
// quoted per locale exactly as the app renders them, so a reader can follow an
// answer without switching the app's language.
//
// Two topics are deliberately absent. Uninstall and backup behaviour: the app
// declares no backup rules, so the outcome is platform-determined and cannot be
// stated from the source — the terms already carry the careful wording. Ads and
// data collection: the app shows ads and sends region-dependent usage
// statistics (1.1.0), and the answers only point to the privacy policy, which
// is the source of truth for the data involved.

/** One disclosure row. Shared by the FAQ and the troubleshooting list, which render through the same component. */
type SupportTopic = { q: string; a: string };

type SupportContent = {
  eyebrow: string;
  heading: string;
  lead: string;
  /** Short factual chips under the heading — no claims that need a source */
  facts: string[];
  linksHeading: string;
  playLabel: string;
  productLabel: string;
  privacyLabel: string;
  termsLabel: string;
  faqHeading: string;
  faq: SupportTopic[];
  troubleshootingHeading: string;
  /** `q` is the symptom, `a` is the fix */
  troubleshooting: SupportTopic[];
  contactHeading: string;
  contactBody: string;
  contactLabel: string;
  backLabel: string;
};

export const RPS_DUEL_SUPPORT: Record<Locale, SupportContent> = {
  en: {
    eyebrow: "Lunexa Games",
    heading: "RPS Duel Support",
    lead: "Answers to the questions we hear most about RPS Duel, and how to reach us when something isn't working.",
    facts: [
      "Android",
      "No account needed",
      "Plays offline",
      "English · Türkçe · Español",
    ],
    linksHeading: "Links",
    playLabel: "Get it on Google Play",
    productLabel: "About RPS Duel",
    privacyLabel: "Privacy policy",
    termsLabel: "Terms of service",
    faqHeading: "Frequently asked questions",
    faq: [
      {
        q: "Do I need an account to play?",
        a: "No. RPS Duel has no sign-in, no profile and no online play. Your scores, achievements and settings live on your device.",
      },
      {
        q: "Does the game need an internet connection?",
        a: "No. Rounds, the Daily Challenge, achievements and records all work with no connection. The app also shows ads and, depending on your region and choices, sends usage statistics when it has a connection; the privacy policy describes the data involved.",
      },
      {
        q: "Which languages does the app support?",
        a: "English, Turkish and Spanish. RPS Duel follows your device language the first time you open it, and you can change it at any point under Settings → Language.",
      },
      {
        q: "How do the difficulty levels work?",
        a: "Easy favours you, Normal picks its move at random, and Hard favours the opponent. Difficulty does not learn from your previous rounds or adapt to your history — every round is decided on its own. You can change it under Settings → Difficulty.",
      },
      {
        q: "How does the Daily Challenge work?",
        a: "There is one challenge for each local calendar day, with a target to reach — winning a number of rounds, winning with a particular move, tying a number of rounds, or reaching a winning streak. It changes at local midnight, and progress from the previous day's challenge does not carry over.",
      },
      {
        q: "What achievements are there?",
        a: "Four: First Win, Streak 3, one for completing the day's Daily Challenge — whichever one the day brings — and 10 Rounds. Achievements are stored separately from the scoreboard, so resetting the game does not take them away.",
      },
      {
        q: "Where is my progress stored?",
        a: "On your device. RPS Duel has no cloud save, no sync between devices and no export, so progress cannot be moved from one device to another.",
      },
      {
        q: "Is RPS Duel available for iPhone?",
        a: "Not at the moment. RPS Duel is published for Android on Google Play.",
      },
    ],
    troubleshootingHeading: "Troubleshooting",
    troubleshooting: [
      {
        q: "The app is in the wrong language",
        a: "Open Settings → Language and choose English, Türkçe or Español. Until you pick one, the app follows your device language.",
      },
      {
        q: "I can't hear any sound",
        a: "Sound is on by default. Check that Settings → Sound is switched on, then check your device's own volume and its silent or vibrate switch.",
      },
      {
        q: "I want to start the scoreboard over",
        a: "Settings → Reset data clears your scores and round history, and the app asks you to confirm before it does. Your achievements, lifetime records and settings are kept. Please don't use Android's own storage-clearing option for this: that removes everything RPS Duel has saved — achievements and records included — not just the scoreboard.",
      },
    ],
    contactHeading: "Still need help?",
    contactBody: "If your question isn't answered here, or the app isn't behaving the way this page describes, send us a message. Telling us your device model, your Android version and what you were doing at the time helps us reproduce the problem.",
    contactLabel: "Contact us",
    backLabel: "Back to RPS Duel",
  },
  tr: {
    eyebrow: "Lunexa Games",
    heading: "RPS Duel Destek",
    lead: "RPS Duel hakkında en sık aldığımız soruların yanıtları ve bir şey çalışmadığında bize nasıl ulaşacağınız.",
    facts: [
      "Android",
      "Hesap gerekmez",
      "Çevrimdışı oynanır",
      "English · Türkçe · Español",
    ],
    linksHeading: "Bağlantılar",
    playLabel: "Google Play'den edinin",
    productLabel: "RPS Duel hakkında",
    privacyLabel: "Gizlilik politikası",
    termsLabel: "Kullanım şartları",
    faqHeading: "Sık sorulan sorular",
    faq: [
      {
        q: "Oynamak için hesap gerekir mi?",
        a: "Hayır. RPS Duel'de giriş, profil ve çevrimiçi oyun yoktur. Skorlarınız, başarımlarınız ve ayarlarınız cihazınızda kalır.",
      },
      {
        q: "Oyun için internet bağlantısı gerekir mi?",
        a: "Hayır. Eller, Günlük Görev, başarımlar ve kayıtlar bağlantı olmadan çalışır. Uygulama ayrıca reklam gösterir ve bölgenize ve tercihlerinize bağlı olarak bağlantı olduğunda kullanım istatistikleri gönderir; ilgili veriler gizlilik politikasında açıklanır.",
      },
      {
        q: "Uygulama hangi dilleri destekler?",
        a: "İngilizce, Türkçe ve İspanyolca. RPS Duel ilk açılışta cihazınızın dilini kullanır; dilediğiniz zaman Ayarlar → Dil bölümünden değiştirebilirsiniz.",
      },
      {
        q: "Zorluk seviyeleri nasıl çalışır?",
        a: "Kolay sizin lehinize, Normal hamlesini rastgele seçer, Zor ise rakibin lehinedir. Zorluk önceki ellerinizden öğrenmez ve geçmişinize göre uyum sağlamaz — her el kendi başına belirlenir. Ayarlar → Zorluk bölümünden değiştirebilirsiniz.",
      },
      {
        q: "Günlük Görev nasıl çalışır?",
        a: "Her yerel takvim günü için ulaşılacak bir hedefi olan tek bir görev vardır: belirli sayıda el kazanmak, belirli bir hamleyle kazanmak, belirli sayıda berabere kalmak ya da bir galibiyet serisine ulaşmak. Görev yerel gece yarısında değişir ve bir önceki günün ilerlemesi devretmez.",
      },
      {
        q: "Hangi başarımlar var?",
        a: "Dört tane: İlk Galibiyet, 3'lü Seri, günün Günlük Görev'ini tamamlamaya verilen bir başarım — o gün hangisi gelirse — ve 10 El. Başarımlar skor tablosundan ayrı saklanır; bu yüzden oyunu sıfırlamak onları silmez.",
      },
      {
        q: "İlerlemem nerede saklanıyor?",
        a: "Cihazınızda. RPS Duel'de bulut kaydı, cihazlar arası eşitleme veya dışa aktarma yoktur; ilerleme bir cihazdan diğerine taşınamaz.",
      },
      {
        q: "RPS Duel iPhone'da var mı?",
        a: "Şu an için yok. RPS Duel, Google Play'de Android için yayınlanıyor.",
      },
    ],
    troubleshootingHeading: "Sorun giderme",
    troubleshooting: [
      {
        q: "Uygulama yanlış dilde",
        a: "Ayarlar → Dil bölümünü açıp English, Türkçe veya Español seçin. Siz bir dil seçene kadar uygulama cihazınızın dilini kullanır.",
      },
      {
        q: "Hiç ses duyamıyorum",
        a: "Ses varsayılan olarak açıktır. Önce Ayarlar → Ses seçeneğinin açık olduğunu, ardından cihazınızın ses düzeyini ve sessiz/titreşim düğmesini kontrol edin.",
      },
      {
        q: "Skor tablosuna sıfırdan başlamak istiyorum",
        a: "Ayarlar → Verileri sıfırla, skorlarınızı ve el geçmişinizi siler; uygulama bunu yapmadan önce onay ister. Başarımlarınız, genel kayıtlarınız ve ayarlarınız korunur. Bunun için Android'in kendi depolamayı temizleme seçeneğini kullanmayın: o seçenek yalnızca skor tablosunu değil, RPS Duel'in kaydettiği her şeyi — başarımlar ve kayıtlar dahil — siler.",
      },
    ],
    contactHeading: "Hâlâ yardım mı gerekiyor?",
    contactBody: "Sorunuzun yanıtı burada yoksa ya da uygulama bu sayfada anlatıldığı gibi davranmıyorsa bize yazın. Cihaz modelinizi, Android sürümünüzü ve o sırada ne yaptığınızı belirtmeniz sorunu yeniden oluşturmamıza yardımcı olur.",
    contactLabel: "Bize ulaşın",
    backLabel: "RPS Duel'e dön",
  },
  es: {
    eyebrow: "Lunexa Games",
    heading: "Soporte de RPS Duel",
    lead: "Respuestas a las preguntas que más recibimos sobre RPS Duel, y cómo contactarnos cuando algo no funciona.",
    facts: [
      "Android",
      "Sin cuenta",
      "Funciona sin conexión",
      "English · Türkçe · Español",
    ],
    linksHeading: "Enlaces",
    playLabel: "Disponible en Google Play",
    productLabel: "Acerca de RPS Duel",
    privacyLabel: "Política de privacidad",
    termsLabel: "Términos de servicio",
    faqHeading: "Preguntas frecuentes",
    faq: [
      {
        q: "¿Necesito una cuenta para jugar?",
        a: "No. RPS Duel no tiene inicio de sesión, ni perfil, ni juego en línea. Tus puntuaciones, logros y ajustes se quedan en tu dispositivo.",
      },
      {
        q: "¿El juego necesita conexión a internet?",
        a: "No. Las rondas, el Reto Diario, los logros y los récords funcionan sin conexión. La aplicación también muestra anuncios y, según tu región y tus elecciones, envía estadísticas de uso cuando hay conexión; la política de privacidad describe los datos implicados.",
      },
      {
        q: "¿Qué idiomas admite la aplicación?",
        a: "Inglés, turco y español. RPS Duel usa el idioma de tu dispositivo la primera vez que la abres, y puedes cambiarlo cuando quieras en Ajustes → Idioma.",
      },
      {
        q: "¿Cómo funcionan los niveles de dificultad?",
        a: "Fácil te favorece, Normal elige su jugada al azar y Difícil favorece al oponente. La dificultad no aprende de tus rondas anteriores ni se adapta a tu historial: cada ronda se decide por sí sola. Puedes cambiarla en Ajustes → Dificultad.",
      },
      {
        q: "¿Cómo funciona el Reto Diario?",
        a: "Hay un reto para cada día natural local, con un objetivo que alcanzar: ganar cierto número de rondas, ganar con una jugada concreta, empatar cierto número de rondas o alcanzar una racha de victorias. Cambia a medianoche local, y el progreso del reto del día anterior no se acumula.",
      },
      {
        q: "¿Qué logros hay?",
        a: "Cuatro: Primera victoria, Racha de 3, uno por completar el Reto Diario del día —sea el que sea— y 10 rondas. Los logros se guardan aparte del marcador, así que reiniciar el juego no los borra.",
      },
      {
        q: "¿Dónde se guarda mi progreso?",
        a: "En tu dispositivo. RPS Duel no tiene guardado en la nube, ni sincronización entre dispositivos, ni exportación, por lo que el progreso no se puede trasladar de un dispositivo a otro.",
      },
      {
        q: "¿RPS Duel está disponible para iPhone?",
        a: "De momento no. RPS Duel se publica para Android en Google Play.",
      },
    ],
    troubleshootingHeading: "Resolución de problemas",
    troubleshooting: [
      {
        q: "La aplicación está en el idioma equivocado",
        a: "Abre Ajustes → Idioma y elige English, Türkçe o Español. Hasta que elijas uno, la aplicación sigue el idioma de tu dispositivo.",
      },
      {
        q: "No oigo ningún sonido",
        a: "El sonido está activado por defecto. Comprueba que Ajustes → Sonido esté activado y luego revisa el volumen de tu dispositivo y su interruptor de silencio o vibración.",
      },
      {
        q: "Quiero empezar el marcador de cero",
        a: "Ajustes → Restablecer datos borra tus puntuaciones y el historial de rondas, y la aplicación te pide confirmación antes de hacerlo. Tus logros, récords generales y ajustes se conservan. Para esto no uses la opción de borrar almacenamiento de Android: esa elimina todo lo que RPS Duel ha guardado —logros y récords incluidos—, no solo el marcador.",
      },
    ],
    contactHeading: "¿Sigues necesitando ayuda?",
    contactBody: "Si tu pregunta no está respondida aquí, o la aplicación no se comporta como describe esta página, escríbenos. Indicarnos el modelo de tu dispositivo, tu versión de Android y qué estabas haciendo en ese momento nos ayuda a reproducir el problema.",
    contactLabel: "Contáctanos",
    backLabel: "Volver a RPS Duel",
  },
};

// ── RPS Duel privacy policy ──
// App-specific privacy policy. Single source of truth for the policy that
// the Play Store listing links to. Version 1.0.5 (Google Play, 2026-10-25)
// shows ads. The data section restates the Play Console data safety
// declaration for that release (four types, collected and shared; purposes
// advertising or marketing, analytics, and fraud prevention, security and
// compliance, also on the advertising ID). R-REL-07 (RPS 0edda9f, 87416b4;
// code 678ff0f): 1.0.5 sends Firebase Analytics usage statistics by default,
// with no in-app choice, independent of ad consent, and without the
// advertising ID; the Google Mobile Ads SDK purposes are attributed to
// Google's SDK disclosure. The local-data list follows the 678ff0f storage
// classes. The only retention stated is the owner-confirmed GA4 setting,
// scoped to Google Analytics; never state deletion routes. Patch B (RPS
// R-REL-08, owner decisions 2026-11-03) adds the 1.0.6 text as sections
// labelled (version 1.0.6) and keeps every 1.0.5 statement: opt-in usage
// statistics, UMP ad privacy choices (fail-closed), banners on Records and
// Collection, and the 1.0.5 upgrade note. Never label the
// 1.0.6 sections "1.0.6 and later": 1.1.0 changes the analytics default.
// R-REL-12 (RPS 80ddb88; supersedes R-REL-10/11, 1.0.7 and 1.1a ship as
// 1.1.0) adds sections labelled (version 1.1.0 and later): the documented
// region rule (EEA, UK, Switzerland, Türkiye opt-in; elsewhere on after a
// one-time notice; off when the region is unknown), the match-end
// full-screen ad, and matches, level and XP kept on the device. Update this
// and bump `lastUpdated` whenever the app's data behaviour changes.

export const RPS_DUEL_PRIVACY: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "RPS Duel · Privacy",
    heading: "RPS Duel — Privacy Policy",
    lastUpdated: "Last updated: 2026-11-03",
    intro:
      "RPS Duel is a single-player Rock Paper Scissors game for Android made by Lunexa Games (package id: com.lunexa.games.rpsduel). This policy describes the data handled by the current version of the app, including the data declared for it on Google Play, and the information the app stores on your device.",
    sections: [
      {
        title: "Summary",
        paragraphs: [
          "RPS Duel has no account or sign-in. Version 1.0.5, available on Google Play since October 25, 2026, shows ads. According to the data safety information declared for it on Google Play, the app also collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Version 1.0.5 also sends usage statistics to Google Analytics for Firebase automatically, without asking, to understand how the game is played. The usage statistics are described separately below. Versions before 1.0.5 did not show ads and did not collect or share this data.",
          "Version 1.0.6 shows ads. According to the data safety information declared for it on Google Play, the app collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Usage statistics are optional in version 1.0.6: the app sends them to Google Analytics for Firebase only if you allow it. Version 1.0.5 sent them automatically, without asking; see “Earlier versions and updating”.",
          "Version 1.1.0 and later show ads: banners on the Records and Collection screens and, between matches, a full-screen ad. According to the data safety information declared on Google Play, the app collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Whether the app sends usage statistics to Google Analytics for Firebase depends on where you are: in the European Economic Area, the United Kingdom, Switzerland and Türkiye only if you allow it; elsewhere after a one-time notice, until you turn them off; and not at all when the app cannot tell where you are. See “Usage statistics (version 1.1.0 and later)” and “Earlier versions and updating”.",
        ],
      },
      {
        title: "Data collected and shared (version 1.0.5)",
        paragraphs: [
          "The data safety information declared for RPS Duel 1.0.5 on Google Play lists the following data types. Each one is collected and shared with third parties, and the declared purposes of both the collection and the sharing are advertising or marketing; analytics; and fraud prevention, security and compliance:",
        ],
        bullets: [
          "Approximate location",
          "App interactions",
          "Diagnostics",
          "Device or other IDs",
        ],
      },
      {
        title: "How this data is handled (version 1.0.5)",
        paragraphs: [
          "The same declaration marks the collection of this data as required rather than optional, and states that the data is encrypted in transit.",
          "The third parties that receive this data handle it under their own privacy policies. Version 1.0.5 uses Google AdMob for its ads and Google Analytics for Firebase for usage statistics. RPS Duel does not ask for your name, email address or phone number.",
          "Version 1.0.5 shows its ads through Google AdMob, using the Google Mobile Ads SDK. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it.",
          "You can reset or delete your device's advertising ID in your Android settings; the available options depend on your Android version.",
        ],
      },
      {
        title: "Usage statistics (version 1.0.5)",
        paragraphs: [
          "Version 1.0.5 includes Google Analytics for Firebase and collects usage statistics by default: it does not ask before collecting them and has no setting to turn them off. The app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played.",
          "The Firebase software in the app also creates a random Firebase installation identifier. It is separate from the app-instance identifier and from your advertising ID, and Google Analytics sends it to Google together with the usage statistics.",
          "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Ad privacy choices that Google may ask you to make apply to ads only; they do not turn usage statistics on or off.",
          "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
        ],
      },
      {
        title: "Data collected and shared (version 1.0.6)",
        paragraphs: [
          "The data safety information declared for RPS Duel 1.0.6 on Google Play lists the following data types. Each one is collected and shared with third parties, and the declared purposes of both the collection and the sharing are advertising or marketing; analytics; and fraud prevention, security and compliance:",
        ],
        bullets: [
          "Approximate location",
          "App interactions",
          "Diagnostics",
          "Device or other IDs",
        ],
      },
      {
        title: "How this data is handled (version 1.0.6)",
        paragraphs: [
          "The same declaration marks the collection of this data as required rather than optional, and states that the data is encrypted in transit.",
          "The third parties that receive this data handle it under their own privacy policies. Version 1.0.6 uses Google AdMob for its ads, Google's User Messaging Platform to ask for and store your ad privacy choices, and, only if you allow it, Google Analytics for Firebase for usage statistics. RPS Duel does not ask for your name, email address or phone number.",
          "Version 1.0.6 shows banner ads through Google AdMob, using the Google Mobile Ads SDK, on the Records and Collection screens only, never during a duel. Every ad request asks Google to apply its treatment for users under the age of majority and limits ads to content rated G. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it. The data used for ads is needed for the app's ads and cannot be switched off in the app.",
          "You can reset or delete your device's advertising ID in your Android settings; the available options depend on your Android version.",
        ],
      },
      {
        title: "Your ad privacy choices (version 1.0.6)",
        paragraphs: [
          "When the app starts, it asks Google's consent service whether a privacy choice about ads is needed where you are. If it is, for example in the European Economic Area, the United Kingdom or Switzerland, a consent form appears the first time you open Records or Collection, never during a duel. Where Google requires it, Settings → Privacy choices lets you change your answer at any time. Refusing personalised ads, or choosing not to have your data sold or shared, does not remove ads; the ads you see are then not personalised. If the app cannot reach the consent service, it shows no ads until it can.",
        ],
      },
      {
        title: "Usage statistics (version 1.0.6)",
        paragraphs: [
          "Version 1.0.6 includes Google Analytics for Firebase, but collects usage statistics only if you allow it. Before your first move, the app asks once whether you want to help improve RPS Duel; “Allow” and “Don't allow” are equally prominent, and the game works the same either way. You can change your answer at any time in Settings → Usage statistics. If you allow it, the app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, and whether a banner ad was requested, loaded or shown, with any error code, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played.",
          "The Firebase software in the app also creates a random Firebase installation identifier. It is separate from the app-instance identifier and from your advertising ID, and Google Analytics sends it to Google together with the usage statistics.",
          "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Your usage-statistics choice and your ad privacy choices are separate: neither changes the other. If you turn usage statistics off, the app stops sending them and deletes the analytics data stored on your device, including the app-instance identifier.",
          "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
        ],
      },
      {
        title: "Data collected and shared (version 1.1.0 and later)",
        paragraphs: [
          "The data safety information declared for RPS Duel 1.1.0 on Google Play lists the following data types. Each one is collected and shared with third parties, and the declared purposes of both the collection and the sharing are advertising or marketing; analytics; and fraud prevention, security and compliance:",
        ],
        bullets: [
          "Approximate location",
          "App interactions",
          "Diagnostics",
          "Device or other IDs",
        ],
      },
      {
        title: "How this data is handled (version 1.1.0 and later)",
        paragraphs: [
          "The same declaration marks the collection of this data as required rather than optional, and states that the data is encrypted in transit.",
          "The third parties that receive this data handle it under their own privacy policies. The app uses Google AdMob for its ads, Google's User Messaging Platform to ask for and store your ad privacy choices, and, when usage statistics are on, Google Analytics for Firebase. RPS Duel does not ask for your name, email address or phone number.",
          "The app shows its ads through Google AdMob, using the Google Mobile Ads SDK: banners on the Records and Collection screens, and a full-screen ad between matches. Neither appears during a duel. Every ad request asks Google to apply its treatment for users under the age of majority and limits ads to content rated G. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it. The data used for ads is needed for the app's ads and cannot be switched off in the app.",
          "The full-screen ad can appear only when you leave a match's result card for the next match. It is never shown during a match, after the first match after the app starts, more often than once every two completed matches, or within two minutes of the previous one, and it is not requested while Google's consent form is still waiting for your answer. If no ad is ready, the next match starts at once.",
          "You can reset or delete your device's advertising ID in your Android settings; the available options depend on your Android version.",
        ],
      },
      {
        title: "Your ad privacy choices (version 1.1.0 and later)",
        paragraphs: [
          "When the app starts, it asks Google's consent service whether a privacy choice about ads is needed where you are. If it is, for example in the European Economic Area, the United Kingdom or Switzerland, a consent form appears the first time you open Records or Collection, never during a duel. Where Google requires it, Settings → Privacy choices lets you change your answer at any time. Refusing personalised ads, or choosing not to have your data sold or shared, does not remove ads; the ads you see are then not personalised. If the app cannot reach the consent service, it shows no ads until it can.",
        ],
      },
      {
        title: "Usage statistics (version 1.1.0 and later)",
        paragraphs: [
          "The app includes Google Analytics for Firebase. When usage statistics are on, the app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, and whether an ad (a banner or the full-screen ad) was requested, loaded, shown or closed, with any error code, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played. The game works the same whether usage statistics are on or off.",
        ],
        bullets: [
          "In the European Economic Area, the United Kingdom, Switzerland and Türkiye, usage statistics are off unless you allow them. Before your first move, or between rounds if the app learns where you are later, the app asks once whether you want to help improve RPS Duel; “Allow” and “Don't allow” are equally prominent.",
          "Elsewhere, the app shows a one-time notice before your first move, or between rounds, explaining what is collected. Usage statistics start only after that notice, unless you choose “Turn off” there.",
          "If the app cannot tell where you are, for example when it is offline or Google's consent service does not answer, usage statistics stay off and the app tries again later.",
          "Wherever you are, you can turn usage statistics on or off at any time in Settings → Usage statistics, and an answer you have given is kept.",
        ],
        afterBullets: [
          "To decide whether you are in the European Economic Area, the United Kingdom or Switzerland, the app uses the answer of Google's consent service (the same one used for your ad privacy choices). To decide whether you are in Türkiye, it uses your SIM card's country or, without a SIM card, whether your device or app language or region is Turkish. The app does not store this information or send it anywhere, and checks it again each time it starts. These signals can be wrong, for example when you travel or use a VPN; then the rule for the region the app detects applies, and Settings still lets you change your choice.",
          "The Firebase software in the app also creates a random Firebase installation identifier. It is separate from the app-instance identifier and from your advertising ID, and Google Analytics sends it to Google together with the usage statistics.",
          "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Your usage-statistics choice and your ad privacy choices are separate: neither changes the other. If you turn usage statistics off, the app stops sending them and deletes the analytics data stored on your device, including the app-instance identifier.",
          "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
        ],
      },
      {
        title: "Earlier versions and updating",
        paragraphs: [
          "Version 1.0.5, on Google Play from October 25, 2026, collected usage statistics automatically, without asking. When you update to 1.0.6, collection stays off until you choose otherwise, and the analytics data that 1.0.5 stored on your device is deleted. Usage statistics that 1.0.5 already sent to Google are not deleted by the update; Google Analytics keeps them for the periods described above.",
          "Version 1.0.6 asked everyone before collecting usage statistics. When you update to 1.1.0 from 1.0.6, an answer you gave there is kept; if you did not answer, the rules in “Usage statistics (version 1.1.0 and later)” apply. When you update from 1.0.5, the analytics data that 1.0.5 stored on your device is deleted first, and the same rules then apply.",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your progress and preferences between sessions, the app saves gameplay data on your device, such as:",
        ],
        bullets: [
          "Game scores and your round history (up to your last 500 rounds)",
          "Lifetime totals (rounds played, wins and ties)",
          "Selected interface language (English, Turkish, or Spanish)",
          "Selected CPU difficulty (Easy, Normal, or Hard)",
          "Sound setting (on or off)",
          "Daily challenge progress for the current day (resets automatically at local midnight)",
          "Achievement flags (four in total)",
          "Collected moments, with the date of each",
          "In version 1.0.6: your usage-statistics choice (allowed or not allowed)",
          "In version 1.0.6: your ad privacy choices, saved by Google's consent software",
          "From version 1.1.0: whether the one-time usage-statistics notice has been shown",
          "From version 1.1.0: your level and experience points (XP)",
          "From version 1.1.0: the match in progress and your chosen match format (best of 3 or best of 5)",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "Inside the app, Settings → Reset data clears your game scores and round history. The other items listed above — your language, difficulty and sound settings, lifetime totals, daily challenge progress, achievement flags, collected moments, your usage-statistics choice and your ad privacy choices — are kept. To remove all of the data listed above, use your operating system's normal app controls instead: clear the app's storage or uninstall the app (Android). That is a broader action than Reset data.",
          "These steps affect only the data stored on your device. They do not delete data that has already been collected and shared as described above.",
          "In version 1.0.6, turning off Settings → Usage statistics deletes the analytics data stored on your device; it does not delete statistics already sent.",
          "From version 1.1.0, Reset data also clears the match in progress. Your match-format setting, your level and XP and whether the usage-statistics notice has been shown are kept, like the other items above.",
        ],
      },
      {
        title: "Children and teens",
        paragraphs: [
          "RPS Duel does not target children specifically, and Lunexa does not knowingly collect personal information from children under 13.",
          "In version 1.0.6 and later, the app does not ask for your age. Because some players may be teenagers, every ad request asks Google to apply its treatment for users under the age of majority, and ads are limited to content rated G. Choices about usage statistics and ad privacy are made by the player in the app.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of RPS Duel changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes. The policy was updated for version 1.0.5, which added ads and usage statistics, and again for version 1.0.6, which asks before collecting usage statistics, adds ad privacy choices and shows a second banner on the Collection screen, and for version 1.1.0, which turns usage statistics on after a one-time notice outside the European Economic Area, the United Kingdom, Switzerland and Türkiye, adds matches and levels kept on your device, and shows a full-screen ad between matches.",
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
    lastUpdated: "Son güncelleme: 03.11.2026",
    intro:
      "RPS Duel, Lunexa Games tarafından geliştirilmiş, Android için tek oyunculu bir Taş Kâğıt Makas oyunudur (paket kimliği: com.lunexa.games.rpsduel). Bu politika, Google Play'de beyan edilen veriler dahil olmak üzere uygulamanın güncel sürümünün işlediği verileri ve uygulamanın cihazında sakladığı bilgileri açıklar.",
    sections: [
      {
        title: "Özet",
        paragraphs: [
          "RPS Duel'de hesap veya giriş yoktur. 25 Ekim 2026'dan beri Google Play'de bulunan 1.0.5 sürümü reklam gösterir. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama ayrıca, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. 1.0.5 sürümü ayrıca, oyunun nasıl oynandığını anlamak için kullanım istatistiklerini sormadan, otomatik olarak Google Analytics for Firebase'e gönderir. Kullanım istatistikleri aşağıda ayrıca açıklanmıştır. 1.0.5'ten önceki sürümler reklam göstermiyor, bu verileri toplamıyor ve paylaşmıyordu.",
          "1.0.6 sürümü reklam gösterir. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. 1.0.6 sürümünde kullanım istatistikleri isteğe bağlıdır: uygulama bunları yalnızca izin verirsen Google Analytics for Firebase'e gönderir. 1.0.5 sürümü bunları sormadan, otomatik olarak gönderiyordu; “Önceki sürümler ve güncelleme” bölümüne bak.",
          "1.1.0 ve sonraki sürümler reklam gösterir: Kayıtlar ve Koleksiyon ekranlarında banner ve maçlar arasında tam ekran bir reklam. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. Uygulamanın kullanım istatistiklerini Google Analytics for Firebase'e gönderip göndermediği bulunduğun yere bağlıdır: Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye'de yalnızca izin verirsen; diğer yerlerde tek seferlik bir bildirimden sonra, sen kapatana kadar; uygulama nerede olduğunu anlayamazsa hiç göndermez. “Kullanım istatistikleri (1.1.0 ve sonraki sürümler)” ve “Önceki sürümler ve güncelleme” bölümlerine bak.",
        ],
      },
      {
        title: "Toplanan ve paylaşılan veriler (1.0.5 sürümü)",
        paragraphs: [
          "RPS Duel 1.0.5 için Google Play'de beyan edilen veri güvenliği bilgileri aşağıdaki veri türlerini listeler. Her biri toplanır ve üçüncü taraflarla paylaşılır; hem toplamanın hem de paylaşmanın beyan edilen amaçları reklam veya pazarlama; analiz; dolandırıcılığı önleme, güvenlik ve uyumluluktur:",
        ],
        bullets: [
          "Yaklaşık konum",
          "Uygulama etkileşimleri",
          "Teşhis verileri",
          "Cihaz veya diğer kimlikler",
        ],
      },
      {
        title: "Bu verilerin nasıl işlendiği (1.0.5 sürümü)",
        paragraphs: [
          "Aynı beyan, bu verilerin toplanmasını isteğe bağlı değil zorunlu olarak işaretler ve verilerin aktarım sırasında şifrelendiğini belirtir.",
          "Bu verileri alan üçüncü taraflar, verileri kendi gizlilik politikalarına göre işler. 1.0.5 sürümü reklamlar için Google AdMob'u, kullanım istatistikleri için Google Analytics for Firebase'i kullanır. RPS Duel adını, e-posta adresini veya telefon numaranı istemez.",
          "1.0.5 sürümü reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden gösterir. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz.",
          "Cihazının reklam kimliğini Android ayarlarından sıfırlayabilir veya silebilirsin; kullanılabilen seçenekler Android sürümüne bağlıdır.",
        ],
      },
      {
        title: "Kullanım istatistikleri (1.0.5 sürümü)",
        paragraphs: [
          "1.0.5 sürümü Google Analytics for Firebase'i içerir ve kullanım istatistiklerini varsayılan olarak toplar: toplamadan önce sormaz ve bunları kapatmak için bir ayarı yoktur. Uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında bunu, arayüz dilin ve seçili zorlukla birlikte kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır.",
          "Uygulamadaki Firebase yazılımı ayrıca rastgele bir Firebase kurulum kimliği oluşturur. Bu kimlik, uygulama örneği kimliğinden ve reklam kimliğinden ayrıdır; Google Analytics bunu kullanım istatistikleriyle birlikte Google'a gönderir.",
          "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Google'ın sana sorabileceği reklam gizlilik tercihleri yalnızca reklamlar için geçerlidir; kullanım istatistiklerini açmaz veya kapatmaz.",
          "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
        ],
      },
      {
        title: "Toplanan ve paylaşılan veriler (1.0.6 sürümü)",
        paragraphs: [
          "RPS Duel 1.0.6 için Google Play'de beyan edilen veri güvenliği bilgileri aşağıdaki veri türlerini listeler. Her biri toplanır ve üçüncü taraflarla paylaşılır; hem toplamanın hem de paylaşmanın beyan edilen amaçları reklam veya pazarlama; analiz; dolandırıcılığı önleme, güvenlik ve uyumluluktur:",
        ],
        bullets: [
          "Yaklaşık konum",
          "Uygulama etkileşimleri",
          "Teşhis verileri",
          "Cihaz veya diğer kimlikler",
        ],
      },
      {
        title: "Bu verilerin nasıl işlendiği (1.0.6 sürümü)",
        paragraphs: [
          "Aynı beyan, bu verilerin toplanmasını isteğe bağlı değil zorunlu olarak işaretler ve verilerin aktarım sırasında şifrelendiğini belirtir.",
          "Bu verileri alan üçüncü taraflar, verileri kendi gizlilik politikalarına göre işler. 1.0.6 sürümü reklamlar için Google AdMob'u, reklam gizlilik tercihlerini sormak ve saklamak için Google'ın Kullanıcı Mesajlaşma Platformu'nu ve yalnızca izin verirsen kullanım istatistikleri için Google Analytics for Firebase'i kullanır. RPS Duel adını, e-posta adresini veya telefon numaranı istemez.",
          "1.0.6 sürümü banner reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden yalnızca Kayıtlar ve Koleksiyon ekranlarında gösterir, düello sırasında asla göstermez. Her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz. Reklamlar için kullanılan veriler uygulamadaki reklamlar için gereklidir ve uygulama içinden kapatılamaz.",
          "Cihazının reklam kimliğini Android ayarlarından sıfırlayabilir veya silebilirsin; kullanılabilen seçenekler Android sürümüne bağlıdır.",
        ],
      },
      {
        title: "Reklam gizlilik tercihlerin (1.0.6 sürümü)",
        paragraphs: [
          "Uygulama açıldığında, bulunduğun yerde reklamlarla ilgili bir gizlilik tercihi gerekip gerekmediğini Google'ın onay hizmetine sorar. Gerekiyorsa, örneğin Avrupa Ekonomik Alanı, Birleşik Krallık veya İsviçre'de, onay formu Kayıtlar'ı veya Koleksiyon'u ilk açtığında görünür; düello sırasında asla görünmez. Google'ın gerektirdiği yerlerde Ayarlar → Gizlilik tercihleri ile yanıtını istediğin zaman değiştirebilirsin. Kişiselleştirilmiş reklamları reddetmek ya da verilerinin satılmamasını veya paylaşılmamasını seçmek reklamları kaldırmaz; o durumda gördüğün reklamlar kişiselleştirilmez. Uygulama onay hizmetine ulaşamazsa, ulaşana kadar reklam göstermez.",
        ],
      },
      {
        title: "Kullanım istatistikleri (1.0.6 sürümü)",
        paragraphs: [
          "1.0.6 sürümü Google Analytics for Firebase'i içerir, ancak kullanım istatistiklerini yalnızca izin verirsen toplar. İlk hamlenden önce uygulama, RPS Duel'i geliştirmeye yardım etmek isteyip istemediğini bir kez sorar; “İzin ver” ve “İzin verme” eşit ağırlıktadır ve oyun her iki durumda da aynı çalışır. Yanıtını istediğin zaman Ayarlar → Kullanım istatistikleri'nden değiştirebilirsin. İzin verirsen uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında ve bir banner reklamın istenip istenmediğini, yüklenip yüklenmediğini veya gösterilip gösterilmediğini, varsa hata koduyla birlikte, arayüz dilin ve seçili zorlukla kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır.",
          "Uygulamadaki Firebase yazılımı ayrıca rastgele bir Firebase kurulum kimliği oluşturur. Bu kimlik, uygulama örneği kimliğinden ve reklam kimliğinden ayrıdır; Google Analytics bunu kullanım istatistikleriyle birlikte Google'a gönderir.",
          "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Kullanım istatistikleri tercihin ile reklam gizlilik tercihlerin birbirinden ayrıdır; biri diğerini değiştirmez. Kullanım istatistiklerini kapatırsan uygulama bunları göndermeyi bırakır ve uygulama örneği kimliği dahil cihazında saklanan analiz verilerini siler.",
          "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
        ],
      },
      {
        title: "Toplanan ve paylaşılan veriler (1.1.0 ve sonraki sürümler)",
        paragraphs: [
          "RPS Duel 1.1.0 için Google Play'de beyan edilen veri güvenliği bilgileri aşağıdaki veri türlerini listeler. Her biri toplanır ve üçüncü taraflarla paylaşılır; hem toplamanın hem de paylaşmanın beyan edilen amaçları reklam veya pazarlama; analiz; dolandırıcılığı önleme, güvenlik ve uyumluluktur:",
        ],
        bullets: [
          "Yaklaşık konum",
          "Uygulama etkileşimleri",
          "Teşhis verileri",
          "Cihaz veya diğer kimlikler",
        ],
      },
      {
        title: "Bu verilerin nasıl işlendiği (1.1.0 ve sonraki sürümler)",
        paragraphs: [
          "Aynı beyan, bu verilerin toplanmasını isteğe bağlı değil zorunlu olarak işaretler ve verilerin aktarım sırasında şifrelendiğini belirtir.",
          "Bu verileri alan üçüncü taraflar, verileri kendi gizlilik politikalarına göre işler. Uygulama reklamlar için Google AdMob'u, reklam gizlilik tercihlerini sormak ve saklamak için Google'ın Kullanıcı Mesajlaşma Platformu'nu ve kullanım istatistikleri açıkken Google Analytics for Firebase'i kullanır. RPS Duel adını, e-posta adresini veya telefon numaranı istemez.",
          "Uygulama reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden gösterir: Kayıtlar ve Koleksiyon ekranlarında banner ve maçlar arasında tam ekran bir reklam. İkisi de düello sırasında asla görünmez. Her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz. Reklamlar için kullanılan veriler uygulamadaki reklamlar için gereklidir ve uygulama içinden kapatılamaz.",
          "Tam ekran reklam yalnızca bir maçın sonuç kartından bir sonraki maça geçerken görünebilir. Maç sırasında, uygulama açıldıktan sonraki ilk maçın ardından, her iki tamamlanan maçta birden sık veya bir öncekinden sonraki iki dakika içinde asla gösterilmez ve Google'ın onay formu yanıtını beklerken istenmez. Hazır bir reklam yoksa sonraki maç hemen başlar.",
          "Cihazının reklam kimliğini Android ayarlarından sıfırlayabilir veya silebilirsin; kullanılabilen seçenekler Android sürümüne bağlıdır.",
        ],
      },
      {
        title: "Reklam gizlilik tercihlerin (1.1.0 ve sonraki sürümler)",
        paragraphs: [
          "Uygulama açıldığında, bulunduğun yerde reklamlarla ilgili bir gizlilik tercihi gerekip gerekmediğini Google'ın onay hizmetine sorar. Gerekiyorsa, örneğin Avrupa Ekonomik Alanı, Birleşik Krallık veya İsviçre'de, onay formu Kayıtlar'ı veya Koleksiyon'u ilk açtığında görünür; düello sırasında asla görünmez. Google'ın gerektirdiği yerlerde Ayarlar → Gizlilik tercihleri ile yanıtını istediğin zaman değiştirebilirsin. Kişiselleştirilmiş reklamları reddetmek ya da verilerinin satılmamasını veya paylaşılmamasını seçmek reklamları kaldırmaz; o durumda gördüğün reklamlar kişiselleştirilmez. Uygulama onay hizmetine ulaşamazsa, ulaşana kadar reklam göstermez.",
        ],
      },
      {
        title: "Kullanım istatistikleri (1.1.0 ve sonraki sürümler)",
        paragraphs: [
          "Uygulama Google Analytics for Firebase'i içerir. Kullanım istatistikleri açıkken uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında ve bir reklamın (banner veya tam ekran reklam) istenip istenmediğini, yüklenip yüklenmediğini, gösterilip gösterilmediğini veya kapatılıp kapatılmadığını, varsa hata koduyla birlikte, arayüz dilin ve seçili zorlukla kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır. Oyun, kullanım istatistikleri açık da olsa kapalı da olsa aynı çalışır.",
        ],
        bullets: [
          "Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye'de kullanım istatistikleri sen izin vermedikçe kapalıdır. İlk hamlenden önce, ya da uygulama nerede olduğunu daha sonra öğrenirse eller arasında, uygulama RPS Duel'i geliştirmeye yardım etmek isteyip istemediğini bir kez sorar; “İzin ver” ve “İzin verme” eşit ağırlıktadır.",
          "Diğer yerlerde uygulama, ilk hamlenden önce ya da eller arasında, neyin toplandığını açıklayan tek seferlik bir bildirim gösterir. Kullanım istatistikleri yalnızca bu bildirimden sonra başlar; bildirimde “Kapat”ı seçersen başlamaz.",
          "Uygulama nerede olduğunu anlayamazsa, örneğin çevrimdışıyken veya Google'ın onay hizmeti yanıt vermezse, kullanım istatistikleri kapalı kalır ve uygulama daha sonra yeniden dener.",
          "Nerede olursan ol, kullanım istatistiklerini istediğin zaman Ayarlar → Kullanım istatistikleri'nden açıp kapatabilirsin; verdiğin yanıt korunur.",
        ],
        afterBullets: [
          "Avrupa Ekonomik Alanı, Birleşik Krallık veya İsviçre'de olup olmadığına karar vermek için uygulama, Google'ın onay hizmetinin (reklam gizlilik tercihlerinde kullanılan hizmet) yanıtını kullanır. Türkiye'de olup olmadığına karar vermek için SIM kartının ülkesini, SIM kart yoksa cihazının ya da uygulamanın dilinin veya bölgesinin Türkçe/Türkiye olup olmadığını kullanır. Uygulama bu bilgiyi saklamaz, hiçbir yere göndermez ve her açılışta yeniden kontrol eder. Bu işaretler yanılabilir, örneğin seyahatte veya VPN kullanırken; o durumda uygulamanın algıladığı bölgenin kuralı uygulanır ve tercihini yine Ayarlar'dan değiştirebilirsin.",
          "Uygulamadaki Firebase yazılımı ayrıca rastgele bir Firebase kurulum kimliği oluşturur. Bu kimlik, uygulama örneği kimliğinden ve reklam kimliğinden ayrıdır; Google Analytics bunu kullanım istatistikleriyle birlikte Google'a gönderir.",
          "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Kullanım istatistikleri tercihin ile reklam gizlilik tercihlerin birbirinden ayrıdır; biri diğerini değiştirmez. Kullanım istatistiklerini kapatırsan uygulama bunları göndermeyi bırakır ve uygulama örneği kimliği dahil cihazında saklanan analiz verilerini siler.",
          "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
        ],
      },
      {
        title: "Önceki sürümler ve güncelleme",
        paragraphs: [
          "25 Ekim 2026'dan itibaren Google Play'de bulunan 1.0.5 sürümü, kullanım istatistiklerini sormadan, otomatik olarak topluyordu. 1.0.6'ya güncellediğinde toplama, sen aksini seçene kadar kapalı kalır ve 1.0.5'in cihazında sakladığı analiz verileri silinir. 1.0.5'in daha önce Google'a gönderdiği kullanım istatistikleri güncellemeyle silinmez; Google Analytics bunları yukarıda açıklanan süreler boyunca saklar.",
          "1.0.6 sürümü kullanım istatistiklerini toplamadan önce herkese soruyordu. 1.0.6'dan 1.1.0'a güncellediğinde orada verdiğin yanıt korunur; yanıt vermediysen “Kullanım istatistikleri (1.1.0 ve sonraki sürümler)” bölümündeki kurallar uygulanır. 1.0.5'ten güncellediğinde, önce 1.0.5'in cihazında sakladığı analiz verileri silinir, ardından aynı kurallar uygulanır.",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ilerlemeni ve tercihlerini hatırlamak için uygulama, cihazına aşağıdakiler gibi oyun verileri kaydeder:",
        ],
        bullets: [
          "Oyun skorları ve el geçmişin (son 500 ele kadar)",
          "Toplam istatistikler (oynanan el, galibiyet ve beraberlik sayısı)",
          "Seçili arayüz dili (İngilizce, Türkçe veya İspanyolca)",
          "Seçili CPU zorluğu (Kolay, Normal veya Zor)",
          "Ses ayarı (açık veya kapalı)",
          "Bugünkü günlük meydan okuma ilerlemen (yerel gece yarısında otomatik sıfırlanır)",
          "Başarım bayrakları (toplam dört adet)",
          "Toplanan anlar ve her birinin tarihi",
          "1.0.6 sürümünde: kullanım istatistikleri tercihin (izin verildi veya verilmedi)",
          "1.0.6 sürümünde: Google'ın onay yazılımının kaydettiği reklam gizlilik tercihlerin",
          "1.1.0 sürümünden itibaren: tek seferlik kullanım istatistikleri bildiriminin gösterilip gösterilmediği",
          "1.1.0 sürümünden itibaren: seviyen ve deneyim puanların (XP)",
          "1.1.0 sürümünden itibaren: devam eden maç ve seçtiğin maç biçimi (3'te 2 veya 5'te 3)",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Uygulama içinde Ayarlar → Verileri sıfırla, oyun skorlarını ve el geçmişini siler. Yukarıda listelenen diğer veriler — dil, zorluk ve ses ayarların, toplam istatistiklerin, günlük meydan okuma ilerlemen, başarım bayrakların, toplanan anların, kullanım istatistikleri tercihin ve reklam gizlilik tercihlerin — korunur. Yukarıda listelenen verilerin tamamını kaldırmak için bunun yerine işletim sisteminin normal uygulama kontrollerini kullan: uygulamanın depolamasını temizle veya uygulamayı kaldır (Android). Bu, Verileri sıfırla işleminden daha kapsamlı bir işlemdir.",
          "Bu adımlar yalnızca cihazında saklanan verileri etkiler. Yukarıda açıklandığı gibi daha önce toplanmış ve paylaşılmış verileri silmez.",
          "1.0.6 sürümünde Ayarlar → Kullanım istatistikleri'ni kapatmak cihazında saklanan analiz verilerini siler; daha önce gönderilmiş istatistikleri silmez.",
          "1.1.0 sürümünden itibaren Verileri sıfırla, devam eden maçı da siler. Maç biçimi ayarın, seviyen ve XP'n ve kullanım istatistikleri bildiriminin gösterilip gösterilmediği, yukarıdaki diğer veriler gibi korunur.",
        ],
      },
      {
        title: "Çocuklar ve gençler",
        paragraphs: [
          "RPS Duel özellikle çocuklara yönelik değildir ve Lunexa, 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz.",
          "1.0.6 ve sonraki sürümlerde uygulama yaşını sormaz. Bazı oyuncular genç olabileceği için her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Kullanım istatistikleri ve reklam gizliliğiyle ilgili tercihleri uygulamada oyuncu yapar.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "RPS Duel'in ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, reklam ve kullanım istatistikleri ekleyen 1.0.5 sürümü için; kullanım istatistiklerinden önce izin isteyen, reklam gizlilik tercihleri ekleyen ve Koleksiyon ekranında ikinci bir banner gösteren 1.0.6 sürümü için; ve kullanım istatistiklerini Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra açan, cihazında saklanan maçlar ve seviyeler ekleyen ve maçlar arasında tam ekran bir reklam gösteren 1.1.0 sürümü için güncellenmiştir.",
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
    lastUpdated: "Última actualización: 2026-11-03",
    intro:
      "RPS Duel es un juego de Piedra Papel Tijera para un solo jugador para Android creado por Lunexa Games (id de paquete: com.lunexa.games.rpsduel). Esta política describe los datos que trata la versión actual de la aplicación, incluidos los declarados para ella en Google Play, y la información que la aplicación guarda en tu dispositivo.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "RPS Duel no tiene cuentas ni inicio de sesión. La versión 1.0.5, disponible en Google Play desde el 25 de octubre de 2026, muestra anuncios. Según la información de seguridad de los datos declarada en Google Play, la aplicación también recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. La versión 1.0.5 también envía estadísticas de uso a Google Analytics for Firebase automáticamente, sin preguntar, para entender cómo se juega. Las estadísticas de uso se describen por separado más abajo. Las versiones anteriores a la 1.0.5 no mostraban anuncios y no recopilaban ni compartían estos datos.",
          "La versión 1.0.6 muestra anuncios. Según la información de seguridad de los datos declarada en Google Play, la aplicación recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. En la versión 1.0.6 las estadísticas de uso son opcionales: la aplicación solo las envía a Google Analytics for Firebase si lo permites. La versión 1.0.5 las enviaba automáticamente, sin preguntar; consulta “Versiones anteriores y actualización”.",
          "La versión 1.1.0 y las posteriores muestran anuncios: banners en las pantallas Registros y Colección y, entre partidos, un anuncio a pantalla completa. Según la información de seguridad de los datos declarada en Google Play, la aplicación recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. Que la aplicación envíe estadísticas de uso a Google Analytics for Firebase depende de dónde estés: en el Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, solo si lo permites; en el resto de lugares, tras un aviso único, hasta que las desactives; y nunca si la aplicación no puede saber dónde estás. Consulta “Estadísticas de uso (versión 1.1.0 y posteriores)” y “Versiones anteriores y actualización”.",
        ],
      },
      {
        title: "Datos recopilados y compartidos (versión 1.0.5)",
        paragraphs: [
          "La información de seguridad de los datos declarada en Google Play para RPS Duel 1.0.5 incluye los siguientes tipos de datos. Cada uno se recopila y se comparte con terceros, y las finalidades declaradas tanto de la recopilación como del uso compartido son publicidad o marketing; análisis; y prevención del fraude, seguridad y cumplimiento:",
        ],
        bullets: [
          "Ubicación aproximada",
          "Interacciones con la aplicación",
          "Diagnóstico",
          "Dispositivo u otros identificadores",
        ],
      },
      {
        title: "Cómo se tratan estos datos (versión 1.0.5)",
        paragraphs: [
          "La misma declaración indica que la recopilación de estos datos es obligatoria, no opcional, y que los datos se cifran en tránsito.",
          "Los terceros que reciben estos datos los tratan conforme a sus propias políticas de privacidad. La versión 1.0.5 usa Google AdMob para los anuncios y Google Analytics for Firebase para las estadísticas de uso. RPS Duel no te pide tu nombre, tu correo electrónico ni tu número de teléfono.",
          "La versión 1.0.5 muestra sus anuncios a través de Google AdMob, mediante el SDK de Google Mobile Ads. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila.",
          "Puedes restablecer o eliminar el identificador de publicidad de tu dispositivo en los ajustes de Android; las opciones disponibles dependen de tu versión de Android.",
        ],
      },
      {
        title: "Estadísticas de uso (versión 1.0.5)",
        paragraphs: [
          "La versión 1.0.5 incluye Google Analytics for Firebase y recopila estadísticas de uso de forma predeterminada: no pregunta antes de recopilarlas y no tiene ningún ajuste para desactivarlas. La aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega.",
          "El software Firebase de la aplicación también crea un identificador aleatorio de instalación de Firebase. Es distinto del identificador de instancia de la aplicación y de tu identificador de publicidad, y Google Analytics lo envía a Google junto con las estadísticas de uso.",
          "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Las opciones de privacidad para los anuncios que Google pueda pedirte solo se aplican a los anuncios; no activan ni desactivan las estadísticas de uso.",
          "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
        ],
      },
      {
        title: "Datos recopilados y compartidos (versión 1.0.6)",
        paragraphs: [
          "La información de seguridad de los datos declarada en Google Play para RPS Duel 1.0.6 incluye los siguientes tipos de datos. Cada uno se recopila y se comparte con terceros, y las finalidades declaradas tanto de la recopilación como del uso compartido son publicidad o marketing; análisis; y prevención del fraude, seguridad y cumplimiento:",
        ],
        bullets: [
          "Ubicación aproximada",
          "Interacciones con la aplicación",
          "Diagnóstico",
          "Dispositivo u otros identificadores",
        ],
      },
      {
        title: "Cómo se tratan estos datos (versión 1.0.6)",
        paragraphs: [
          "La misma declaración indica que la recopilación de estos datos es obligatoria, no opcional, y que los datos se cifran en tránsito.",
          "Los terceros que reciben estos datos los tratan conforme a sus propias políticas de privacidad. La versión 1.0.6 usa Google AdMob para los anuncios, la Plataforma de Mensajes para Usuarios de Google para pedir y guardar tus opciones de privacidad publicitaria y, solo si lo permites, Google Analytics for Firebase para las estadísticas de uso. RPS Duel no te pide tu nombre, tu correo electrónico ni tu número de teléfono.",
          "La versión 1.0.6 muestra anuncios de banner a través de Google AdMob, mediante el SDK de Google Mobile Ads, solo en las pantallas Registros y Colección, nunca durante un duelo. Cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad y limita los anuncios a contenido con clasificación G. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila. Los datos usados para los anuncios son necesarios para los anuncios de la aplicación y no se pueden desactivar en ella.",
          "Puedes restablecer o eliminar el identificador de publicidad de tu dispositivo en los ajustes de Android; las opciones disponibles dependen de tu versión de Android.",
        ],
      },
      {
        title: "Tus opciones de privacidad publicitaria (versión 1.0.6)",
        paragraphs: [
          "Al iniciarse, la aplicación consulta al servicio de consentimiento de Google si se necesita una elección de privacidad sobre anuncios donde estás. Si es así, por ejemplo en el Espacio Económico Europeo, el Reino Unido o Suiza, aparece un formulario de consentimiento la primera vez que abres Registros o Colección, nunca durante un duelo. Donde Google lo exija, Ajustes → Opciones de privacidad te permite cambiar tu respuesta en cualquier momento. Rechazar los anuncios personalizados, o elegir que no se vendan ni compartan tus datos, no elimina los anuncios; los anuncios que veas no estarán personalizados. Si la aplicación no puede contactar con el servicio de consentimiento, no muestra anuncios hasta que pueda.",
        ],
      },
      {
        title: "Estadísticas de uso (versión 1.0.6)",
        paragraphs: [
          "La versión 1.0.6 incluye Google Analytics for Firebase, pero solo recopila estadísticas de uso si lo permites. Antes de tu primer movimiento, la aplicación te pregunta una vez si quieres ayudar a mejorar RPS Duel; “Permitir” y “No permitir” tienen el mismo peso, y el juego funciona igual en ambos casos. Puedes cambiar tu respuesta en cualquier momento en Ajustes → Estadísticas de uso. Si lo permites, la aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, y si un anuncio de banner se solicitó, cargó o mostró, con su código de error si lo hay, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega.",
          "El software Firebase de la aplicación también crea un identificador aleatorio de instalación de Firebase. Es distinto del identificador de instancia de la aplicación y de tu identificador de publicidad, y Google Analytics lo envía a Google junto con las estadísticas de uso.",
          "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria son independientes: ninguna cambia la otra. Si desactivas las estadísticas de uso, la aplicación deja de enviarlas y borra los datos de análisis guardados en tu dispositivo, incluido el identificador de instancia de la aplicación.",
          "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
        ],
      },
      {
        title: "Datos recopilados y compartidos (versión 1.1.0 y posteriores)",
        paragraphs: [
          "La información de seguridad de los datos declarada en Google Play para RPS Duel 1.1.0 incluye los siguientes tipos de datos. Cada uno se recopila y se comparte con terceros, y las finalidades declaradas tanto de la recopilación como del intercambio son publicidad o marketing; análisis; y prevención del fraude, seguridad y cumplimiento:",
        ],
        bullets: [
          "Ubicación aproximada",
          "Interacciones con la aplicación",
          "Diagnóstico",
          "Dispositivo u otros identificadores",
        ],
      },
      {
        title: "Cómo se tratan estos datos (versión 1.1.0 y posteriores)",
        paragraphs: [
          "La misma declaración indica que la recopilación de estos datos es obligatoria, no opcional, y que los datos se cifran en tránsito.",
          "Los terceros que reciben estos datos los tratan conforme a sus propias políticas de privacidad. La aplicación usa Google AdMob para los anuncios, la Plataforma de Mensajes para Usuarios de Google para pedir y guardar tus opciones de privacidad publicitaria y, cuando las estadísticas de uso están activadas, Google Analytics for Firebase. RPS Duel no te pide tu nombre, tu correo electrónico ni tu número de teléfono.",
          "La aplicación muestra sus anuncios a través de Google AdMob, mediante el SDK de Google Mobile Ads: banners en las pantallas Registros y Colección, y un anuncio a pantalla completa entre partidos. Ninguno aparece durante un duelo. Cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad y limita los anuncios a contenido con clasificación G. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila. Los datos usados para los anuncios son necesarios para los anuncios de la aplicación y no se pueden desactivar en ella.",
          "El anuncio a pantalla completa solo puede aparecer cuando dejas la tarjeta de resultado de un partido para empezar el siguiente. Nunca se muestra durante un partido, tras el primer partido después de abrir la aplicación, más de una vez cada dos partidos completados ni en los dos minutos siguientes al anterior, y no se solicita mientras el formulario de consentimiento de Google espera tu respuesta. Si no hay ningún anuncio listo, el siguiente partido empieza enseguida.",
          "Puedes restablecer o eliminar el identificador de publicidad de tu dispositivo en los ajustes de Android; las opciones disponibles dependen de tu versión de Android.",
        ],
      },
      {
        title: "Tus opciones de privacidad publicitaria (versión 1.1.0 y posteriores)",
        paragraphs: [
          "Al iniciarse, la aplicación consulta al servicio de consentimiento de Google si se necesita una elección de privacidad sobre anuncios donde estás. Si es así, por ejemplo en el Espacio Económico Europeo, el Reino Unido o Suiza, aparece un formulario de consentimiento la primera vez que abres Registros o Colección, nunca durante un duelo. Donde Google lo exija, Ajustes → Opciones de privacidad te permite cambiar tu respuesta en cualquier momento. Rechazar los anuncios personalizados, o elegir que no se vendan ni compartan tus datos, no elimina los anuncios; los anuncios que veas no estarán personalizados. Si la aplicación no puede contactar con el servicio de consentimiento, no muestra anuncios hasta que pueda.",
        ],
      },
      {
        title: "Estadísticas de uso (versión 1.1.0 y posteriores)",
        paragraphs: [
          "La aplicación incluye Google Analytics for Firebase. Cuando las estadísticas de uso están activadas, la aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, y si un anuncio (un banner o el anuncio a pantalla completa) se solicitó, cargó, mostró o cerró, con su código de error si lo hay, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega. El juego funciona igual con las estadísticas de uso activadas o desactivadas.",
        ],
        bullets: [
          "En el Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, las estadísticas de uso están desactivadas salvo que las permitas. Antes de tu primer movimiento, o entre rondas si la aplicación sabe más tarde dónde estás, la aplicación te pregunta una vez si quieres ayudar a mejorar RPS Duel; “Permitir” y “No permitir” tienen el mismo peso.",
          "En el resto de lugares, la aplicación muestra un aviso único antes de tu primer movimiento, o entre rondas, que explica qué se recopila. Las estadísticas de uso solo empiezan después de ese aviso, salvo que elijas “Desactivar” en él.",
          "Si la aplicación no puede saber dónde estás, por ejemplo sin conexión o si el servicio de consentimiento de Google no responde, las estadísticas de uso siguen desactivadas y la aplicación lo vuelve a intentar más tarde.",
          "Estés donde estés, puedes activar o desactivar las estadísticas de uso en cualquier momento en Ajustes → Estadísticas de uso, y se conserva la respuesta que hayas dado.",
        ],
        afterBullets: [
          "Para saber si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, la aplicación usa la respuesta del servicio de consentimiento de Google (el mismo de tus opciones de privacidad publicitaria). Para saber si estás en Turquía, usa el país de tu tarjeta SIM o, sin tarjeta SIM, si el idioma o la región de tu dispositivo o de la aplicación es turco o Turquía. La aplicación no guarda esta información ni la envía a ningún sitio, y la vuelve a comprobar cada vez que se inicia. Estas señales pueden fallar, por ejemplo cuando viajas o usas una VPN; entonces se aplica la regla de la región que detecte la aplicación, y en Ajustes puedes seguir cambiando tu elección.",
          "El software Firebase de la aplicación también crea un identificador aleatorio de instalación de Firebase. Es distinto del identificador de instancia de la aplicación y de tu identificador de publicidad, y Google Analytics lo envía a Google junto con las estadísticas de uso.",
          "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria son independientes: ninguna cambia la otra. Si desactivas las estadísticas de uso, la aplicación deja de enviarlas y borra los datos de análisis guardados en tu dispositivo, incluido el identificador de instancia de la aplicación.",
          "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
        ],
      },
      {
        title: "Versiones anteriores y actualización",
        paragraphs: [
          "La versión 1.0.5, en Google Play desde el 25 de octubre de 2026, recopilaba estadísticas de uso automáticamente, sin preguntar. Al actualizar a la 1.0.6, la recopilación queda desactivada hasta que elijas lo contrario, y se borran los datos de análisis que la 1.0.5 guardó en tu dispositivo. Las estadísticas de uso que la 1.0.5 ya envió a Google no se borran con la actualización; Google Analytics las conserva durante los plazos descritos arriba.",
          "La versión 1.0.6 preguntaba a todos antes de recopilar estadísticas de uso. Al actualizar de la 1.0.6 a la 1.1.0, se conserva la respuesta que diste allí; si no respondiste, se aplican las reglas de “Estadísticas de uso (versión 1.1.0 y posteriores)”. Al actualizar desde la 1.0.5, primero se borran los datos de análisis que la 1.0.5 guardó en tu dispositivo y después se aplican las mismas reglas.",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tu progreso y preferencias entre sesiones, la aplicación guarda en tu dispositivo datos de juego como los siguientes:",
        ],
        bullets: [
          "Puntuaciones y tu historial de rondas (hasta las últimas 500 rondas)",
          "Totales acumulados (rondas jugadas, victorias y empates)",
          "Idioma de interfaz seleccionado (inglés, turco o español)",
          "Dificultad de CPU seleccionada (Fácil, Normal o Difícil)",
          "Ajuste de sonido (activado o desactivado)",
          "Progreso del desafío diario actual (se reinicia automáticamente a medianoche local)",
          "Indicadores de logros (cuatro en total)",
          "Momentos coleccionados, con la fecha de cada uno",
          "En la versión 1.0.6: tu elección sobre las estadísticas de uso (permitidas o no)",
          "En la versión 1.0.6: tus opciones de privacidad publicitaria, guardadas por el software de consentimiento de Google",
          "Desde la versión 1.1.0: si ya se ha mostrado el aviso único sobre las estadísticas de uso",
          "Desde la versión 1.1.0: tu nivel y tus puntos de experiencia (XP)",
          "Desde la versión 1.1.0: el partido en curso y el formato de partido elegido (al mejor de 3 o al mejor de 5)",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Dentro de la aplicación, Ajustes → Restablecer datos borra tus puntuaciones y el historial de rondas. Los demás elementos de la lista anterior —tus ajustes de idioma, dificultad y sonido, los totales acumulados, el progreso del desafío diario, los indicadores de logros, los momentos coleccionados, tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria— se conservan. Para eliminar todos los datos de la lista anterior, usa en su lugar los controles habituales del sistema operativo: borra el almacenamiento de la aplicación o desinstálala (Android). Esa es una acción más amplia que Restablecer datos.",
          "Estos pasos solo afectan a los datos guardados en tu dispositivo. No eliminan los datos que ya se hayan recopilado y compartido como se describe arriba.",
          "En la versión 1.0.6, desactivar Ajustes → Estadísticas de uso borra los datos de análisis guardados en tu dispositivo; no borra las estadísticas ya enviadas.",
          "Desde la versión 1.1.0, Restablecer datos también borra el partido en curso. Tu ajuste de formato de partido, tu nivel y tus XP y si se ha mostrado el aviso sobre las estadísticas de uso se conservan, como los demás elementos de la lista.",
        ],
      },
      {
        title: "Niños y adolescentes",
        paragraphs: [
          "RPS Duel no está dirigida específicamente a niños, y Lunexa no recopila intencionalmente datos personales de menores de 13 años.",
          "En la versión 1.0.6 y posteriores, la aplicación no pregunta tu edad. Como algunos jugadores pueden ser adolescentes, cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad, y los anuncios se limitan a contenido con clasificación G. Las decisiones sobre las estadísticas de uso y la privacidad publicitaria las toma el jugador en la aplicación.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de RPS Duel cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.0.5, que añadió anuncios y estadísticas de uso; para la versión 1.0.6, que pregunta antes de recopilar estadísticas de uso, añade opciones de privacidad publicitaria y muestra un segundo banner en la pantalla Colección; y para la versión 1.1.0, que activa las estadísticas de uso tras un aviso único fuera del Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, añade partidos y niveles guardados en tu dispositivo y muestra un anuncio a pantalla completa entre partidos.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre esta política pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

// ── Chess Rescue privacy policy ──
// Version-aware. Versions up to 1.2.1 (the frozen 1.2.1+7 AAB) declare no
// INTERNET permission and ship no Google SDK. 1.3.0 (source 22c4eea, signed
// AAB fcbb5a9d) adds AdMob banners on Home and Success, UMP consent after the
// first settled rescue (never at launch), and Firebase Analytics that is off
// by default. The usage-statistics question appears once on Home; "Allow"
// needs the player's own 18+/parental statement, and the Home "Usage
// statistics" line changes the answer later. The app has no settings screen.
// Every ad request is non-personalised, teen-treated and G-rated; AD_ID is
// removed, but on Android 12 and lower Play services can still hand the
// advertising ID to the Mobile Ads SDK;
// usage statistics never use it. 1.4.0 (mobile source 434e801; candidate not
// frozen) changes only consent timing: once a consent update has succeeded
// after a rescue (`cr_ads_consent_checked_v1` = true), later sessions also
// refresh consent when Home opens, so the Home banner can load without a
// rescue. New installs and 1.3.0 upgrades keep the post-rescue check.
// Withdrawal resets local analytics
// data only. The only retention stated is the owner-verified GA4 setting
// (events 2 months, users 14 months, reset on new activity), scoped to GA4
// data; never extend it to AdMob or other Firebase data. Never claim deletion
// routes, "we do not sell", or that withdrawal deletes data Google already
// holds. 1.5.0 (mobile docs/release/1.5.0-web-policy-text.md; D-MORE-ADS,
// D-CR-RW, D-CR-SKIP14) adds one summary paragraph and one local-data item:
// the full-screen ad and the optional rewarded help, requested like the
// banners; no new data, SDK, permission or analytics event. Bump
// `lastUpdated` whenever the app's data behaviour changes.

export const CHESS_RESCUE_PRIVACY: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "Chess Rescue · Privacy",
    heading: "Chess Rescue — Privacy Policy",
    lastUpdated: "Last updated: 2026-11-03",
    intro:
      "Chess Rescue is a single-player puzzle game for Android made by Lunexa Games (package id: com.lunexa.games.chessrescue). This policy describes what the app does with your information in versions 1.3.0 and 1.4.0, which include ads and optional analytics, and in earlier versions, which work entirely offline.",
    sections: [
      {
        title: "Summary",
        paragraphs: [
          "Chess Rescue has no accounts and does not ask for your name, email address or phone number. The puzzles play without an internet connection.",
          "Versions up to 1.2.1 run entirely on your device: they do not request the internet permission, make no network connections, show no ads and include no analytics.",
          "Version 1.3.0 shows small ads from Google AdMob: on the result screen after you solve a puzzle and at the bottom of the home screen, never during a puzzle. To request and show them, Google receives some technical information from your device, as described below. Version 1.3.0 also includes Google's Firebase software for optional usage statistics (analytics), which stay off unless you allow them. Version 1.4.0 handles your information in the same way as version 1.3.0, except for when it checks your ad consent and one extra item it stores on your device, both described below.",
          "From version 1.5.0, the app may also show a full-screen ad when you move on to the next puzzle or leave a finished episode: never during a puzzle, never in your first session, and at most once every few puzzles. After several missed attempts on the same puzzle, it may also offer an optional video ad that you choose to watch in return for help with that puzzle; you can always try again for free instead. These ads are requested in the same way as the others: not personalised, rated for all ages and with Google's protections for teenage users, and Google receives the same information described below. The app stores on your device when it last showed a full-screen ad, so that they stay spaced out.",
        ],
      },
      {
        title: "Advertising (versions 1.3.0 and 1.4.0)",
        paragraphs: [
          "Ads are provided by Google AdMob. When the app requests an ad, the Google Mobile Ads SDK connects to Google's servers. Google receives information such as your device's IP address (from which an approximate location can be estimated), information about the ad and your interactions with it, diagnostic information about the app and the SDK, and identifiers such as the app set ID. Google uses this information to deliver and measure ads and to prevent fraud and abuse.",
          "Every ad request from the app asks Google for non-personalised ads, applies Google's treatment for users who may be teenagers, and allows only ads rated suitable for general audiences. The app does not request the permission that Android 13 and later require to read your device's advertising ID. On Android 12 and earlier, Google Play services can still provide the advertising ID to the Google Mobile Ads SDK, and Google may use it to deliver and measure ads and to prevent fraud.",
          "Google handles this information under its own privacy policy.",
        ],
      },
      {
        title: "Your privacy choices for ads (versions 1.3.0 and 1.4.0)",
        paragraphs: [
          "In version 1.3.0, the app does not contact Google's consent service when it starts. After your first solved puzzle in a session, or when you tap Privacy choices, it uses Google User Messaging Platform to check whether a consent message is required where you are. Version 1.4.0 works the same way until it has completed that check once after a solved puzzle, for example after a new installation or an update from 1.3.0. It then remembers this on your device and, from your next session, also runs the check when the home screen opens, so the ad at the bottom of the home screen can appear without solving another puzzle, if your consent status allows ads to be requested.",
          "Where one is required, for example in the European Economic Area, the United Kingdom and Switzerland, the message is shown on the home screen, never during a puzzle. Where Google requires it, Privacy choices appears on the home screen and on the result screen, so you can change your choice at any time.",
          "If the consent status does not allow ads to be requested, the app shows no ads for the rest of that session. Depending on your choice, Google may show limited ads or no ads. The game works the same either way.",
          "If you live in a US state with a consumer privacy law, Privacy choices also lets you opt out of the sale or sharing of your personal information for advertising.",
          "These choices apply to ads only; they do not turn usage statistics on or off. Usage statistics have their own choice, described below.",
        ],
      },
      {
        title: "Usage statistics and Google Firebase (versions 1.3.0 and 1.4.0)",
        paragraphs: [
          "Version 1.3.0 includes Google Analytics for Firebase. Usage statistics are off by default. On the home screen, normally before your first puzzle, the app asks once: “Help improve Chess Rescue?”. You can answer “Allow” or “Don't allow”. “Allow” works only after you tick “I am 18 or older, or a parent or guardian has agreed.” This statement is your own; the app does not check your age or whether a parent or guardian has agreed. “Don't allow” is always available, and the game works the same either way. Until you choose “Allow”, Google Analytics for Firebase collects no usage statistics events. This choice covers only those events: Google AdMob ads, described above, and other parts of the Firebase software, described below, may process some data regardless of your choice, including before you answer.",
          "Your answer is saved on your device and kept when you close and reopen the app. To change it at any time, tap Usage statistics on the home screen; that line shows whether usage statistics are on or off.",
          "If you allow usage statistics, the app records how the puzzles are played: when a puzzle starts, fails or is solved, and when an episode is completed, together with the episode, the puzzle's position in it, whether you had seen it before, how many wrong moves you made, and whether the episode was cleared for the first time. Google Analytics also collects some information automatically, such as when the app is first opened, sessions and engagement time, app updates, your device model, operating-system version and language, an approximate location derived from your IP address, and a random app-instance identifier. The Google Mobile Ads SDK also reports to Google Analytics when an ad is requested or shown, and ad requests can then include the app-instance identifier. Google Analytics is set not to collect your advertising ID. This information is sent to Google and used to understand how the game is played. Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, or to other parts of the Firebase software.",
          "If you later choose “Don't allow”, the app stops collecting usage statistics from then on and resets the analytics data stored on your device, including the app-instance identifier. This does not delete information that has already been sent to Google.",
          "For questions or requests about information already sent to Google, contact us at hello@uselunexa.com. The app does not show the app-instance identifier, and the reset removes it from your device, so information already sent may not be linkable to your device.",
          "Even while usage statistics are off, the Firebase software starts when you open the app and stores some technical data on your device. It may create random identifiers, such as a Firebase installation identifier, and may connect to Google's servers; when it does, Google receives your device's IP address.",
          "Usage statistics and your privacy choices for ads are separate. Your choices for ads do not turn usage statistics on or off, and allowing usage statistics does not give consent for ads.",
        ],
      },
      {
        title: "What we do not collect",
        paragraphs: [
          "In no version does Chess Rescue collect:",
        ],
        bullets: [
          "Name, email address, phone number, or any account identifier",
          "Precise location, contacts, microphone, camera, or sensor data",
          "Crash reports",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your progress between sessions, the app saves gameplay data on your device. This gameplay data stays on your device. In version 1.3.0, Google's SDKs also keep their own data on your device, such as your consent choice and the identifiers described above.",
          "The gameplay data includes, for example:",
        ],
        bullets: [
          "Your current puzzle (how far you have progressed through the set)",
          "Which rescues you have already completed",
          "Whether you have seen the introduction",
          "A random seed used to lay out the puzzles",
          "Your language choice",
          "The records you have unlocked and the rescues you have saved",
          "In version 1.3.0: how many days in a row you have completed a rescue, whether privacy choices are offered in your region, and your answer about usage statistics",
          "In version 1.4.0, also: whether the app has completed an ad consent check after a solved puzzle",
          "When a full-screen ad was last shown (version 1.5.0 and later)",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "Chess Rescue does not include an in-app reset control. You can remove all locally stored progress using your operating system's normal app controls: clear the app's storage (on Android, Settings → Apps → Chess Rescue → Storage) or uninstall the app.",
          "In version 1.3.0, clearing the app's storage also removes the consent choice and identifiers that Google's SDKs keep on the device, and your answer about usage statistics, so the app asks again. It does not delete information Google has already received.",
        ],
      },
      {
        title: "Internet access",
        paragraphs: [
          "Versions up to 1.2.1 do not request the internet permission and make no network connections. Version 1.3.0 requests internet access and uses it only for ads, the consent message, usage statistics if you allow them, and the Google services described above. The puzzles do not need a connection, and with no connection no ad is shown.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          "Chess Rescue does not target children specifically, and Lunexa does not knowingly collect personal information from children under 13. In version 1.3.0, every ad request applies Google's treatment for users who may be teenagers and asks for non-personalised ads rated suitable for general audiences.",
          "In the usage statistics question, the app asks players under 18 to choose “Allow” only with permission from a parent or guardian. The app cannot verify age or that permission.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of Chess Rescue changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes. The policy was updated for version 1.3.0, which added ads and optional analytics, and again for version 1.4.0, which changes when the app checks your ad consent.",
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
    lastUpdated: "Son güncelleme: 03.11.2026",
    intro:
      "Chess Rescue, Lunexa Games tarafından Android için geliştirilmiş tek oyunculu bir bulmaca oyunudur (paket kimliği: com.lunexa.games.chessrescue). Bu politika, uygulamanın bilgilerinle ne yaptığını reklam ve isteğe bağlı analitik içeren 1.3.0 ve 1.4.0 sürümleri ile tamamen çevrimdışı çalışan önceki sürümler için açıklar.",
    sections: [
      {
        title: "Özet",
        paragraphs: [
          "Chess Rescue'da hesap yoktur ve uygulama senden adını, e-posta adresini veya telefon numaranı istemez. Bulmacalar internet bağlantısı olmadan oynanır.",
          "1.2.1'e kadarki sürümler tamamen cihazında çalışır: internet izni istemez, ağ bağlantısı kurmaz, reklam göstermez ve analitik içermez.",
          "1.3.0 sürümü Google AdMob'dan küçük reklamlar gösterir: bir bulmacayı çözdükten sonra sonuç ekranında ve ana ekranın en altında; bulmaca sırasında asla. Bu reklamları istemek ve göstermek için Google, aşağıda açıklandığı gibi cihazından bazı teknik bilgiler alır. 1.3.0 sürümü ayrıca, sen izin vermedikçe kapalı kalan isteğe bağlı kullanım istatistikleri (analitik) için Google Firebase yazılımını içerir. 1.4.0 sürümü bilgilerini, reklam izninin ne zaman kontrol edildiği ve cihazında sakladığı bir ek bilgi dışında 1.3.0 sürümüyle aynı şekilde işler; ikisi de aşağıda açıklanmıştır.",
          "1.5.0 sürümünden itibaren uygulama, bir sonraki bulmacaya geçerken veya biten bir bölümden çıkarken tam ekran bir reklam da gösterebilir: bulmaca sırasında asla, ilk oturumunda asla ve en fazla birkaç bulmacada bir. Aynı bulmacada birkaç başarısız denemeden sonra, o bulmacada yardım karşılığında izlemeyi seçebileceğin isteğe bağlı bir video reklam da önerebilir; bunun yerine her zaman ücretsiz olarak yeniden deneyebilirsin. Bu reklamlar diğerleriyle aynı şekilde istenir: kişiselleştirilmemiş, her yaşa uygun olarak derecelendirilmiş ve Google'ın gençlere yönelik korumalarıyla; Google aşağıda açıklanan bilgilerin aynısını alır. Uygulama, tam ekran reklamlar arasında boşluk bırakmak için son tam ekran reklamı ne zaman gösterdiğini cihazında saklar.",
        ],
      },
      {
        title: "Reklamlar (1.3.0 ve 1.4.0 sürümleri)",
        paragraphs: [
          "Reklamlar Google AdMob tarafından sağlanır. Uygulama bir reklam istediğinde Google Mobile Ads SDK, Google'ın sunucularına bağlanır. Google; cihazının IP adresi (buradan yaklaşık bir konum tahmin edilebilir), reklam ve reklamla etkileşimin hakkındaki bilgiler, uygulama ve SDK hakkındaki tanılama bilgileri ve uygulama grubu kimliği (app set ID) gibi kimlikler dahil bazı bilgiler alır. Google bu bilgileri reklamları sunmak ve ölçmek, dolandırıcılığı ve kötüye kullanımı önlemek için kullanır.",
          "Uygulamanın her reklam isteği Google'dan kişiselleştirilmemiş reklam ister, genç olabilecek kullanıcılar için Google'ın uyguladığı işlemi uygular ve yalnızca genel izleyiciye uygun olarak derecelendirilmiş reklamlara izin verir. Uygulama, Android 13 ve sonrasında cihazının reklam kimliğini okumak için gereken izni istemez. Android 12 ve öncesinde Google Play hizmetleri reklam kimliğini yine de Google Mobile Ads SDK'ya sağlayabilir ve Google bunu reklamları sunmak ve ölçmek ve dolandırıcılığı önlemek için kullanabilir.",
          "Google bu bilgileri kendi gizlilik politikasına göre işler.",
        ],
      },
      {
        title: "Reklamlar için gizlilik seçeneklerin (1.3.0 ve 1.4.0 sürümleri)",
        paragraphs: [
          "1.3.0 sürümünde uygulama açılırken Google'ın izin hizmetine bağlanmaz. Bir oturumda ilk bulmacanı çözdükten sonra ya da Gizlilik seçeneklerine dokunduğunda, bulunduğun yerde bir izin mesajı gerekip gerekmediğini Google User Messaging Platform ile kontrol eder. 1.4.0 sürümü de, çözülmüş bir bulmacadan sonra bu kontrolü bir kez tamamlayana kadar aynı şekilde çalışır; örneğin yeni bir kurulumdan veya 1.3.0 sürümünden güncellendikten sonra. Ardından bunu cihazında hatırlar ve bir sonraki oturumundan itibaren kontrolü ana ekran açıldığında da yapar; böylece izin durumun reklam istenmesine izin veriyorsa ana ekranın en altındaki reklam, başka bir bulmaca çözmeden de görünebilir.",
          "Mesaj gerektiğinde (örneğin Avrupa Ekonomik Alanı, Birleşik Krallık ve İsviçre'de) ana ekranda gösterilir, bulmaca sırasında asla gösterilmez. Google gerektirdiğinde Gizlilik seçenekleri ana ekranda ve sonuç ekranında görünür; böylece seçimini istediğin zaman değiştirebilirsin.",
          "İzin durumu reklam istenmesine izin vermiyorsa uygulama o oturumun geri kalanında reklam göstermez. Seçimine bağlı olarak Google sınırlı reklam gösterebilir veya hiç reklam göstermeyebilir. Oyun her iki durumda da aynı şekilde çalışır.",
          "Tüketici gizliliği yasası olan bir ABD eyaletinde yaşıyorsan Gizlilik seçenekleri, kişisel bilgilerinin reklam amacıyla satışını veya paylaşımını reddetmene de olanak tanır.",
          "Bu seçimler yalnızca reklamlar için geçerlidir; kullanım istatistiklerini açmaz veya kapatmaz. Kullanım istatistiklerinin aşağıda açıklanan kendi seçimi vardır.",
        ],
      },
      {
        title: "Kullanım istatistikleri ve Google Firebase (1.3.0 ve 1.4.0 sürümleri)",
        paragraphs: [
          "1.3.0 sürümü Google Analytics for Firebase'i içerir. Kullanım istatistikleri varsayılan olarak kapalıdır. Uygulama ana ekranda, normalde ilk bulmacandan önce, bir kez “Chess Rescue'yu geliştirmeye yardım eder misin?” diye sorar. “İzin ver” veya “İzin verme” seçeneğini seçebilirsin. “İzin ver” yalnızca “18 yaşında veya daha büyüğüm ya da ebeveynim veya vasim kabul etti.” ifadesini işaretledikten sonra çalışır. Bu ifade senin kendi beyanındır; uygulama yaşını veya bir ebeveynin ya da vasinin kabul edip etmediğini kontrol etmez. “İzin verme” her zaman seçilebilir ve oyun her iki durumda da aynı çalışır. “İzin ver” seçeneğini seçene kadar Google Analytics for Firebase kullanım istatistiği olayı toplamaz. Bu seçim yalnızca bu olayları kapsar: yukarıda açıklanan Google AdMob reklamları ve aşağıda açıklanan diğer Firebase yazılım bileşenleri, sen cevap vermeden önce de dahil olmak üzere, seçimine bakılmaksızın bazı verileri işleyebilir.",
          "Cevabın cihazına kaydedilir ve uygulamayı kapatıp yeniden açtığında korunur. Cevabını istediğin zaman değiştirmek için ana ekrandaki Kullanım istatistikleri satırına dokun; bu satır kullanım istatistiklerinin açık mı kapalı mı olduğunu gösterir.",
          "Kullanım istatistiklerine izin verirsen uygulama bulmacaların nasıl oynandığını kaydeder: bir bulmaca başladığında, başarısız olduğunda veya çözüldüğünde ve bir bölüm tamamlandığında; bununla birlikte bölümü, bulmacanın bölüm içindeki sırasını, bulmacayı daha önce görüp görmediğini, kaç yanlış hamle yaptığını ve bölümün ilk kez tamamlanıp tamamlanmadığını. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin uygulamanın ilk açılışı, oturumlar ve etkileşim süresi, uygulama güncellemeleri, cihaz modelin, işletim sistemi sürümün ve dilin, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Google Mobile Ads SDK da bir reklamın ne zaman istendiğini veya gösterildiğini Google Analytics'e bildirir ve reklam istekleri bu durumda uygulama örneği kimliğini içerebilir. Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır. Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir.",
          "Daha sonra “İzin verme” seçeneğini seçersen uygulama o andan itibaren kullanım istatistiği toplamayı bırakır ve uygulama örneği kimliği dahil cihazında saklanan analitik verilerini sıfırlar. Bu, Google'a daha önce gönderilmiş bilgileri silmez.",
          "Google'a daha önce gönderilmiş bilgilerle ilgili soruların veya taleplerin için hello@uselunexa.com adresinden bize ulaşabilirsin. Uygulama, uygulama örneği kimliğini göstermez ve sıfırlama bu kimliği cihazından kaldırır; bu nedenle daha önce gönderilmiş bilgiler cihazınla eşleştirilemeyebilir.",
          "Kullanım istatistikleri kapalıyken bile Firebase yazılımı uygulamayı açtığında başlar ve cihazında bazı teknik veriler saklar. Firebase kurulum kimliği gibi rastgele kimlikler oluşturabilir ve Google'ın sunucularına bağlanabilir; bağlandığında Google cihazının IP adresini alır.",
          "Kullanım istatistikleri ile reklamlar için gizlilik seçeneklerin birbirinden ayrıdır. Reklam seçimlerin kullanım istatistiklerini açmaz veya kapatmaz; kullanım istatistiklerine izin vermek de reklamlar için izin vermek anlamına gelmez.",
        ],
      },
      {
        title: "Toplamadığımız veriler",
        paragraphs: [
          "Chess Rescue hiçbir sürümde şunları toplamaz:",
        ],
        bullets: [
          "Ad, e-posta, telefon numarası veya herhangi bir hesap kimliği",
          "Kesin konum, kişiler, mikrofon, kamera veya sensör verileri",
          "Çökme raporları",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ilerlemeni hatırlamak için uygulama, cihazına oyun verileri kaydeder. Bu oyun verileri cihazında kalır. 1.3.0 sürümünde Google'ın SDK'ları da cihazında kendi verilerini saklar; örneğin izin seçimini ve yukarıda açıklanan kimlikleri.",
          "Oyun verileri örneğin şunları içerir:",
        ],
        bullets: [
          "Mevcut bulmacan (set içinde ne kadar ilerlediğin)",
          "Tamamladığın kurtarışlar",
          "Tanıtımı görüp görmediğin",
          "Bulmacaları dizmek için kullanılan rastgele bir tohum (seed)",
          "Dil seçimin",
          "Açtığın rekorlar ve kaydettiğin kurtarışlar",
          "1.3.0 sürümünde: kaç gün üst üste kurtarış tamamladığın, bölgende gizlilik seçeneklerinin sunulup sunulmadığı ve kullanım istatistikleri sorusuna verdiğin cevap",
          "1.4.0 sürümünde ayrıca: çözülmüş bir bulmacadan sonra reklam izni kontrolünün tamamlanıp tamamlanmadığı",
          "Son tam ekran reklamın ne zaman gösterildiği (1.5.0 ve sonrası)",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Chess Rescue, uygulama içinde bir sıfırlama denetimi içermez. Yerel olarak saklanan tüm ilerlemeyi işletim sisteminin normal uygulama kontrolleriyle kaldırabilirsin: uygulamanın verilerini temizle (Android'de Ayarlar → Uygulamalar → Chess Rescue → Depolama) veya uygulamayı kaldır.",
          "1.3.0 sürümünde uygulamanın verilerini temizlemek, Google'ın SDK'larının cihazda tuttuğu izin seçimini ve kimlikleri, ayrıca kullanım istatistikleri cevabını da kaldırır; bu nedenle uygulama yeniden sorar. Google'ın daha önce aldığı bilgileri silmez.",
        ],
      },
      {
        title: "İnternet erişimi",
        paragraphs: [
          "1.2.1'e kadarki sürümler internet izni istemez ve hiçbir ağ bağlantısı kurmaz. 1.3.0 sürümü internet erişimi ister ve bunu yalnızca reklamlar, izin mesajı, izin verirsen kullanım istatistikleri ve yukarıda açıklanan Google hizmetleri için kullanır. Bulmacalar bağlantı gerektirmez; bağlantı yoksa reklam gösterilmez.",
        ],
      },
      {
        title: "Çocuklar",
        paragraphs: [
          "Chess Rescue özellikle çocuklara yönelik değildir ve Lunexa, 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz. 1.3.0 sürümünde her reklam isteği, genç olabilecek kullanıcılar için Google'ın uyguladığı işlemi uygular ve genel izleyiciye uygun, kişiselleştirilmemiş reklam ister.",
          "Uygulama, kullanım istatistikleri sorusunda 18 yaşından küçük oyunculardan “İzin ver” seçeneğini yalnızca bir ebeveynin veya vasinin izniyle seçmelerini ister. Uygulama yaşı veya bu izni doğrulayamaz.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "Chess Rescue'nun ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, reklam ve isteğe bağlı analitik ekleyen 1.3.0 sürümü için ve ardından reklam izninin ne zaman kontrol edildiğini değiştiren 1.4.0 sürümü için güncellenmiştir.",
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
    lastUpdated: "Última actualización: 2026-11-03",
    intro:
      "Chess Rescue es un juego de rompecabezas para un solo jugador para Android creado por Lunexa Games (id de paquete: com.lunexa.games.chessrescue). Esta política describe qué hace la aplicación con tu información en las versiones 1.3.0 y 1.4.0, que incluyen anuncios y analítica opcional, y en las versiones anteriores, que funcionan totalmente sin conexión.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "Chess Rescue no tiene cuentas y no te pide tu nombre, tu correo electrónico ni tu número de teléfono. Los rompecabezas se juegan sin conexión a internet.",
          "Las versiones hasta la 1.2.1 se ejecutan completamente en tu dispositivo: no solicitan el permiso de internet, no realizan conexiones de red, no muestran anuncios y no incluyen analítica.",
          "La versión 1.3.0 muestra pequeños anuncios de Google AdMob: en la pantalla de resultado después de resolver un rompecabezas y al final de la pantalla de inicio, nunca durante un rompecabezas. Para solicitarlos y mostrarlos, Google recibe cierta información técnica de tu dispositivo, como se describe a continuación. La versión 1.3.0 también incluye el software Firebase de Google para estadísticas de uso opcionales (analítica), que permanecen desactivadas a menos que las permitas. La versión 1.4.0 trata tu información igual que la versión 1.3.0, salvo en el momento en que comprueba tu consentimiento para los anuncios y en un dato adicional que guarda en tu dispositivo; ambos se describen a continuación.",
          "Desde la versión 1.5.0, la aplicación también puede mostrar un anuncio a pantalla completa al pasar al siguiente rompecabezas o al salir de un episodio terminado: nunca durante un rompecabezas, nunca en tu primera sesión y como mucho una vez cada varios rompecabezas. Tras varios intentos fallidos en el mismo rompecabezas, también puede ofrecerte un anuncio en vídeo opcional que eliges ver a cambio de ayuda con ese rompecabezas; en su lugar, siempre puedes volver a intentarlo gratis. Estos anuncios se solicitan igual que los demás: no personalizados, aptos para todas las edades y con las protecciones de Google para usuarios adolescentes, y Google recibe la misma información descrita a continuación. La aplicación guarda en tu dispositivo cuándo mostró el último anuncio a pantalla completa, para espaciarlos.",
        ],
      },
      {
        title: "Publicidad (versiones 1.3.0 y 1.4.0)",
        paragraphs: [
          "Los anuncios los proporciona Google AdMob. Cuando la aplicación solicita un anuncio, el SDK de Google Mobile Ads se conecta a los servidores de Google. Google recibe información como la dirección IP de tu dispositivo (a partir de la cual se puede estimar una ubicación aproximada), información sobre el anuncio y tu interacción con él, información de diagnóstico de la aplicación y del SDK, e identificadores como el identificador de conjunto de aplicaciones (app set ID). Google usa esta información para mostrar y medir anuncios y para prevenir el fraude y el abuso.",
          "Cada solicitud de anuncio de la aplicación pide a Google anuncios no personalizados, aplica el tratamiento de Google para usuarios que pueden ser adolescentes y solo permite anuncios clasificados como aptos para todos los públicos. La aplicación no solicita el permiso que Android 13 y versiones posteriores exigen para leer el identificador de publicidad de tu dispositivo. En Android 12 y versiones anteriores, los servicios de Google Play pueden proporcionar igualmente el identificador de publicidad al SDK de Google Mobile Ads, y Google puede usarlo para mostrar y medir anuncios y para prevenir el fraude.",
          "Google trata esta información conforme a su propia política de privacidad.",
        ],
      },
      {
        title: "Tus opciones de privacidad para los anuncios (versiones 1.3.0 y 1.4.0)",
        paragraphs: [
          "En la versión 1.3.0, la aplicación no se conecta al servicio de consentimiento de Google al iniciarse. Después de tu primer rompecabezas resuelto en una sesión, o cuando tocas Opciones de privacidad, usa Google User Messaging Platform para comprobar si donde estás se requiere un mensaje de consentimiento. La versión 1.4.0 funciona igual hasta que haya completado esa comprobación una vez después de un rompecabezas resuelto, por ejemplo después de una instalación nueva o de una actualización desde la 1.3.0. Después lo recuerda en tu dispositivo y, a partir de tu siguiente sesión, también hace la comprobación cuando se abre la pantalla de inicio, de modo que el anuncio al final de la pantalla de inicio puede aparecer sin resolver otro rompecabezas, si tu estado de consentimiento permite solicitar anuncios.",
          "Cuando se requiere, por ejemplo en el Espacio Económico Europeo, el Reino Unido y Suiza, el mensaje se muestra en la pantalla de inicio, nunca durante un rompecabezas. Cuando Google lo requiere, Opciones de privacidad aparece en la pantalla de inicio y en la pantalla de resultado, para que puedas cambiar tu elección en cualquier momento.",
          "Si el estado del consentimiento no permite solicitar anuncios, la aplicación no muestra anuncios durante el resto de esa sesión. Según tu elección, Google puede mostrar anuncios limitados o ningún anuncio. El juego funciona igual en ambos casos.",
          "Si vives en un estado de EE. UU. con una ley de privacidad del consumidor, Opciones de privacidad también te permite oponerte a la venta o el intercambio de tu información personal con fines publicitarios.",
          "Estas opciones se aplican solo a los anuncios; no activan ni desactivan las estadísticas de uso. Las estadísticas de uso tienen su propia elección, descrita abajo.",
        ],
      },
      {
        title: "Estadísticas de uso y Google Firebase (versiones 1.3.0 y 1.4.0)",
        paragraphs: [
          "La versión 1.3.0 incluye Google Analytics for Firebase. Las estadísticas de uso están desactivadas de forma predeterminada. En la pantalla de inicio, normalmente antes de tu primer rompecabezas, la aplicación te pregunta una vez: “¿Nos ayudas a mejorar Chess Rescue?”. Puedes responder “Permitir” o “No permitir”. “Permitir” solo funciona después de marcar “Tengo 18 años o más, o mi madre, padre o tutor está de acuerdo.” Esta declaración es tuya; la aplicación no comprueba tu edad ni si tu madre, padre o tutor está de acuerdo. “No permitir” siempre está disponible, y el juego funciona igual en ambos casos. Hasta que elijas “Permitir”, Google Analytics for Firebase no recopila eventos de estadísticas de uso. Esta elección solo afecta a esos eventos: los anuncios de Google AdMob, descritos arriba, y otras partes del software Firebase, descritas abajo, pueden tratar algunos datos independientemente de tu elección, incluso antes de que respondas.",
          "Tu respuesta se guarda en tu dispositivo y se mantiene al cerrar y volver a abrir la aplicación. Para cambiarla en cualquier momento, toca Estadísticas de uso en la pantalla de inicio; esa línea muestra si las estadísticas de uso están activadas o desactivadas.",
          "Si permites las estadísticas de uso, la aplicación registra cómo se juegan los rompecabezas: cuándo un rompecabezas empieza, falla o se resuelve y cuándo se completa un episodio, junto con el episodio, la posición del rompecabezas dentro de él, si ya lo habías visto, cuántos movimientos erróneos hiciste y si el episodio se completó por primera vez. Google Analytics también recopila cierta información automáticamente, como la primera apertura de la aplicación, las sesiones y el tiempo de uso, las actualizaciones de la aplicación, el modelo de tu dispositivo, la versión del sistema operativo y el idioma, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. El SDK de Google Mobile Ads también informa a Google Analytics de cuándo se solicita o se muestra un anuncio, y las solicitudes de anuncios pueden incluir entonces el identificador de instancia de la aplicación. Google Analytics está configurado para no recopilar tu identificador de publicidad. Esta información se envía a Google y se usa para entender cómo se juega. Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob ni a otras partes del software Firebase.",
          "Si más adelante eliges “No permitir”, la aplicación deja de recopilar estadísticas de uso a partir de ese momento y restablece los datos de analítica guardados en tu dispositivo, incluido el identificador de instancia de la aplicación. Esto no elimina la información que ya se haya enviado a Google.",
          "Para preguntas o solicitudes sobre la información que ya se haya enviado a Google, escríbenos a hello@uselunexa.com. La aplicación no muestra el identificador de instancia de la aplicación, y el restablecimiento lo elimina de tu dispositivo, por lo que es posible que la información ya enviada no pueda vincularse a tu dispositivo.",
          "Incluso con las estadísticas de uso desactivadas, el software Firebase se inicia al abrir la aplicación y guarda algunos datos técnicos en tu dispositivo. Puede crear identificadores aleatorios, como un identificador de instalación de Firebase, y puede conectarse a los servidores de Google; cuando lo hace, Google recibe la dirección IP de tu dispositivo.",
          "Las estadísticas de uso y tus opciones de privacidad para los anuncios son independientes. Tus opciones para los anuncios no activan ni desactivan las estadísticas de uso, y permitir las estadísticas de uso no da consentimiento para los anuncios.",
        ],
      },
      {
        title: "Lo que no recopilamos",
        paragraphs: [
          "En ninguna versión Chess Rescue recopila:",
        ],
        bullets: [
          "Nombre, correo electrónico, teléfono o ningún identificador de cuenta",
          "Ubicación precisa, contactos, micrófono, cámara ni datos de sensores",
          "Informes de errores",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tu progreso entre sesiones, la aplicación guarda datos de juego en tu dispositivo. Estos datos de juego se quedan en tu dispositivo. En la versión 1.3.0, los SDK de Google también guardan sus propios datos en tu dispositivo, como tu elección de consentimiento y los identificadores descritos arriba.",
          "Los datos de juego incluyen, por ejemplo:",
        ],
        bullets: [
          "Tu rompecabezas actual (cuánto has avanzado en el conjunto)",
          "Qué rescates has completado",
          "Si has visto la introducción",
          "Una semilla aleatoria usada para disponer los rompecabezas",
          "Tu idioma",
          "Los récords que has desbloqueado y los rescates que has guardado",
          "En la versión 1.3.0: cuántos días seguidos has completado un rescate, si en tu región se ofrecen opciones de privacidad y tu respuesta sobre las estadísticas de uso",
          "En la versión 1.4.0, además: si la aplicación ya ha completado una comprobación del consentimiento para los anuncios después de un rompecabezas resuelto",
          "Cuándo se mostró el último anuncio a pantalla completa (versión 1.5.0 y posteriores)",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Chess Rescue no incluye un control de restablecimiento dentro de la aplicación. Puedes eliminar todo el progreso almacenado localmente con los controles habituales del sistema operativo: borra los datos de la aplicación (en Android, Ajustes → Aplicaciones → Chess Rescue → Almacenamiento) o desinstálala.",
          "En la versión 1.3.0, borrar los datos de la aplicación también elimina la elección de consentimiento y los identificadores que los SDK de Google guardan en el dispositivo, así como tu respuesta sobre las estadísticas de uso, por lo que la aplicación vuelve a preguntar. No elimina la información que Google ya haya recibido.",
        ],
      },
      {
        title: "Acceso a internet",
        paragraphs: [
          "Las versiones hasta la 1.2.1 no solicitan el permiso de internet y no realizan conexiones de red. La versión 1.3.0 solicita acceso a internet y lo usa solo para los anuncios, el mensaje de consentimiento, las estadísticas de uso si las permites y los servicios de Google descritos arriba. Los rompecabezas no necesitan conexión, y sin conexión no se muestra ningún anuncio.",
        ],
      },
      {
        title: "Niños",
        paragraphs: [
          "Chess Rescue no está dirigida específicamente a niños, y Lunexa no recopila intencionalmente datos personales de menores de 13 años. En la versión 1.3.0, cada solicitud de anuncio aplica el tratamiento de Google para usuarios que pueden ser adolescentes y pide anuncios no personalizados y aptos para todos los públicos.",
          "En la pregunta sobre estadísticas de uso, la aplicación pide a quienes tengan menos de 18 años que elijan “Permitir” solo con el permiso de su madre, padre o tutor. La aplicación no puede verificar la edad ni ese permiso.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de Chess Rescue cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.3.0, que añadió anuncios y analítica opcional, y de nuevo para la versión 1.4.0, que cambia el momento en que la aplicación comprueba tu consentimiento para los anuncios.",
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
// W7 (Quietly WEB_HANDOFF v5, owner decisions 2026-11-03) adds the 1.2.0
// text next to the 1.1.0 text: one Success-screen AdMob banner (UMP where
// required, teen treatment, limited ads after "no") and opt-in Firebase
// Analytics with the owner-confirmed GA4 periods (2 / 14 months; no
// reset-on-activity claim), scoped to Google Analytics. Labelled "version
// 1.2.0", never open-ended: 1.2.1 changes the analytics default. 1.2.1
// (D-ANL-1_IMPLEMENTATION §6 P3, WEB_HANDOFF 1.2.1; D-QT-121) adds text
// labelled "1.2.1 and later": EEA/UK/CH/TR off unless turned on, elsewhere
// on after a one-time notice, off when the region is unknown; the region
// signals; the notice-shown flag. The handoff's "anonymous" is not used.
//
// Internal TODO (NOT for public body): the studio has no registered legal
// entity yet, so this policy intentionally omits a data-controller block
// and a standalone GDPR/KVKK rights-procedure section, matching the
// canonical RPS Duel / Chess Rescue pattern. Revisit if and when a
// registered controller name + address becomes required. Default posture
// remains: contact via hello@uselunexa.com.

export const QUIETLY_PRIVACY: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "Quietly · Privacy",
    heading: "Quietly — Privacy Policy",
    lastUpdated: "Last updated: 2026-11-03",
    intro:
      "Quietly is a media saver made by Lunexa Games. The app saves direct public media from URLs you paste into your device gallery. It uses the internet to fetch the media you ask for and to check whether you have a connection; version 1.2.0 also uses it to load an ad and — only if you allow it — to send usage statistics. Quietly does not create accounts. Versions up to 1.1.0 do not show ads and do not include analytics or crash reporting. Version 1.2.0 shows one ad from Google after a save finishes, and it can send usage statistics to Google Analytics for Firebase — only if you turn that on. Your links, files and history are never sent with either. Version 1.2.1 and later work like version 1.2.0, except for usage statistics, described below. They can send usage statistics to Google Analytics for Firebase: in the EEA, the UK, Switzerland and Türkiye only if you turn that on, and elsewhere after a one-time notice, with a switch to turn it off.",
    sections: [
      {
        title: "What we do not collect (up to version 1.1.0)",
        paragraphs: [
          "Quietly does not require an account, and versions up to 1.1.0 do not include Google AdMob or Firebase. When Quietly accesses a link or checks your connection, the servers involved may receive technical request information, such as your IP address and request headers. Specifically, the app does not collect:",
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
        title: "What leaves your device — and what never does (version 1.2.0)",
        paragraphs: [
          "Quietly does not require an account. Version 1.2.0 includes Google AdMob (ads) and Google Analytics for Firebase (optional usage statistics), described below. When Quietly accesses a link or checks your connection, the servers involved may receive technical request information, such as your IP address and request headers. Quietly never sends any of the following to Lunexa, to Google's ad services or to Analytics:",
        ],
        bullets: [
          "The links you paste, or anything about the pages or files they point to",
          "Your saved media, file names, titles or file sizes",
          "Your history, your save queue or anything in your clipboard",
          "Name, email address, phone number or any account identifier",
          "Contacts, microphone, camera or precise location",
        ],
      },
      {
        title: "Network access",
        paragraphs: [
          "Quietly uses the internet for these purposes only:",
        ],
        bullets: [
          "The URL you paste — Quietly contacts the server at that URL to check and download the media file. If that server redirects the request, Quietly also contacts the server it redirects to (at most five redirects, and never from a secure https link to an insecure http one). Those servers may receive standard technical information, such as your IP address and request headers, and are governed by their own privacy policies.",
          "https://www.gstatic.com/generate_204 — a small Google endpoint the app contacts automatically, only to check whether your device currently has internet. Quietly does not include the URL you paste, any information about downloaded media, or the media you save in this check.",
          "Google AdMob (version 1.2.0) — after a save finishes, Quietly asks Google for one ad to show on the confirmation screen. It doesn't ask when you're offline, or on mobile data while “Save on Wi-Fi only” is on. See “Advertising” below.",
          "Google Analytics for Firebase (version 1.2.0) — only if you turn on usage statistics. See “Usage statistics” below.",
          "Google Analytics for Firebase (version 1.2.1 and later) — while usage statistics are on. See “Usage statistics” below.",
        ],
      },
      {
        title: "Advertising (Google AdMob, version 1.2.0)",
        paragraphs: [
          "Quietly is free and shows one banner ad from Google, on the screen that confirms a save. Nothing else in the app shows ads, and there are no full-screen or video ads.",
          "To show and measure the ad, Google AdMob collects information such as your device's advertising ID, your IP address and approximate location derived from it, device and app details, and how you interact with the ad. Google uses this as described in How Google uses information from sites or apps that use our services (https://policies.google.com/technologies/partner-sites).",
          "Where the law requires it — for example in the EEA, the UK, Switzerland and some US states — Google asks for your choice first, and you can change it at any time in Settings → Privacy → Ad privacy choices. Quietly asks Google to treat every ad request as coming from a teenager, so ads are not personalised, remarketing is off, and only ads suitable for all ages are shown. Saying no doesn't turn ads off: Google may still show a limited ad.",
        ],
      },
      {
        title: "Usage statistics (Google Analytics for Firebase, version 1.2.0)",
        paragraphs: [
          "Usage statistics are off unless you turn on Settings → Privacy → Share usage statistics. Your choice is separate from Google's ad consent: agreeing to one never turns on the other.",
          "When they're on, Quietly sends counts of the screens you open and how link checks and saves turn out — for example whether a save finished, failed or was cancelled, the kind of media, and the number of items in bands such as 1, 2–5 or 6+. Firebase also records some information automatically, such as app opens, sessions, the device model, OS version, language and approximate country.",
          "Quietly never sends links, file names, titles, file sizes, your history or your advertising ID to Analytics, and usage statistics are not used for advertising.",
          "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the files and data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
          "Turn usage statistics off at any time in the same place: collection stops, and the analytics data Firebase kept on your device and its app-instance identifier are reset.",
        ],
      },
      {
        title: "Usage statistics (Google Analytics for Firebase, version 1.2.1 and later)",
        paragraphs: [
          "Whether usage statistics are on depends on where you are. Quietly works this out each time it starts:",
        ],
        bullets: [
          "in the EEA, the UK, Switzerland and Türkiye they are off unless you turn on Settings → Privacy → Share usage statistics;",
          "elsewhere they are on after a one-time notice in the app, which lets you turn them off;",
          "if Quietly can't tell where you are (for example when you're offline), they stay off.",
        ],
        afterBullets: [
          "How the region is determined: for the EEA, the UK and Switzerland, Quietly uses the answer of Google's consent service, the same check Google uses for its ad consent message, based on your IP address. For Türkiye it uses your SIM card's country or, without a SIM, your device or app language. Quietly doesn't store the result or send it anywhere. A VPN or travel can change the answer.",
          "A choice you make — in Settings or with “Turn off” on the notice — always applies, wherever you are, and choices made in version 1.2.0 are kept. It is separate from Google's ad consent: agreeing to one never turns on the other, and Google's ad consent is never used as consent for statistics.",
          "When they're on, Quietly sends counts of the screens you open and how link checks and saves turn out — for example whether a save finished, failed or was cancelled, the kind of media, and the number of items in bands such as 1, 2–5 or 6+. Firebase also records some information automatically, such as app opens, sessions, the device model, OS version, language and approximate country.",
          "Quietly never sends links, file names, titles, file sizes, your history or your advertising ID to Analytics, and usage statistics are not used for advertising.",
          "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the files and data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
          "Turn usage statistics off at any time in the same place: collection stops, and the analytics data Firebase kept on your device and its app-instance identifier are reset.",
        ],
      },
      {
        title: "Permissions and what we use them for",
        paragraphs: [
          "Quietly requests only the permissions it needs to do its job:",
        ],
        bullets: [
          "Internet — to download the media at the URL you paste",
          "Save to your photos / gallery — to add the files you choose to save to your device gallery. Quietly only adds files; it does not read or browse your existing photos and videos.",
          "Clipboard read — when you open Quietly, return to it, or open Home, the app may check the current clipboard for a link so it can suggest it to you. A link detected this way is kept only in the app's memory and is not saved or sent anywhere just because it was detected. You can also paste a link yourself; this is separate from the automatic check. A link is stored in your history only as part of an item you choose to save, and the rest of your clipboard is never stored.",
          "Advertising ID and Android ad services (AD_ID, ACCESS_ADSERVICES_*; version 1.2.0) — used by Google AdMob to show and measure the ad, and to prevent fraud. You can reset or delete your advertising ID in your device settings. Quietly's usage statistics don't use it.",
        ],
      },
      {
        title: "Data stored locally on your device",
        paragraphs: [
          "To remember your settings and the media you save between sessions, Quietly keeps the data listed below in its own storage on your device. The amount of storage used depends on what you save. This section describes Quietly's own local storage; backups or transfers made by your operating system's own features are outside its scope.",
        ],
        bullets: [
          "The preferences and settings you choose in the app",
          "Your history of saved items — each entry holds an identifier, the media kind, a title, descriptive metadata, the time saved, the source link (its full URL), and the file path on your device",
          "Copies of media you save — Quietly stores a copy of saved media in its app-private storage on your device, separately from any copy successfully added to your gallery",
          "Your save queue (Quietly 1.1.0 and later) — saves you have started that have not finished yet, kept so you can retry or remove them after the app restarts",
          "Whether the usage-statistics notice has been shown (Quietly 1.2.1 and later)",
        ],
      },
      {
        title: "How to clear your data",
        paragraphs: [
          "You can remove your saved history records from inside the app with its option for clearing history. In Quietly 1.1.0 and later, clearing your history can also delete the media copies Quietly keeps in its private storage, and the app asks you to confirm before it deletes them; in earlier versions, clearing history does not delete those copies. Clearing history does not delete files saved to your gallery. You can also remove an unfinished save from the save queue. To remove the locally stored preferences as well, clear the app's storage from your operating system (Android: Settings → Apps → Quietly → Storage) or uninstall the app. Downloaded files remain in your gallery unless you delete them manually.",
        ],
      },
      {
        title: "What we do not do",
        paragraphs: [
          "Quietly does not perform page scraping or parse social-platform feeds. It does not access logged-in or DRM-protected content. It does not look for media on its own; it only fetches the links you paste or choose to save, at your request.",
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
          "Quietly is not directed at children, and Lunexa does not knowingly collect personal information from children under 13.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "If a future version of Quietly changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes. The policy was updated for version 1.2.0, which adds Google AdMob and optional Google Analytics for Firebase. Version 1.2.1 turned usage statistics on by default outside the EEA, the UK, Switzerland and Türkiye, after a one-time notice.",
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
    lastUpdated: "Son güncelleme: 03.11.2026",
    intro:
      "Quietly, Lunexa Games tarafından geliştirilmiş bir medya kaydedicidir. Yapıştırdığın URL'lerdeki doğrudan halka açık medyayı cihazının galerisine kaydeder. İnterneti senin istediğin medyayı indirmek ve bağlantın olup olmadığını kontrol etmek için kullanır; 1.2.0 sürümü ayrıca bir reklam yüklemek ve yalnızca izin verirsen kullanım istatistikleri göndermek için kullanır. Quietly hesap oluşturmaz. 1.1.0 sürümüne kadarki sürümler reklam göstermez ve analitik veya çökme raporlama içermez. 1.2.0 sürümü bir kayıt tamamlandıktan sonra Google'dan tek bir reklam gösterir ve yalnızca sen açarsan Google Analytics for Firebase'e kullanım istatistikleri gönderebilir. Bağlantıların, dosyaların ve geçmişin hiçbiriyle birlikte gönderilmez. 1.2.1 ve sonraki sürümler, aşağıda açıklanan kullanım istatistikleri dışında 1.2.0 sürümü gibi çalışır. Google Analytics for Firebase'e kullanım istatistikleri gönderebilirler: AEA'da, Birleşik Krallık'ta, İsviçre'de ve Türkiye'de yalnızca sen açarsan, diğer yerlerde tek seferlik bir bildirimden sonra; istediğin zaman kapatabilirsin.",
    sections: [
      {
        title: "Toplamadığımız veriler (1.1.0 sürümüne kadar)",
        paragraphs: [
          "Quietly hesap gerektirmez ve 1.1.0 sürümüne kadarki sürümler Google AdMob veya Firebase içermez. Quietly bir bağlantıya eriştiğinde veya bağlantını kontrol ettiğinde, ilgili sunucular IP adresin ve istek başlıkları gibi teknik istek bilgilerini alabilir. Açıkça belirtmek gerekirse, uygulama şunları toplamaz:",
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
        title: "Cihazından neler çıkar, neler asla çıkmaz (1.2.0 sürümü)",
        paragraphs: [
          "Quietly hesap gerektirmez. 1.2.0 sürümü, aşağıda açıklanan Google AdMob'u (reklamlar) ve Google Analytics for Firebase'i (isteğe bağlı kullanım istatistikleri) içerir. Quietly bir bağlantıya eriştiğinde veya bağlantını kontrol ettiğinde, ilgili sunucular IP adresin ve istek başlıkları gibi teknik istek bilgilerini alabilir. Quietly aşağıdakilerin hiçbirini Lunexa'ya, Google'ın reklam hizmetlerine veya Analytics'e asla göndermez:",
        ],
        bullets: [
          "Yapıştırdığın bağlantılar veya gösterdikleri sayfalar ya da dosyalarla ilgili herhangi bir şey",
          "Kaydettiğin medya, dosya adları, başlıklar veya dosya boyutları",
          "Geçmişin, kayıt kuyruğun veya panondaki herhangi bir şey",
          "Ad, e-posta adresi, telefon numarası veya herhangi bir hesap kimliği",
          "Kişiler, mikrofon, kamera veya kesin konum",
        ],
      },
      {
        title: "Ağ erişimi",
        paragraphs: [
          "Quietly interneti yalnızca şu amaçlarla kullanır:",
        ],
        bullets: [
          "Yapıştırdığın URL — Quietly, medya dosyasını kontrol edip indirmek için o URL'deki sunucuya bağlanır. Sunucu isteği yönlendirirse Quietly yönlendirilen sunucuya da bağlanır (en fazla beş yönlendirme; güvenli bir https bağlantısından güvensiz bir http bağlantısına asla geçilmez). Bu sunucular IP adresin ve istek başlıkları gibi standart teknik bilgileri alabilir ve kendi gizlilik politikalarına tabidir.",
          "https://www.gstatic.com/generate_204 — uygulamanın, yalnızca cihazının şu an internete bağlı olup olmadığını anlamak için otomatik olarak bağlandığı küçük bir Google uç noktası. Quietly bu kontrole yapıştırdığın URL'yi, indirilen medyaya dair herhangi bir bilgiyi veya kaydettiğin medyayı eklemez.",
          "Google AdMob (1.2.0 sürümü) — bir kayıt tamamlandıktan sonra Quietly, onay ekranında göstermek için Google'dan tek bir reklam ister. Çevrimdışıyken veya “Yalnızca Wi-Fi'de kaydet” açıkken mobil verideyken istemez. Aşağıdaki “Reklamlar” bölümüne bak.",
          "Google Analytics for Firebase (1.2.0 sürümü) — yalnızca kullanım istatistiklerini açarsan. Aşağıdaki “Kullanım istatistikleri” bölümüne bak.",
          "Google Analytics for Firebase (1.2.1 ve sonraki sürümler) — kullanım istatistikleri açık olduğu sürece. Aşağıdaki “Kullanım istatistikleri” bölümüne bak.",
        ],
      },
      {
        title: "Reklamlar (Google AdMob, 1.2.0 sürümü)",
        paragraphs: [
          "Quietly ücretsizdir ve bir kaydı onaylayan ekranda Google'dan tek bir banner reklam gösterir. Uygulamanın başka hiçbir yerinde reklam yoktur; tam ekran veya video reklam da yoktur.",
          "Reklamı göstermek ve ölçmek için Google AdMob; cihazının reklam kimliği, IP adresin ve ondan çıkarılan yaklaşık konum, cihaz ve uygulama bilgileri ve reklamla etkileşimin gibi bilgileri toplar. Google bu bilgileri, Google'ın hizmetlerimizi kullanan site veya uygulamalardan gelen bilgileri nasıl kullandığı sayfasında (https://policies.google.com/technologies/partner-sites) anlatıldığı şekilde kullanır.",
          "Yasanın gerektirdiği yerlerde (örneğin AEA, Birleşik Krallık, İsviçre ve bazı ABD eyaletleri) Google önce seçimini sorar; bunu istediğin zaman Ayarlar → Gizlilik → Reklam gizliliği seçenekleri bölümünden değiştirebilirsin. Quietly her reklam isteğinde Google'dan isteği bir gençten geliyormuş gibi ele almasını ister; bu yüzden reklamlar kişiselleştirilmez, yeniden pazarlama kapalıdır ve yalnızca her yaşa uygun reklamlar gösterilir. Hayır demen reklamları kapatmaz: Google yine de sınırlı bir reklam gösterebilir.",
        ],
      },
      {
        title: "Kullanım istatistikleri (Google Analytics for Firebase, 1.2.0 sürümü)",
        paragraphs: [
          "Kullanım istatistikleri, Ayarlar → Gizlilik → Kullanım istatistiklerini paylaş seçeneğini açmadıkça kapalıdır. Bu seçim Google'ın reklam izninden ayrıdır: birine izin vermek diğerini asla açmaz.",
          "Açıkken Quietly, açtığın ekranların ve bağlantı kontrolleriyle kayıtların nasıl sonuçlandığının sayımlarını gönderir; örneğin bir kaydın tamamlanıp tamamlanmadığı, başarısız olup olmadığı veya iptal edilip edilmediği, medya türü ve 1, 2–5 ya da 6+ gibi aralıklarla öğe sayısı. Firebase ayrıca uygulama açılışları, oturumlar, cihaz modeli, işletim sistemi sürümü, dil ve yaklaşık ülke gibi bazı bilgileri otomatik olarak kaydeder.",
          "Quietly, Analytics'e bağlantıları, dosya adlarını, başlıkları, dosya boyutlarını, geçmişini veya reklam kimliğini asla göndermez; kullanım istatistikleri reklam için kullanılmaz.",
          "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan dosyalar ve veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
          "Kullanım istatistiklerini aynı yerden istediğin zaman kapatabilirsin: toplama durur, Firebase'in cihazında tuttuğu analitik veriler ve uygulama örneği kimliği sıfırlanır.",
        ],
      },
      {
        title: "Kullanım istatistikleri (Google Analytics for Firebase, 1.2.1 ve sonraki sürümler)",
        paragraphs: [
          "Kullanım istatistiklerinin açık olup olmadığı nerede olduğuna bağlıdır. Quietly bunu her açılışta belirler:",
        ],
        bullets: [
          "AEA'da, Birleşik Krallık'ta, İsviçre'de ve Türkiye'de Ayarlar → Gizlilik → Kullanım istatistiklerini paylaş seçeneğini açmadıkça kapalıdır;",
          "diğer yerlerde uygulamadaki tek seferlik bir bildirimden sonra açılır; bu bildirim kapatmana da izin verir;",
          "Quietly nerede olduğunu anlayamazsa (örneğin çevrimdışıysan) kapalı kalır.",
        ],
        afterBullets: [
          "Bölge nasıl belirlenir: AEA, Birleşik Krallık ve İsviçre için Quietly, Google'ın reklam izni mesajı için de kullandığı, IP adresine dayanan Google rıza hizmetinin yanıtını kullanır. Türkiye için SIM kartının ülkesini, SIM yoksa cihazının veya uygulamanın dilini kullanır. Quietly sonucu saklamaz ve hiçbir yere göndermez. VPN veya seyahat yanıtı değiştirebilir.",
          "Ayarlar'da ya da bildirimdeki “Kapat” ile yaptığın seçim, nerede olursan ol her zaman geçerlidir; 1.2.0 sürümünde yaptığın seçimler korunur. Bu seçim Google'ın reklam izninden ayrıdır: birine izin vermek diğerini asla açmaz ve Google'ın reklam izni istatistikler için izin olarak kullanılmaz.",
          "Açıkken Quietly, açtığın ekranların ve bağlantı kontrolleriyle kayıtların nasıl sonuçlandığının sayımlarını gönderir; örneğin bir kaydın tamamlanıp tamamlanmadığı, başarısız olup olmadığı veya iptal edilip edilmediği, medya türü ve 1, 2–5 ya da 6+ gibi aralıklarla öğe sayısı. Firebase ayrıca uygulama açılışları, oturumlar, cihaz modeli, işletim sistemi sürümü, dil ve yaklaşık ülke gibi bazı bilgileri otomatik olarak kaydeder.",
          "Quietly, Analytics'e bağlantıları, dosya adlarını, başlıkları, dosya boyutlarını, geçmişini veya reklam kimliğini asla göndermez; kullanım istatistikleri reklam için kullanılmaz.",
          "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan dosyalar ve veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
          "Kullanım istatistiklerini aynı yerden istediğin zaman kapatabilirsin: toplama durur, Firebase'in cihazında tuttuğu analitik veriler ve uygulama örneği kimliği sıfırlanır.",
        ],
      },
      {
        title: "İzinler ve ne için kullandığımız",
        paragraphs: [
          "Quietly yalnızca işini yapmak için gereken izinleri ister:",
        ],
        bullets: [
          "İnternet — yapıştırdığın URL'deki medyayı indirmek için",
          "Fotoğraflarına / galerine kaydetme — kaydetmeyi seçtiğin dosyaları cihazının galerisine eklemek için. Quietly yalnızca dosya ekler; mevcut fotoğraflarını ve videolarını okumaz veya taramaz.",
          "Pano okuma — Quietly'yi açtığında, uygulamaya geri döndüğünde veya Home ekranını açtığında, uygulama sana bir bağlantı önerebilmek için mevcut panoda bağlantı olup olmadığını kontrol edebilir. Bu şekilde algılanan bağlantı yalnızca uygulamanın belleğinde tutulur; yalnızca algılandığı için kaydedilmez veya herhangi bir yere gönderilmez. Bir bağlantıyı kendin de yapıştırabilirsin; bu, otomatik kontrolden ayrı bir işlemdir. Bir bağlantı geçmişine yalnızca kaydetmeyi seçtiğin bir öğenin parçası olarak eklenir; panonun geri kalanı asla kaydedilmez.",
          "Reklam kimliği ve Android reklam hizmetleri (AD_ID, ACCESS_ADSERVICES_*; 1.2.0 sürümü) — Google AdMob tarafından reklamı göstermek ve ölçmek ve dolandırıcılığı önlemek için kullanılır. Reklam kimliğini cihaz ayarlarından sıfırlayabilir veya silebilirsin. Quietly'nin kullanım istatistikleri bunu kullanmaz.",
        ],
      },
      {
        title: "Cihazında yerel olarak saklanan veriler",
        paragraphs: [
          "Oturumlar arasında ayarlarını ve kaydettiğin medyayı hatırlamak için Quietly, aşağıda listelenen verileri cihazındaki kendi depolama alanında tutar. Kullanılan depolama miktarı kaydettiğin içeriğe bağlıdır. Bu bölüm Quietly'nin kendi yerel depolamasını açıklar; işletim sisteminin kendi özellikleriyle yapılan yedeklemeler veya aktarımlar bu bölümün kapsamı dışındadır.",
        ],
        bullets: [
          "Uygulamada seçtiğin tercihler ve ayarlar",
          "Kayıt geçmişin — her girdi şunları içerir: kimlik, medya türü, başlık, açıklayıcı metaveri, kayıt zamanı, kaynak bağlantı (tam URL'si) ve cihazındaki dosya yolu",
          "Kaydettiğin medyanın kopyaları — Quietly, kaydedilen medyanın bir kopyasını, galerine başarıyla eklenen kopyalardan ayrı olarak cihazındaki uygulamaya özel depolama alanında saklar",
          "Kayıt kuyruğun (Quietly 1.1.0 ve sonrası) — başlattığın ama henüz tamamlanmamış kayıtlar; uygulama yeniden başladıktan sonra yeniden deneyebilmen veya kaldırabilmen için saklanır",
          "Kullanım istatistikleri bildiriminin gösterilip gösterilmediği (Quietly 1.2.1 ve sonrası)",
        ],
      },
      {
        title: "Verilerini nasıl silersin",
        paragraphs: [
          "Kayıt geçmişini, uygulamadaki geçmişi temizleme seçeneğiyle uygulama içinden silebilirsin. Quietly 1.1.0 ve sonraki sürümlerde geçmişini temizlemek, Quietly'nin uygulamaya özel depolama alanında tuttuğu medya kopyalarını da silebilir; uygulama bunları silmeden önce senden onay ister. Önceki sürümlerde geçmişi temizlemek bu kopyaları silmez. Geçmişi temizlemek, galerine kaydedilen dosyaları silmez. Tamamlanmamış bir kaydı kayıt kuyruğundan da kaldırabilirsin. Yerel olarak saklanan tercihleri de kaldırmak için işletim sisteminin uygulama depolama kontrolünü kullan (Android: Ayarlar → Uygulamalar → Quietly → Depolama) veya uygulamayı kaldır. İndirilen dosyalar, sen elle silmediğin sürece galerinde kalır.",
        ],
      },
      {
        title: "Yapmadığımız şeyler",
        paragraphs: [
          "Quietly sayfa kazıma yapmaz ve sosyal platform akışlarını ayrıştırmaz. Oturum açılmış veya DRM korumalı içeriklere erişmez. Kendi başına medya aramaz; yalnızca senin isteğinle, yapıştırdığın veya kaydetmeyi seçtiğin bağlantıları getirir.",
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
          "Quietly çocuklara yönelik değildir ve Lunexa, 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz.",
        ],
      },
      {
        title: "Bu politikadaki değişiklikler",
        paragraphs: [
          "Quietly'nin ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, Google AdMob ve isteğe bağlı Google Analytics for Firebase ekleyen 1.2.0 sürümü için güncellenmiştir. 1.2.1 sürümü, kullanım istatistiklerini AEA, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra varsayılan olarak açtı.",
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
    lastUpdated: "Última actualización: 2026-11-03",
    intro:
      "Quietly es un guardador de medios creado por Lunexa Games. La aplicación guarda medios públicos directos desde URLs que pegas en la galería de tu dispositivo. Usa internet para descargar los medios que pides y para comprobar si tienes conexión; la versión 1.2.0 también lo usa para cargar un anuncio y, solo si lo permites, para enviar estadísticas de uso. Quietly no crea cuentas. Las versiones hasta la 1.1.0 no muestran anuncios y no incluyen analítica ni informes de errores. La versión 1.2.0 muestra un anuncio de Google cuando termina un guardado, y puede enviar estadísticas de uso a Google Analytics para Firebase, solo si lo activas. Tus enlaces, archivos e historial nunca se envían con ninguno de ellos. La versión 1.2.1 y las posteriores funcionan como la versión 1.2.0, salvo en las estadísticas de uso, que se describen más abajo. Pueden enviar estadísticas de uso a Google Analytics para Firebase: en el EEE, el Reino Unido, Suiza y Turquía solo si lo activas, y en otros lugares tras un aviso único, con un interruptor para desactivarlo.",
    sections: [
      {
        title: "Lo que no recopilamos (hasta la versión 1.1.0)",
        paragraphs: [
          "Quietly no requiere una cuenta, y las versiones hasta la 1.1.0 no incluyen Google AdMob ni Firebase. Cuando Quietly accede a un enlace o comprueba tu conexión, los servidores implicados pueden recibir información técnica de la solicitud, como tu dirección IP y las cabeceras de la solicitud. En concreto, la aplicación no recopila:",
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
        title: "Qué sale de tu dispositivo y qué nunca sale (versión 1.2.0)",
        paragraphs: [
          "Quietly no requiere una cuenta. La versión 1.2.0 incluye Google AdMob (anuncios) y Google Analytics para Firebase (estadísticas de uso opcionales), que se describen más abajo. Cuando Quietly accede a un enlace o comprueba tu conexión, los servidores implicados pueden recibir información técnica de la solicitud, como tu dirección IP y las cabeceras de la solicitud. Quietly nunca envía nada de lo siguiente a Lunexa, a los servicios publicitarios de Google ni a Analytics:",
        ],
        bullets: [
          "Los enlaces que pegas, ni nada sobre las páginas o archivos a los que apuntan",
          "Tus medios guardados, nombres de archivo, títulos ni tamaños de archivo",
          "Tu historial, tu cola de guardado ni nada de tu portapapeles",
          "Nombre, correo electrónico, número de teléfono ni ningún identificador de cuenta",
          "Contactos, micrófono, cámara ni ubicación precisa",
        ],
      },
      {
        title: "Acceso a la red",
        paragraphs: [
          "Quietly usa internet solo para estos fines:",
        ],
        bullets: [
          "La URL que pegas — Quietly contacta con el servidor de esa URL para comprobar y descargar el archivo de medios. Si ese servidor redirige la solicitud, Quietly también contacta con el servidor al que redirige (como máximo cinco redirecciones, y nunca de un enlace https seguro a uno http inseguro). Esos servidores pueden recibir información técnica estándar, como tu dirección IP y las cabeceras de la solicitud, y se rigen por sus propias políticas de privacidad.",
          "https://www.gstatic.com/generate_204 — un pequeño endpoint de Google que la aplicación contacta automáticamente, solo para comprobar si tu dispositivo tiene conexión a internet. Quietly no incluye en esta comprobación la URL que pegas, ninguna información sobre los medios descargados ni los medios que guardas.",
          "Google AdMob (versión 1.2.0) — cuando termina un guardado, Quietly pide a Google un anuncio para mostrarlo en la pantalla de confirmación. No lo pide cuando no tienes conexión, ni con datos móviles mientras “Guardar solo con Wi-Fi” está activado. Consulta “Publicidad” más abajo.",
          "Google Analytics para Firebase (versión 1.2.0) — solo si activas las estadísticas de uso. Consulta “Estadísticas de uso” más abajo.",
          "Google Analytics para Firebase (versión 1.2.1 y posteriores) — mientras las estadísticas de uso estén activadas. Consulta “Estadísticas de uso” más abajo.",
        ],
      },
      {
        title: "Publicidad (Google AdMob, versión 1.2.0)",
        paragraphs: [
          "Quietly es gratis y muestra un único anuncio de banner de Google, en la pantalla que confirma un guardado. En ninguna otra parte de la app hay anuncios, ni a pantalla completa ni de vídeo.",
          "Para mostrar y medir el anuncio, Google AdMob recopila información como el identificador de publicidad de tu dispositivo, tu dirección IP y la ubicación aproximada que se deriva de ella, datos del dispositivo y de la app, y cómo interactúas con el anuncio. Google la usa como se describe en Cómo usa Google la información de sitios web o aplicaciones que utilizan nuestros servicios (https://policies.google.com/technologies/partner-sites).",
          "Donde la ley lo exige (por ejemplo, en el EEE, el Reino Unido, Suiza y algunos estados de EE. UU.), Google te pide antes tu elección, y puedes cambiarla cuando quieras en Ajustes → Privacidad → Opciones de privacidad de anuncios. Quietly pide a Google que trate cada solicitud de anuncio como si viniera de un adolescente, por lo que los anuncios no se personalizan, el remarketing está desactivado y solo se muestran anuncios aptos para todas las edades. Decir que no no desactiva los anuncios: Google puede seguir mostrando un anuncio limitado.",
        ],
      },
      {
        title: "Estadísticas de uso (Google Analytics para Firebase, versión 1.2.0)",
        paragraphs: [
          "Las estadísticas de uso están desactivadas salvo que actives Ajustes → Privacidad → Compartir estadísticas de uso. Tu elección es independiente del consentimiento de anuncios de Google: aceptar uno nunca activa el otro.",
          "Si las activas, Quietly envía recuentos de las pantallas que abres y de cómo terminan las comprobaciones de enlaces y los guardados; por ejemplo, si un guardado terminó, falló o se canceló, el tipo de medio y el número de elementos en rangos como 1, 2–5 o 6+. Firebase también registra cierta información automáticamente, como las aperturas de la app, las sesiones, el modelo del dispositivo, la versión del sistema, el idioma y el país aproximado.",
          "Quietly nunca envía a Analytics enlaces, nombres de archivo, títulos, tamaños de archivo, tu historial ni tu identificador de publicidad, y las estadísticas de uso no se usan para publicidad.",
          "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los archivos y datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
          "Desactiva las estadísticas de uso cuando quieras en el mismo lugar: la recopilación se detiene y se restablecen los datos de analítica que Firebase guardaba en tu dispositivo y su identificador de instancia de la app.",
        ],
      },
      {
        title: "Estadísticas de uso (Google Analytics para Firebase, versión 1.2.1 y posteriores)",
        paragraphs: [
          "Que las estadísticas de uso estén activadas depende de dónde estés. Quietly lo determina cada vez que se abre:",
        ],
        bullets: [
          "en el EEE, el Reino Unido, Suiza y Turquía están desactivadas salvo que actives Ajustes → Privacidad → Compartir estadísticas de uso;",
          "en otros lugares se activan tras un aviso único en la app, que también te permite desactivarlas;",
          "si Quietly no puede saber dónde estás (por ejemplo, sin conexión), siguen desactivadas.",
        ],
        afterBullets: [
          "Cómo se determina la región: para el EEE, el Reino Unido y Suiza, Quietly usa la respuesta del servicio de consentimiento de Google, la misma comprobación que Google usa para su mensaje de consentimiento de anuncios, basada en tu dirección IP. Para Turquía usa el país de tu tarjeta SIM o, sin SIM, el idioma del dispositivo o de la app. Quietly no guarda el resultado ni lo envía a ningún sitio. Una VPN o un viaje pueden cambiar la respuesta.",
          "La elección que hagas —en Ajustes o con “Desactivar” en el aviso— se aplica siempre, estés donde estés, y se conservan las elecciones hechas en la versión 1.2.0. Es independiente del consentimiento de anuncios de Google: aceptar uno nunca activa el otro, y el consentimiento de anuncios de Google nunca se usa como consentimiento para las estadísticas.",
          "Si las activas, Quietly envía recuentos de las pantallas que abres y de cómo terminan las comprobaciones de enlaces y los guardados; por ejemplo, si un guardado terminó, falló o se canceló, el tipo de medio y el número de elementos en rangos como 1, 2–5 o 6+. Firebase también registra cierta información automáticamente, como las aperturas de la app, las sesiones, el modelo del dispositivo, la versión del sistema, el idioma y el país aproximado.",
          "Quietly nunca envía a Analytics enlaces, nombres de archivo, títulos, tamaños de archivo, tu historial ni tu identificador de publicidad, y las estadísticas de uso no se usan para publicidad.",
          "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los archivos y datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
          "Desactiva las estadísticas de uso cuando quieras en el mismo lugar: la recopilación se detiene y se restablecen los datos de analítica que Firebase guardaba en tu dispositivo y su identificador de instancia de la app.",
        ],
      },
      {
        title: "Permisos y para qué los usamos",
        paragraphs: [
          "Quietly solicita únicamente los permisos que necesita para funcionar:",
        ],
        bullets: [
          "Internet — para descargar el contenido en la URL que pegas",
          "Guardar en tus fotos / galería — para añadir a la galería de tu dispositivo los archivos que decides guardar. Quietly solo añade archivos; no lee ni explora tus fotos y vídeos existentes.",
          "Lectura del portapapeles — cuando abres Quietly, vuelves a la aplicación o abres la pantalla Home, la aplicación puede comprobar el portapapeles actual en busca de un enlace para sugerírtelo. Un enlace detectado así solo se mantiene en la memoria de la aplicación y no se guarda ni se envía a ningún sitio por el mero hecho de haberse detectado. También puedes pegar un enlace tú mismo; esto es independiente de la comprobación automática. Un enlace solo se guarda en tu historial como parte de un elemento que eliges guardar, y el resto del portapapeles nunca se almacena.",
          "Identificador de publicidad y servicios de anuncios de Android (AD_ID, ACCESS_ADSERVICES_*; versión 1.2.0) — los usa Google AdMob para mostrar y medir el anuncio y para prevenir el fraude. Puedes restablecer o eliminar tu identificador de publicidad en los ajustes del dispositivo. Las estadísticas de uso de Quietly no lo usan.",
        ],
      },
      {
        title: "Datos almacenados localmente en tu dispositivo",
        paragraphs: [
          "Para recordar tus ajustes y los medios que guardas entre sesiones, Quietly conserva los datos que se indican a continuación en su propio almacenamiento en tu dispositivo. El espacio que ocupan depende de lo que guardes. Esta sección describe el almacenamiento local propio de Quietly; las copias de seguridad o transferencias realizadas por funciones propias de tu sistema operativo quedan fuera de su alcance.",
        ],
        bullets: [
          "Las preferencias y ajustes que eliges en la aplicación",
          "Tu historial de elementos guardados — cada entrada incluye un identificador, el tipo de medio, un título, metadatos descriptivos, la hora en que se guardó, el enlace de origen (su URL completa) y la ruta del archivo en tu dispositivo",
          "Copias de los medios que guardas — Quietly almacena una copia de los medios guardados en el almacenamiento privado de la aplicación en tu dispositivo, aparte de cualquier copia que se haya añadido correctamente a tu galería",
          "Tu cola de guardado (Quietly 1.1.0 y posteriores) — los guardados que has iniciado y aún no han terminado, para que puedas reintentarlos o quitarlos después de reiniciar la aplicación",
          "Si ya se mostró el aviso de estadísticas de uso (Quietly 1.2.1 y posteriores)",
        ],
      },
      {
        title: "Cómo borrar tus datos",
        paragraphs: [
          "Puedes borrar los registros de tu historial guardado desde dentro de la aplicación con su opción para borrar el historial. En Quietly 1.1.0 y posteriores, borrar el historial también puede eliminar las copias de medios que Quietly conserva en su almacenamiento privado, y la aplicación te pide confirmación antes de eliminarlas; en versiones anteriores, borrar el historial no elimina esas copias. Borrar el historial no elimina los archivos guardados en tu galería. También puedes quitar un guardado sin terminar de la cola de guardado. Para eliminar también las preferencias almacenadas localmente, borra el almacenamiento de la aplicación desde tu sistema operativo (Android: Ajustes → Aplicaciones → Quietly → Almacenamiento) o desinstálala. Los archivos descargados permanecen en tu galería a menos que los borres manualmente.",
        ],
      },
      {
        title: "Lo que no hacemos",
        paragraphs: [
          "Quietly no realiza scraping de páginas ni parsea fuentes de plataformas sociales. No accede a contenido protegido por inicio de sesión o DRM. No busca medios por su cuenta; solo descarga, a petición tuya, los enlaces que pegas o eliges guardar.",
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
          "Quietly no está dirigida a niños, y Lunexa no recopila intencionalmente datos personales de menores de 13 años.",
        ],
      },
      {
        title: "Cambios en esta política",
        paragraphs: [
          "Si una versión futura de Quietly cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.2.0, que añade Google AdMob y Google Analytics para Firebase opcional. La versión 1.2.1 activó por defecto las estadísticas de uso fuera del EEE, el Reino Unido, Suiza y Turquía, tras un aviso único.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre esta política pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

// ── RPS Duel terms of service ──
// App-specific terms. Standalone: the generic /terms document is scoped to the
// uselunexa.com website and grants no app licence, so it is deliberately not
// incorporated by reference here. Scope constraint: these terms describe the
// agreement only. Data behaviour belongs in the privacy policy above — do not
// restate "no ads"/"no analytics" here, or this block goes stale the moment the
// app's SDK set changes.

export const RPS_DUEL_TERMS: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "RPS Duel · Terms",
    heading: "RPS Duel — Terms of Service",
    lastUpdated: "Last updated: 2026-10-28",
    intro:
      "These terms apply to the RPS Duel mobile app made by Lunexa Games (package id: com.lunexa.games.rpsduel). The terms for the uselunexa.com website are separate and are published at uselunexa.com/terms.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "By installing or using RPS Duel, you agree to these terms. If you do not agree, please do not use the app.",
          "What the app does with information is described separately in the RPS Duel Privacy Policy.",
        ],
      },
      {
        title: "Entertainment only",
        paragraphs: [
          "RPS Duel is a game played for entertainment against a built-in opponent. It is not a gambling product. There is no real-money wagering, no betting, no prizes, and no cash-equivalent rewards. Scores, streaks and achievements exist only inside the game, have no monetary value, and cannot be exchanged for anything.",
        ],
      },
      {
        title: "No account",
        paragraphs: [
          "RPS Duel does not require an account. Your progress and preferences are kept on your device, and we keep no backup copy of them — so we cannot restore them for you. Clearing the app's data or uninstalling the app removes them from the device; whether a copy survives in your operating system's own backup is outside our control.",
        ],
      },
      {
        title: "Your licence to use the app",
        paragraphs: [
          "Lunexa Games grants you a personal, non-exclusive, non-transferable licence to install and use RPS Duel on devices you own or control, for your own non-commercial use. You may not sell, rent, sublicense, or redistribute the app.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Modify, reverse-engineer, or decompile the app, except where that restriction is prohibited by law",
          "Circumvent or interfere with how the app is intended to work",
          "Redistribute the app or present it as your own",
          "Use the app in any way that breaks applicable law",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The app — including its code, design, artwork, text, and sound — belongs to Lunexa Games unless stated otherwise. These terms do not transfer any ownership to you.",
        ],
      },
      {
        title: "Availability and updates",
        paragraphs: [
          "We may change, update, or discontinue RPS Duel or any of its features at any time. We are not obliged to release updates or to keep any particular feature available.",
        ],
      },
      {
        title: "Distribution through app stores",
        paragraphs: [
          "RPS Duel is distributed through Google Play. Your use of that store is governed by Google's own terms, which are separate from these.",
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          "The app is provided “as is” without warranties of any kind, express or implied. Lunexa Games does not guarantee that the app will be available at all times or free from errors.",
        ],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, Lunexa Games shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "We may revise these terms at any time. The date at the top of this page will reflect the change, and continued use of the app after revised terms are posted constitutes acceptance of them.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about these terms can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "RPS Duel · Şartlar",
    heading: "RPS Duel — Kullanım Şartları",
    lastUpdated: "Son güncelleme: 28.10.2026",
    intro:
      "Bu şartlar, Lunexa Games tarafından geliştirilen RPS Duel mobil uygulaması için geçerlidir (paket kimliği: com.lunexa.games.rpsduel). uselunexa.com web sitesinin şartları ayrıdır ve uselunexa.com/terms adresinde yayımlanır.",
    sections: [
      {
        title: "Genel bakış",
        paragraphs: [
          "RPS Duel'i yükleyerek veya kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen uygulamayı kullanmayın.",
          "Uygulamanın bilgilerle ne yaptığı ayrıca RPS Duel Gizlilik Politikası'nda açıklanmıştır.",
        ],
      },
      {
        title: "Yalnızca eğlence amaçlı",
        paragraphs: [
          "RPS Duel, yerleşik bir rakibe karşı eğlence amacıyla oynanan bir oyundur. Bir kumar ürünü değildir. Gerçek parayla bahis, bahis oynama, ödül veya nakit karşılığı ödül yoktur. Skorlar, seriler ve başarımlar yalnızca oyunun içinde vardır, parasal bir değer taşımaz ve hiçbir şeyle takas edilemez.",
        ],
      },
      {
        title: "Hesap yok",
        paragraphs: [
          "RPS Duel hesap gerektirmez. İlerlemeniz ve tercihleriniz cihazınızda saklanır ve bizde bunların hiçbir yedek kopyası bulunmaz — bu nedenle bunları sizin için geri yükleyemeyiz. Uygulama verilerini temizlemek veya uygulamayı kaldırmak bunları cihazdan siler; işletim sisteminizin kendi yedeğinde bir kopyanın kalıp kalmadığı bizim kontrolümüz dışındadır.",
        ],
      },
      {
        title: "Uygulamayı kullanma lisansınız",
        paragraphs: [
          "Lunexa Games, RPS Duel'i sahip olduğunuz veya kontrol ettiğiniz cihazlara kurmanız ve kendi ticari olmayan kullanımınız için kullanmanız amacıyla size kişisel, münhasır olmayan ve devredilemez bir lisans verir. Uygulamayı satamaz, kiralayamaz, alt lisanslayamaz veya yeniden dağıtamazsınız.",
        ],
      },
      {
        title: "Kabul edilebilir kullanım",
        paragraphs: ["Şunları yapmamayı kabul edersiniz:"],
        bullets: [
          "Yasaların bu kısıtlamayı yasakladığı durumlar dışında uygulamayı değiştirmek, tersine mühendislik uygulamak veya derlemesini çözmek",
          "Uygulamanın amaçlanan çalışma biçimini atlatmak veya buna müdahale etmek",
          "Uygulamayı yeniden dağıtmak veya kendinize aitmiş gibi sunmak",
          "Uygulamayı geçerli yasaları ihlal edecek şekilde kullanmak",
        ],
      },
      {
        title: "Fikri mülkiyet",
        paragraphs: [
          "Uygulama — kodu, tasarımı, görselleri, metni ve sesi dahil — aksi belirtilmedikçe Lunexa Games'e aittir. Bu şartlar size herhangi bir mülkiyet devretmez.",
        ],
      },
      {
        title: "Erişilebilirlik ve güncellemeler",
        paragraphs: [
          "RPS Duel'i veya herhangi bir özelliğini istediğimiz zaman değiştirebilir, güncelleyebilir veya sonlandırabiliriz. Güncelleme yayımlamak veya belirli bir özelliği sunmaya devam etmek zorunda değiliz.",
        ],
      },
      {
        title: "Uygulama mağazaları üzerinden dağıtım",
        paragraphs: [
          "RPS Duel, Google Play üzerinden dağıtılmaktadır. Bu mağazayı kullanmanız, bu şartlardan ayrı olan Google'ın kendi koşullarına tabidir.",
        ],
      },
      {
        title: "Sorumluluk reddi",
        paragraphs: [
          "Uygulama, açık veya zımni hiçbir garanti verilmeksizin “olduğu gibi” sunulur. Lunexa Games, uygulamanın her zaman erişilebilir veya hatasız olacağını garanti etmez.",
        ],
      },
      {
        title: "Sorumluluğun sınırlandırılması",
        paragraphs: [
          "Yasaların izin verdiği en geniş ölçüde, Lunexa Games uygulamayı kullanmanızdan doğan dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz.",
        ],
      },
      {
        title: "Bu şartlardaki değişiklikler",
        paragraphs: [
          "Bu şartları istediğimiz zaman güncelleyebiliriz. Sayfanın üst kısmındaki tarih değişikliği yansıtacaktır ve güncellenmiş şartlar yayımlandıktan sonra uygulamayı kullanmaya devam etmeniz bunları kabul ettiğiniz anlamına gelir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu şartlarla ilgili soruları şu adrese yazabilirsiniz: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "RPS Duel · Términos",
    heading: "RPS Duel — Términos de Servicio",
    lastUpdated: "Última actualización: 2026-10-28",
    intro:
      "Estos términos se aplican a la aplicación móvil RPS Duel creada por Lunexa Games (id de paquete: com.lunexa.games.rpsduel). Los términos del sitio web uselunexa.com son independientes y se publican en uselunexa.com/terms.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "Al instalar o usar RPS Duel, aceptas estos términos. Si no estás de acuerdo, por favor no uses la aplicación.",
          "Lo que la aplicación hace con la información se describe por separado en la Política de Privacidad de RPS Duel.",
        ],
      },
      {
        title: "Solo entretenimiento",
        paragraphs: [
          "RPS Duel es un juego de entretenimiento que se juega contra un oponente integrado. No es un producto de juegos de azar. No hay apuestas con dinero real, ni apuestas de ningún tipo, ni premios, ni recompensas equivalentes a dinero. Las puntuaciones, rachas y logros existen únicamente dentro del juego, no tienen valor monetario y no pueden canjearse por nada.",
        ],
      },
      {
        title: "Sin cuenta",
        paragraphs: [
          "RPS Duel no requiere una cuenta. Tu progreso y tus preferencias se guardan en tu dispositivo y no conservamos ninguna copia de seguridad de ellos, por lo que no podemos restaurarlos por ti. Borrar los datos de la aplicación o desinstalarla los elimina del dispositivo; que quede una copia en la copia de seguridad de tu propio sistema operativo está fuera de nuestro control.",
        ],
      },
      {
        title: "Tu licencia para usar la aplicación",
        paragraphs: [
          "Lunexa Games te concede una licencia personal, no exclusiva e intransferible para instalar y usar RPS Duel en dispositivos que poseas o controles, para tu propio uso no comercial. No puedes vender, alquilar, sublicenciar ni redistribuir la aplicación.",
        ],
      },
      {
        title: "Uso aceptable",
        paragraphs: ["Aceptas no:"],
        bullets: [
          "Modificar, aplicar ingeniería inversa o descompilar la aplicación, salvo cuando la ley prohíba esa restricción",
          "Eludir o interferir con el funcionamiento previsto de la aplicación",
          "Redistribuir la aplicación o presentarla como propia",
          "Usar la aplicación de cualquier forma que infrinja la ley aplicable",
        ],
      },
      {
        title: "Propiedad intelectual",
        paragraphs: [
          "La aplicación — incluidos su código, diseño, ilustraciones, texto y sonido — pertenece a Lunexa Games salvo que se indique lo contrario. Estos términos no te transfieren ninguna titularidad.",
        ],
      },
      {
        title: "Disponibilidad y actualizaciones",
        paragraphs: [
          "Podemos cambiar, actualizar o descontinuar RPS Duel o cualquiera de sus funciones en cualquier momento. No estamos obligados a publicar actualizaciones ni a mantener disponible ninguna función concreta.",
        ],
      },
      {
        title: "Distribución a través de tiendas de aplicaciones",
        paragraphs: [
          "RPS Duel se distribuye a través de Google Play. Tu uso de esa tienda se rige por los términos propios de Google, que son independientes de estos.",
        ],
      },
      {
        title: "Descargo de responsabilidad",
        paragraphs: [
          "La aplicación se ofrece “tal cual”, sin garantías de ningún tipo, expresas o implícitas. Lunexa Games no garantiza que la aplicación esté disponible en todo momento ni libre de errores.",
        ],
      },
      {
        title: "Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, Lunexa Games no será responsable de daños indirectos, incidentales o consecuentes derivados de tu uso de la aplicación.",
        ],
      },
      {
        title: "Cambios en estos términos",
        paragraphs: [
          "Podemos revisar estos términos en cualquier momento. La fecha en la parte superior de esta página reflejará el cambio, y seguir usando la aplicación después de que se publiquen los términos revisados constituye su aceptación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre estos términos pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

// ── Chess Rescue terms of service ──
// Standalone, same rationale as RPS Duel above. Product constraint: it is a
// puzzle game, not a trainer — no wording may imply coaching, certification,
// rating gain, or chess improvement.

export const CHESS_RESCUE_TERMS: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "Chess Rescue · Terms",
    heading: "Chess Rescue — Terms of Service",
    lastUpdated: "Last updated: 2026-09-13",
    intro:
      "These terms apply to the Chess Rescue mobile app made by Lunexa Games (package id: com.lunexa.games.chessrescue). The terms for the uselunexa.com website are separate and are published at uselunexa.com/terms.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "By installing or using Chess Rescue, you agree to these terms. If you do not agree, please do not use the app.",
          "What the app does with information is described separately in the Chess Rescue Privacy Policy.",
        ],
      },
      {
        title: "Entertainment only",
        paragraphs: [
          "Chess Rescue is a puzzle game played for entertainment. Its puzzles use the movement rules of chess, but the app is not a training, coaching, or certification product. It does not promise any improvement in your chess ability or rating, and it should not be relied on for that purpose.",
        ],
      },
      {
        title: "Offline play and no account",
        paragraphs: [
          "Chess Rescue does not require an account and does not need a network connection to play. Your progress is kept on your device, and we keep no copy of it — so we cannot restore it for you. Clearing the app's data or uninstalling the app removes it from the device; whether a copy survives in your operating system's own backup is outside our control.",
        ],
      },
      {
        title: "Your licence to use the app",
        paragraphs: [
          "Lunexa Games grants you a personal, non-exclusive, non-transferable licence to install and use Chess Rescue on devices you own or control, for your own non-commercial use. You may not sell, rent, sublicense, or redistribute the app.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Modify, reverse-engineer, or decompile the app, except where that restriction is prohibited by law",
          "Circumvent or interfere with how the app is intended to work",
          "Redistribute the app or present it as your own",
          "Use the app in any way that breaks applicable law",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The app — including its code, design, artwork, text, and puzzle set — belongs to Lunexa Games unless stated otherwise. These terms do not transfer any ownership to you.",
        ],
      },
      {
        title: "Availability and updates",
        paragraphs: [
          "We may change, update, or discontinue Chess Rescue or any of its features at any time. We are not obliged to release updates or to keep any particular feature available.",
        ],
      },
      {
        title: "Distribution through app stores",
        paragraphs: [
          "Where you obtain Chess Rescue through an app store, that store's own terms also apply to your download and are separate from these terms.",
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          "The app is provided “as is” without warranties of any kind, express or implied. Lunexa Games does not guarantee that the app will be available at all times or free from errors.",
        ],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, Lunexa Games shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "We may revise these terms at any time. The date at the top of this page will reflect the change, and continued use of the app after revised terms are posted constitutes acceptance of them.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about these terms can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "Chess Rescue · Şartlar",
    heading: "Chess Rescue — Kullanım Şartları",
    lastUpdated: "Son güncelleme: 13.09.2026",
    intro:
      "Bu şartlar, Lunexa Games tarafından geliştirilen Chess Rescue mobil uygulaması için geçerlidir (paket kimliği: com.lunexa.games.chessrescue). uselunexa.com web sitesinin şartları ayrıdır ve uselunexa.com/terms adresinde yayımlanır.",
    sections: [
      {
        title: "Genel bakış",
        paragraphs: [
          "Chess Rescue'yu yükleyerek veya kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen uygulamayı kullanmayın.",
          "Uygulamanın bilgilerle ne yaptığı ayrıca Chess Rescue Gizlilik Politikası'nda açıklanmıştır.",
        ],
      },
      {
        title: "Yalnızca eğlence amaçlı",
        paragraphs: [
          "Chess Rescue, eğlence amacıyla oynanan bir bulmaca oyunudur. Bulmacaları satrancın taş hareket kurallarını kullanır, ancak uygulama bir eğitim, koçluk veya sertifikasyon ürünü değildir. Satranç yeteneğinizde veya puanınızda herhangi bir gelişme vaat etmez ve bu amaçla kullanılmamalıdır.",
        ],
      },
      {
        title: "Çevrimdışı oynanış ve hesap yok",
        paragraphs: [
          "Chess Rescue hesap gerektirmez ve oynamak için ağ bağlantısına ihtiyaç duymaz. İlerlemeniz cihazınızda saklanır ve bizde hiçbir kopyası bulunmaz — bu nedenle bunu sizin için geri yükleyemeyiz. Uygulama verilerini temizlemek veya uygulamayı kaldırmak bunu cihazdan siler; işletim sisteminizin kendi yedeğinde bir kopyanın kalıp kalmadığı bizim kontrolümüz dışındadır.",
        ],
      },
      {
        title: "Uygulamayı kullanma lisansınız",
        paragraphs: [
          "Lunexa Games, Chess Rescue'yu sahip olduğunuz veya kontrol ettiğiniz cihazlara kurmanız ve kendi ticari olmayan kullanımınız için kullanmanız amacıyla size kişisel, münhasır olmayan ve devredilemez bir lisans verir. Uygulamayı satamaz, kiralayamaz, alt lisanslayamaz veya yeniden dağıtamazsınız.",
        ],
      },
      {
        title: "Kabul edilebilir kullanım",
        paragraphs: ["Şunları yapmamayı kabul edersiniz:"],
        bullets: [
          "Yasaların bu kısıtlamayı yasakladığı durumlar dışında uygulamayı değiştirmek, tersine mühendislik uygulamak veya derlemesini çözmek",
          "Uygulamanın amaçlanan çalışma biçimini atlatmak veya buna müdahale etmek",
          "Uygulamayı yeniden dağıtmak veya kendinize aitmiş gibi sunmak",
          "Uygulamayı geçerli yasaları ihlal edecek şekilde kullanmak",
        ],
      },
      {
        title: "Fikri mülkiyet",
        paragraphs: [
          "Uygulama — kodu, tasarımı, görselleri, metni ve bulmaca seti dahil — aksi belirtilmedikçe Lunexa Games'e aittir. Bu şartlar size herhangi bir mülkiyet devretmez.",
        ],
      },
      {
        title: "Erişilebilirlik ve güncellemeler",
        paragraphs: [
          "Chess Rescue'yu veya herhangi bir özelliğini istediğimiz zaman değiştirebilir, güncelleyebilir veya sonlandırabiliriz. Güncelleme yayımlamak veya belirli bir özelliği sunmaya devam etmek zorunda değiliz.",
        ],
      },
      {
        title: "Uygulama mağazaları üzerinden dağıtım",
        paragraphs: [
          "Chess Rescue'yu bir uygulama mağazası üzerinden edindiğinizde, o mağazanın kendi koşulları da indirmeniz için geçerlidir ve bu şartlardan ayrıdır.",
        ],
      },
      {
        title: "Sorumluluk reddi",
        paragraphs: [
          "Uygulama, açık veya zımni hiçbir garanti verilmeksizin “olduğu gibi” sunulur. Lunexa Games, uygulamanın her zaman erişilebilir veya hatasız olacağını garanti etmez.",
        ],
      },
      {
        title: "Sorumluluğun sınırlandırılması",
        paragraphs: [
          "Yasaların izin verdiği en geniş ölçüde, Lunexa Games uygulamayı kullanmanızdan doğan dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz.",
        ],
      },
      {
        title: "Bu şartlardaki değişiklikler",
        paragraphs: [
          "Bu şartları istediğimiz zaman güncelleyebiliriz. Sayfanın üst kısmındaki tarih değişikliği yansıtacaktır ve güncellenmiş şartlar yayımlandıktan sonra uygulamayı kullanmaya devam etmeniz bunları kabul ettiğiniz anlamına gelir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu şartlarla ilgili soruları şu adrese yazabilirsiniz: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "Chess Rescue · Términos",
    heading: "Chess Rescue — Términos de Servicio",
    lastUpdated: "Última actualización: 2026-09-13",
    intro:
      "Estos términos se aplican a la aplicación móvil Chess Rescue creada por Lunexa Games (id de paquete: com.lunexa.games.chessrescue). Los términos del sitio web uselunexa.com son independientes y se publican en uselunexa.com/terms.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "Al instalar o usar Chess Rescue, aceptas estos términos. Si no estás de acuerdo, por favor no uses la aplicación.",
          "Lo que la aplicación hace con la información se describe por separado en la Política de Privacidad de Chess Rescue.",
        ],
      },
      {
        title: "Solo entretenimiento",
        paragraphs: [
          "Chess Rescue es un juego de rompecabezas de entretenimiento. Sus rompecabezas usan las reglas de movimiento del ajedrez, pero la aplicación no es un producto de entrenamiento, tutoría ni certificación. No promete ninguna mejora en tu habilidad ajedrecística ni en tu puntuación, y no debe usarse con ese fin.",
        ],
      },
      {
        title: "Juego sin conexión y sin cuenta",
        paragraphs: [
          "Chess Rescue no requiere una cuenta ni necesita conexión de red para jugar. Tu progreso se guarda en tu dispositivo y no conservamos ninguna copia, por lo que no podemos restaurarlo por ti. Borrar los datos de la aplicación o desinstalarla lo elimina del dispositivo; que quede una copia en la copia de seguridad de tu propio sistema operativo está fuera de nuestro control.",
        ],
      },
      {
        title: "Tu licencia para usar la aplicación",
        paragraphs: [
          "Lunexa Games te concede una licencia personal, no exclusiva e intransferible para instalar y usar Chess Rescue en dispositivos que poseas o controles, para tu propio uso no comercial. No puedes vender, alquilar, sublicenciar ni redistribuir la aplicación.",
        ],
      },
      {
        title: "Uso aceptable",
        paragraphs: ["Aceptas no:"],
        bullets: [
          "Modificar, aplicar ingeniería inversa o descompilar la aplicación, salvo cuando la ley prohíba esa restricción",
          "Eludir o interferir con el funcionamiento previsto de la aplicación",
          "Redistribuir la aplicación o presentarla como propia",
          "Usar la aplicación de cualquier forma que infrinja la ley aplicable",
        ],
      },
      {
        title: "Propiedad intelectual",
        paragraphs: [
          "La aplicación — incluidos su código, diseño, ilustraciones, texto y conjunto de rompecabezas — pertenece a Lunexa Games salvo que se indique lo contrario. Estos términos no te transfieren ninguna titularidad.",
        ],
      },
      {
        title: "Disponibilidad y actualizaciones",
        paragraphs: [
          "Podemos cambiar, actualizar o descontinuar Chess Rescue o cualquiera de sus funciones en cualquier momento. No estamos obligados a publicar actualizaciones ni a mantener disponible ninguna función concreta.",
        ],
      },
      {
        title: "Distribución a través de tiendas de aplicaciones",
        paragraphs: [
          "Cuando obtienes Chess Rescue a través de una tienda de aplicaciones, los términos propios de esa tienda también se aplican a tu descarga y son independientes de estos términos.",
        ],
      },
      {
        title: "Descargo de responsabilidad",
        paragraphs: [
          "La aplicación se ofrece “tal cual”, sin garantías de ningún tipo, expresas o implícitas. Lunexa Games no garantiza que la aplicación esté disponible en todo momento ni libre de errores.",
        ],
      },
      {
        title: "Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, Lunexa Games no será responsable de daños indirectos, incidentales o consecuentes derivados de tu uso de la aplicación.",
        ],
      },
      {
        title: "Cambios en estos términos",
        paragraphs: [
          "Podemos revisar estos términos en cualquier momento. La fecha en la parte superior de esta página reflejará el cambio, y seguir usando la aplicación después de que se publiquen los términos revisados constituye su aceptación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre estos términos pueden enviarse a ",
    contactBodySuffix: ".",
  },
};

// ── Quietly terms of service ──
// Standalone, same rationale as the two games. Product constraint:
// attribution is "Lunexa", not "Lunexa Games" — Quietly is not a game. The
// authorised-use wording mirrors the shipped privacy policy: Quietly does not
// bypass access controls and does not verify rights. Neither half may be
// overstated into an enforcement promise.

export const QUIETLY_TERMS: Record<Locale, LegalDocument> = {
  en: {
    eyebrow: "Quietly · Terms",
    heading: "Quietly — Terms of Service",
    lastUpdated: "Last updated: 2026-09-13",
    intro:
      "These terms apply to the Quietly mobile app made by Lunexa. The terms for the uselunexa.com website are separate and are published at uselunexa.com/terms.",
    sections: [
      {
        title: "Overview",
        paragraphs: [
          "By installing or using Quietly, you agree to these terms. If you do not agree, please do not use the app.",
          "Quietly is a utility that saves direct public media from URLs you paste into your device's gallery. What the app does with information is described separately in the Quietly Privacy Policy.",
        ],
      },
      {
        title: "Authorised use only",
        paragraphs: [
          "You may use Quietly only to save media you are entitled to save. That means media you own, media you created, media you have the rights holder's permission to save, or media you are otherwise legally entitled to save.",
          "You are solely responsible for what you choose to save, and for complying with copyright law, the terms of the platform the media came from, and any other applicable law.",
        ],
      },
      {
        title: "What Quietly does not do",
        paragraphs: [
          "Quietly does not scrape pages or parse social-platform feeds. It does not access logged-in or DRM-protected content, and it does not circumvent access controls or protection measures. It does not impersonate any platform, and it does not operate a server-side download service on your behalf. It fetches what you paste, when you ask.",
          "Quietly does not check whether you hold the rights to the media at a URL you provide. The absence of that check is not permission, and it does not make an unauthorised save acceptable.",
        ],
      },
      {
        title: "No rights are granted to third-party media",
        paragraphs: [
          "Quietly gives you no rights in any media you save. Rights in that media stay with whoever holds them. Saving a file through Quietly does not make it yours to republish, share, or use commercially.",
        ],
      },
      {
        title: "No account",
        paragraphs: [
          "Quietly does not require an account. Your settings and your history of saved items are kept on your device, and we keep no copy of them — so we cannot restore them for you. Clearing the app's data or uninstalling the app removes them from the device; whether a copy survives in your operating system's own backup is outside our control.",
        ],
      },
      {
        title: "Your licence to use the app",
        paragraphs: [
          "Lunexa grants you a personal, non-exclusive, non-transferable licence to install and use Quietly on devices you own or control, for your own non-commercial use. You may not sell, rent, sublicense, or redistribute the app.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: ["You agree not to:"],
        bullets: [
          "Use Quietly to save media you are not entitled to save",
          "Use Quietly to circumvent any access control, paywall, or protection measure",
          "Modify, reverse-engineer, or decompile the app, except where that restriction is prohibited by law",
          "Redistribute the app or present it as your own",
          "Use the app in any way that breaks applicable law",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The app — including its code, design, and text — belongs to Lunexa unless stated otherwise. These terms do not transfer any ownership to you, and they give you no rights in media obtained through the app.",
        ],
      },
      {
        title: "Availability and updates",
        paragraphs: [
          "We may change, update, or discontinue Quietly or any of its features at any time. Because the app depends on sources we do not control, a URL that works today may stop working at any point. We are not obliged to release updates or to keep any particular feature available.",
        ],
      },
      {
        title: "Distribution through app stores",
        paragraphs: [
          "Where you obtain Quietly through an app store, that store's own terms also apply to your download and are separate from these terms.",
        ],
      },
      {
        title: "Disclaimer",
        paragraphs: [
          "The app is provided “as is” without warranties of any kind, express or implied. Lunexa does not guarantee that the app will be available at all times, free from errors, or able to retrieve any particular URL.",
        ],
      },
      {
        title: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, Lunexa shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app, including any claim arising from media you chose to save.",
        ],
      },
      {
        title: "Changes to these terms",
        paragraphs: [
          "We may revise these terms at any time. The date at the top of this page will reflect the change, and continued use of the app after revised terms are posted constitutes acceptance of them.",
        ],
      },
    ],
    contactTitle: "Contact",
    contactBodyPrefix: "Questions about these terms can be sent to ",
    contactBodySuffix: ".",
  },
  tr: {
    eyebrow: "Quietly · Şartlar",
    heading: "Quietly — Kullanım Şartları",
    lastUpdated: "Son güncelleme: 13.09.2026",
    intro:
      "Bu şartlar, Lunexa tarafından geliştirilen Quietly mobil uygulaması için geçerlidir. uselunexa.com web sitesinin şartları ayrıdır ve uselunexa.com/terms adresinde yayımlanır.",
    sections: [
      {
        title: "Genel bakış",
        paragraphs: [
          "Quietly'yi yükleyerek veya kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen uygulamayı kullanmayın.",
          "Quietly, yapıştırdığınız URL'lerdeki doğrudan halka açık medyayı cihazınızın galerisine kaydeden bir araçtır. Uygulamanın bilgilerle ne yaptığı ayrıca Quietly Gizlilik Politikası'nda açıklanmıştır.",
        ],
      },
      {
        title: "Yalnızca yetkili kullanım",
        paragraphs: [
          "Quietly'yi yalnızca kaydetmeye hakkınız olan medyayı kaydetmek için kullanabilirsiniz. Bu; sahibi olduğunuz, kendi oluşturduğunuz, hak sahibinden kaydetme izni aldığınız veya başka bir şekilde yasal olarak kaydetmeye yetkili olduğunuz medya anlamına gelir.",
          "Neyi kaydetmeyi seçtiğinizden ve telif hakkı yasasına, medyanın geldiği platformun koşullarına ve geçerli diğer tüm yasalara uymaktan yalnızca siz sorumlusunuz.",
        ],
      },
      {
        title: "Quietly'nin yapmadıkları",
        paragraphs: [
          "Quietly sayfa kazıma yapmaz ve sosyal platform akışlarını ayrıştırmaz. Oturum açılmış veya DRM korumalı içeriğe erişmez, erişim kontrollerini veya koruma önlemlerini atlatmaz. Hiçbir platformu taklit etmez ve sizin adınıza sunucu tarafında bir indirme hizmeti çalıştırmaz. Yalnızca siz istediğinizde, yapıştırdığınızı getirir.",
          "Quietly, sağladığınız bir URL'deki medyanın haklarına sahip olup olmadığınızı denetlemez. Bu denetimin yokluğu bir izin değildir ve yetkisiz bir kaydı kabul edilebilir hale getirmez.",
        ],
      },
      {
        title: "Üçüncü taraf medya üzerinde hak verilmez",
        paragraphs: [
          "Quietly, kaydettiğiniz hiçbir medya üzerinde size hak vermez. O medyanın hakları, hak sahibi kimse onda kalır. Bir dosyayı Quietly ile kaydetmeniz, onu yeniden yayımlama, paylaşma veya ticari olarak kullanma hakkı vermez.",
        ],
      },
      {
        title: "Hesap yok",
        paragraphs: [
          "Quietly hesap gerektirmez. Ayarlarınız ve kaydettiğiniz öğelerin geçmişi cihazınızda saklanır ve bizde hiçbir kopyası bulunmaz — bu nedenle bunları sizin için geri yükleyemeyiz. Uygulama verilerini temizlemek veya uygulamayı kaldırmak bunları cihazdan siler; işletim sisteminizin kendi yedeğinde bir kopyanın kalıp kalmadığı bizim kontrolümüz dışındadır.",
        ],
      },
      {
        title: "Uygulamayı kullanma lisansınız",
        paragraphs: [
          "Lunexa, Quietly'yi sahip olduğunuz veya kontrol ettiğiniz cihazlara kurmanız ve kendi ticari olmayan kullanımınız için kullanmanız amacıyla size kişisel, münhasır olmayan ve devredilemez bir lisans verir. Uygulamayı satamaz, kiralayamaz, alt lisanslayamaz veya yeniden dağıtamazsınız.",
        ],
      },
      {
        title: "Kabul edilebilir kullanım",
        paragraphs: ["Şunları yapmamayı kabul edersiniz:"],
        bullets: [
          "Quietly'yi kaydetmeye hakkınız olmayan medyayı kaydetmek için kullanmak",
          "Quietly'yi herhangi bir erişim kontrolünü, ödeme duvarını veya koruma önlemini atlatmak için kullanmak",
          "Yasaların bu kısıtlamayı yasakladığı durumlar dışında uygulamayı değiştirmek, tersine mühendislik uygulamak veya derlemesini çözmek",
          "Uygulamayı yeniden dağıtmak veya kendinize aitmiş gibi sunmak",
          "Uygulamayı geçerli yasaları ihlal edecek şekilde kullanmak",
        ],
      },
      {
        title: "Fikri mülkiyet",
        paragraphs: [
          "Uygulama — kodu, tasarımı ve metni dahil — aksi belirtilmedikçe Lunexa'ya aittir. Bu şartlar size herhangi bir mülkiyet devretmez ve uygulama aracılığıyla elde edilen medya üzerinde size hiçbir hak vermez.",
        ],
      },
      {
        title: "Erişilebilirlik ve güncellemeler",
        paragraphs: [
          "Quietly'yi veya herhangi bir özelliğini istediğimiz zaman değiştirebilir, güncelleyebilir veya sonlandırabiliriz. Uygulama, kontrol etmediğimiz kaynaklara bağlı olduğundan bugün çalışan bir URL her an çalışmayı bırakabilir. Güncelleme yayımlamak veya belirli bir özelliği sunmaya devam etmek zorunda değiliz.",
        ],
      },
      {
        title: "Uygulama mağazaları üzerinden dağıtım",
        paragraphs: [
          "Quietly'yi bir uygulama mağazası üzerinden edindiğinizde, o mağazanın kendi koşulları da indirmeniz için geçerlidir ve bu şartlardan ayrıdır.",
        ],
      },
      {
        title: "Sorumluluk reddi",
        paragraphs: [
          "Uygulama, açık veya zımni hiçbir garanti verilmeksizin “olduğu gibi” sunulur. Lunexa, uygulamanın her zaman erişilebilir, hatasız veya belirli bir URL'yi getirebilir olacağını garanti etmez.",
        ],
      },
      {
        title: "Sorumluluğun sınırlandırılması",
        paragraphs: [
          "Yasaların izin verdiği en geniş ölçüde, Lunexa uygulamayı kullanmanızdan doğan dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan — kaydetmeyi seçtiğiniz medyadan doğan talepler dahil — sorumlu tutulamaz.",
        ],
      },
      {
        title: "Bu şartlardaki değişiklikler",
        paragraphs: [
          "Bu şartları istediğimiz zaman güncelleyebiliriz. Sayfanın üst kısmındaki tarih değişikliği yansıtacaktır ve güncellenmiş şartlar yayımlandıktan sonra uygulamayı kullanmaya devam etmeniz bunları kabul ettiğiniz anlamına gelir.",
        ],
      },
    ],
    contactTitle: "İletişim",
    contactBodyPrefix: "Bu şartlarla ilgili soruları şu adrese yazabilirsiniz: ",
    contactBodySuffix: ".",
  },
  es: {
    eyebrow: "Quietly · Términos",
    heading: "Quietly — Términos de Servicio",
    lastUpdated: "Última actualización: 2026-09-13",
    intro:
      "Estos términos se aplican a la aplicación móvil Quietly creada por Lunexa. Los términos del sitio web uselunexa.com son independientes y se publican en uselunexa.com/terms.",
    sections: [
      {
        title: "Resumen",
        paragraphs: [
          "Al instalar o usar Quietly, aceptas estos términos. Si no estás de acuerdo, por favor no uses la aplicación.",
          "Quietly es una utilidad que guarda medios públicos directos desde las URLs que pegas en la galería de tu dispositivo. Lo que la aplicación hace con la información se describe por separado en la Política de Privacidad de Quietly.",
        ],
      },
      {
        title: "Solo uso autorizado",
        paragraphs: [
          "Solo puedes usar Quietly para guardar medios que tengas derecho a guardar. Es decir, medios que te pertenezcan, que hayas creado, para los que tengas permiso del titular de los derechos, o que estés legalmente autorizado a guardar de otro modo.",
          "Eres el único responsable de lo que elijas guardar y de cumplir con la ley de derechos de autor, los términos de la plataforma de la que procede el medio y cualquier otra ley aplicable.",
        ],
      },
      {
        title: "Lo que Quietly no hace",
        paragraphs: [
          "Quietly no hace scraping de páginas ni analiza feeds de plataformas sociales. No accede a contenido protegido por inicio de sesión o DRM, y no elude controles de acceso ni medidas de protección. No suplanta a ninguna plataforma y no opera un servicio de descarga del lado del servidor en tu nombre. Obtiene lo que pegas, cuando tú lo pides.",
          "Quietly no comprueba si posees los derechos sobre el medio de una URL que proporcionas. La ausencia de esa comprobación no es un permiso ni hace aceptable un guardado no autorizado.",
        ],
      },
      {
        title: "No se conceden derechos sobre medios de terceros",
        paragraphs: [
          "Quietly no te concede ningún derecho sobre los medios que guardes. Los derechos sobre ese contenido siguen siendo de quien los ostente. Guardar un archivo con Quietly no te da derecho a republicarlo, compartirlo ni usarlo comercialmente.",
        ],
      },
      {
        title: "Sin cuenta",
        paragraphs: [
          "Quietly no requiere una cuenta. Tus ajustes y tu historial de elementos guardados se conservan en tu dispositivo y no conservamos ninguna copia, por lo que no podemos restaurarlos por ti. Borrar los datos de la aplicación o desinstalarla los elimina del dispositivo; que quede una copia en la copia de seguridad de tu propio sistema operativo está fuera de nuestro control.",
        ],
      },
      {
        title: "Tu licencia para usar la aplicación",
        paragraphs: [
          "Lunexa te concede una licencia personal, no exclusiva e intransferible para instalar y usar Quietly en dispositivos que poseas o controles, para tu propio uso no comercial. No puedes vender, alquilar, sublicenciar ni redistribuir la aplicación.",
        ],
      },
      {
        title: "Uso aceptable",
        paragraphs: ["Aceptas no:"],
        bullets: [
          "Usar Quietly para guardar medios que no tengas derecho a guardar",
          "Usar Quietly para eludir cualquier control de acceso, muro de pago o medida de protección",
          "Modificar, aplicar ingeniería inversa o descompilar la aplicación, salvo cuando la ley prohíba esa restricción",
          "Redistribuir la aplicación o presentarla como propia",
          "Usar la aplicación de cualquier forma que infrinja la ley aplicable",
        ],
      },
      {
        title: "Propiedad intelectual",
        paragraphs: [
          "La aplicación — incluidos su código, diseño y texto — pertenece a Lunexa salvo que se indique lo contrario. Estos términos no te transfieren ninguna titularidad ni te otorgan derechos sobre los medios obtenidos con la aplicación.",
        ],
      },
      {
        title: "Disponibilidad y actualizaciones",
        paragraphs: [
          "Podemos cambiar, actualizar o descontinuar Quietly o cualquiera de sus funciones en cualquier momento. Como la aplicación depende de fuentes que no controlamos, una URL que funciona hoy puede dejar de funcionar en cualquier momento. No estamos obligados a publicar actualizaciones ni a mantener disponible ninguna función concreta.",
        ],
      },
      {
        title: "Distribución a través de tiendas de aplicaciones",
        paragraphs: [
          "Cuando obtienes Quietly a través de una tienda de aplicaciones, los términos propios de esa tienda también se aplican a tu descarga y son independientes de estos términos.",
        ],
      },
      {
        title: "Descargo de responsabilidad",
        paragraphs: [
          "La aplicación se ofrece “tal cual”, sin garantías de ningún tipo, expresas o implícitas. Lunexa no garantiza que la aplicación esté disponible en todo momento, libre de errores, ni que pueda recuperar una URL concreta.",
        ],
      },
      {
        title: "Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, Lunexa no será responsable de daños indirectos, incidentales o consecuentes derivados de tu uso de la aplicación, incluida cualquier reclamación derivada de los medios que hayas elegido guardar.",
        ],
      },
      {
        title: "Cambios en estos términos",
        paragraphs: [
          "Podemos revisar estos términos en cualquier momento. La fecha en la parte superior de esta página reflejará el cambio, y seguir usando la aplicación después de que se publiquen los términos revisados constituye su aceptación.",
        ],
      },
    ],
    contactTitle: "Contacto",
    contactBodyPrefix: "Las preguntas sobre estos términos pueden enviarse a ",
    contactBodySuffix: ".",
  },
};
