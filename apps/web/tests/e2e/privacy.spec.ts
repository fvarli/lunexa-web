import { test, expect } from "@playwright/test";

// Quietly 1.2.1 sentences that sit inside paragraphs shared with earlier
// versions; the 1.2.0 checks strip them before testing the 1.2.0 wording.
const QUIETLY_121: Record<string, { sentences: string[] }> = {
  "": {
    "sentences": [
      "Version 1.2.1 and later work like version 1.2.0, except for usage statistics, described below. They can send usage statistics to Google Analytics for Firebase: in the EEA, the UK, Switzerland and Türkiye only if you turn that on, and elsewhere after a one-time notice, with a switch to turn it off.",
      "Version 1.2.1 turned usage statistics on by default outside the EEA, the UK, Switzerland and Türkiye, after a one-time notice."
    ]
  },
  "/tr": {
    "sentences": [
      "1.2.1 ve sonraki sürümler, aşağıda açıklanan kullanım istatistikleri dışında 1.2.0 sürümü gibi çalışır. Google Analytics for Firebase'e kullanım istatistikleri gönderebilirler: AEA'da, Birleşik Krallık'ta, İsviçre'de ve Türkiye'de yalnızca sen açarsan, diğer yerlerde tek seferlik bir bildirimden sonra; istediğin zaman kapatabilirsin.",
      "1.2.1 sürümü, kullanım istatistiklerini AEA, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra varsayılan olarak açtı."
    ]
  },
  "/es": {
    "sentences": [
      "La versión 1.2.1 y las posteriores funcionan como la versión 1.2.0, salvo en las estadísticas de uso, que se describen más abajo. Pueden enviar estadísticas de uso a Google Analytics para Firebase: en el EEE, el Reino Unido, Suiza y Turquía solo si lo activas, y en otros lugares tras un aviso único, con un interruptor para desactivarlo.",
      "La versión 1.2.1 activó por defecto las estadísticas de uso fuera del EEE, el Reino Unido, Suiza y Turquía, tras un aviso único."
    ]
  }
};

// Quietly 1.1.0 is on Google Play: the policy must describe its history
// cleanup and save queue, and still be accurate for anyone on an older version.
test.describe("Quietly privacy policy — 1.1.0", () => {
  const locales = [
    {
      prefix: "",
      date: "Last updated: 2026-11-03",
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
      date: "Son güncelleme: 03.11.2026",
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
      date: "Última actualización: 2026-11-03",
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

// Quietly 1.2.0 (W7, WEB_HANDOFF v5): published next to the 1.1.0 text. The
// 1.1.0 statements stay, labelled "up to version 1.1.0" where 1.2.0 differs;
// every 1.2.0 statement says "version 1.2.0", never open-ended (1.2.1 changes
// the analytics default; its own text is checked below), and nothing says
// 1.2.0 is already available. The
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
        "Quietly does not create accounts. Versions up to 1.1.0 do not show ads and do not include analytics or crash reporting. Version 1.2.0 shows one ad from Google after a save finishes, and it can send usage statistics to Google Analytics for Firebase — only if you turn that on. Your links, files and history are never sent with either.",
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
        "Quietly hesap oluşturmaz. 1.1.0 sürümüne kadarki sürümler reklam göstermez ve analitik veya çökme raporlama içermez. 1.2.0 sürümü bir kayıt tamamlandıktan sonra Google'dan tek bir reklam gösterir ve yalnızca sen açarsan Google Analytics for Firebase'e kullanım istatistikleri gönderebilir. Bağlantıların, dosyaların ve geçmişin hiçbiriyle birlikte gönderilmez.",
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
        "Quietly no crea cuentas. Las versiones hasta la 1.1.0 no muestran anuncios y no incluyen analítica ni informes de errores. La versión 1.2.0 muestra un anuncio de Google cuando termina un guardado, y puede enviar estadísticas de uso a Google Analytics para Firebase, solo si lo activas. Tus enlaces, archivos e historial nunca se envían con ninguno de ellos.",
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
      // The 1.2.0 text: everything outside the 1.2.1 section and items, without
      // the 1.2.1 sentences in the intro and the changes paragraph.
      const v120Raw = await main.evaluate((el) => {
        const c = el.cloneNode(true) as HTMLElement;
        c.querySelectorAll("section").forEach((s) => {
          if (/1\.2\.1/.test(s.querySelector("h2")?.textContent ?? "")) s.remove();
        });
        c.querySelectorAll("li").forEach((n) => {
          if (/1\.2\.1/.test(n.textContent ?? "")) n.remove();
        });
        return c.textContent ?? "";
      });
      const v120 = QUIETLY_121[l.prefix].sentences.reduce((t, x) => t.replaceAll(x, ""), v120Raw);
      expect(v120).not.toMatch(/from version 1\.2\.0|since version 1\.2\.0|1\.2\.0 and later|1\.2\.0 sürümünden itibaren|1\.2\.0 ve sonra|desde la versión 1\.2\.0|1\.2\.0 y posteriores|1\.2\.1|now available|available now|update now|ya disponible|artık (mevcut|kullanılabilir)|Version 1\.2\.0 added/i);
      expect(text).not.toMatch(/starts again whenever there is new activity|süre yeniden başlar|vuelve a empezar/);
      // Usage statistics carry an app-instance identifier: never call them anonymous.
      expect(text).not.toMatch(/anonymous|anonymi[sz]ed|anonim|anonimleştir|anónim[oa]s?|anonimizad[oa]s?/i);
      await expect(stats).toContainText(/app-instance identifier|uygulama örneği kimliği|identificador de instancia de la app/);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|data controller|veri sorumlusu|responsable del tratamiento|postal address|(?<!e-)posta adresi|dirección postal/i);
    });
  }
});

// Quietly 1.2.1 (D-ANL-1_IMPLEMENTATION §6 P3, WEB_HANDOFF 1.2.1, D-QT-121):
// text labelled "1.2.1 and later" next to the 1.1.0 and 1.2.0 text. Usage
// statistics follow the documented region rule only, the region signals are
// stated with their limits, and the notice-shown flag is a local item. No
// availability claim; no "anonymous"; no controller block.
test.describe("Quietly privacy policy — 1.2.1 and later", () => {
  const locales = [
    {
      "prefix": "",
      "date": "Last updated: 2026-11-03",
      "canonical": "https://uselunexa.com/privacy/quietly",
      "statsTitle": "Usage statistics (Google Analytics for Firebase, version 1.2.1 and later)",
      "intro121": "Version 1.2.1 and later work like version 1.2.0, except for usage statistics, described below. They can send usage statistics to Google Analytics for Firebase: in the EEA, the UK, Switzerland and Türkiye only if you turn that on, and elsewhere after a one-time notice, with a switch to turn it off.",
      "lead": "Whether usage statistics are on depends on where you are. Quietly works this out each time it starts:",
      "regionBullets": [
        "in the EEA, the UK, Switzerland and Türkiye they are off unless you turn on Settings → Privacy → Share usage statistics;",
        "elsewhere they are on after a one-time notice in the app, which lets you turn them off;",
        "if Quietly can't tell where you are (for example when you're offline), they stay off."
      ],
      "after": [
        "How the region is determined: for the EEA, the UK and Switzerland, Quietly uses the answer of Google's consent service, the same check Google uses for its ad consent message, based on your IP address. For Türkiye it uses your SIM card's country or, without a SIM, your device or app language. Quietly doesn't store the result or send it anywhere. A VPN or travel can change the answer.",
        "A choice you make — in Settings or with “Turn off” on the notice — always applies, wherever you are, and choices made in version 1.2.0 are kept. It is separate from Google's ad consent: agreeing to one never turns on the other, and Google's ad consent is never used as consent for statistics.",
        "When they're on, Quietly sends counts of the screens you open and how link checks and saves turn out — for example whether a save finished, failed or was cancelled, the kind of media, and the number of items in bands such as 1, 2–5 or 6+. Firebase also records some information automatically, such as app opens, sessions, the device model, OS version, language and approximate country.",
        "Quietly never sends links, file names, titles, file sizes, your history or your advertising ID to Analytics, and usage statistics are not used for advertising.",
        "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the files and data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends.",
        "Turn usage statistics off at any time in the same place: collection stops, and the analytics data Firebase kept on your device and its app-instance identifier are reset."
      ],
      "network": "Google Analytics for Firebase (version 1.2.1 and later) — while usage statistics are on. See “Usage statistics” below.",
      "local": "Whether the usage-statistics notice has been shown (Quietly 1.2.1 and later)",
      "changes": "Version 1.2.1 turned usage statistics on by default outside the EEA, the UK, Switzerland and Türkiye, after a one-time notice."
    },
    {
      "prefix": "/tr",
      "date": "Son güncelleme: 03.11.2026",
      "canonical": "https://uselunexa.com/tr/privacy/quietly",
      "statsTitle": "Kullanım istatistikleri (Google Analytics for Firebase, 1.2.1 ve sonraki sürümler)",
      "intro121": "1.2.1 ve sonraki sürümler, aşağıda açıklanan kullanım istatistikleri dışında 1.2.0 sürümü gibi çalışır. Google Analytics for Firebase'e kullanım istatistikleri gönderebilirler: AEA'da, Birleşik Krallık'ta, İsviçre'de ve Türkiye'de yalnızca sen açarsan, diğer yerlerde tek seferlik bir bildirimden sonra; istediğin zaman kapatabilirsin.",
      "lead": "Kullanım istatistiklerinin açık olup olmadığı nerede olduğuna bağlıdır. Quietly bunu her açılışta belirler:",
      "regionBullets": [
        "AEA'da, Birleşik Krallık'ta, İsviçre'de ve Türkiye'de Ayarlar → Gizlilik → Kullanım istatistiklerini paylaş seçeneğini açmadıkça kapalıdır;",
        "diğer yerlerde uygulamadaki tek seferlik bir bildirimden sonra açılır; bu bildirim kapatmana da izin verir;",
        "Quietly nerede olduğunu anlayamazsa (örneğin çevrimdışıysan) kapalı kalır."
      ],
      "after": [
        "Bölge nasıl belirlenir: AEA, Birleşik Krallık ve İsviçre için Quietly, Google'ın reklam izni mesajı için de kullandığı, IP adresine dayanan Google rıza hizmetinin yanıtını kullanır. Türkiye için SIM kartının ülkesini, SIM yoksa cihazının veya uygulamanın dilini kullanır. Quietly sonucu saklamaz ve hiçbir yere göndermez. VPN veya seyahat yanıtı değiştirebilir.",
        "Ayarlar'da ya da bildirimdeki “Kapat” ile yaptığın seçim, nerede olursan ol her zaman geçerlidir; 1.2.0 sürümünde yaptığın seçimler korunur. Bu seçim Google'ın reklam izninden ayrıdır: birine izin vermek diğerini asla açmaz ve Google'ın reklam izni istatistikler için izin olarak kullanılmaz.",
        "Açıkken Quietly, açtığın ekranların ve bağlantı kontrolleriyle kayıtların nasıl sonuçlandığının sayımlarını gönderir; örneğin bir kaydın tamamlanıp tamamlanmadığı, başarısız olup olmadığı veya iptal edilip edilmediği, medya türü ve 1, 2–5 ya da 6+ gibi aralıklarla öğe sayısı. Firebase ayrıca uygulama açılışları, oturumlar, cihaz modeli, işletim sistemi sürümü, dil ve yaklaşık ülke gibi bazı bilgileri otomatik olarak kaydeder.",
        "Quietly, Analytics'e bağlantıları, dosya adlarını, başlıkları, dosya boyutlarını, geçmişini veya reklam kimliğini asla göndermez; kullanım istatistikleri reklam için kullanılmaz.",
        "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan dosyalar ve veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir.",
        "Kullanım istatistiklerini aynı yerden istediğin zaman kapatabilirsin: toplama durur, Firebase'in cihazında tuttuğu analitik veriler ve uygulama örneği kimliği sıfırlanır."
      ],
      "network": "Google Analytics for Firebase (1.2.1 ve sonraki sürümler) — kullanım istatistikleri açık olduğu sürece. Aşağıdaki “Kullanım istatistikleri” bölümüne bak.",
      "local": "Kullanım istatistikleri bildiriminin gösterilip gösterilmediği (Quietly 1.2.1 ve sonrası)",
      "changes": "1.2.1 sürümü, kullanım istatistiklerini AEA, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra varsayılan olarak açtı."
    },
    {
      "prefix": "/es",
      "date": "Última actualización: 2026-11-03",
      "canonical": "https://uselunexa.com/es/privacy/quietly",
      "statsTitle": "Estadísticas de uso (Google Analytics para Firebase, versión 1.2.1 y posteriores)",
      "intro121": "La versión 1.2.1 y las posteriores funcionan como la versión 1.2.0, salvo en las estadísticas de uso, que se describen más abajo. Pueden enviar estadísticas de uso a Google Analytics para Firebase: en el EEE, el Reino Unido, Suiza y Turquía solo si lo activas, y en otros lugares tras un aviso único, con un interruptor para desactivarlo.",
      "lead": "Que las estadísticas de uso estén activadas depende de dónde estés. Quietly lo determina cada vez que se abre:",
      "regionBullets": [
        "en el EEE, el Reino Unido, Suiza y Turquía están desactivadas salvo que actives Ajustes → Privacidad → Compartir estadísticas de uso;",
        "en otros lugares se activan tras un aviso único en la app, que también te permite desactivarlas;",
        "si Quietly no puede saber dónde estás (por ejemplo, sin conexión), siguen desactivadas."
      ],
      "after": [
        "Cómo se determina la región: para el EEE, el Reino Unido y Suiza, Quietly usa la respuesta del servicio de consentimiento de Google, la misma comprobación que Google usa para su mensaje de consentimiento de anuncios, basada en tu dirección IP. Para Turquía usa el país de tu tarjeta SIM o, sin SIM, el idioma del dispositivo o de la app. Quietly no guarda el resultado ni lo envía a ningún sitio. Una VPN o un viaje pueden cambiar la respuesta.",
        "La elección que hagas —en Ajustes o con “Desactivar” en el aviso— se aplica siempre, estés donde estés, y se conservan las elecciones hechas en la versión 1.2.0. Es independiente del consentimiento de anuncios de Google: aceptar uno nunca activa el otro, y el consentimiento de anuncios de Google nunca se usa como consentimiento para las estadísticas.",
        "Si las activas, Quietly envía recuentos de las pantallas que abres y de cómo terminan las comprobaciones de enlaces y los guardados; por ejemplo, si un guardado terminó, falló o se canceló, el tipo de medio y el número de elementos en rangos como 1, 2–5 o 6+. Firebase también registra cierta información automáticamente, como las aperturas de la app, las sesiones, el modelo del dispositivo, la versión del sistema, el idioma y el país aproximado.",
        "Quietly nunca envía a Analytics enlaces, nombres de archivo, títulos, tamaños de archivo, tu historial ni tu identificador de publicidad, y las estadísticas de uso no se usan para publicidad.",
        "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los archivos y datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo.",
        "Desactiva las estadísticas de uso cuando quieras en el mismo lugar: la recopilación se detiene y se restablecen los datos de analítica que Firebase guardaba en tu dispositivo y su identificador de instancia de la app."
      ],
      "network": "Google Analytics para Firebase (versión 1.2.1 y posteriores) — mientras las estadísticas de uso estén activadas. Consulta “Estadísticas de uso” más abajo.",
      "local": "Si ya se mostró el aviso de estadísticas de uso (Quietly 1.2.1 y posteriores)",
      "changes": "La versión 1.2.1 activó por defecto las estadísticas de uso fuera del EEE, el Reino Unido, Suiza y Turquía, tras un aviso único."
    }
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/quietly adds the 1.2.1 region rule and notice`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/quietly`);
      const main = page.locator("main");
      await expect(main).toContainText(l.date);
      await expect(main).toContainText(l.intro121);
      await expect(main).toContainText(l.changes);
      // Lead, the three region cases, then region signals, choices and the
      // 1.2.0 paragraphs that still apply (events, never-sent list, GA4
      // retention, turning off).
      const stats = main.locator("section").filter({ has: page.getByRole("heading", { name: l.statsTitle, exact: true }) });
      await expect(stats).toHaveCount(1);
      const paras = stats.locator("p");
      await expect(paras).toHaveCount(1 + l.after.length);
      await expect(paras.nth(0)).toHaveText(l.lead);
      for (const [i, t] of l.after.entries()) {
        await expect(paras.nth(i + 1)).toHaveText(t);
      }
      const cases = stats.getByRole("listitem");
      await expect(cases).toHaveCount(3);
      for (const [i, t] of l.regionBullets.entries()) {
        await expect(cases.nth(i)).toHaveText(t);
      }
      await expect(stats).toContainText(/app-instance identifier|uygulama örneği kimliği|identificador de instancia de la app/);
      await expect(main.getByRole("listitem").filter({ hasText: l.network })).toHaveCount(1);
      await expect(main.getByRole("listitem").filter({ hasText: l.local })).toHaveCount(1);
      const text = (await main.textContent()) ?? "";
      expect(text).not.toMatch(/1\.2\.1 (is|está) (now )?(available|disponible)|now available|available now|update now|ya disponible|disponible ahora|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|on Google Play since|\b1\.(2\.[2-9]|[3-9]\.\d)/i);
      expect(text).not.toMatch(/anonymous|anonymi[sz]ed|anonim|anonimleştir|anónim[oa]s?|anonimizad[oa]s?/i);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|data controller|veri sorumlusu|responsable del tratamiento|postal address|(?<!e-)posta adresi|dirección postal/i);
      await expect(main.locator('a[href="mailto:hello@uselunexa.com"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", l.canonical);
      for (const lang of ["en", "tr", "es", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1);
      }
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
      dataTitles: ["Data collected and shared (version 1.0.5)", "Data collected and shared (version 1.0.6)", "Data collected and shared (version 1.1.0 and later)"],
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
      meta: "Privacy policy for RPS Duel by Lunexa Games: ads, usage statistics that depend on your region and choices, the data declared on Google Play, and what the app stores on your device.",
    },
    {
      prefix: "/tr",
      date: "Son güncelleme: 03.11.2026",
      dataTitles: ["Toplanan ve paylaşılan veriler (1.0.5 sürümü)", "Toplanan ve paylaşılan veriler (1.0.6 sürümü)", "Toplanan ve paylaşılan veriler (1.1.0 ve sonraki sürümler)"],
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
      meta: "Lunexa Games'in RPS Duel oyunu için gizlilik politikası: reklamlar, bölgene ve tercihlerine bağlı kullanım istatistikleri, Google Play'de beyan edilen veriler ve cihazında saklananlar.",
    },
    {
      prefix: "/es",
      date: "Última actualización: 2026-11-03",
      dataTitles: ["Datos recopilados y compartidos (versión 1.0.5)", "Datos recopilados y compartidos (versión 1.0.6)", "Datos recopilados y compartidos (versión 1.1.0 y posteriores)"],
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
      meta: "Política de privacidad de RPS Duel (Lunexa Games): anuncios, estadísticas de uso según tu región y tus elecciones, los datos declarados en Google Play y qué guarda en tu dispositivo.",
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
      // The 1.0.5 text: everything outside the 1.0.6 and 1.1.0 sections and items.
      const v105 = await main.evaluate((el) => {
        const c = el.cloneNode(true) as HTMLElement;
        c.querySelectorAll("section").forEach((s) => {
          if (/1\.0\.6|1\.1\.0/.test(s.querySelector("h2")?.textContent ?? "")) s.remove();
        });
        c.querySelectorAll("p, li").forEach((n) => {
          if (/1\.0\.6|1\.1\.0/.test(n.textContent ?? "")) n.remove();
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
      await expect(main).not.toContainText(/runs entirely on your device|and only there|tamamen cihazınızda çalışır|Yalnızca cihazınızda|tamamen cihazında çalışır|Yalnızca cihazında|funciona enteramente en tu dispositivo|Solo en tu dispositivo/);
      await expect(main).toContainText(/The app also shows ads and, depending on your region and choices, sends usage statistics|Uygulama ayrıca reklam gösterir ve bölgene ve tercihlerine bağlı olarak|La aplicación también muestra anuncios y, según tu región y tus elecciones, envía estadísticas de uso/);
    });
  }

  // R-REL-12 reported this paragraph twice in the ES 1.0.5 usage section; it
  // must appear once there (the later sections legitimately reuse others).
  test("/es/privacy/rps-duel states the 1.0.5 usage-statistics paragraph once", async ({ page }) => {
    await page.goto("/es/privacy/rps-duel");
    const usage = page.locator("main section").filter({ has: page.getByRole("heading", { name: "Estadísticas de uso (versión 1.0.5)", exact: true }) });
    await expect(usage).toHaveCount(1);
    await expect(usage.locator("p")).toHaveCount(4);
    await expect(usage.locator("p").filter({ hasText: "La versión 1.0.5 incluye Google Analytics for Firebase y recopila estadísticas de uso de forma predeterminada" })).toHaveCount(1);
  });
});

// RPS Duel 1.0.6 (Patch B, R-REL-08): published web-first, next to the 1.0.5
// text. Every 1.0.6 statement is labelled "version 1.0.6", never "and later"
// (1.1.0 changes the analytics default), except the R-REL-12 age sentence,
// and nothing says 1.0.6 is already available. The GA4 retention text stays scoped as for 1.0.5;
// no legal-basis or transfer statement is made.
test.describe("RPS Duel privacy policy — 1.0.6 preparation", () => {
  const locales = [
    {
      prefix: "",
      titles: ["Data collected and shared (version 1.0.6)", "How this data is handled (version 1.0.6)", "Your ad privacy choices (version 1.0.6)", "Usage statistics (version 1.0.6)", "Earlier versions and updating", "Children and teens"],
      usageTitle: "Usage statistics (version 1.0.6)",
      texts: [
        "Version 1.0.6 shows ads. According to the data safety information declared for it on Google Play, the app collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Usage statistics are optional in version 1.0.6: the app sends them to Google Analytics for Firebase only if you allow it. Version 1.0.5 sent them automatically, without asking; see “Earlier versions and updating”.",
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
        "In version 1.0.6 and later, the app does not ask for your age. Because some players may be teenagers, every ad request asks Google to apply its treatment for users under the age of majority, and ads are limited to content rated G. Choices about usage statistics and ad privacy are made by the player in the app.",
        "If a future version of RPS Duel changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes. The policy was updated for version 1.0.5, which added ads and usage statistics, and again for version 1.0.6, which asks before collecting usage statistics, adds ad privacy choices and shows a second banner on the Collection screen, and for version 1.1.0, which turns usage statistics on after a one-time notice outside the European Economic Area, the United Kingdom, Switzerland and Türkiye, adds matches and levels kept on your device, and shows a full-screen ad between matches.",
      ],
      retention: "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months",
      failClosed: "If the app cannot reach the consent service, it shows no ads until it can.",
      laterAge: "In version 1.0.6 and later, the app does not ask for your age.",
    },
    {
      prefix: "/tr",
      titles: ["Toplanan ve paylaşılan veriler (1.0.6 sürümü)", "Bu verilerin nasıl işlendiği (1.0.6 sürümü)", "Reklam gizlilik tercihlerin (1.0.6 sürümü)", "Kullanım istatistikleri (1.0.6 sürümü)", "Önceki sürümler ve güncelleme", "Çocuklar ve gençler"],
      usageTitle: "Kullanım istatistikleri (1.0.6 sürümü)",
      texts: [
        "1.0.6 sürümü reklam gösterir. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. 1.0.6 sürümünde kullanım istatistikleri isteğe bağlıdır: uygulama bunları yalnızca izin verirsen Google Analytics for Firebase'e gönderir. 1.0.5 sürümü bunları sormadan, otomatik olarak gönderiyordu; “Önceki sürümler ve güncelleme” bölümüne bak.",
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
        "1.0.6 ve sonraki sürümlerde uygulama yaşını sormaz. Bazı oyuncular genç olabileceği için her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Kullanım istatistikleri ve reklam gizliliğiyle ilgili tercihleri uygulamada oyuncu yapar.",
        "RPS Duel'in ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, reklam ve kullanım istatistikleri ekleyen 1.0.5 sürümü için; kullanım istatistiklerinden önce izin isteyen, reklam gizlilik tercihleri ekleyen ve Koleksiyon ekranında ikinci bir banner gösteren 1.0.6 sürümü için; ve kullanım istatistiklerini Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra açan, cihazında saklanan maçlar ve seviyeler ekleyen ve maçlar arasında tam ekran bir reklam gösteren 1.1.0 sürümü için güncellenmiştir.",
      ],
      retention: "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı",
      failClosed: "Uygulama onay hizmetine ulaşamazsa, ulaşana kadar reklam göstermez.",
      laterAge: "1.0.6 ve sonraki sürümlerde uygulama yaşını sormaz.",
    },
    {
      prefix: "/es",
      titles: ["Datos recopilados y compartidos (versión 1.0.6)", "Cómo se tratan estos datos (versión 1.0.6)", "Tus opciones de privacidad publicitaria (versión 1.0.6)", "Estadísticas de uso (versión 1.0.6)", "Versiones anteriores y actualización", "Niños y adolescentes"],
      usageTitle: "Estadísticas de uso (versión 1.0.6)",
      texts: [
        "La versión 1.0.6 muestra anuncios. Según la información de seguridad de los datos declarada en Google Play, la aplicación recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. En la versión 1.0.6 las estadísticas de uso son opcionales: la aplicación solo las envía a Google Analytics for Firebase si lo permites. La versión 1.0.5 las enviaba automáticamente, sin preguntar; consulta “Versiones anteriores y actualización”.",
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
        "En la versión 1.0.6 y posteriores, la aplicación no pregunta tu edad. Como algunos jugadores pueden ser adolescentes, cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad, y los anuncios se limitan a contenido con clasificación G. Las decisiones sobre las estadísticas de uso y la privacidad publicitaria las toma el jugador en la aplicación.",
        "Si una versión futura de RPS Duel cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.0.5, que añadió anuncios y estadísticas de uso; para la versión 1.0.6, que pregunta antes de recopilar estadísticas de uso, añade opciones de privacidad publicitaria y muestra un segundo banner en la pantalla Colección; y para la versión 1.1.0, que activa las estadísticas de uso tras un aviso único fuera del Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, añade partidos y niveles guardados en tu dispositivo y muestra un anuncio a pantalla completa entre partidos.",
      ],
      retention: "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses",
      failClosed: "Si la aplicación no puede contactar con el servicio de consentimiento, no muestra anuncios hasta que pueda.",
      laterAge: "En la versión 1.0.6 y posteriores, la aplicación no pregunta tu edad.",
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
      // 1.0.6 is described by version only, never as released or open-ended;
      // only the age sentence (R-REL-12 E9) spans 1.0.6 and later versions.
      expect(text.replaceAll(l.laterAge, "")).not.toMatch(/1\.0\.6 (and later|ve sonraki|y posteriores)|1\.0\.7|now available|available now|update now|ya disponible|disponible ahora|actualiza ahora|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|bulunan 1\.0\.6|1\.0\.6, (available|disponible)/i);
      // Only the fail-closed sentence (1.0.6 and 1.1.0) may say that no ads are shown.
      expect(text.replaceAll(l.failClosed, "")).not.toMatch(/does not show ads|reklam göstermez|no muestra anuncios/);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|international transfer|uluslararası aktarım|transferencia internacional/i);
    });
  }
});

// RPS Duel 1.1.0 (R-REL-12, RPS 80ddb88): sections labelled "version 1.1.0
// and later" next to the 1.0.5 and 1.0.6 text. Usage statistics follow the
// documented region rule only (EEA, UK, Switzerland, Türkiye: opt-in;
// elsewhere: on after a one-time notice; unknown region: off). The match-end
// full-screen ad, and matches, level and XP on the device, are 1.1.0 only.
test.describe("RPS Duel privacy policy — 1.1.0 and later", () => {
  const locales = [
    {
      "prefix": "",
      "titles": [
        "Data collected and shared (version 1.1.0 and later)",
        "How this data is handled (version 1.1.0 and later)",
        "Your ad privacy choices (version 1.1.0 and later)",
        "Usage statistics (version 1.1.0 and later)",
        "Earlier versions and updating"
      ],
      "usageTitle": "Usage statistics (version 1.1.0 and later)",
      "summary": "Version 1.1.0 and later show ads: banners on the Records and Collection screens and, between matches, a full-screen ad. According to the data safety information declared on Google Play, the app collects some data from your device and shares it with third parties for advertising or marketing, for analytics, and for fraud prevention, security and compliance, as described below. Whether the app sends usage statistics to Google Analytics for Firebase depends on where you are: in the European Economic Area, the United Kingdom, Switzerland and Türkiye only if you allow it; elsewhere after a one-time notice, until you turn them off; and not at all when the app cannot tell where you are. See “Usage statistics (version 1.1.0 and later)” and “Earlier versions and updating”.",
      "dataIntro": "The data safety information declared for RPS Duel 1.1.0 on Google Play lists the following data types. Each one is collected and shared with third parties, and the declared purposes of both the collection and the sharing are advertising or marketing; analytics; and fraud prevention, security and compliance:",
      "handled": [
        "The third parties that receive this data handle it under their own privacy policies. The app uses Google AdMob for its ads, Google's User Messaging Platform to ask for and store your ad privacy choices, and, when usage statistics are on, Google Analytics for Firebase. RPS Duel does not ask for your name, email address or phone number.",
        "The app shows its ads through Google AdMob, using the Google Mobile Ads SDK: banners on the Records and Collection screens, and a full-screen ad between matches. Neither appears during a duel. Every ad request asks Google to apply its treatment for users under the age of majority and limits ads to content rated G. According to Google's data disclosure for this SDK, it collects data of the types listed above, including your device's advertising ID, and shares it with Google for these purposes: delivering ads and advertising or marketing; measuring ads and analytics; and fraud prevention, security and compliance. The data safety information declared on Google Play also lists your advertising ID with these three purposes. The analytics purpose declared for your advertising ID comes from the Google Mobile Ads SDK; Google Analytics for Firebase does not collect it. The data used for ads is needed for the app's ads and cannot be switched off in the app.",
        "The full-screen ad can appear only when you leave a match's result card for the next match. It is never shown during a match, after the first match after the app starts, more often than once every two completed matches, or within two minutes of the previous one, and it is not requested while Google's consent form is still waiting for your answer. If no ad is ready, the next match starts at once."
      ],
      "usageFirst": "The app includes Google Analytics for Firebase. When usage statistics are on, the app records when you start your first game, complete a round, start or complete a daily challenge, change the CPU difficulty, or open Records or Collection, and whether an ad (a banner or the full-screen ad) was requested, loaded, shown or closed, with any error code, together with your interface language and selected difficulty. Google Analytics also collects some information automatically, such as information about your device and the app, an approximate location derived from your IP address and a random app-instance identifier. This information is sent to Google and used to understand how the game is played. The game works the same whether usage statistics are on or off.",
      "regionBullets": [
        "In the European Economic Area, the United Kingdom, Switzerland and Türkiye, usage statistics are off unless you allow them. Before your first move, or between rounds if the app learns where you are later, the app asks once whether you want to help improve RPS Duel; “Allow” and “Don't allow” are equally prominent.",
        "Elsewhere, the app shows a one-time notice before your first move, or between rounds, explaining what is collected. Usage statistics start only after that notice, unless you choose “Turn off” there.",
        "If the app cannot tell where you are, for example when it is offline or Google's consent service does not answer, usage statistics stay off and the app tries again later.",
        "Wherever you are, you can turn usage statistics on or off at any time in Settings → Usage statistics, and an answer you have given is kept."
      ],
      "usageAfter": [
        "To decide whether you are in the European Economic Area, the United Kingdom or Switzerland, the app uses the answer of Google's consent service (the same one used for your ad privacy choices). To decide whether you are in Türkiye, it uses your SIM card's country or, without a SIM card, whether your device or app language or region is Turkish. The app does not store this information or send it anywhere, and checks it again each time it starts. These signals can be wrong, for example when you travel or use a VPN; then the rule for the region the app detects applies, and Settings still lets you change your choice.",
        "The Firebase software in the app also creates a random Firebase installation identifier. It is separate from the app-instance identifier and from your advertising ID, and Google Analytics sends it to Google together with the usage statistics.",
        "Google Analytics is set not to collect your advertising ID, and its advertising features are turned off, so these usage statistics are not used for ads. Your usage-statistics choice and your ad privacy choices are separate: neither changes the other. If you turn usage statistics off, the app stops sending them and deletes the analytics data stored on your device, including the app-instance identifier.",
        "Lunexa has set Google Analytics to keep event-level data for 2 months and user-level data for 14 months; the user-level period starts again whenever there is new activity from the same app instance. These periods are Google Analytics settings only: they do not apply to aggregated reports, to data processed for Google AdMob ads, to the data stored on your device, or to other parts of the Firebase software. Google applies these settings under its own processes, and information may not be removed as soon as a period ends."
      ],
      "earlier": "Version 1.0.6 asked everyone before collecting usage statistics. When you update to 1.1.0 from 1.0.6, an answer you gave there is kept; if you did not answer, the rules in “Usage statistics (version 1.1.0 and later)” apply. When you update from 1.0.5, the analytics data that 1.0.5 stored on your device is deleted first, and the same rules then apply.",
      "local": [
        "From version 1.1.0: whether the one-time usage-statistics notice has been shown",
        "From version 1.1.0: your level and experience points (XP)",
        "From version 1.1.0: the match in progress and your chosen match format (best of 3 or best of 5)"
      ],
      "clear": "From version 1.1.0, Reset data also clears the match in progress. Your match-format setting, your level and XP and whether the usage-statistics notice has been shown are kept, like the other items above.",
      "changes": "If a future version of RPS Duel changes the data the app stores or processes, this page will be updated and the date at the top of the page will reflect the change. Material changes will also be noted in the app's release notes. The policy was updated for version 1.0.5, which added ads and usage statistics, and again for version 1.0.6, which asks before collecting usage statistics, adds ad privacy choices and shows a second banner on the Collection screen, and for version 1.1.0, which turns usage statistics on after a one-time notice outside the European Economic Area, the United Kingdom, Switzerland and Türkiye, adds matches and levels kept on your device, and shows a full-screen ad between matches.",
      "kids": "In version 1.0.6 and later, the app does not ask for your age. Because some players may be teenagers, every ad request asks Google to apply its treatment for users under the age of majority, and ads are limited to content rated G. Choices about usage statistics and ad privacy are made by the player in the app.",
      "gaNoAdId": "Google Analytics is set not to collect your advertising ID",
      "regions": "in the European Economic Area, the United Kingdom, Switzerland and Türkiye only if you allow it",
      "canonical": "https://uselunexa.com/privacy/rps-duel"
    },
    {
      "prefix": "/tr",
      "titles": [
        "Toplanan ve paylaşılan veriler (1.1.0 ve sonraki sürümler)",
        "Bu verilerin nasıl işlendiği (1.1.0 ve sonraki sürümler)",
        "Reklam gizlilik tercihlerin (1.1.0 ve sonraki sürümler)",
        "Kullanım istatistikleri (1.1.0 ve sonraki sürümler)",
        "Önceki sürümler ve güncelleme"
      ],
      "usageTitle": "Kullanım istatistikleri (1.1.0 ve sonraki sürümler)",
      "summary": "1.1.0 ve sonraki sürümler reklam gösterir: Kayıtlar ve Koleksiyon ekranlarında banner ve maçlar arasında tam ekran bir reklam. Google Play'de beyan edilen veri güvenliği bilgilerine göre uygulama, aşağıda açıklandığı gibi cihazından bazı verileri toplar ve bunları reklam veya pazarlama, analiz ve dolandırıcılığı önleme, güvenlik ve uyumluluk amacıyla üçüncü taraflarla paylaşır. Uygulamanın kullanım istatistiklerini Google Analytics for Firebase'e gönderip göndermediği bulunduğun yere bağlıdır: Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye'de yalnızca izin verirsen; diğer yerlerde tek seferlik bir bildirimden sonra, sen kapatana kadar; uygulama nerede olduğunu anlayamazsa hiç göndermez. “Kullanım istatistikleri (1.1.0 ve sonraki sürümler)” ve “Önceki sürümler ve güncelleme” bölümlerine bak.",
      "dataIntro": "RPS Duel 1.1.0 için Google Play'de beyan edilen veri güvenliği bilgileri aşağıdaki veri türlerini listeler. Her biri toplanır ve üçüncü taraflarla paylaşılır; hem toplamanın hem de paylaşmanın beyan edilen amaçları reklam veya pazarlama; analiz; dolandırıcılığı önleme, güvenlik ve uyumluluktur:",
      "handled": [
        "Bu verileri alan üçüncü taraflar, verileri kendi gizlilik politikalarına göre işler. Uygulama reklamlar için Google AdMob'u, reklam gizlilik tercihlerini sormak ve saklamak için Google'ın Kullanıcı Mesajlaşma Platformu'nu ve kullanım istatistikleri açıkken Google Analytics for Firebase'i kullanır. RPS Duel adını, e-posta adresini veya telefon numaranı istemez.",
        "Uygulama reklamlarını Google Mobile Ads SDK'yı kullanarak Google AdMob üzerinden gösterir: Kayıtlar ve Koleksiyon ekranlarında banner ve maçlar arasında tam ekran bir reklam. İkisi de düello sırasında asla görünmez. Her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Google'ın bu SDK için yayımladığı veri açıklamasına göre SDK, cihazının reklam kimliği dahil yukarıda listelenen türlerdeki verileri toplar ve bunları Google ile şu amaçlarla paylaşır: reklam sunma ile reklam veya pazarlama; reklamları ölçme ile analiz; dolandırıcılığı önleme, güvenlik ve uyumluluk. Google Play'de beyan edilen veri güvenliği bilgileri reklam kimliğini de bu üç amaçla listeler. Reklam kimliği için beyan edilen analiz amacı Google Mobile Ads SDK'dan gelir; Google Analytics for Firebase reklam kimliğini toplamaz. Reklamlar için kullanılan veriler uygulamadaki reklamlar için gereklidir ve uygulama içinden kapatılamaz.",
        "Tam ekran reklam yalnızca bir maçın sonuç kartından bir sonraki maça geçerken görünebilir. Maç sırasında, uygulama açıldıktan sonraki ilk maçın ardından, her iki tamamlanan maçta birden sık veya bir öncekinden sonraki iki dakika içinde asla gösterilmez ve Google'ın onay formu yanıtını beklerken istenmez. Hazır bir reklam yoksa sonraki maç hemen başlar."
      ],
      "usageFirst": "Uygulama Google Analytics for Firebase'i içerir. Kullanım istatistikleri açıkken uygulama; ilk oyununu başlattığında, bir eli tamamladığında, bir günlük meydan okumayı başlattığında veya tamamladığında, CPU zorluğunu değiştirdiğinde ya da Kayıtlar veya Koleksiyon'u açtığında ve bir reklamın (banner veya tam ekran reklam) istenip istenmediğini, yüklenip yüklenmediğini, gösterilip gösterilmediğini veya kapatılıp kapatılmadığını, varsa hata koduyla birlikte, arayüz dilin ve seçili zorlukla kaydeder. Google Analytics ayrıca bazı bilgileri otomatik olarak toplar; örneğin cihazın ve uygulama hakkındaki bilgiler, IP adresinden tahmin edilen yaklaşık konum ve rastgele bir uygulama örneği kimliği. Bu bilgiler Google'a gönderilir ve oyunun nasıl oynandığını anlamak için kullanılır. Oyun, kullanım istatistikleri açık da olsa kapalı da olsa aynı çalışır.",
      "regionBullets": [
        "Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye'de kullanım istatistikleri sen izin vermedikçe kapalıdır. İlk hamlenden önce, ya da uygulama nerede olduğunu daha sonra öğrenirse eller arasında, uygulama RPS Duel'i geliştirmeye yardım etmek isteyip istemediğini bir kez sorar; “İzin ver” ve “İzin verme” eşit ağırlıktadır.",
        "Diğer yerlerde uygulama, ilk hamlenden önce ya da eller arasında, neyin toplandığını açıklayan tek seferlik bir bildirim gösterir. Kullanım istatistikleri yalnızca bu bildirimden sonra başlar; bildirimde “Kapat”ı seçersen başlamaz.",
        "Uygulama nerede olduğunu anlayamazsa, örneğin çevrimdışıyken veya Google'ın onay hizmeti yanıt vermezse, kullanım istatistikleri kapalı kalır ve uygulama daha sonra yeniden dener.",
        "Nerede olursan ol, kullanım istatistiklerini istediğin zaman Ayarlar → Kullanım istatistikleri'nden açıp kapatabilirsin; verdiğin yanıt korunur."
      ],
      "usageAfter": [
        "Avrupa Ekonomik Alanı, Birleşik Krallık veya İsviçre'de olup olmadığına karar vermek için uygulama, Google'ın onay hizmetinin (reklam gizlilik tercihlerinde kullanılan hizmet) yanıtını kullanır. Türkiye'de olup olmadığına karar vermek için SIM kartının ülkesini, SIM kart yoksa cihazının ya da uygulamanın dilinin veya bölgesinin Türkçe/Türkiye olup olmadığını kullanır. Uygulama bu bilgiyi saklamaz, hiçbir yere göndermez ve her açılışta yeniden kontrol eder. Bu işaretler yanılabilir, örneğin seyahatte veya VPN kullanırken; o durumda uygulamanın algıladığı bölgenin kuralı uygulanır ve tercihini yine Ayarlar'dan değiştirebilirsin.",
        "Uygulamadaki Firebase yazılımı ayrıca rastgele bir Firebase kurulum kimliği oluşturur. Bu kimlik, uygulama örneği kimliğinden ve reklam kimliğinden ayrıdır; Google Analytics bunu kullanım istatistikleriyle birlikte Google'a gönderir.",
        "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır ve reklamla ilgili özellikleri kapalıdır; bu nedenle bu kullanım istatistikleri reklamlar için kullanılmaz. Kullanım istatistikleri tercihin ile reklam gizlilik tercihlerin birbirinden ayrıdır; biri diğerini değiştirmez. Kullanım istatistiklerini kapatırsan uygulama bunları göndermeyi bırakır ve uygulama örneği kimliği dahil cihazında saklanan analiz verilerini siler.",
        "Lunexa, Google Analytics'i etkinlik düzeyindeki verileri 2 ay, kullanıcı düzeyindeki verileri 14 ay tutacak şekilde ayarladı; aynı uygulama örneğinden yeni bir etkinlik geldiğinde kullanıcı düzeyindeki süre yeniden başlar. Bu süreler yalnızca Google Analytics ayarlarıdır: toplu raporlar, Google AdMob reklamları için işlenen veriler, cihazında saklanan veriler veya Firebase yazılımının diğer bileşenleri için geçerli değildir. Google bu ayarları kendi süreçlerine göre uygular; bilgiler bir süre dolar dolmaz kaldırılmayabilir."
      ],
      "earlier": "1.0.6 sürümü kullanım istatistiklerini toplamadan önce herkese soruyordu. 1.0.6'dan 1.1.0'a güncellediğinde orada verdiğin yanıt korunur; yanıt vermediysen “Kullanım istatistikleri (1.1.0 ve sonraki sürümler)” bölümündeki kurallar uygulanır. 1.0.5'ten güncellediğinde, önce 1.0.5'in cihazında sakladığı analiz verileri silinir, ardından aynı kurallar uygulanır.",
      "local": [
        "1.1.0 sürümünden itibaren: tek seferlik kullanım istatistikleri bildiriminin gösterilip gösterilmediği",
        "1.1.0 sürümünden itibaren: seviyen ve deneyim puanların (XP)",
        "1.1.0 sürümünden itibaren: devam eden maç ve seçtiğin maç biçimi (3'te 2 veya 5'te 3)"
      ],
      "clear": "1.1.0 sürümünden itibaren Verileri sıfırla, devam eden maçı da siler. Maç biçimi ayarın, seviyen ve XP'n ve kullanım istatistikleri bildiriminin gösterilip gösterilmediği, yukarıdaki diğer veriler gibi korunur.",
      "changes": "RPS Duel'in ileride bir sürümü, uygulamanın sakladığı veya işlediği verileri değiştirirse bu sayfa güncellenecek ve sayfanın üst kısmındaki tarih değişikliği yansıtacaktır. Önemli değişiklikler ayrıca uygulamanın sürüm notlarında da belirtilir. Politika, reklam ve kullanım istatistikleri ekleyen 1.0.5 sürümü için; kullanım istatistiklerinden önce izin isteyen, reklam gizlilik tercihleri ekleyen ve Koleksiyon ekranında ikinci bir banner gösteren 1.0.6 sürümü için; ve kullanım istatistiklerini Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye dışında tek seferlik bir bildirimden sonra açan, cihazında saklanan maçlar ve seviyeler ekleyen ve maçlar arasında tam ekran bir reklam gösteren 1.1.0 sürümü için güncellenmiştir.",
      "kids": "1.0.6 ve sonraki sürümlerde uygulama yaşını sormaz. Bazı oyuncular genç olabileceği için her reklam isteğinde Google'dan reşit olmayan kullanıcılara yönelik uygulamasını kullanması istenir ve reklamlar G derecelendirmeli içerikle sınırlanır. Kullanım istatistikleri ve reklam gizliliğiyle ilgili tercihleri uygulamada oyuncu yapar.",
      "gaNoAdId": "Google Analytics, reklam kimliğini toplamayacak şekilde ayarlanmıştır",
      "regions": "Avrupa Ekonomik Alanı, Birleşik Krallık, İsviçre ve Türkiye'de yalnızca izin verirsen",
      "canonical": "https://uselunexa.com/tr/privacy/rps-duel"
    },
    {
      "prefix": "/es",
      "titles": [
        "Datos recopilados y compartidos (versión 1.1.0 y posteriores)",
        "Cómo se tratan estos datos (versión 1.1.0 y posteriores)",
        "Tus opciones de privacidad publicitaria (versión 1.1.0 y posteriores)",
        "Estadísticas de uso (versión 1.1.0 y posteriores)",
        "Versiones anteriores y actualización"
      ],
      "usageTitle": "Estadísticas de uso (versión 1.1.0 y posteriores)",
      "summary": "La versión 1.1.0 y las posteriores muestran anuncios: banners en las pantallas Registros y Colección y, entre partidos, un anuncio a pantalla completa. Según la información de seguridad de los datos declarada en Google Play, la aplicación recopila algunos datos de tu dispositivo y los comparte con terceros con fines de publicidad o marketing, de análisis y de prevención del fraude, seguridad y cumplimiento, como se describe a continuación. Que la aplicación envíe estadísticas de uso a Google Analytics for Firebase depende de dónde estés: en el Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, solo si lo permites; en el resto de lugares, tras un aviso único, hasta que las desactives; y nunca si la aplicación no puede saber dónde estás. Consulta “Estadísticas de uso (versión 1.1.0 y posteriores)” y “Versiones anteriores y actualización”.",
      "dataIntro": "La información de seguridad de los datos declarada en Google Play para RPS Duel 1.1.0 incluye los siguientes tipos de datos. Cada uno se recopila y se comparte con terceros, y las finalidades declaradas tanto de la recopilación como del intercambio son publicidad o marketing; análisis; y prevención del fraude, seguridad y cumplimiento:",
      "handled": [
        "Los terceros que reciben estos datos los tratan conforme a sus propias políticas de privacidad. La aplicación usa Google AdMob para los anuncios, la Plataforma de Mensajes para Usuarios de Google para pedir y guardar tus opciones de privacidad publicitaria y, cuando las estadísticas de uso están activadas, Google Analytics for Firebase. RPS Duel no te pide tu nombre, tu correo electrónico ni tu número de teléfono.",
        "La aplicación muestra sus anuncios a través de Google AdMob, mediante el SDK de Google Mobile Ads: banners en las pantallas Registros y Colección, y un anuncio a pantalla completa entre partidos. Ninguno aparece durante un duelo. Cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad y limita los anuncios a contenido con clasificación G. Según la información sobre datos que Google publica para este SDK, el SDK recopila datos de los tipos indicados arriba, incluido el identificador de publicidad de tu dispositivo, y los comparte con Google para estos fines: mostrar anuncios y publicidad o marketing; medir los anuncios y análisis; y prevención del fraude, seguridad y cumplimiento. La información de seguridad de los datos declarada en Google Play también incluye tu identificador de publicidad con estas tres finalidades. La finalidad de análisis declarada para tu identificador de publicidad procede del SDK de Google Mobile Ads; Google Analytics for Firebase no lo recopila. Los datos usados para los anuncios son necesarios para los anuncios de la aplicación y no se pueden desactivar en ella.",
        "El anuncio a pantalla completa solo puede aparecer cuando dejas la tarjeta de resultado de un partido para empezar el siguiente. Nunca se muestra durante un partido, tras el primer partido después de abrir la aplicación, más de una vez cada dos partidos completados ni en los dos minutos siguientes al anterior, y no se solicita mientras el formulario de consentimiento de Google espera tu respuesta. Si no hay ningún anuncio listo, el siguiente partido empieza enseguida."
      ],
      "usageFirst": "La aplicación incluye Google Analytics for Firebase. Cuando las estadísticas de uso están activadas, la aplicación registra cuándo empiezas tu primera partida, completas una ronda, empiezas o completas un desafío diario, cambias la dificultad de la CPU o abres Registros o Colección, y si un anuncio (un banner o el anuncio a pantalla completa) se solicitó, cargó, mostró o cerró, con su código de error si lo hay, junto con el idioma de la interfaz y la dificultad seleccionada. Google Analytics también recopila cierta información automáticamente, como información sobre tu dispositivo y la aplicación, una ubicación aproximada derivada de tu dirección IP y un identificador aleatorio de instancia de la aplicación. Esta información se envía a Google y se usa para entender cómo se juega. El juego funciona igual con las estadísticas de uso activadas o desactivadas.",
      "regionBullets": [
        "En el Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, las estadísticas de uso están desactivadas salvo que las permitas. Antes de tu primer movimiento, o entre rondas si la aplicación sabe más tarde dónde estás, la aplicación te pregunta una vez si quieres ayudar a mejorar RPS Duel; “Permitir” y “No permitir” tienen el mismo peso.",
        "En el resto de lugares, la aplicación muestra un aviso único antes de tu primer movimiento, o entre rondas, que explica qué se recopila. Las estadísticas de uso solo empiezan después de ese aviso, salvo que elijas “Desactivar” en él.",
        "Si la aplicación no puede saber dónde estás, por ejemplo sin conexión o si el servicio de consentimiento de Google no responde, las estadísticas de uso siguen desactivadas y la aplicación lo vuelve a intentar más tarde.",
        "Estés donde estés, puedes activar o desactivar las estadísticas de uso en cualquier momento en Ajustes → Estadísticas de uso, y se conserva la respuesta que hayas dado."
      ],
      "usageAfter": [
        "Para saber si estás en el Espacio Económico Europeo, el Reino Unido o Suiza, la aplicación usa la respuesta del servicio de consentimiento de Google (el mismo de tus opciones de privacidad publicitaria). Para saber si estás en Turquía, usa el país de tu tarjeta SIM o, sin tarjeta SIM, si el idioma o la región de tu dispositivo o de la aplicación es turco o Turquía. La aplicación no guarda esta información ni la envía a ningún sitio, y la vuelve a comprobar cada vez que se inicia. Estas señales pueden fallar, por ejemplo cuando viajas o usas una VPN; entonces se aplica la regla de la región que detecte la aplicación, y en Ajustes puedes seguir cambiando tu elección.",
        "El software Firebase de la aplicación también crea un identificador aleatorio de instalación de Firebase. Es distinto del identificador de instancia de la aplicación y de tu identificador de publicidad, y Google Analytics lo envía a Google junto con las estadísticas de uso.",
        "Google Analytics está configurado para no recopilar tu identificador de publicidad y sus funciones publicitarias están desactivadas, por lo que estas estadísticas de uso no se usan para anuncios. Tu elección sobre las estadísticas de uso y tus opciones de privacidad publicitaria son independientes: ninguna cambia la otra. Si desactivas las estadísticas de uso, la aplicación deja de enviarlas y borra los datos de análisis guardados en tu dispositivo, incluido el identificador de instancia de la aplicación.",
        "Lunexa ha configurado Google Analytics para guardar los datos a nivel de evento durante 2 meses y los datos a nivel de usuario durante 14 meses; el plazo de los datos a nivel de usuario vuelve a empezar cada vez que hay nueva actividad desde la misma instancia de la aplicación. Estos plazos son solo ajustes de Google Analytics: no se aplican a los informes agregados, a los datos tratados para los anuncios de Google AdMob, a los datos guardados en tu dispositivo ni a otras partes del software Firebase. Google aplica estos ajustes según sus propios procesos, y es posible que la información no se elimine en cuanto termine un plazo."
      ],
      "earlier": "La versión 1.0.6 preguntaba a todos antes de recopilar estadísticas de uso. Al actualizar de la 1.0.6 a la 1.1.0, se conserva la respuesta que diste allí; si no respondiste, se aplican las reglas de “Estadísticas de uso (versión 1.1.0 y posteriores)”. Al actualizar desde la 1.0.5, primero se borran los datos de análisis que la 1.0.5 guardó en tu dispositivo y después se aplican las mismas reglas.",
      "local": [
        "Desde la versión 1.1.0: si ya se ha mostrado el aviso único sobre las estadísticas de uso",
        "Desde la versión 1.1.0: tu nivel y tus puntos de experiencia (XP)",
        "Desde la versión 1.1.0: el partido en curso y el formato de partido elegido (al mejor de 3 o al mejor de 5)"
      ],
      "clear": "Desde la versión 1.1.0, Restablecer datos también borra el partido en curso. Tu ajuste de formato de partido, tu nivel y tus XP y si se ha mostrado el aviso sobre las estadísticas de uso se conservan, como los demás elementos de la lista.",
      "changes": "Si una versión futura de RPS Duel cambia los datos que la aplicación almacena o procesa, esta página se actualizará y la fecha en la parte superior reflejará el cambio. Los cambios importantes también se indicarán en las notas de versión de la aplicación. La política se actualizó para la versión 1.0.5, que añadió anuncios y estadísticas de uso; para la versión 1.0.6, que pregunta antes de recopilar estadísticas de uso, añade opciones de privacidad publicitaria y muestra un segundo banner en la pantalla Colección; y para la versión 1.1.0, que activa las estadísticas de uso tras un aviso único fuera del Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, añade partidos y niveles guardados en tu dispositivo y muestra un anuncio a pantalla completa entre partidos.",
      "kids": "En la versión 1.0.6 y posteriores, la aplicación no pregunta tu edad. Como algunos jugadores pueden ser adolescentes, cada solicitud de anuncio pide a Google que aplique su tratamiento para usuarios menores de edad, y los anuncios se limitan a contenido con clasificación G. Las decisiones sobre las estadísticas de uso y la privacidad publicitaria las toma el jugador en la aplicación.",
      "gaNoAdId": "Google Analytics está configurado para no recopilar tu identificador de publicidad",
      "regions": "en el Espacio Económico Europeo, el Reino Unido, Suiza y Turquía, solo si lo permites",
      "canonical": "https://uselunexa.com/es/privacy/rps-duel"
    }
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/rps-duel adds the 1.1.0 region rule, full-screen ad and local match data`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/rps-duel`);
      const main = page.locator("main");
      for (const title of l.titles) {
        await expect(main.getByRole("heading", { name: title, exact: true })).toHaveCount(1);
      }
      for (const t of [l.summary, l.dataIntro, ...l.handled, l.earlier, ...l.local, l.clear, l.changes, l.kids]) {
        await expect(main).toContainText(t);
      }
      // Usage statistics: the opening paragraph, the region bullets, then the
      // region signals, identifiers, ad separation and GA4 retention.
      const usage = main.locator("section").filter({ has: page.getByRole("heading", { name: l.usageTitle, exact: true }) });
      const paras = usage.locator("p");
      await expect(paras).toHaveCount(1 + l.usageAfter.length);
      await expect(paras.nth(0)).toHaveText(l.usageFirst);
      for (const [i, t] of l.usageAfter.entries()) {
        await expect(paras.nth(i + 1)).toHaveText(t);
      }
      const bullets = usage.getByRole("listitem");
      await expect(bullets).toHaveCount(l.regionBullets.length);
      for (const [i, t] of l.regionBullets.entries()) {
        await expect(bullets.nth(i)).toHaveText(t);
      }
      await expect(usage).toContainText(l.gaNoAdId);
      await expect(main).toContainText(l.regions);
      const text = (await main.textContent()) ?? "";
      // No availability claim, no 1.0.7 and no version after 1.1.0.
      expect(text).not.toMatch(/1\.1\.0 (is|está) (now )?(available|disponible)|now available|available now|update now|ya disponible|disponible ahora|actualiza ahora|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|bulunan 1\.1|1\.0\.7|\b1\.(1\.[1-9]|[2-9]\.\d)/i);
      expect(text).not.toMatch(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|international transfer|uluslararası aktarım|transferencia internacional|data controller|veri sorumlusu|responsable del tratamiento/i);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", l.canonical);
      for (const lang of ["en", "tr", "es", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1);
      }
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
      meta: "Privacy policy for Chess Rescue by Lunexa Games: Google AdMob ads, including full-screen and optional rewarded ads, optional usage statistics, and what the app stores on your device.",
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
      meta: "Chess Rescue gizlilik politikası (Lunexa Games): tam ekran ve isteğe bağlı ödüllü reklamlar dahil Google AdMob reklamları, isteğe bağlı kullanım istatistikleri ve cihazında saklananlar.",
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
      meta: "Política de privacidad de Chess Rescue (Lunexa Games): anuncios de Google AdMob, incluidos los de pantalla completa y los recompensados opcionales, estadísticas de uso opcionales y qué guarda en tu dispositivo.",
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
      // 1.4.0 and 1.5.0 are described by version only, never as available or
      // released; no version after 1.5.0 is mentioned.
      await expect(main).not.toContainText(/now available|available now|update now|artık (mevcut|kullanılabilir)|şimdi (mevcut|kullanılabilir)|ya disponible|disponible ahora|actualiza ahora|\b1\.(5\.[1-9]|[6-9]\.\d)/i);
      await expect(main).not.toContainText(/app's settings|own setting|uygulamanın ayarlarından|kendi ayarı|ajustes de la aplicación|propio ajuste|AAID/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", l.meta);
    });
  }
});

// Chess Rescue 1.5.0 (mobile docs/release/1.5.0-web-policy-text.md): one
// summary paragraph labelled "from version 1.5.0" adds the full-screen ad and
// the optional rewarded help, requested like the banners, and one local-data
// item. The 1.3.0 and 1.4.0 text stays as it is.
test.describe("Chess Rescue privacy policy — 1.5.0", () => {
  const locales = [
    {
      prefix: "",
      summaryTitle: "Summary",
      v15: "From version 1.5.0, the app may also show a full-screen ad when you move on to the next puzzle or leave a finished episode: never during a puzzle, never in your first session, and at most once every few puzzles. After several missed attempts on the same puzzle, it may also offer an optional video ad that you choose to watch in return for help with that puzzle; you can always try again for free instead. These ads are requested in the same way as the others: not personalised, rated for all ages and with Google's protections for teenage users, and Google receives the same information described below. The app stores on your device when it last showed a full-screen ad, so that they stay spaced out.",
      before: "Version 1.3.0 shows small ads from Google AdMob:",
      localTitle: "Data stored locally on your device",
      local: "When a full-screen ad was last shown (version 1.5.0 and later)",
      v14local: "In version 1.4.0, also: whether the app has completed an ad consent check after a solved puzzle",
      historical: ["Advertising (versions 1.3.0 and 1.4.0)", "Your privacy choices for ads (versions 1.3.0 and 1.4.0)", "Usage statistics and Google Firebase (versions 1.3.0 and 1.4.0)"],
      date: "Last updated: 2026-11-03",
      canonical: "https://uselunexa.com/privacy/chess-rescue",
    },
    {
      prefix: "/tr",
      summaryTitle: "Özet",
      v15: "1.5.0 sürümünden itibaren uygulama, bir sonraki bulmacaya geçerken veya biten bir bölümden çıkarken tam ekran bir reklam da gösterebilir: bulmaca sırasında asla, ilk oturumunda asla ve en fazla birkaç bulmacada bir. Aynı bulmacada birkaç başarısız denemeden sonra, o bulmacada yardım karşılığında izlemeyi seçebileceğin isteğe bağlı bir video reklam da önerebilir; bunun yerine her zaman ücretsiz olarak yeniden deneyebilirsin. Bu reklamlar diğerleriyle aynı şekilde istenir: kişiselleştirilmemiş, her yaşa uygun olarak derecelendirilmiş ve Google'ın gençlere yönelik korumalarıyla; Google aşağıda açıklanan bilgilerin aynısını alır. Uygulama, tam ekran reklamlar arasında boşluk bırakmak için son tam ekran reklamı ne zaman gösterdiğini cihazında saklar.",
      before: "1.3.0 sürümü Google AdMob'dan küçük reklamlar gösterir:",
      localTitle: "Cihazında yerel olarak saklanan veriler",
      local: "Son tam ekran reklamın ne zaman gösterildiği (1.5.0 ve sonrası)",
      v14local: "1.4.0 sürümünde ayrıca: çözülmüş bir bulmacadan sonra reklam izni kontrolünün tamamlanıp tamamlanmadığı",
      historical: ["Reklamlar (1.3.0 ve 1.4.0 sürümleri)", "Reklamlar için gizlilik seçeneklerin (1.3.0 ve 1.4.0 sürümleri)", "Kullanım istatistikleri ve Google Firebase (1.3.0 ve 1.4.0 sürümleri)"],
      date: "Son güncelleme: 03.11.2026",
      canonical: "https://uselunexa.com/tr/privacy/chess-rescue",
    },
    {
      prefix: "/es",
      summaryTitle: "Resumen",
      v15: "Desde la versión 1.5.0, la aplicación también puede mostrar un anuncio a pantalla completa al pasar al siguiente rompecabezas o al salir de un episodio terminado: nunca durante un rompecabezas, nunca en tu primera sesión y como mucho una vez cada varios rompecabezas. Tras varios intentos fallidos en el mismo rompecabezas, también puede ofrecerte un anuncio en vídeo opcional que eliges ver a cambio de ayuda con ese rompecabezas; en su lugar, siempre puedes volver a intentarlo gratis. Estos anuncios se solicitan igual que los demás: no personalizados, aptos para todas las edades y con las protecciones de Google para usuarios adolescentes, y Google recibe la misma información descrita a continuación. La aplicación guarda en tu dispositivo cuándo mostró el último anuncio a pantalla completa, para espaciarlos.",
      before: "La versión 1.3.0 muestra pequeños anuncios de Google AdMob:",
      localTitle: "Datos almacenados localmente en tu dispositivo",
      local: "Cuándo se mostró el último anuncio a pantalla completa (versión 1.5.0 y posteriores)",
      v14local: "En la versión 1.4.0, además: si la aplicación ya ha completado una comprobación del consentimiento para los anuncios después de un rompecabezas resuelto",
      historical: ["Publicidad (versiones 1.3.0 y 1.4.0)", "Tus opciones de privacidad para los anuncios (versiones 1.3.0 y 1.4.0)", "Estadísticas de uso y Google Firebase (versiones 1.3.0 y 1.4.0)"],
      date: "Última actualización: 2026-11-03",
      canonical: "https://uselunexa.com/es/privacy/chess-rescue",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/chess-rescue adds the 1.5.0 full-screen and rewarded ads`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/chess-rescue`);
      const main = page.locator("main");
      await expect(main).toContainText(l.date);
      // The 1.5.0 paragraph sits in the summary, right after the 1.3.0 ads paragraph.
      const summary = main.locator("section").filter({ has: page.getByRole("heading", { name: l.summaryTitle, exact: true }) });
      const paras = summary.locator("p");
      await expect(paras).toHaveCount(4);
      await expect(paras.nth(2)).toContainText(l.before);
      await expect(paras.nth(3)).toHaveText(l.v15);
      await expect(main.getByText(l.v15, { exact: true })).toHaveCount(1);
      // Earlier-version sections keep their 1.3.0/1.4.0 labels.
      for (const title of l.historical) {
        await expect(main.getByRole("heading", { name: title, exact: true })).toHaveCount(1);
      }
      const local = main.locator("section").filter({ has: page.getByRole("heading", { name: l.localTitle, exact: true }) });
      await expect(local.getByRole("listitem").filter({ hasText: l.v14local })).toHaveCount(1);
      await expect(local.getByRole("listitem").filter({ hasText: l.local })).toHaveCount(1);
      // The rewarded ad is optional and help is never paywalled.
      await expect(main).not.toContainText(/must watch|required to watch|izlemek zorunda|debes ver|obligatori[oa] ver/i);
      // No availability claim and no version after 1.5.0.
      await expect(main).not.toContainText(/1\.5\.0 (is|está) (now )?(available|disponible)|1\.5\.0 (sürümü )?(artık )?(mevcut|yayında)|on Google Play since|Google Play'de bulunan 1\.5|disponible en Google Play desde|\b1\.(5\.[1-9]|[6-9]\.\d)/i);
      await expect(main).not.toContainText(/legal bas[ie]s|hukuki (sebep|dayanak)|base jurídica|international transfer|uluslararası aktarım|transferencia internacional|data controller|veri sorumlusu|responsable del tratamiento/i);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", l.canonical);
      for (const lang of ["en", "tr", "es", "x-default"]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${lang}"]`)).toHaveCount(1);
      }
    });
  }
});
