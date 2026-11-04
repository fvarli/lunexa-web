import { test, expect, type Page } from "@playwright/test";

// D-WEB-TR-SEN: Turkish public copy addresses the reader with the informal
// singular "sen". This test renders every Turkish URL in the sitemap and scans
// visible body copy, form/ARIA attributes, the meta, Open Graph and Twitter
// descriptions and JSON-LD text for formal/plural "siz" address.

const SITE = "https://uselunexa.com";

// Formal/plural second-person forms. Word-level and Unicode-aware; each one
// targets a morphological form of "siz" address, not a bare letter sequence.
const L = "\\p{L}";
const END = `(?!${L})`;
const FORMAL: { name: string; re: RegExp }[] = [
  // siz, size, sizi, sizin, sizinle, sizden, sizde, sizce, sizler…
  { name: "pronoun", re: new RegExp(`(?<!${L})siz(?:e|i|in|inle|den|de|ce|ler${L}*)?${END}`, "giu") },
  // -siniz/-sınız/-sunuz/-sünüz: kullanabilirsiniz, olursunuz, sahipsiniz, mısınız
  { name: "verb -sınız", re: new RegExp(`${L}+s[ıiuü]n[ıiuü]z${END}`, "giu") },
  // -seniz/-sanız: isterseniz, etmiyorsanız
  { name: "conditional -sanız", re: new RegExp(`${L}+s[ae]n[ıi]z${END}`, "giu") },
  // possessive / past -nız family: cihazınız(da), verilerinizi, çıktınız, ediniz
  {
    name: "possessive -nız",
    re: new RegExp(
      `${L}{2,}n[ıiuü]z(?:[ıiuü]n|[ıiuü]|[ae]|d[ae]n|t[ae]n|d[ae]|t[ae]|l[ae]|d[ıiuü]r|ki)?${END}`,
      "giu",
    ),
  },
  // negative imperative -mayın/-meyin: kaçırmayın, kullanmayın
  { name: "imperative -mayın", re: new RegExp(`${L}+m[ae]y[ıi]n${END}`, "giu") },
  // formal imperatives (sen form in brackets). "edin" alone is the sen
  // imperative of "edinmek" ("Google Play'den edin"), so only "<noun> edin" counts.
  {
    name: "imperative",
    re: new RegExp(
      `(?<!${L})(?:bakın|deneyin|düzeltin|girin|geçin|indirin|izleyin|kaydedin|keşfedin|okuyun|olun|seçin|tamamlayın|ulaşın|yazın|başlayın|öğrenin|bahsedin|çerçeveleyin|açın|durun|edinin|isteyin|gönderin|tıklayın|ekleyin|(?:kontrol|kabul|teslim|inşa|tercih|talep|devam|iletişime geç) edin)${END}`,
      "giu",
    ),
  },
];

// Lexical words that match a pattern above but are not second-person address.
const NOT_ADDRESS = new Set(["henüz", "deniz", "yalnız"]);

// Documented, exact-match exceptions (D-WEB-TR-SEN). Each must still be
// present on its routes, so a stale entry fails instead of hiding a violation.
const EXCEPTIONS: { phrase: string; routes: string[]; reason: string }[] = [
  {
    phrase: "Ne tür ürünler geliştiriyorsunuz?",
    routes: ["/tr"],
    reason: "Home FAQ question in the visitor's voice, addressing the Lunexa team (plural \"biz\"), not the reader.",
  },
  {
    phrase: "Çalışma modeliniz nedir?",
    routes: ["/tr"],
    reason: "Home FAQ question in the visitor's voice, addressing the Lunexa team (plural \"biz\"), not the reader.",
  },
  {
    phrase: "Hangi teknoloji yığınını kullanıyorsunuz?",
    routes: ["/tr"],
    reason: "Home FAQ question in the visitor's voice, addressing the Lunexa team (plural \"biz\"), not the reader.",
  },
  {
    phrase: "Mevcut kod tabanlarını destekliyor musunuz?",
    routes: ["/tr"],
    reason: "Home FAQ question in the visitor's voice, addressing the Lunexa team (plural \"biz\"), not the reader.",
  },
];

const QUIETLY_TR =
  "Kaydetme işleminden sonra bir reklam; kullanım istatistikleri bulunduğun bölgeye ve gizlilik tercihlerine bağlıdır.";

type Source = { field: string; text: string };

async function collect(page: Page): Promise<Source[]> {
  return page.evaluate(() => {
    const out: { field: string; text: string }[] = [];
    out.push({ field: "body", text: document.body.innerText });
    const attrs = ["placeholder", "aria-label", "title", "alt"];
    for (const el of Array.from(document.body.querySelectorAll("*"))) {
      for (const a of attrs) {
        const v = el.getAttribute(a);
        if (v) out.push({ field: `@${a}`, text: v });
      }
    }
    const meta = (sel: string) => document.head.querySelector(sel)?.getAttribute("content") ?? "";
    out.push({ field: "title", text: document.title });
    out.push({ field: "meta description", text: meta('meta[name="description"]') });
    out.push({ field: "og:description", text: meta('meta[property="og:description"]') });
    out.push({ field: "og:title", text: meta('meta[property="og:title"]') });
    out.push({ field: "twitter:description", text: meta('meta[name="twitter:description"]') });
    const walk = (v: unknown, path: string) => {
      if (typeof v === "string") out.push({ field: `jsonld ${path}`, text: v });
      else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`));
      else if (v && typeof v === "object")
        for (const [k, x] of Object.entries(v)) if (!/^@|url$|image|logo|sameAs/i.test(k)) walk(x, `${path}.${k}`);
    };
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s, i) => {
      try {
        walk(JSON.parse(s.textContent ?? ""), `#${i}`);
      } catch {
        out.push({ field: `jsonld #${i} (unparseable)`, text: "" });
      }
    });
    return out;
  });
}

function findViolations(route: string, sources: Source[], used: Set<string>): string[] {
  const found: string[] = [];
  for (const { field, text } of sources) {
    let t = text;
    for (const ex of EXCEPTIONS) {
      if (!ex.routes.includes(route) || !t.includes(ex.phrase)) continue;
      used.add(`${route}|${ex.phrase}`);
      t = t.split(ex.phrase).join(" ".repeat(ex.phrase.length));
    }
    for (const { name, re } of FORMAL) {
      for (const m of t.matchAll(re)) {
        if (NOT_ADDRESS.has(m[0].toLocaleLowerCase("tr"))) continue;
        const i = m.index ?? 0;
        const ctx = t.slice(Math.max(0, i - 50), i + m[0].length + 50).replace(/\s+/g, " ");
        found.push(`${route} [${field}] ${name}: "${m[0]}" … ${ctx} …`);
      }
    }
  }
  return found;
}

test.describe("Turkish sen-address consistency (D-WEB-TR-SEN)", () => {
  test("the detector flags formal forms and ignores sen forms", () => {
    const flagged = (s: string) => findViolations("/x", [{ field: "t", text: s }], new Set()).length;
    for (const s of [
      "cihazınızda",
      "kullanabilirsiniz",
      "isterseniz",
      "bulunduğunuz bölge",
      "Size ulaşacağız",
      "lütfen kontrol edin",
      "kaçırmayın",
      "Abonelikten çıktınız",
      "Gelen kutunuza bakın",
    ])
      expect(flagged(s), s).toBeGreaterThan(0);
    for (const s of [
      "cihazında",
      "kullanabilirsin",
      "istersen",
      "bulunduğun bölge",
      "Google Play'den edin",
      "henüz yayında değil",
      "Yalnızca senin isteğinle",
      "senkronizasyon",
      QUIETLY_TR,
    ])
      expect(flagged(s), s).toBe(0);
  });

  test("every Turkish sitemap page uses sen address", async ({ page, request }) => {
    test.setTimeout(180_000);
    const xml = await (await request.get("/sitemap.xml")).text();
    const routes = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1].replace(SITE, ""))
      .filter((p) => p === "/tr" || p.startsWith("/tr/"));
    expect(routes.length).toBeGreaterThanOrEqual(24);

    const used = new Set<string>();
    const violations: string[] = [];
    for (const route of routes) {
      const res = await page.goto(route);
      expect(res?.status(), route).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", /^tr/);
      violations.push(...findViolations(route, await collect(page), used));
    }
    expect(violations, violations.join("\n")).toEqual([]);

    const stale = EXCEPTIONS.flatMap((ex) => ex.routes.filter((r) => !used.has(`${r}|${ex.phrase}`)).map((r) => `${r}: ${ex.phrase}`));
    expect(stale, `stale exceptions:\n${stale.join("\n")}`).toEqual([]);
  });

  test("the Quietly product statement uses the approved sen wording", async ({ page }) => {
    for (const route of ["/tr", "/tr/work"]) {
      await page.goto(route);
      await expect(page.locator("main")).toContainText(QUIETLY_TR);
    }
    await page.goto("/tr/privacy/quietly");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", new RegExp(QUIETLY_TR.replace(/[.;]/g, "\\$&")));
  });
});
