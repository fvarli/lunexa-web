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
// Console data safety declaration only; SDK names, analytics, personalisation
// and consent behaviour are unverified for the released build and must not be
// claimed either way.
test.describe("RPS Duel privacy policy — 1.0.5", () => {
  const locales = [
    {
      prefix: "",
      date: "Last updated: 2026-10-28",
      ads: "Version 1.0.5, available on Google Play since October 25, 2026, shows ads.",
      types: ["Approximate location", "App interactions", "Diagnostics", "Device or other IDs"],
      purpose: "the declared purpose of both the collection and the sharing is advertising or marketing",
      handling: "marks the collection of this data as required rather than optional, and states that the data is encrypted in transit.",
      earlier: "Versions before 1.0.5 did not show ads and did not collect or share this data.",
      retired: /does not show ads|does not contact a server|does not collect, transmit, or share|collects no personal information|This data never leaves your device/,
      meta: "Privacy policy for RPS Duel by Lunexa Games. Version 1.0.5 shows ads: the data declared for it on Google Play, and what the app stores on your device.",
    },
    {
      prefix: "/tr",
      date: "Son güncelleme: 28.10.2026",
      ads: "25 Ekim 2026'dan beri Google Play'de bulunan 1.0.5 sürümü reklam gösterir.",
      types: ["Yaklaşık konum", "Uygulama etkileşimleri", "Teşhis verileri", "Cihaz veya diğer kimlikler"],
      purpose: "hem toplamanın hem de paylaşmanın beyan edilen amacı reklam veya pazarlamadır",
      handling: "bu verilerin toplanmasını isteğe bağlı değil zorunlu olarak işaretler ve verilerin aktarım sırasında şifrelendiğini belirtir.",
      earlier: "1.0.5'ten önceki sürümler reklam göstermiyor, bu verileri toplamıyor ve paylaşmıyordu.",
      retired: /reklam göstermez|sunucuyla iletişim kurmaz|hiçbir kişisel bilgiyi toplamaz|hiç kişisel bilgi toplamadığı|cihazından asla çıkmaz/,
      meta: "Lunexa Games'in RPS Duel oyunu için gizlilik politikası. 1.0.5 sürümü reklam gösterir: Google Play'de beyan edilen veriler ve cihazında saklananlar.",
    },
    {
      prefix: "/es",
      date: "Última actualización: 2026-10-28",
      ads: "La versión 1.0.5, disponible en Google Play desde el 25 de octubre de 2026, muestra anuncios.",
      types: ["Ubicación aproximada", "Interacciones con la aplicación", "Diagnóstico", "Dispositivo u otros identificadores"],
      purpose: "la finalidad declarada tanto de la recopilación como del uso compartido es publicidad o marketing",
      handling: "indica que la recopilación de estos datos es obligatoria, no opcional, y que los datos se cifran en tránsito.",
      earlier: "Las versiones anteriores a la 1.0.5 no mostraban anuncios y no recopilaban ni compartían estos datos.",
      retired: /no muestra anuncios|no se comunica con ningún servidor|no recopila, transmite ni comparte|no recopila ningún dato personal|nunca salen de tu dispositivo/,
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
      await expect(main).toContainText(l.handling);
      await expect(main).toContainText(l.earlier);
      await expect(main).not.toContainText(l.retired);
      // Unverified for the released build: no SDK, analytics, personalisation,
      // consent, retention or deletion-request claims.
      await expect(main).not.toContainText(/AdMob|Firebase|Google Analytics|personali[sz]|kişiselleştir|personaliz|consent|onay mesaj|consentimiento|retain|retention|saklama süresi|conserva(mos|ción)/i);
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
