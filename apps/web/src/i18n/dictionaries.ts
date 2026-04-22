import type { Locale } from "./config";

type Dictionary = typeof en;

const en = {
  nav: {
    about: "About",
    work: "What We Build",
    principles: "Principles",
    services: "Services",
    blog: "Blog",
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
      "We use essential and analytics cookies (including Google Analytics) to run and improve the site. Marketing cookies are optional. See our ",
    privacy_link: "Privacy Policy",
    description_suffix: " for details.",
    necessary_title: "Necessary cookies",
    necessary_desc:
      "Required for core site functionality such as security, session, and preferences.",
    analytics_title: "Analytics cookies",
    analytics_desc:
      "Required for operating and improving our service. We use Google Analytics to measure usage. These cannot be disabled on this site.",
    marketing_title: "Marketing cookies",
    marketing_desc: "For personalized content and advertising.",
    required_label: "Always on",
    accept_all: "Accept All",
    reject: "Reject",
    manage: "Manage Preferences",
    save: "Save Preferences",
  },
  notfound: {
    eyebrow: "404",
    heading: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Go home",
  },
  error: {
    eyebrow: "Error",
    heading: "Something went wrong",
    body: "An unexpected error occurred. You can try again or go back home.",
    retry: "Try again",
    home: "Go home",
  },
  privacy_page: {
    eyebrow: "Legal",
    heading: "Privacy Policy",
    last_updated: "Last updated: April 2026",
    overview_title: "Overview",
    overview_body:
      "Lunexa (\u201cwe\u201d, \u201cus\u201d) operates the website uselunexa.com. This policy explains what information we collect when you visit our site or use our contact form, and how we handle it.",
    collect_title: "What we collect",
    collect_p1:
      "When you submit our contact form, we collect your name, email address, and message content. We use this information solely to respond to your inquiry.",
    collect_newsletter:
      "When you confirm a newsletter subscription, we additionally record your IP address, user agent (browser/device string), referring URL, preferred language, and the version of the consent text you accepted. This data supports abuse prevention, deliverability troubleshooting, and legal compliance. It is retained for as long as your subscription is active and is removed when you unsubscribe or request account deletion.",
    collect_p2:
      "Our web server may automatically log standard technical data such as your IP address, browser type, and pages visited. This data is used for security monitoring and basic analytics only.",
    usage_title: "How we use your data",
    usage_item_1: "To respond to messages you send through our contact form",
    usage_item_2: "To monitor and maintain the security of our website",
    usage_item_3: "To understand general usage patterns and improve our site",
    usage_body:
      "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
    retention_title: "Data retention",
    retention_body:
      "Contact form submissions are retained only as long as necessary to address your inquiry. Server logs are retained for up to 90 days for security purposes.",
    cookies_title: "Cookies and Analytics",
    cookies_body:
      "This website uses essential cookies for core functionality and analytics cookies for understanding site usage. We use Google Analytics 4, which sets cookies (such as _ga and _ga_*) and collects anonymized data including page views, device type, browser, approximate geographic location, and referring source. This data is processed by Google in the United States. By browsing this website, you agree to this use. If you prefer to opt out site-wide, you can install the Google Analytics Opt-out Browser Add-on at https://tools.google.com/dlpage/gaoptout.",
    rights_title: "Your rights",
    rights_body_prefix:
      "You may request access to, correction of, or deletion of any personal data we hold about you. To make a request, contact us at ",
    rights_body_suffix: ".",
    changes_title: "Changes to this policy",
    changes_body:
      "We may update this policy from time to time. Changes will be posted on this page with an updated revision date.",
    contact_title: "Contact",
    contact_body_prefix:
      "If you have questions about this privacy policy, reach us at ",
    contact_body_suffix: ".",
  },
  terms_page: {
    eyebrow: "Legal",
    heading: "Terms of Use",
    last_updated: "Last updated: April 2026",
    agreement_title: "Agreement",
    agreement_body:
      "By accessing and using uselunexa.com, you agree to these terms. If you do not agree, please do not use this website.",
    use_title: "Use of this website",
    use_body:
      "This website is provided for informational purposes about Lunexa and its services. You may browse the site and use the contact form to reach us. You agree not to misuse the site, including submitting false information, attempting to disrupt its operation, or using automated tools to scrape its content.",
    ip_title: "Intellectual property",
    ip_body:
      "All content on this website \u2014 including text, design, graphics, and code \u2014 is the property of Lunexa unless otherwise stated. You may not reproduce, distribute, or create derivative works from our content without prior written permission.",
    form_title: "Contact form",
    form_body:
      "When you submit a message through our contact form, you grant us permission to use the information you provide to respond to your inquiry. We make no guarantees about response times. Messages containing harmful, abusive, or spam content may be discarded without response.",
    disclaimer_title: "Disclaimer",
    disclaimer_body:
      "This website and its content are provided \u201cas is\u201d without warranties of any kind, express or implied. Lunexa does not guarantee that the site will be available at all times or free from errors.",
    liability_title: "Limitation of liability",
    liability_body:
      "To the fullest extent permitted by law, Lunexa shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.",
    changes_title: "Changes",
    changes_body:
      "We may revise these terms at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.",
    contact_title: "Contact",
    contact_body_prefix: "Questions about these terms? Reach us at ",
    contact_body_suffix: ".",
  },
  language: {
    switcher_label: "Language",
  },
  theme: {
    switch_to_light: "Switch to light theme",
    switch_to_dark: "Switch to dark theme",
  },
  newsletter: {
    eyebrow: "Newsletter",
    heading: "Stay in the loop",
    subtitle:
      "Occasional notes on what we're building. No spam, unsubscribe any time.",
    email_label: "Email",
    email_placeholder: "you@example.com",
    consent_prefix: "I agree to receive the Lunexa newsletter and have read the ",
    privacy_link: "Privacy Policy",
    consent_suffix: ".",
    submit: "Subscribe",
    submitting: "Sending...",
    sent_title: "Check your inbox",
    sent_body:
      "We sent you a confirmation link. Open it within 15 minutes to complete the subscription.",
    consent_required: "Please accept the newsletter terms to continue.",
    rate_limit: "Too many requests. Please wait a few minutes.",
    network_error: "Could not reach the server. Please try again.",
    generic_error: "Something went wrong. Please try again.",
  },
  newsletter_confirmed: {
    eyebrow_ok: "Newsletter",
    eyebrow_err: "Link expired",
    ok_title: "Subscription confirmed",
    ok_body:
      "You're on the list. We'll reach out occasionally with what we're building.",
    expired_title: "This link is no longer valid",
    expired_body:
      "Confirmation links expire after 15 minutes. You can request a new one from the homepage.",
    home: "Go home",
  },
  newsletter_unsubscribed: {
    eyebrow_ok: "Newsletter",
    eyebrow_err: "Link expired",
    ok_title: "You're unsubscribed",
    ok_body:
      "You won't receive any more newsletter emails from us. You can resubscribe any time from the homepage.",
    expired_title: "This link is no longer valid",
    expired_body:
      "Unsubscribe links expire after 30 days. If you still want to opt out, contact hello@uselunexa.com.",
    home: "Go home",
  },
};

const tr: Dictionary = {
  nav: {
    about: "Hakkımızda",
    work: "Neler Yapıyoruz",
    principles: "İlkelerimiz",
    services: "Hizmetler",
    blog: "Blog",
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
      "Siteyi çalıştırmak ve geliştirmek için zorunlu ve analitik çerezleri (Google Analytics dahil) kullanıyoruz. Pazarlama çerezleri isteğe bağlıdır. Detaylar için ",
    privacy_link: "Gizlilik Politikası",
    description_suffix: " sayfamızı inceleyebilirsiniz.",
    necessary_title: "Zorunlu çerezler",
    necessary_desc:
      "Güvenlik, oturum ve tercihler gibi temel site işlevleri için gereklidir.",
    analytics_title: "Analitik çerezler",
    analytics_desc:
      "Hizmetimizi işletmek ve geliştirmek için gereklidir. Kullanımı ölçmek için Google Analytics kullanıyoruz. Bu sitede devre dışı bırakılamaz.",
    marketing_title: "Pazarlama çerezleri",
    marketing_desc: "Kişiselleştirilmiş içerik ve reklam için.",
    required_label: "Zorunlu",
    accept_all: "Tümünü Kabul Et",
    reject: "Reddet",
    manage: "Tercihleri Yönet",
    save: "Tercihleri Kaydet",
  },
  notfound: {
    eyebrow: "404",
    heading: "Sayfa bulunamadı",
    body: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    home: "Ana sayfaya dön",
  },
  error: {
    eyebrow: "Hata",
    heading: "Bir şeyler ters gitti",
    body: "Beklenmeyen bir hata oluştu. Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.",
    retry: "Tekrar dene",
    home: "Ana sayfaya dön",
  },
  privacy_page: {
    eyebrow: "Yasal",
    heading: "Gizlilik Politikası",
    last_updated: "Son güncelleme: Nisan 2026",
    overview_title: "Genel Bakış",
    overview_body:
      "Lunexa (\u201cbiz\u201d) uselunexa.com web sitesini işletir. Bu politika, sitemizi ziyaret ettiğinizde veya iletişim formumuzu kullandığınızda hangi bilgileri topladığımızı ve bunları nasıl işlediğimizi açıklar.",
    collect_title: "Hangi bilgileri topluyoruz",
    collect_p1:
      "İletişim formumuzu gönderdiğinizde adınızı, e-posta adresinizi ve mesaj içeriğinizi topluyoruz. Bu bilgileri yalnızca talebinizi yanıtlamak için kullanırız.",
    collect_newsletter:
      "Bülten aboneliğinizi onayladığınızda ek olarak IP adresinizi, kullanıcı aracısı (tarayıcı/cihaz bilgisi) kaydınızı, yönlendiren URL'yi, tercih ettiğiniz dili ve kabul ettiğiniz onay metninin sürümünü kaydediyoruz. Bu veriler kötüye kullanımın önlenmesi, teslimat sorunlarının giderilmesi ve yasal uyumluluk için kullanılır. Aboneliğiniz aktif olduğu sürece saklanır; abonelikten çıkmanız veya hesap silme talebinde bulunmanız durumunda kaldırılır.",
    collect_p2:
      "Web sunucumuz; IP adresiniz, tarayıcı türünüz ve ziyaret edilen sayfalar gibi standart teknik verileri otomatik olarak kaydedebilir. Bu veriler yalnızca güvenlik takibi ve temel analiz amacıyla kullanılır.",
    usage_title: "Verilerinizi nasıl kullanıyoruz",
    usage_item_1: "İletişim formu üzerinden gönderdiğiniz mesajlara yanıt vermek için",
    usage_item_2: "Sitemizin güvenliğini izlemek ve sürdürmek için",
    usage_item_3: "Genel kullanım örüntülerini anlamak ve sitemizi iyileştirmek için",
    usage_body:
      "Kişisel bilgilerinizi pazarlama amacıyla üçüncü taraflarla paylaşmıyoruz, satmıyoruz veya kiralamıyoruz.",
    retention_title: "Veri saklama",
    retention_body:
      "İletişim formu gönderimleri yalnızca talebinizi ele almak için gerekli süre boyunca saklanır. Sunucu logları güvenlik amacıyla en fazla 90 gün süreyle saklanır.",
    cookies_title: "Çerezler ve Analitik",
    cookies_body:
      "Bu web sitesi; temel işlevsellik için zorunlu çerezler ve site kullanımını anlamak için analitik çerezler kullanır. Google Analytics 4 kullanıyoruz; bu hizmet tarayıcınıza çerezler (_ga ve _ga_* gibi) yerleştirir ve sayfa görüntülemeleri, cihaz tipi, tarayıcı, yaklaşık coğrafi konum ve yönlendiren kaynak gibi anonim verileri toplar. Bu veriler Google tarafından Amerika Birleşik Devletleri'nde işlenir. Bu web sitesinde gezinerek bu kullanımı kabul etmiş olursunuz. Site genelinde devre dışı bırakmayı tercih ederseniz https://tools.google.com/dlpage/gaoptout adresinden Google Analytics Devre Dışı Bırakma tarayıcı eklentisini yükleyebilirsiniz.",
    rights_title: "Haklarınız",
    rights_body_prefix:
      "Sizinle ilgili tuttuğumuz kişisel verilere erişme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Talep iletmek için şu adrese yazın: ",
    rights_body_suffix: ".",
    changes_title: "Politika değişiklikleri",
    changes_body:
      "Bu politikayı zaman zaman güncelleyebiliriz. Değişiklikler, güncellenmiş bir revizyon tarihiyle bu sayfada yayınlanır.",
    contact_title: "İletişim",
    contact_body_prefix:
      "Bu gizlilik politikasıyla ilgili sorularınız için bizimle iletişime geçin: ",
    contact_body_suffix: ".",
  },
  terms_page: {
    eyebrow: "Yasal",
    heading: "Kullanım Şartları",
    last_updated: "Son güncelleme: Nisan 2026",
    agreement_title: "Anlaşma",
    agreement_body:
      "uselunexa.com'a erişerek ve kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız, lütfen bu web sitesini kullanmayın.",
    use_title: "Bu web sitesinin kullanımı",
    use_body:
      "Bu web sitesi Lunexa ve hizmetleri hakkında bilgi verme amacıyla sunulmaktadır. Siteyi gezebilir, bize ulaşmak için iletişim formunu kullanabilirsiniz. Yanlış bilgi göndermek, çalışmasını aksatmaya çalışmak veya içeriği kazımak için otomatik araçlar kullanmak dahil, siteyi kötüye kullanmayacağınızı kabul edersiniz.",
    ip_title: "Fikri mülkiyet",
    ip_body:
      "Bu web sitesindeki tüm içerik \u2014 metin, tasarım, grafik ve kod dahil \u2014 aksi belirtilmedikçe Lunexa'nın mülküdür. Önceden yazılı izin almadan içeriğimizi çoğaltamaz, dağıtamaz veya türev çalışmalar oluşturamazsınız.",
    form_title: "İletişim formu",
    form_body:
      "İletişim formumuz üzerinden bir mesaj gönderdiğinizde, sağladığınız bilgileri talebinize yanıt vermek için kullanmamıza izin vermiş olursunuz. Yanıt süreleri konusunda garanti vermiyoruz. Zararlı, saldırgan veya spam içerikli mesajlar yanıtlanmadan atılabilir.",
    disclaimer_title: "Sorumluluk reddi",
    disclaimer_body:
      "Bu web sitesi ve içeriği, herhangi bir açık veya zımni garanti olmaksızın \u201colduğu gibi\u201d sunulmaktadır. Lunexa, sitenin her zaman erişilebilir veya hatasız olacağını garanti etmez.",
    liability_title: "Sorumluluğun sınırlandırılması",
    liability_body:
      "Yasaların izin verdiği en geniş ölçüde, Lunexa bu web sitesinin kullanımından kaynaklanan dolaylı, arızi veya sonuç olarak ortaya çıkan zararlardan sorumlu tutulamaz.",
    changes_title: "Değişiklikler",
    changes_body:
      "Bu şartları herhangi bir zamanda değiştirebiliriz. Değişiklikler yayınlandıktan sonra web sitesini kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.",
    contact_title: "İletişim",
    contact_body_prefix: "Bu şartlarla ilgili sorular için bize ulaşın: ",
    contact_body_suffix: ".",
  },
  language: {
    switcher_label: "Dil",
  },
  theme: {
    switch_to_light: "Açık temaya geç",
    switch_to_dark: "Koyu temaya geç",
  },
  newsletter: {
    eyebrow: "Bülten",
    heading: "Gündemi kaçırmayın",
    subtitle:
      "Neler yaptığımıza dair arada gelen notlar. Spam yok, dilediğiniz zaman çıkabilirsiniz.",
    email_label: "E-posta",
    email_placeholder: "siz@ornek.com",
    consent_prefix: "Lunexa bültenini almayı kabul ediyorum ve ",
    privacy_link: "Gizlilik Politikası",
    consent_suffix: "'nı okudum.",
    submit: "Abone Ol",
    submitting: "Gönderiliyor...",
    sent_title: "Gelen kutunuza bakın",
    sent_body:
      "Size bir doğrulama bağlantısı gönderdik. Aboneliği tamamlamak için 15 dakika içinde açın.",
    consent_required: "Devam etmek için bülten şartlarını kabul edin.",
    rate_limit: "Çok fazla istek. Birkaç dakika sonra tekrar deneyin.",
    network_error: "Sunucuya ulaşılamadı. Lütfen tekrar deneyin.",
    generic_error: "Bir şeyler ters gitti. Tekrar deneyin.",
  },
  newsletter_confirmed: {
    eyebrow_ok: "Bülten",
    eyebrow_err: "Bağlantı süresi doldu",
    ok_title: "Aboneliğiniz onaylandı",
    ok_body:
      "Listedesiniz. Neler yaptığımıza dair arada size ulaşacağız.",
    expired_title: "Bu bağlantı artık geçerli değil",
    expired_body:
      "Onay bağlantıları 15 dakika sonra sona erer. Ana sayfadan yeni bir tane talep edebilirsiniz.",
    home: "Ana sayfaya dön",
  },
  newsletter_unsubscribed: {
    eyebrow_ok: "Bülten",
    eyebrow_err: "Bağlantı süresi doldu",
    ok_title: "Abonelikten çıktınız",
    ok_body:
      "Bundan sonra bülten e-postası almayacaksınız. İstediğiniz zaman ana sayfadan yeniden abone olabilirsiniz.",
    expired_title: "Bu bağlantı artık geçerli değil",
    expired_body:
      "Abonelikten çıkma bağlantıları 30 gün sonra geçersiz olur. Hâlâ çıkmak istiyorsanız hello@uselunexa.com adresine yazın.",
    home: "Ana sayfaya dön",
  },
};

const es: Dictionary = {
  nav: {
    about: "Nosotros",
    work: "Qué Hacemos",
    principles: "Principios",
    services: "Servicios",
    blog: "Blog",
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
      "Usamos cookies esenciales y analíticas (incluyendo Google Analytics) para operar y mejorar el sitio. Las cookies de marketing son opcionales. Consulta nuestra ",
    privacy_link: "Política de Privacidad",
    description_suffix: " para más detalles.",
    necessary_title: "Cookies necesarias",
    necessary_desc:
      "Requeridas para el funcionamiento básico del sitio, como seguridad, sesión y preferencias.",
    analytics_title: "Cookies de análisis",
    analytics_desc:
      "Requeridas para operar y mejorar nuestro servicio. Usamos Google Analytics para medir el uso. No se pueden desactivar en este sitio.",
    marketing_title: "Cookies de marketing",
    marketing_desc: "Para contenido personalizado y publicidad.",
    required_label: "Siempre activo",
    accept_all: "Aceptar Todo",
    reject: "Rechazar",
    manage: "Gestionar Preferencias",
    save: "Guardar Preferencias",
  },
  notfound: {
    eyebrow: "404",
    heading: "Página no encontrada",
    body: "La página que buscas no existe o ha sido movida.",
    home: "Ir al inicio",
  },
  error: {
    eyebrow: "Error",
    heading: "Algo salió mal",
    body: "Ocurrió un error inesperado. Puedes intentarlo de nuevo o volver al inicio.",
    retry: "Reintentar",
    home: "Ir al inicio",
  },
  privacy_page: {
    eyebrow: "Legal",
    heading: "Política de Privacidad",
    last_updated: "Última actualización: Abril 2026",
    overview_title: "Resumen",
    overview_body:
      "Lunexa (\u201cnosotros\u201d) opera el sitio web uselunexa.com. Esta política explica qué información recopilamos cuando visitas nuestro sitio o usas nuestro formulario de contacto, y cómo la tratamos.",
    collect_title: "Qué recopilamos",
    collect_p1:
      "Cuando envías nuestro formulario de contacto, recopilamos tu nombre, correo electrónico y el contenido del mensaje. Usamos esta información solo para responder a tu consulta.",
    collect_newsletter:
      "Cuando confirmas una suscripción al boletín, además registramos tu dirección IP, el agente de usuario (navegador/dispositivo), la URL de referencia, tu idioma preferido y la versión del texto de consentimiento que aceptaste. Estos datos se usan para prevenir abusos, resolver problemas de entrega y cumplir requisitos legales. Se conservan mientras tu suscripción esté activa y se eliminan cuando te das de baja o solicitas el borrado de tu cuenta.",
    collect_p2:
      "Nuestro servidor web puede registrar automáticamente datos técnicos estándar como tu dirección IP, tipo de navegador y páginas visitadas. Estos datos se usan solo para monitoreo de seguridad y analítica básica.",
    usage_title: "Cómo usamos tus datos",
    usage_item_1: "Para responder a los mensajes enviados a través de nuestro formulario",
    usage_item_2: "Para monitorear y mantener la seguridad de nuestro sitio",
    usage_item_3: "Para entender patrones generales de uso y mejorar el sitio",
    usage_body:
      "No vendemos, alquilamos ni compartimos tu información personal con terceros con fines de marketing.",
    retention_title: "Retención de datos",
    retention_body:
      "Los envíos del formulario de contacto se conservan solo el tiempo necesario para atender tu consulta. Los registros del servidor se conservan hasta 90 días por motivos de seguridad.",
    cookies_title: "Cookies y Análisis",
    cookies_body:
      "Este sitio web utiliza cookies esenciales para el funcionamiento básico y cookies analíticas para entender el uso del sitio. Usamos Google Analytics 4, que establece cookies (como _ga y _ga_*) y recopila datos anónimos como páginas vistas, tipo de dispositivo, navegador, ubicación geográfica aproximada y fuente de referencia. Google procesa estos datos en los Estados Unidos. Al navegar por este sitio, aceptas este uso. Si prefieres darte de baja en todo el sitio, puedes instalar el complemento del navegador para inhabilitar Google Analytics en https://tools.google.com/dlpage/gaoptout.",
    rights_title: "Tus derechos",
    rights_body_prefix:
      "Puedes solicitar acceso, corrección o eliminación de cualquier dato personal que tengamos sobre ti. Para hacer una solicitud, contáctanos en ",
    rights_body_suffix: ".",
    changes_title: "Cambios en esta política",
    changes_body:
      "Podemos actualizar esta política periódicamente. Los cambios se publicarán en esta página con una fecha de revisión actualizada.",
    contact_title: "Contacto",
    contact_body_prefix:
      "Si tienes preguntas sobre esta política de privacidad, contáctanos en ",
    contact_body_suffix: ".",
  },
  terms_page: {
    eyebrow: "Legal",
    heading: "Términos de Uso",
    last_updated: "Última actualización: Abril 2026",
    agreement_title: "Acuerdo",
    agreement_body:
      "Al acceder y utilizar uselunexa.com, aceptas estos términos. Si no estás de acuerdo, por favor no uses este sitio web.",
    use_title: "Uso de este sitio",
    use_body:
      "Este sitio se proporciona con fines informativos sobre Lunexa y sus servicios. Puedes navegar por el sitio y usar el formulario de contacto para comunicarte con nosotros. Aceptas no hacer un mal uso del sitio, incluido el envío de información falsa, intentar interrumpir su funcionamiento o usar herramientas automatizadas para extraer su contenido.",
    ip_title: "Propiedad intelectual",
    ip_body:
      "Todo el contenido de este sitio web \u2014 incluidos texto, diseño, gráficos y código \u2014 es propiedad de Lunexa salvo que se indique lo contrario. No puedes reproducir, distribuir ni crear obras derivadas de nuestro contenido sin permiso previo por escrito.",
    form_title: "Formulario de contacto",
    form_body:
      "Al enviar un mensaje a través de nuestro formulario, nos otorgas permiso para usar la información proporcionada para responder a tu consulta. No garantizamos tiempos de respuesta. Los mensajes con contenido dañino, abusivo o spam pueden descartarse sin respuesta.",
    disclaimer_title: "Descargo de responsabilidad",
    disclaimer_body:
      "Este sitio web y su contenido se proporcionan \u201ctal cual\u201d sin garantías de ningún tipo, expresas o implícitas. Lunexa no garantiza que el sitio esté disponible en todo momento o libre de errores.",
    liability_title: "Limitación de responsabilidad",
    liability_body:
      "En la máxima medida permitida por la ley, Lunexa no será responsable de ningún daño indirecto, incidental o consecuente derivado del uso de este sitio web.",
    changes_title: "Cambios",
    changes_body:
      "Podemos modificar estos términos en cualquier momento. El uso continuado del sitio después de publicar los cambios constituye la aceptación de los términos actualizados.",
    contact_title: "Contacto",
    contact_body_prefix: "¿Preguntas sobre estos términos? Contáctanos en ",
    contact_body_suffix: ".",
  },
  language: {
    switcher_label: "Idioma",
  },
  theme: {
    switch_to_light: "Cambiar a tema claro",
    switch_to_dark: "Cambiar a tema oscuro",
  },
  newsletter: {
    eyebrow: "Boletín",
    heading: "Mantente al día",
    subtitle:
      "Notas ocasionales sobre lo que estamos construyendo. Sin spam, puedes darte de baja cuando quieras.",
    email_label: "Correo",
    email_placeholder: "tu@ejemplo.com",
    consent_prefix: "Acepto recibir el boletín de Lunexa y he leído la ",
    privacy_link: "Política de Privacidad",
    consent_suffix: ".",
    submit: "Suscribirme",
    submitting: "Enviando...",
    sent_title: "Revisa tu bandeja",
    sent_body:
      "Te enviamos un enlace de confirmación. Ábrelo en los próximos 15 minutos para completar la suscripción.",
    consent_required: "Acepta los términos del boletín para continuar.",
    rate_limit: "Demasiadas solicitudes. Espera unos minutos.",
    network_error: "No se pudo contactar con el servidor. Inténtalo de nuevo.",
    generic_error: "Algo salió mal. Inténtalo de nuevo.",
  },
  newsletter_confirmed: {
    eyebrow_ok: "Boletín",
    eyebrow_err: "Enlace caducado",
    ok_title: "Suscripción confirmada",
    ok_body:
      "Estás en la lista. Te escribiremos de vez en cuando con lo que estamos construyendo.",
    expired_title: "Este enlace ya no es válido",
    expired_body:
      "Los enlaces de confirmación caducan en 15 minutos. Puedes solicitar uno nuevo desde la página principal.",
    home: "Ir al inicio",
  },
  newsletter_unsubscribed: {
    eyebrow_ok: "Boletín",
    eyebrow_err: "Enlace caducado",
    ok_title: "Te has dado de baja",
    ok_body:
      "Ya no recibirás más correos del boletín. Puedes volver a suscribirte cuando quieras desde la página principal.",
    expired_title: "Este enlace ya no es válido",
    expired_body:
      "Los enlaces de baja caducan después de 30 días. Si aún quieres darte de baja, escribe a hello@uselunexa.com.",
    home: "Ir al inicio",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, tr, es };
export type { Dictionary };
