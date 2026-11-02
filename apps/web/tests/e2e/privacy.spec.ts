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
      kept: "— your language, difficulty and sound settings, lifetime totals, daily challenge progress, achievement flags and collected moments —",
      meta: "Privacy policy for RPS Duel by Lunexa Games. Version 1.0.5 shows ads: the data declared for it on Google Play, and what the app stores on your device.",
    },
    {
      prefix: "/tr",
      date: "Son güncelleme: 03.11.2026",
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
      kept: "— dil, zorluk ve ses ayarların, toplam istatistiklerin, günlük meydan okuma ilerlemen, başarım bayrakların ve toplanan anların —",
      meta: "Lunexa Games'in RPS Duel oyunu için gizlilik politikası. 1.0.5 sürümü reklam gösterir: Google Play'de beyan edilen veriler ve cihazında saklananlar.",
    },
    {
      prefix: "/es",
      date: "Última actualización: 2026-11-03",
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
      kept: "—tus ajustes de idioma, dificultad y sonido, los totales acumulados, el progreso del desafío diario, los indicadores de logros y los momentos coleccionados—",
      meta: "Política de privacidad de RPS Duel (Lunexa Games). La versión 1.0.5 muestra anuncios: los datos declarados en Google Play y qué guarda en tu dispositivo.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/rps-duel discloses the 1.0.5 ads data declaration`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/rps-duel`);
      const main = page.locator("main");
      await expect(main).toContainText(l.date);
      await expect(main).toContainText(l.ads);
      for (const type of l.types) {
        await expect(main.getByRole("listitem").filter({ hasText: type })).toHaveCount(1);
      }
      await expect(main).toContainText(l.purpose);
      // Advertising must never read as the only declared purpose.
      await expect(main).not.toContainText(/lists only advertising|amacı reklam veya pazarlamadır|yalnızca reklam veya pazarlamayı|finalidad declarada .* es publicidad|solo indica publicidad|for advertising or marketing purposes|fines publicitarios o de marketing|reklam veya pazarlama amacıyla/);
      await expect(main).toContainText(l.handling);
      await expect(main).toContainText(l.earlier);
      await expect(main).not.toContainText(l.retired);
      for (const s of [l.analytics, l.separate, l.vendors, ...l.local, l.kept, l.summary, l.gma, l.fis, l.retention]) {
        await expect(main).toContainText(s);
      }
      // No personalisation, consent, retention or deletion-request claims.
      await expect(main).not.toContainText(/personali[sz]|kişiselleştir|personaliz|consent|onay mesaj|consentimiento|retain|retention|saklama süresi|conserva(mos|ción)/i);
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

// Chess Rescue: versions up to 1.2.1 are offline and ad-free; 1.3.0 adds
// AdMob, UMP and Firebase Analytics that is off until the player answers
// the Home usage-statistics question. There is no settings screen, ad
// consent and usage statistics stay independent, and the advertising ID is
// not claimed absent. The GA4 retention setting is stated for GA4 data only;
// deletion routes, "we do not sell" and deletion-on-withdrawal must not be
// claimed.
test.describe("Chess Rescue privacy policy — 1.2.1 and 1.3.0", () => {
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
      meta: "Política de privacidad de Chess Rescue (Lunexa Games): la 1.3.0 añade anuncios de Google AdMob y analítica opcional; las anteriores, sin conexión ni anuncios.",
    },
  ];

  for (const l of locales) {
    test(`${l.prefix || "/"}privacy/chess-rescue describes both versions`, async ({ page }) => {
      await page.goto(`${l.prefix}/privacy/chess-rescue`);
      const main = page.locator("main");
      for (const s of [l.earlier, l.ads, l.adRequest, l.adId, l.question, l.eligible, l.homeLine, l.scope, l.withdrawal, l.retention, l.independent]) {
        await expect(main).toContainText(s);
      }
      await expect(main).not.toContainText(/we do not sell|satmayız|no vendemos|Crashlytics|deletes? (the )?data|verileri siler|elimina los datos/i);
      await expect(main).not.toContainText(/AdMob (data|data is) (kept|retained)|Firebase data is kept|todos los datos se guardan|tüm veriler .* tutulur/i);
      await expect(main).not.toContainText(/does not contact a server|herhangi bir sunucuyla iletişim kurmaz|no se comunica con ningún servidor/);
      await expect(main).not.toContainText(/app's settings|own setting|uygulamanın ayarlarından|kendi ayarı|ajustes de la aplicación|propio ajuste|AAID/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", l.meta);
    });
  }
});
