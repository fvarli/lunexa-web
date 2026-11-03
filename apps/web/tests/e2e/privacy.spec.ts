import { test, expect } from "@playwright/test";

// Quietly 1.1.0 is on Google Play: the policy must describe its history
// cleanup and save queue, and still be accurate for anyone on an older version.
test.describe("Quietly privacy policy — 1.1.0", () => {
  const locales = [
    {
      prefix: "",
      date: "Last updated: 2026-10-25",
      cleanup: "In Quietly 1.1.0 and later, clearing your history can also delete the media copies Quietly keeps in its private storage, and the app asks you to confirm before it deletes them; in earlier versions, clearing history does not delete those copies.",
      gallery: "Clearing history does not delete files saved to your gallery.",
      queue: "Your save queue (Quietly 1.1.0 and later)",
      outdated: "Clear history currently does not delete",
      prefs: "The preferences and settings you choose in the app",
      retired: /save notice|Settings → Clear history/,
      fetch: "It does not look for media on its own; it only fetches the links you paste or choose to save, at your request.",
    },
    {
      prefix: "/tr",
      date: "Son güncelleme: 25.10.2026",
      cleanup: "Quietly 1.1.0 ve sonraki sürümlerde geçmişini temizlemek, Quietly'nin uygulamaya özel depolama alanında tuttuğu medya kopyalarını da silebilir; uygulama bunları silmeden önce senden onay ister. Önceki sürümlerde geçmişi temizlemek bu kopyaları silmez.",
      gallery: "Geçmişi temizlemek, galerine kaydedilen dosyaları silmez.",
      queue: "Kayıt kuyruğun (Quietly 1.1.0 ve sonrası)",
      outdated: "Clear history şu anda",
      prefs: "Uygulamada seçtiğin tercihler ve ayarlar",
      retired: /kayıt bildirimi|Settings → Clear history/,
      fetch: "Kendi başına medya aramaz; yalnızca senin isteğinle, yapıştırdığın veya kaydetmeyi seçtiğin bağlantıları getirir.",
    },
    {
      prefix: "/es",
      date: "Última actualización: 2026-10-25",
      cleanup: "En Quietly 1.1.0 y posteriores, borrar el historial también puede eliminar las copias de medios que Quietly conserva en su almacenamiento privado, y la aplicación te pide confirmación antes de eliminarlas; en versiones anteriores, borrar el historial no elimina esas copias.",
      gallery: "Borrar el historial no elimina los archivos guardados en tu galería.",
      queue: "Tu cola de guardado (Quietly 1.1.0 y posteriores)",
      outdated: "Actualmente, Clear history no elimina",
      prefs: "Las preferencias y ajustes que eliges en la aplicación",
      retired: /aviso de guardado|Settings → Clear history/,
      fetch: "No busca medios por su cuenta; solo descarga, a petición tuya, los enlaces que pegas o eliges guardar.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/quietly describes 1.1.0 history cleanup and the save queue`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/quietly`);
      const main = page.locator("main");
      await expect(main).toContainText(l.date);
      await expect(main).toContainText(l.cleanup);
      await expect(main).toContainText(l.gallery);
      await expect(main).toContainText(l.queue);
      await expect(main).not.toContainText(l.outdated);
      await expect(main).toContainText(l.fetch);
      // Neither a possibly retired preference nor an unverified 1.1.0 menu path is named.
      await expect(main).toContainText(l.prefs);
      await expect(main).not.toContainText(l.retired);
      // Not claimed until 1.1.0's save behaviour is verified on devices.
      await expect(main).not.toContainText(/background work|arka planda iş|segundo plano/i);
      // Backup and device-transfer exclusions are not claimed until verified on devices.
      await expect(main).not.toContainText(/excluded from (backup|transfer)|yedeklemeden hariç|excluid[oa]s? de la copia/i);
    });
  }
});

// Quietly 1.2.0 (W7, WEB_HANDOFF v5): prepared next to the 1.1.0 text. The
// 1.1.0 statements stay, labelled "up to version 1.1.0" where 1.2.0 differs;
// every 1.2.0 statement says "version 1.2.0", never open-ended (1.2.1 changes
// the analytics default), and nothing says 1.2.0 is already available. The
// owner-confirmed GA4 periods are stated for Google Analytics only, without a
// reset-on-activity claim. Identity is "Lunexa Games"; no controller block.
test.describe("Quietly privacy policy — 1.2.0 preparation", () => {
  const locales = [
    {
      prefix: "",
      titles: ["What we do not collect (up to version 1.1.0)", "What leaves your device — and what never does (version 1.2.0)", "Advertising (Google AdMob, version 1.2.0)", "Usage statistics (Google Analytics for Firebase, version 1.2.0)"],
      statsTitle: "Usage statistics (Google Analytics for Firebase, version 1.2.0)",
      retention: "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the files and data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
      texts: [
        "made by Lunexa Games.",
        "It uses the internet to fetch the media you ask for and to check whether you have a connection; version 1.2.0 also uses it to load an ad and — only if you allow it — to send usage statistics.",
        "Quietly does not create accounts. Versions up to 1.1.0 do not show ads and do not include analytics or crash reporting. Version 1.2.0 shows one ad from Google after a save finishes, and it can send anonymous usage statistics to Google Analytics for Firebase — only if you turn that on. Your links, files and history are never sent with either.",
        "and versions up to 1.1.0 do not include Google AdMob or Firebase.",
        "Quietly uses the internet for these purposes only:",
        "Quietly does not require an account. Version 1.2.0 includes Google AdMob (ads) and Google Analytics for Firebase (optional usage statistics), described below. When Quietly accesses a link or checks your connection, the servers involved may receive technical request information, such as your IP address and request headers. Quietly never sends any of the following to Lunexa, to Google's ad services or to Analytics:",
        "The links you paste, or anything about the pages or files they point to",
        "Your saved media, file names, titles or file sizes",
        "Your history, your save queue or anything in your clipboard",
        "Name, email address, phone number or any account identifier",
        "Contacts, microphone, camera or precise location",
        "Google AdMob (version 1.2.0) — after a save finishes, Quietly asks Google for one ad to show on the confirmation screen. It doesn't ask when you're offline, or on mobile data while “Save on Wi-Fi only” is on. See “Advertising” below.",
        "Google Analytics for Firebase (version 1.2.0) — only if you turn on usage statistics. See “Usage statistics” below.",
        "Advertising ID and Android ad services (AD_ID, ACCESS_ADSERVICES_*; version 1.2.0) — used by Google AdMob to show and measure the ad, and to prevent fraud. You can reset or delete your advertising ID in your device settings. Quietly's usage statistics don't use it.",
        "Quietly is free and shows one banner ad from Google, on the screen that confirms a save. Nothing else in the app shows ads, and there are no full-screen or video ads.",
        "To show and measure the ad, Google AdMob collects information such as your device's advertising ID, your IP address and approximate location derived from it, device and app details, and how you interact with the ad. Google uses this as described in How Google uses information from sites or apps that use our services (https://policies.google.com/technologies/partner-sites).",
        "Where the law requires it — for example in the EEA, the UK, Switzerland and some US states — Google asks for your choice first, and you can change it at any time in Settings → Privacy → Ad privacy choices. Quietly asks Google to treat every ad request as coming from a teenager, so ads are not personalised, remarketing is off, and only ads suitable for all ages are shown. Saying no doesn't turn ads off: Google may still show a limited ad.",
        "Usage statistics are off unless you turn on Settings → Privacy → Share usage statistics. Your choice is separate from Google's ad consent: agreeing to one never turns on the other.",
        "When they're on, Quietly sends counts of the screens you open and how link checks and saves turn out — for example whether a save finished, failed or was cancelled, the kind of media, and the number of items in bands such as 1, 2–5 or 6+. Firebase also records some information automatically, such as app opens, sessions, the device model, OS version, language and approximate country.",
        "Quietly never sends links, file names, titles, file sizes, your history or your advertising ID to Analytics, and usage statistics are not used for advertising.",
        "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the files and data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
        "Turn usage statistics off at any time in the same place: collection stops, and the analytics data Firebase kept on your device and its app-instance identifier are reset.",
        "Quietly is not directed at children, and Lunexa does not knowingly collect personal information from children under 13.",
        "Material changes will also be noted in the app's release notes. The policy was updated for version 1.2.0, which adds Google AdMob and optional Google Analytics for Firebase.",
      ],
      v110: ["Advertising identifiers (IDFA, AAID) or other device identifiers", "Analytics events, usage telemetry, or crash reports"],
    },
    {
      prefix: "/tr",
      titles: ["Toplamadığımız veriler (1.1.0 sürümüne kadar)", "Cihazından neler çıkar, neler asla çıkmaz (1.2.0 sürümü)", "Reklamlar (Google AdMob, 1.2.0 sürümü)", "Kullanım istatistikleri (Google Analytics for Firebase, 1.2.0 sürümü)"],
      statsTitle: "Kullanım istatistikleri (Google Analytics for Firebase, 1.2.0 sürümü)",
      retention: "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan dosyalar ve veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
      texts: [
        "Lunexa Games tarafından geliştirilmiş",
        "İnterneti senin istediğin medyayı indirmek ve bağlantın olup olmadığını kontrol etmek için kullanır; 1.2.0 sürümü ayrıca bir reklam yüklemek ve yalnızca izin verirsen kullanım istatistikleri göndermek için kullanır.",
        "Quietly hesap oluşturmaz. 1.1.0 sürümüne kadarki sürümler reklam göstermez ve analitik veya çökme raporlama içermez. 1.2.0 sürümü bir kayıt tamamlandıktan sonra Google'dan tek bir reklam gösterir ve yalnızca sen açarsan Google Analytics for Firebase'e anonim kullanım istatistikleri gönderebilir. Bağlantıların, dosyaların ve geçmişin hiçbiriyle birlikte gönderilmez.",
        "ve 1.1.0 sürümüne kadarki sürümler Google AdMob veya Firebase içermez.",
        "Quietly interneti yalnızca şu amaçlarla kullanır:",
        "Quietly hesap gerektirmez. 1.2.0 sürümü, aşağıda açıklanan Google AdMob'u (reklamlar) ve Google Analytics for Firebase'i (isteğe bağlı kullanım istatistikleri) içerir. Quietly bir bağlantıya eriştiğinde veya bağlantını kontrol ettiğinde, ilgili sunucular IP adresin ve istek başlıkları gibi teknik istek bilgilerini alabilir. Quietly aşağıdakilerin hiçbirini Lunexa'ya, Google'ın reklam hizmetlerine veya Analytics'e asla göndermez:",
        "Yapıştırdığın bağlantılar veya gösterdikleri sayfalar ya da dosyalarla ilgili herhangi bir şey",
        "Kaydettiğin medya, dosya adları, başlıklar veya dosya boyutları",
        "Geçmişin, kayıt kuyruğun veya panondaki herhangi bir şey",
        "Ad, e-posta adresi, telefon numarası veya herhangi bir hesap kimliği",
        "Kişiler, mikrofon, kamera veya kesin konum",
        "Google AdMob (1.2.0 sürümü) — bir kayıt tamamlandıktan sonra Quietly, onay ekranında göstermek için Google'dan tek bir reklam ister. Çevrimdışıyken veya “Yalnızca Wi-Fi'de kaydet” açıkken mobil verideyken istemez. Aşağıdaki “Reklamlar” bölümüne bak.",
        "Google Analytics for Firebase (1.2.0 sürümü) — yalnızca kullanım istatistiklerini açarsan. Aşağıdaki “Kullanım istatistikleri” bölümüne bak.",
        "Reklam kimliği ve Android reklam hizmetleri (AD_ID, ACCESS_ADSERVICES_*; 1.2.0 sürümü) — Google AdMob tarafından reklamı göstermek ve ölçmek ve dolandırıcılığı önlemek için kullanılır. Reklam kimliğini cihaz ayarlarından sıfırlayabilir veya silebilirsin. Quietly'nin kullanım istatistikleri bunu kullanmaz.",
        "Quietly ücretsizdir ve bir kaydı onaylayan ekranda Google'dan tek bir banner reklam gösterir. Uygulamanın başka hiçbir yerinde reklam yoktur; tam ekran veya video reklam da yoktur.",
        "Reklamı göstermek ve ölçmek için Google AdMob; cihazının reklam kimliği, IP adresin ve ondan çıkarılan yaklaşık konum, cihaz ve uygulama bilgileri ve reklamla etkileşimin gibi bilgileri toplar. Google bu bilgileri, Google'ın hizmetlerimizi kullanan site veya uygulamalardan gelen bilgileri nasıl kullandığı sayfasında (https://policies.google.com/technologies/partner-sites) anlatıldığı şekilde kullanır.",
        "Yasanın gerektirdiği yerlerde (örneğin AEA, Birleşik Krallık, İsviçre ve bazı ABD eyaletleri) Google önce seçimini sorar; bunu istediğin zaman Ayarlar → Gizlilik → Reklam gizliliği seçenekleri bölümünden değiştirebilirsin. Quietly her reklam isteğinde Google'dan isteği bir gençten geliyormuş gibi ele almasını ister; bu yüzden reklamlar kişiselleştirilmez, yeniden pazarlama kapalıdır ve yalnızca her yaşa uygun reklamlar gösterilir. Hayır demen reklamları kapatmaz: Google yine de sınırlı bir reklam gösterebilir.",
        "Kullanım istatistikleri, Ayarlar → Gizlilik → Kullanım istatistiklerini paylaş seçeneğini açmadıkça kapalıdır. Bu seçim Google'ın reklam izninden ayrıdır: birine izin vermek diğerini asla açmaz.",
        "Açıkken Quietly, açtığın ekranların ve bağlantı kontrolleriyle kayıtların nasıl sonuçlandığının sayımlarını gönderir; örneğin bir kaydın tamamlanıp tamamlanmadığı, başarısız olup olmadığı veya iptal edilip edilmediği, medya türü ve 1, 2–5 ya da 6+ gibi aralıklarla öğe sayısı. Firebase ayrıca uygulama açılışları, oturumlar, cihaz modeli, işletim sistemi sürümü, dil ve yaklaşık ülke gibi bazı bilgileri otomatik olarak kaydeder.",
        "Quietly, Analytics'e bağlantıları, dosya adlarını, başlıkları, dosya boyutlarını, geçmişini veya reklam kimliğini asla göndermez; kullanım istatistikleri reklam için kullanılmaz.",
        "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan dosyalar ve veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
        "Kullanım istatistiklerini aynı yerden istediğin zaman kapatabilirsin: toplama durur, Firebase'in cihazında tuttuğu analitik veriler ve uygulama örneği kimliği sıfırlanır.",
        "Quietly çocuklara yönelik değildir ve Lunexa, 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamaz.",
        "Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, Google AdMob ve isteğe bağlı Google Analytics for Firebase ekleyen 1.2.0 sürümü için güncellenmiştir.",
      ],
      v110: ["Reklam kimlikleri (IDFA, AAID) veya diğer cihaz kimlikleri", "Analitik olaylar, kullanım telemetrisi veya çökme raporları"],
    },
    {
      prefix: "/es",
      titles: ["Lo que no recopilamos (hasta la versión 1.1.0)", "Qué sale de tu dispositivo y qué nunca sale (versión 1.2.0)", "Publicidad (Google AdMob, versión 1.2.0)", "Estadísticas de uso (Google Analytics para Firebase, versión 1.2.0)"],
      statsTitle: "Estadísticas de uso (Google Analytics para Firebase, versión 1.2.0)",
      retention: "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los archivos y datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
      texts: [
        "creado por Lunexa Games.",
        "Usa internet para descargar los medios que pides y para comprobar si tienes conexión; la versión 1.2.0 también lo usa para cargar un anuncio y, solo si lo permites, para enviar estadísticas de uso.",
        "Quietly no crea cuentas. Las versiones hasta la 1.1.0 no muestran anuncios y no incluyen analítica ni informes de errores. La versión 1.2.0 muestra un anuncio de Google cuando termina un guardado, y puede enviar estadísticas de uso anónimas a Google Analytics para Firebase, solo si lo activas. Tus enlaces, archivos e historial nunca se envían con ninguno de ellos.",
        "y las versiones hasta la 1.1.0 no incluyen Google AdMob ni Firebase.",
        "Quietly usa internet solo para estos fines:",
        "Quietly no requiere una cuenta. La versión 1.2.0 incluye Google AdMob (anuncios) y Google Analytics para Firebase (estadísticas de uso opcionales), que se describen más abajo. Cuando Quietly accede a un enlace o comprueba tu conexión, los servidores implicados pueden recibir información técnica de la solicitud, como tu dirección IP y las cabeceras de la solicitud. Quietly nunca envía nada de lo siguiente a Lunexa, a los servicios publicitarios de Google ni a Analytics:",
        "Los enlaces que pegas, ni nada sobre las páginas o archivos a los que apuntan",
        "Tus medios guardados, nombres de archivo, títulos ni tamaños de archivo",
        "Tu historial, tu cola de guardado ni nada de tu portapapeles",
        "Nombre, correo electrónico, número de teléfono ni ningún identificador de cuenta",
        "Contactos, micrófono, cámara ni ubicación precisa",
        "Google AdMob (versión 1.2.0) — cuando termina un guardado, Quietly pide a Google un anuncio para mostrarlo en la pantalla de confirmación. No lo pide cuando no tienes conexión, ni con datos móviles mientras “Guardar solo con Wi-Fi” está activado. Consulta “Publicidad” más abajo.",
        "Google Analytics para Firebase (versión 1.2.0) — solo si activas las estadísticas de uso. Consulta “Estadísticas de uso” más abajo.",
        "Identificador de publicidad y servicios de anuncios de Android (AD_ID, ACCESS_ADSERVICES_*; versión 1.2.0) — los usa Google AdMob para mostrar y medir el anuncio y para prevenir el fraude. Puedes restablecer o eliminar tu identificador de publicidad en los ajustes del dispositivo. Las estadísticas de uso de Quietly no lo usan.",
        "Quietly es gratis y muestra un único anuncio de banner de Google, en la pantalla que confirma un guardado. En ninguna otra parte de la app hay anuncios, ni a pantalla completa ni de vídeo.",
        "Para mostrar y medir el anuncio, Google AdMob recopila información como el identificador de publicidad de tu dispositivo, tu dirección IP y la ubicación aproximada que se deriva de ella, datos del dispositivo y de la app, y cómo interactúas con el anuncio. Google la usa como se describe en Cómo usa Google la información de sitios web o aplicaciones que utilizan nuestros servicios (https://policies.google.com/technologies/partner-sites).",
        "Donde la ley lo exige (por ejemplo, en el EEE, el Reino Unido, Suiza y algunos estados de EE. UU.), Google te pide antes tu elección, y puedes cambiarla cuando quieras en Ajustes → Privacidad → Opciones de privacidad de anuncios. Quietly pide a Google que trate cada solicitud de anuncio como si viniera de un adolescente, por lo que los anuncios no se personalizan, el remarketing está desactivado y solo se muestran anuncios aptos para todas las edades. Decir que no no desactiva los anuncios: Google puede seguir mostrando un anuncio limitado.",
        "Las estadísticas de uso están desactivadas salvo que actives Ajustes → Privacidad → Compartir estadísticas de uso. Tu elección es independiente del consentimiento de anuncios de Google: aceptar uno nunca activa el otro.",
        "Si las activas, Quietly envía recuentos de las pantallas que abres y de cómo terminan las comprobaciones de enlaces y los guardados; por ejemplo, si un guardado terminó, falló o se canceló, el tipo de medio y el número de elementos en rangos como 1, 2–5 o 6+. Firebase también registra cierta información automáticamente, como las aperturas de la app, las sesiones, el modelo del dispositivo, la versión del sistema, el idioma y el país aproximado.",
        "Quietly nunca envía a Analytics enlaces, nombres de archivo, títulos, tamaños de archivo, tu historial ni tu identificador de publicidad, y las estadísticas de uso no se usan para publicidad.",
        "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los archivos y datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
        "Desactiva las estadísticas de uso cuando quieras en el mismo lugar: la recopilación se detiene y se restablecen los datos de analítica que Firebase guardaba en tu dispositivo y su identificador de instancia de la app.",
        "Quietly no está dirigida a niños, y Lunexa no recopila intencionalmente datos personales de menores de 13 años.",
        "Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.2.0, que añade Google AdMob y Google Analytics para Firebase opcional.",
      ],
      v110: ["Identificadores publicitarios (IDFA, AAID) ni otros identificadores de dispositivo", "Eventos analíticos, telemetría de uso ni informes de errores"],
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/quietly labels the 1.2.0 disclosures`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/quietly`);
      const main = page.locator("main");
      for (const title of l.titles) {
        await expect(main.getByRole("heading", { name: title, exact: true })).toHaveCount(1);
      }
      for (const s of [...l.texts, ...l.v110]) {
        await expect(main).toContainText(s);
      }
      const stats = main.locator("section").filter({ has: page.getByRole("heading", { name: l.statsTitle, exact: true }) });
      await expect(stats).toContainText(l.retention);
      await expect(main.locator('a[href="mailto:hello@uselunexa.com"]')).toHaveCount(1);
      const text = (await main.textContent()) ?? "";
      expect(text).not.toMatch(/from version 1\.2\.0|since version 1\.2\.0|1\.2\.0 and later|1\.2\.0 sürümünden itibaren|1\.2\.0 ve sonra|desde la versión 1\.2\.0|1\.2\.0 y posteriores|1\.2\.1|now available|available now|update now|ya disponible|artık (mevcut|kullanılabilir)|Version 1\.2\.0 added/i);
      expect(text).not.toMatch(/starts again whenever there is new activity|süre yeniden başlar|vuelve a empezar/);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|data controller|veri sorumlusu|responsable del tratamiento|postal address|(?<!e-)posta adresi|dirección postal/i);
    });
  }
});

// RPS Duel 1.0.5 is on Google Play and shows ads. The policy restates the Play
// Console data safety declaration (three purposes) and the default-on Firebase
// Analytics usage statistics (R-REL-07). The GA4 retention setting is stated
// for Google Analytics only; personalisation and consent mechanics stay
// unclaimed.
test.describe("RPS Duel privacy policy — 1.0.5", () => {
  const locales = [
    {
      prefix: "",
      date: "Last updated: 2026-11-03",
      dataTitles: ["Data collected and shared (version 1.0.5)", "Data collected and shared (version 1.0.6)"],
      ads: "Version 1.0.5, available on Google Play since October 25, 2026, shows ads.",
      types: ["Approximate location", "App interactions", "Diagnostics", "Device or other IDs"],
      purpose: "the declared purposes of both the collection and the sharing are advertising or marketing; analytics; and fraud prevention, security and compliance",
      summary: "shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below.",
      gma: "Version 1.0.5 shows its ads through Google AdMob, using the Google Mobile Ads SDK. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it.",
      fis: "The Firebase software in the app also creates a random Firebase installation identifier. It is separate from the app-instance identifier and from your advertising ID, and Google Analytics sends it to Google together with the usage statistics.",
      retention: "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
      handling: "marks the collection of this data as required rather than optional, and states that the data is encrypted in transit.",
      earlier: "Versions before 1.0.5 did not show ads and did not collect or share this data.",
      retired: /does not show ads|does not contact a server|does not collect, transmit, or share|collects no personal information|This data never leaves your device/,
      analytics: "Version 1.0.5 includes Google Analytics for Firebase and collects usage statistics by default: it does not ask before collecting them and has no setting to turn them off. The app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played.",
      separate: "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Ad privacy choices that Google may ask you to make apply to ads only; they do not turn usage statistics on or off.",
      vendors: "Version 1.0.5 uses Google AdMob for its ads and Google Analytics for Firebase for usage statistics.",
      local: ["Game scores and your round history (up to your last 500 rounds)", "Lifetime totals (rounds played, wins and ties)", "Sound setting (on or off)", "Collected moments, with the date of each"],
      kept: "— your language, difficulty and sound settings, lifetime totals, daily challenge progress, achievement flags, collected moments, your usage-statistics choice and your ad privacy choices —",
      meta: "Privacy policy for RPS Duel by Lunexa Games. Version 1.0.5 shows ads: the data declared for it on Google Play, and what the app stores on your device.",
    },
    {
      prefix: "/tr",
      date: "Son güncelleme: 03.11.2026",
      dataTitles: ["Toplanan ve paylaşılan veriler (1.0.5 sürümü)", "Toplanan ve paylaşılan veriler (1.0.6 sürümü)"],
      ads: "25 Ekim 2026'dan beri Google Play'de bulunan 1.0.5 sürümü reklam gösterir.",
      types: ["Yaklaşık konum", "Uygulama etkileşimleri", "Teşhis verileri", "Cihaz veya diğer kimlikler"],
      purpose: "hem toplamanın hem de paylaşmanın beyan edilen amaçları reklam veya pazarlama; analiz; dolandırıcılığı önleme, güvenlik ve uyumluluktur",
      summary: "bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır.",
      gma: "1.0.5 sürümü reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden gösterir. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz.",
      fis: "Uygulamadaki Firebase yazılımı ayrıca rastgele bir Firebase kurulum kimliği oluşturur. Bu kimlik, uygulama örneği kimliğinden ve reklam kimliğinden ayrıdır; Google Analytics bunu kullanım istatistikleriyle birlikte Google'a gönderir.",
      retention: "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
      handling: "bu verilerin toplanmasını isteğe bağlı değil zorunlu olarak işaretler ve verilerin aktarım sırasında şifrelendiğini belirtir.",
      earlier: "1.0.5'ten önceki sürümler reklam göstermiyor, bu verileri toplamıyor ve paylaşmıyordu.",
      retired: /reklam göstermez|sunucuyla iletişim kurmaz|hiçbir kişisel bilgiyi toplamaz|hiç kişisel bilgi toplamadığı|cihazından asla çıkmaz/,
      analytics: "1.0.5 sürümü Google Analytics for Firebase'i içerir ve kullanım istatistiklerini varsayılan olarak toplar: toplamadan önce sormaz ve bunları kapatmak için bir ayarı yoktur. Uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında bunu, arayüz dilin ve seçili zorlukla birlikte kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır.",
      separate: "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Google'ın sana sorabileceği reklam gizlilik tercihleri yalnızca reklamlar için geçerlidir; kullanım istatistiklerini açmaz veya kapatmaz.",
      vendors: "1.0.5 sürümü reklamlar için Google AdMob'u, kullanım istatistikleri için Google Analytics for Firebase'i kullanır.",
      local: ["Oyun skorları ve el geçmişin (son 500 ele kadar)", "Toplam istatistikler (oynanan el, galibiyet ve beraberlik sayısı)", "Ses ayarı (açık veya kapalı)", "Toplanan anlar ve her birinin tarihi"],
      kept: "— dil, zorluk ve ses ayarların, toplam istatistiklerin, günlük meydan okuma ilerlemen, başarım bayrakların, toplanan anların, kullanım istatistikleri tercihin ve reklam gizlilik tercihlerin —",
      meta: "Lunexa Games'in RPS Duel oyunu için gizlilik politikası. 1.0.5 sürümü reklam gösterir: Google Play'de beyan edilen veriler ve cihazında saklananlar.",
    },
    {
      prefix: "/es",
      date: "Última actualización: 2026-11-03",
      dataTitles: ["Datos recopilados y compartidos (versión 1.0.5)", "Datos recopilados y compartidos (versión 1.0.6)"],
      ads: "La versión 1.0.5, disponible en Google Play desde el 25 de octubre de 2026, muestra anuncios.",
      types: ["Ubicación aproximada", "Interacciones con la aplicación", "Diagnóstico", "Dispositivo u otros identificadores"],
      purpose: "las finalidades declaradas tanto de la recopilación como del uso compartido son publicidad o marketing; análisis; y prevención del fraude, seguridad y cumplimiento",
      summary: "los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación.",
      gma: "La versión 1.0.5 muestra sus anuncios a través de Google AdMob, mediante el SDK de Google Mobile Ads. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila.",
      fis: "El software Firebase de la aplicación también crea un identificador aleatorio de instalación de Firebase. Es distinto del identificador de instancia de la aplicación y de tu identificador de publicidad, y Google Analytics lo envía a Google junto con las estadísticas de uso.",
      retention: "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
      handling: "indica que la recopilación de estos datos es obligatoria, no opcional, y que los datos se cifran en tránsito.",
      earlier: "Las versiones anteriores a la 1.0.5 no mostraban anuncios y no recopilaban ni compartían estos datos.",
      retired: /no muestra anuncios|no se comunica con ningún servidor|no recopila, transmite ni comparte|no recopila ningún dato personal|nunca salen de tu dispositivo/,
      analytics: "La versión 1.0.5 incluye Google Analytics for Firebase y recopila estadísticas de uso de forma predeterminada: no pregunta antes de recopilarlas y no tiene ningún ajuste para desactivarlas. La aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega.",
      separate: "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Las opciones de privacidad para los anuncios que Google pueda pedirte solo se aplican a los anuncios; no activan ni desactivan las estadísticas de uso.",
      vendors: "La versión 1.0.5 usa Google AdMob para los anuncios y Google Analytics for Firebase para las estadísticas de uso.",
      local: ["Puntuaciones y tu historial de rondas (hasta las últimas 500 rondas)", "Totales acumulados (rondas jugadas, victorias y empates)", "Ajuste de sonido (activado o desactivado)", "Momentos coleccionados, con la fecha de cada uno"],
      kept: "—tus ajustes de idioma, dificultad y sonido, los totales acumulados, el progreso del desafío diario, los indicadores de logros, los momentos coleccionados, tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria—",
      meta: "Política de privacidad de RPS Duel (Lunexa Games). La versión 1.0.5 muestra anuncios: los datos declarados en Google Play y qué guarda en tu dispositivo.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/rps-duel discloses the 1.0.5 ads data declaration`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/rps-duel`);
      const main = page.locator("main");
      await expect(main).toContainText(l.date);
      await expect(main).toContainText(l.ads);
      // Each version's data section lists every declared type exactly once.
      for (const title of l.dataTitles) {
        const section = main.locator("section").filter({ has: page.getByRole("heading", { name: title, exact: true }) });
        for (const type of l.types) {
          await expect(section.getByRole("listitem").filter({ hasText: type })).toHaveCount(1);
        }
      }
      await expect(main).toContainText(l.purpose);
      // Advertising must never read as the only declared purpose.
      await expect(main).not.toContainText(/lists only advertising|amacı reklam veya pazarlamadır|yalnızca reklam veya pazarlamayı|finalidad declarada .* es publicidad|solo indica publicidad|for advertising or marketing purposes|fines publicitarios o de marketing|reklam veya pazarlama amacıyla/);
      await expect(main).toContainText(l.handling);
      await expect(main).toContainText(l.earlier);
      // The 1.0.5 text: everything outside the 1.0.6 sections and items.
      const v105 = await main.evaluate((el) => {
        const c = el.cloneNode(true) as HTMLElement;
        c.querySelectorAll("section").forEach((s) => {
          if (/1\.0\.6/.test(s.querySelector("h2")?.textContent ?? "")) s.remove();
        });
        c.querySelectorAll("p, li").forEach((n) => {
          if (/1\.0\.6/.test(n.textContent ?? "")) n.remove();
        });
        return c.textContent ?? "";
      });
      expect(v105).not.toMatch(l.retired);
      for (const s of [l.analytics, l.separate, l.vendors, ...l.local, l.kept, l.summary, l.gma, l.fis, l.retention]) {
        await expect(main).toContainText(s);
      }
      // No personalisation, consent, retention or deletion-request claims for 1.0.5.
      expect(v105).not.toMatch(/personali[sz]|kişiselleştir|personaliz|consent|onay mesaj|consentimiento|retain|retention|saklama süresi|conserva(mos|ción)/i);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", l.meta);
    });

    test(`${l.prefix || "/"}support/rps-duel no longer says everything stays on the device`, async ({ page }) => {
      await page.goto(`${l.prefix}/support/rps-duel`);
      const main = page.locator("main");
      await expect(main).not.toContainText(/runs entirely on your device|and only there|tamamen cihazınızda çalışır|Yalnızca cihazınızda|funciona enteramente en tu dispositivo|Solo en tu dispositivo/);
      await expect(main).toContainText(/Version 1\.0\.5 also shows ads|1\.0\.5 sürümü ayrıca reklam gösterir|La versión 1\.0\.5 también muestra anuncios/);
    });
  }
});

// RPS Duel 1.0.6 (Patch B, R-REL-08): prepared ahead of the release, next to
// the 1.0.5 text. Every 1.0.6 statement is labelled "version 1.0.6", never
// "and later" (1.0.7 changes the analytics default), and nothing says 1.0.6
// is already available. The GA4 retention text stays scoped as for 1.0.5;
// no legal-basis or transfer statement is made.
test.describe("RPS Duel privacy policy — 1.0.6 preparation", () => {
  const locales = [
    {
      prefix: "",
      titles: ["Data collected and shared (version 1.0.6)", "How this data is handled (version 1.0.6)", "Your ad privacy choices (version 1.0.6)", "Usage statistics (version 1.0.6)", "Version 1.0.5 and updating", "Children and teens"],
      usageTitle: "Usage statistics (version 1.0.6)",
      texts: [
        "Version 1.0.6 shows ads. According to the data safety information declared for it on Google Play, the app collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Usage statistics are optional in version 1.0.6: the app sends them to Google Analytics for Firebase only if you allow it. Version 1.0.5 sent them automatically, without asking; see “Version 1.0.5 and updating”.",
        "The third parties that receive this data handle it under their own privacy policies. Version 1.0.6 uses Google AdMob for its ads, Google's User Messaging Platform to ask for and store your ad privacy choices, and, only if you allow it, Google Analytics for Firebase for usage statistics. RPS Duel does not ask for your name, email address or phone number.",
        "Version 1.0.6 shows banner ads through Google AdMob, using the Google Mobile Ads SDK, on the Records and Collection screens only, never during a duel. Every ad request asks Google to apply its treatment for users under the age of majority and limits ads to content rated G. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it. The data used for ads is needed for the app's ads and cannot be switched off in the app.",
        "When the app starts, it asks Google's consent service whether a privacy choice about ads is needed where you are. If it is, for example in the European Economic Area, the United Kingdom or Switzerland, a consent form appears the first time you open Records or Collection, never during a duel. Where Google requires it, Settings → Privacy choices lets you change your answer at any time. Refusing personalised ads, or choosing not to have your data sold or shared, does not remove ads; the ads you see are then not personalised. If the app cannot reach the consent service, it shows no ads until it can.",
        "Version 1.0.6 includes Google Analytics for Firebase, but collects usage statistics only if you allow it. Before your first move, the app asks once whether you want to help improve RPS Duel; “Allow” and “Don't allow” are equally prominent, and the game works the same either way. You can change your answer at any time in Settings → Usage statistics. If you allow it, the app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, and whether a banner ad was requested, loaded or shown, with any error code, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played.",
        "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Your usage-statistics choice and your ad privacy choices are separate: neither changes the other. If you turn usage statistics off, the app stops sending them and deletes the analytics data stored on your device, including the app-instance identifier.",
        "Version 1.0.5, on Google Play from October 25, 2026, collected usage statistics automatically, without asking. When you update to 1.0.6, collection stays off until you choose otherwise, and the analytics data that 1.0.5 stored on your device is deleted. Usage statistics that 1.0.5 already sent to Google are not deleted by the update; Google Analytics keeps them for the periods described above.",
        "In version 1.0.6: your usage-statistics choice (allowed or not allowed)",
        "In version 1.0.6: your ad privacy choices, saved by Google's consent software",
        "— your language, difficulty and sound settings, lifetime totals, daily challenge progress, achievement flags, collected moments, your usage-statistics choice and your ad privacy choices — are kept.",
        "In version 1.0.6, turning off Settings → Usage statistics deletes the analytics data stored on your device; it does not delete statistics already sent.",
        "In version 1.0.6, the app does not ask for your age. Because some players may be teenagers, every ad request asks Google to apply its treatment for users under the age of majority, and ads are limited to content rated G. Choices about usage statistics and ad privacy are made by the player in the app.",
        "The policy was updated for version 1.0.5, which added ads and usage statistics, and again for version 1.0.6, which asks before collecting usage statistics, adds ad privacy choices and shows a second banner on the Collection screen.",
      ],
      retention: "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months",
      failClosed: "If the app cannot reach the consent service, it shows no ads until it can.",
    },
    {
      prefix: "/tr",
      titles: ["Toplanan ve paylaşılan veriler (1.0.6 sürümü)", "Bu verilerin nasıl işlendiği (1.0.6 sürümü)", "Reklam gizlilik tercihlerin (1.0.6 sürümü)", "Kullanım istatistikleri (1.0.6 sürümü)", "1.0.5 sürümü ve güncelleme", "Çocuklar ve gençler"],
      usageTitle: "Kullanım istatistikleri (1.0.6 sürümü)",
      texts: [
        "1.0.6 sürümü reklam gösterir. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. 1.0.6 sürümünde kullanım istatistikleri isteğe bağlıdır: uygulama bunları yalnızca izin verirsen Google Analytics for Firebase'e gönderir. 1.0.5 sürümü bunları sormadan, otomatik olarak gönderiyordu; “1.0.5 sürümü ve güncelleme” bölümüne bak.",
        "Bu verileri alan üçüncü taraflar, verileri kendi gizlilik politikalarına göre işler. 1.0.6 sürümü reklamlar için Google AdMob'u, reklam gizlilik tercihlerini sormak ve saklamak için Google'ın Kullanıcı Mesajlaşma Platformu'nu ve yalnızca izin verirsen kullanım istatistikleri için Google Analytics for Firebase'i kullanır. RPS Duel adını, e-posta adresini veya telefon numaranı istemez.",
        "1.0.6 sürümü banner reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden yalnızca Kayıtlar ve Koleksiyon ekranlarında gösterir, düello sırasında asla göstermez. Her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz. Reklamlar için kullanılan veriler uygulamadaki reklamlar için gereklidir ve uygulama içinden kapatılamaz.",
        "Uygulama açıldığında, bulunduğun yerde reklamlarla ilgili bir gizlilik tercihi gerekip gerekmediğini Google'ın onay hizmetine sorar. Gerekiyorsa, örneğin Avrupa Ekonomik Alanı, Birleşik Krallık veya İsviçre'de, onay formu Kayıtlar'ı veya Koleksiyon'u ilk açtığında görünür; düello sırasında asla görünmez. Google'ın gerektirdiği yerlerde Ayarlar → Gizlilik tercihleri ile yanıtını istediğin zaman değiştirebilirsin. Kişiselleştirilmiş reklamları reddetmek ya da verilerinin satılmamasını veya paylaşılmamasını seçmek reklamları kaldırmaz; o durumda gördüğün reklamlar kişiselleştirilmez. Uygulama onay hizmetine ulaşamazsa, ulaşana kadar reklam göstermez.",
        "1.0.6 sürümü Google Analytics for Firebase'i içerir, ancak kullanım istatistiklerini yalnızca izin verirsen toplar. İlk hamlenden önce uygulama, RPS Duel'i geliştirmeye yardım etmek isteyip istemediğini bir kez sorar; “İzin ver” ve “İzin verme” eşit ağırlıktadır ve oyun her iki durumda da aynı çalışır. Yanıtını istediğin zaman Ayarlar → Kullanım istatistikleri'nden değiştirebilirsin. İzin verirsen uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında ve bir banner reklamın istenip istenmediğini, yüklenip yüklenmediğini veya gösterilip gösterilmediğini, varsa hata koduyla birlikte, arayüz dilin ve seçili zorlukla kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır.",
        "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Kullanım istatistikleri tercihin ile reklam gizlilik tercihlerin birbirinden ayrıdır; biri diğerini değiştirmez. Kullanım istatistiklerini kapatırsan uygulama bunları göndermeyi bırakır ve uygulama örneği kimliği dahil cihazında saklanan analiz verilerini siler.",
        "25 Ekim 2026'dan itibaren Google Play'de bulunan 1.0.5 sürümü, kullanım istatistiklerini sormadan, otomatik olarak topluyordu. 1.0.6'ya güncellediğinde toplama, sen aksini seçene kadar kapalı kalır ve 1.0.5'in cihazında sakladığı analiz verileri silinir. 1.0.5'in daha önce Google'a gönderdiği kullanım istatistikleri güncellemeyle silinmez; Google Analytics bunları yukarıda açıklanan süreler boyunca saklar.",
        "1.0.6 sürümünde: kullanım istatistikleri tercihin (izin verildi veya verilmedi)",
        "1.0.6 sürümünde: Google'ın onay yazılımının kaydettiği reklam gizlilik tercihlerin",
        "— dil, zorluk ve ses ayarların, toplam istatistiklerin, günlük meydan okuma ilerlemen, başarım bayrakların, toplanan anların, kullanım istatistikleri tercihin ve reklam gizlilik tercihlerin — korunur.",
        "1.0.6 sürümünde Ayarlar → Kullanım istatistikleri'ni kapatmak cihazında saklanan analiz verilerini siler; daha önce gönderilmiş istatistikleri silmez.",
        "1.0.6 sürümünde uygulama yaşını sormaz. Bazı oyuncular genç olabileceği için her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Kullanım istatistikleri ve reklam gizliliğiyle ilgili tercihleri uygulamada oyuncu yapar.",
        "Politika, reklam ve kullanım istatistikleri ekleyen 1.0.5 sürümü için ve ardından kullanım istatistiklerinden önce izin isteyen, reklam gizlilik tercihleri ekleyen ve Koleksiyon ekranında ikinci bir banner gösteren 1.0.6 sürümü için güncellenmiştir.",
      ],
      retention: "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı",
      failClosed: "Uygulama onay hizmetine ulaşamazsa, ulaşana kadar reklam göstermez.",
    },
    {
      prefix: "/es",
      titles: ["Datos recopilados y compartidos (versión 1.0.6)", "Cómo se tratan estos datos (versión 1.0.6)", "Tus opciones de privacidad publicitaria (versión 1.0.6)", "Estadísticas de uso (versión 1.0.6)", "La versión 1.0.5 y la actualización", "Niños y adolescentes"],
      usageTitle: "Estadísticas de uso (versión 1.0.6)",
      texts: [
        "La versión 1.0.6 muestra anuncios. Según la información de seguridad de los datos declarada en Google Play, la aplicación recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. En la versión 1.0.6 las estadísticas de uso son opcionales: la aplicación solo las envía a Google Analytics for Firebase si lo permites. La versión 1.0.5 las enviaba automáticamente, sin preguntar; consulta “La versión 1.0.5 y la actualización”.",
        "Los terceros que reciben estos datos los tratan conforme a sus propias políticas de privacidad. La versión 1.0.6 usa Google AdMob para los anuncios, la Plataforma de Mensajes para Usuarios de Google para pedir y guardar tus opciones de privacidad publicitaria y, solo si lo permites, Google Analytics for Firebase para las estadísticas de uso. RPS Duel no te pide tu nombre, tu correo electrónico ni tu número de teléfono.",
        "La versión 1.0.6 muestra anuncios de banner a través de Google AdMob, mediante el SDK de Google Mobile Ads, solo en las pantallas Registros y Colección, nunca durante un duelo. Cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad y limita los anuncios a contenido con clasificación G. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila. Los datos usados para los anuncios son necesarios para los anuncios de la aplicación y no se pueden desactivar en ella.",
        "Al iniciarse, la aplicación consulta al servicio de consentimiento de Google si se necesita una elección de privacidad sobre anuncios donde estás. Si es así, por ejemplo en el Espacio Económico Europeo, el Reino Unido o Suiza, aparece un formulario de consentimiento la primera vez que abres Registros o Colección, nunca durante un duelo. Donde Google lo exija, Ajustes → Opciones de privacidad te permite cambiar tu respuesta en cualquier momento. Rechazar los anuncios personalizados, o elegir que no se vendan ni compartan tus datos, no elimina los anuncios; los anuncios que veas no estarán personalizados. Si la aplicación no puede contactar con el servicio de consentimiento, no muestra anuncios hasta que pueda.",
        "La versión 1.0.6 incluye Google Analytics for Firebase, pero solo recopila estadísticas de uso si lo permites. Antes de tu primer movimiento, la aplicación te pregunta una vez si quieres ayudar a mejorar RPS Duel; “Permitir” y “No permitir” tienen el mismo peso, y el juego funciona igual en ambos casos. Puedes cambiar tu respuesta en cualquier momento en Ajustes → Estadísticas de uso. Si lo permites, la aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, y si un anuncio de banner se solicitó, cargó o mostró, con su código de error si lo hay, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega.",
        "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria son independientes: ninguna cambia la otra. Si desactivas las estadísticas de uso, la aplicación deja de enviarlas y borra los datos de análisis guardados en tu dispositivo, incluido el identificador de instancia de la aplicación.",
        "La versión 1.0.5, en Google Play desde el 25 de octubre de 2026, recopilaba estadísticas de uso automáticamente, sin preguntar. Al actualizar a la 1.0.6, la recopilación queda desactivada hasta que elijas lo contrario, y se borran los datos de análisis que la 1.0.5 guardó en tu dispositivo. Las estadísticas de uso que la 1.0.5 ya envió a Google no se borran con la actualización; Google Analytics las conserva durante los plazos descritos arriba.",
        "En la versión 1.0.6: tu elección sobre las estadísticas de uso (permitidas o no)",
        "En la versión 1.0.6: tus opciones de privacidad publicitaria, guardadas por el software de consentimiento de Google",
        "—tus ajustes de idioma, dificultad y sonido, los totales acumulados, el progreso del desafío diario, los indicadores de logros, los momentos coleccionados, tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria— se conservan.",
        "En la versión 1.0.6, desactivar Ajustes → Estadísticas de uso borra los datos de análisis guardados en tu dispositivo; no borra las estadísticas ya enviadas.",
        "En la versión 1.0.6, la aplicación no pregunta tu edad. Como algunos jugadores pueden ser adolescentes, cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad, y los anuncios se limitan a contenido con clasificación G. Las decisiones sobre las estadísticas de uso y la privacidad publicitaria las toma el jugador en la aplicación.",
        "La política se actualizó para la versión 1.0.5, que añadió anuncios y estadísticas de uso, y de nuevo para la versión 1.0.6, que pregunta antes de recopilar estadísticas de uso, añade opciones de privacidad publicitaria y muestra un segundo banner en la pantalla Colección.",
      ],
      retention: "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses",
      failClosed: "Si la aplicación no puede contactar con el servicio de consentimiento, no muestra anuncios hasta que pueda.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/rps-duel labels the 1.0.6 disclosures`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/rps-duel`);
      const main = page.locator("main");
      for (const title of l.titles) {
        await expect(main.getByRole("heading", { name: title, exact: true })).toHaveCount(1);
      }
      for (const s of l.texts) {
        await expect(main).toContainText(s);
      }
      const usage = main.locator("section").filter({ has: page.getByRole("heading", { name: l.usageTitle, exact: true }) });
      await expect(usage).toContainText(l.retention);
      const text = (await main.textContent()) ?? "";
      // 1.0.6 is described by version only, never as released or open-ended.
      expect(text).not.toMatch(/1\.0\.6 (and later|ve sonraki|y posteriores)|1\.0\.7|now available|available now|update now|ya disponible|disponible ahora|actualiza ahora|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|bulunan 1\.0\.6|1\.0\.6, (available|disponible)/i);
      // Only the fail-closed sentence may say that no ads are shown.
      expect(text.replace(l.failClosed, "")).not.toMatch(/does not show ads|reklam göstermez|no muestra anuncios/);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|international transfer|uluslararası aktarım|transferencia internacional/i);
    });
  }
});

// Chess Rescue: versions up to 1.2.1 are offline and ad-free; 1.3.0 adds
// AdMob, UMP and Firebase Analytics that is off until the player answers
// the Home usage-statistics question; 1.4.0 also refreshes consent on Home
// for returning players. There is no settings screen, ad
// consent and usage statistics stay independent, and the advertising ID is
// not claimed absent. The GA4 retention setting is stated for GA4 data only;
// deletion routes, "we do not sell" and deletion-on-withdrawal must not be
// claimed.
test.describe("Chess Rescue privacy policy — 1.2.1, 1.3.0 and 1.4.0", () => {
  const locales = [
    {
      prefix: "",
      earlier: "Versions up to 1.2.1 run entirely on your device: they do not request the internet permission, make no network connections, show no ads and include no analytics.",
      ads: "Version 1.3.0 shows small ads from Google AdMob: on the result screen after you solve a puzzle and at the bottom of the home screen, never during a puzzle.",
      adRequest: "Every ad request from the app asks Google for non-personalised ads, applies Google's treatment for users who may be teenagers, and allows only ads rated suitable for general audiences.",
      adId: "On Android 12 and earlier, Google Play services can still provide the advertising ID to the Google Mobile Ads SDK, and Google may use it to deliver and measure ads and to prevent fraud.",
      question: "On the home screen, normally before your first puzzle, the app asks once: “Help improve Chess Rescue?”",
      eligible: "“Allow” works only after you tick “I am 18 or older, or a parent or guardian has agreed.” This statement is your own; the app does not check your age or whether a parent or guardian has agreed",
      homeLine: "To change it at any time, tap Usage statistics on the home screen; that line shows whether usage statistics are on or off.",
      scope: "Until you choose “Allow”, Google Analytics for Firebase collects no usage statistics events. This choice covers only those events:",
      withdrawal: "If you later choose “Don't allow”, the app stops collecting usage statistics from then on and resets the analytics data stored on your device, including the app-instance identifier. This does not delete information that has already been sent to Google.",
      independent: "Your choices for ads do not turn usage statistics on or off, and allowing usage statistics does not give consent for ads.",
      retention: "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, or to other parts of the Firebase software.",
      v13Consent: "In version 1.3.0, the app does not contact Google's consent service when it starts. After your first solved puzzle in a session, or when you tap Privacy choices, it uses Google User Messaging Platform to check whether a consent message is required where you are.",
      refresh: "Version 1.4.0 works the same way until it has completed that check once after a solved puzzle, for example after a new installation or an update from 1.3.0. It then remembers this on your device and, from your next session, also runs the check when the home screen opens, so the ad at the bottom of the home screen can appear without solving another puzzle, if your consent status allows ads to be requested.",
      flag: "In version 1.4.0, also: whether the app has completed an ad consent check after a solved puzzle",
      v14: "Version 1.4.0 handles your information in the same way as version 1.3.0, except for when it checks your ad consent and one extra item it stores on your device, both described below.",
      date: "Last updated: 2026-11-03",
      meta: "Privacy policy for Chess Rescue by Lunexa Games: version 1.3.0 adds Google AdMob ads and optional analytics; earlier versions are fully offline with no ads.",
    },
    {
      prefix: "/tr",
      earlier: "1.2.1'e kadarki sürümler tamamen cihazında çalışır: internet izni istemez, ağ bağlantısı kurmaz, reklam göstermez ve analitik içermez.",
      ads: "1.3.0 sürümü Google AdMob'dan küçük reklamlar gösterir: bir bulmacayı çözdükten sonra sonuç ekranında ve ana ekranın en altında; bulmaca sırasında asla.",
      adRequest: "Uygulamanın her reklam isteği Google'dan kişiselleştirilmemiş reklam ister, genç olabilecek kullanıcılar için Google'ın uyguladığı işlemi uygular ve yalnızca genel izleyiciye uygun olarak derecelendirilmiş reklamlara izin verir.",
      adId: "Android 12 ve öncesinde Google Play hizmetleri reklam kimliğini yine de Google Mobile Ads SDK'ya sağlayabilir ve Google bunu reklamları sunmak ve ölçmek ve dolandırıcılığı önlemek için kullanabilir.",
      question: "Uygulama ana ekranda, normalde ilk bulmacandan önce, bir kez “Chess Rescue'yu geliştirmeye yardım eder misin?” diye sorar",
      eligible: "“İzin ver” yalnızca “18 yaşında veya daha büyüğüm ya da ebeveynim veya vasim kabul etti.” ifadesini işaretledikten sonra çalışır",
      homeLine: "Cevabını istediğin zaman değiştirmek için ana ekrandaki Kullanım istatistikleri satırına dokun; bu satır kullanım istatistiklerinin açık mı kapalı mı olduğunu gösterir.",
      scope: "“İzin ver” seçeneğini seçene kadar Google Analytics for Firebase kullanım istatistiği olayı toplamaz. Bu seçim yalnızca bu olayları kapsar:",
      withdrawal: "Daha sonra “İzin verme” seçeneğini seçersen uygulama o andan itibaren kullanım istatistiği toplamayı bırakır ve uygulama örneği kimliği dahil cihazında saklanan analitik verilerini sıfırlar. Bu, Google'a daha önce gönderilmiş bilgileri silmez.",
      independent: "Reklam seçimlerin kullanım istatistiklerini açmaz veya kapatmaz; kullanım istatistiklerine izin vermek de reklamlar için izin vermek anlamına gelmez.",
      retention: "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir.",
      v13Consent: "1.3.0 sürümünde uygulama açılırken Google'ın izin hizmetine bağlanmaz. Bir oturumda ilk bulmacanı çözdükten sonra ya da Gizlilik seçeneklerine dokunduğunda, bulunduğun yerde bir izin mesajı gerekip gerekmediğini Google User Messaging Platform ile kontrol eder.",
      refresh: "1.4.0 sürümü de, çözülmüş bir bulmacadan sonra bu kontrolü bir kez tamamlayana kadar aynı şekilde çalışır; örneğin yeni bir kurulumdan veya 1.3.0 sürümünden güncellendikten sonra. Ardından bunu cihazında hatırlar ve bir sonraki oturumundan itibaren kontrolü ana ekran açıldığında da yapar; böylece izin durumun reklam istenmesine izin veriyorsa ana ekranın en altındaki reklam, başka bir bulmaca çözmeden de görünebilir.",
      flag: "1.4.0 sürümünde ayrıca: çözülmüş bir bulmacadan sonra reklam izni kontrolünün tamamlanıp tamamlanmadığı",
      v14: "1.4.0 sürümü bilgilerini, reklam izninin ne zaman kontrol edildiği ve cihazında sakladığı bir ek bilgi dışında 1.3.0 sürümüyle aynı şekilde işler; ikisi de aşağıda açıklanmıştır.",
      date: "Son güncelleme: 03.11.2026",
      meta: "Chess Rescue gizlilik politikası (Lunexa Games): 1.3.0 sürümü Google AdMob reklamları ve isteğe bağlı analitik ekler; önceki sürümler çevrimdışı ve reklamsız.",
    },
    {
      prefix: "/es",
      earlier: "Las versiones hasta la 1.2.1 se ejecutan completamente en tu dispositivo: no solicitan el permiso de internet, no realizan conexiones de red, no muestran anuncios y no incluyen analítica.",
      ads: "La versión 1.3.0 muestra pequeños anuncios de Google AdMob: en la pantalla de resultado después de resolver un rompecabezas y al final de la pantalla de inicio, nunca durante un rompecabezas.",
      adRequest: "Cada solicitud de anuncio de la aplicación pide a Google anuncios no personalizados, aplica el tratamiento de Google para usuarios que pueden ser adolescentes y solo permite anuncios clasificados como aptos para todos los públicos.",
      adId: "En Android 12 y versiones anteriores, los servicios de Google Play pueden proporcionar igualmente el identificador de publicidad al SDK de Google Mobile Ads, y Google puede usarlo para mostrar y medir anuncios y para prevenir el fraude.",
      question: "En la pantalla de inicio, normalmente antes de tu primer rompecabezas, la aplicación te pregunta una vez: “¿Nos ayudas a mejorar Chess Rescue?”",
      eligible: "“Permitir” solo funciona después de marcar “Tengo 18 años o más, o mi madre, padre o tutor está de acuerdo.” Esta declaración es tuya; la aplicación no comprueba tu edad ni si tu madre, padre o tutor está de acuerdo",
      homeLine: "Para cambiarla en cualquier momento, toca Estadísticas de uso en la pantalla de inicio; esa línea muestra si las estadísticas de uso están activadas o desactivadas.",
      scope: "Hasta que elijas “Permitir”, Google Analytics for Firebase no recopila eventos de estadísticas de uso. Esta elección solo afecta a esos eventos:",
      withdrawal: "Si más adelante eliges “No permitir”, la aplicación deja de recopilar estadísticas de uso a partir de ese momento y restablece los datos de analítica guardados en tu dispositivo, incluido el identificador de instancia de la aplicación. Esto no elimina la información que ya se haya enviado a Google.",
      independent: "Tus opciones para los anuncios no activan ni desactivan las estadísticas de uso, y permitir las estadísticas de uso no da consentimiento para los anuncios.",
      retention: "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob ni a otras partes del software Firebase.",
      v13Consent: "En la versión 1.3.0, la aplicación no se conecta al servicio de consentimiento de Google al iniciarse. Después de tu primer rompecabezas resuelto en una sesión, o cuando tocas Opciones de privacidad, usa Google User Messaging Platform para comprobar si donde estás se requiere un mensaje de consentimiento.",
      refresh: "La versión 1.4.0 funciona igual hasta que haya completado esa comprobación una vez después de un rompecabezas resuelto, por ejemplo después de una instalación nueva o de una actualización desde la 1.3.0. Después lo recuerda en tu dispositivo y, a partir de tu siguiente sesión, también hace la comprobación cuando se abre la pantalla de inicio, de modo que el anuncio al final de la pantalla de inicio puede aparecer sin resolver otro rompecabezas, si tu estado de consentimiento permite solicitar anuncios.",
      flag: "En la versión 1.4.0, además: si la aplicación ya ha completado una comprobación del consentimiento para los anuncios después de un rompecabezas resuelto",
      v14: "La versión 1.4.0 trata tu información igual que la versión 1.3.0, salvo en el momento en que comprueba tu consentimiento para los anuncios y en un dato adicional que guarda en tu dispositivo; ambos se describen a continuación.",
      date: "Última actualización: 2026-11-03",
      meta: "Política de privacidad de Chess Rescue (Lunexa Games): la 1.3.0 añade anuncios de Google AdMob y analítica opcional; las anteriores, sin conexión ni anuncios.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/chess-rescue describes both versions`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/chess-rescue`);
      const main = page.locator("main");
      for (const s of [l.earlier, l.ads, l.adRequest, l.adId, l.question, l.eligible, l.homeLine, l.scope, l.withdrawal, l.retention, l.independent, l.v13Consent, l.refresh, l.flag, l.v14, l.date]) {
        await expect(main).toContainText(s);
      }
      await expect(main).not.toContainText(/we do not sell|satmayız|no vendemos|Crashlytics|deletes? (the )?data|verileri siler|elimina los datos/i);
      await expect(main).not.toContainText(/AdMob (data|data is) (kept|retained)|Firebase data is kept|todos los datos se guardan|tüm veriler .* tutulur/i);
      await expect(main).not.toContainText(/does not contact a server|herhangi bir sunucuyla iletişim kurmaz|no se comunica con ningún servidor/);
      // 1.4.0 is described by version only, never as available or released.
      await expect(main).not.toContainText(/now available|available now|update now|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|ya disponible|disponible ahora|actualiza ahora|\b1\.[5-9]\.\d/i);
      await expect(main).not.toContainText(/app's settings|own setting|uygulamanın ayarlarından|kendi ayarı|ajustes de la aplicación|propio ajuste|AAID/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", l.meta);
    });
  }
});
