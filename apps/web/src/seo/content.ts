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
