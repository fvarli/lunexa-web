---
title: "TechChefDelights yayına hazırlanıyor — stüdyodan çıkan ilk ürün"
description: "Cook Mode, full-text arama ve gelecekteki Flutter uygulamasına hazır JSON API ile 3 dilli, test edilmiş bir tarif sitesini nasıl inşa ettik — ve Lunexa stack'i üretim trafiği altında nasıl görünüyor."
date: 2026-04-25
author: Lunexa
tags: [launch, product, craft]
---

İlk halka açık Lunexa ürünü pre-launch hardening aşamasında. Adı **TechChefDelights** — 3 dilli (EN/TR/ES) bir tarif sitesi: tam Cook Mode, locale başına full-text arama ve gelecekte bir Flutter uygulamasına hizmet edecek JSON API. Bu yazı bu ürünün neden var olduğunu, nasıl inşa edildiğini ve süreçte neyi öğrendiğimizi anlatıyor.

## Neden bir tarif sitesi

Stüdyonun hizmet sayfaları üç disiplinden bahsediyor: mobil uygulamalar, web platformları ve akıllı sistemler. Bu sözleri kanıtlamanın en hızlı yolu, gerçek kullanıcılarla, üretimde, üçünü aynı anda çalıştıran bir ürün göndermek.

Tarif sitesi kulağa basit geliyor. Ciddiye alınınca değil:

- **Yerelleştirilmiş URL'lerle üç dil** (`/recipes` ↔ `/tarifler` ↔ `/recetas`), locale başına slug ve locale'a özgü stemmer'larla Postgres full-text arama.
- Sayfa navigasyonu, sekme değişikliği ve localStorage'da saklanan **resume point'leri atlatabilen zamanlayıcılarla Cook Mode**.
- **Bir içerik grafiği** — tarifler, malzemeler, ekipmanlar, diyetler, kategoriler. Her malzeme ve ekipman parçası kanonik bir varlık; kendi çeviri tablosu, görsel alanları ve gelecekteki sayfa yüzü ile.
- **`/api/v1/*` altında halka açık API** — locale-agnostic, küçük harf enum'lu, ilk günden Flutter mobil client'ın tüketmesi için biçimlenmiş.
- **Üretim seviyesinde gözlemlenebilirlik**: request-id correlation'lı yapılandırılmış JSON loglar, env-gated Sentry, swap-edilebilir rate-limit backend'i, DB ping + uptime + memory + version'lı health endpoint.

Bu, özel yazılım geliştirme angajmanının gerçekten gerektirdiği derinlik. Onu kendimiz için inşa etmek, müşteriye önermeden önce stack'teki her trade-off'u bilmemizi sağlıyor.

## Kapotun altında ne var

Tam dökümü [techchefdelights repo'sunun](https://github.com/fvarli/techchefdelights) `docs/STACK.md` ve `docs/PATTERNS.md` dosyalarında, ama başlıklar:

- **Next.js 16** — App Router, Server Components, tarif sayfaları için ISR (`revalidate: 3600`)
- **PostgreSQL 16 + Prisma 7** — 50 model, 7 enum, locale-variant her varlık için çeviri tabloları, `tsvector` + GIN üzerinden FTS
- **next-intl 4** — routing, ICU pluralization ve çeviri yükleme
- **CSS Modules + tokens.css** — burada Tailwind yok; site özel tipografi kontrolüne ihtiyaç duyuyor
- **Görseller için Cloudinary** — DB sadece `public_id`'yi saklar, tam URL'yi asla; gelecekteki provider swap'ı bir URL-builder değişikliği, schema migration'ı değil
- **Ubuntu VPS üzerinde self-hosted** — systemd unit, nginx reverse proxy, BetterStack uptime, rollback runbook'larıyla manuel deploy

Ürün, varsayılan Lunexa stack'inden üç yerde sapıyor — ve her sapma `DIVERGENCES.md`'de yazılı bir gerekçeye sahip. Tipografik kontrol için Tailwind yerine CSS Modules. TechChef ICU plurals ve locale başına URL segmentleri istediğinden custom `dictionaries.ts` yerine next-intl. `NoNewPrivileges` ve `ProtectSystem=strict` gibi hardening primitive'leri istediğimiz için pm2 yerine systemd.

Bu sapma deseni artık Lunexa ürünlerinin nasıl scope'landığının parçası. Stüdyo bir `STACK.md` baseline'ı yayınlar; ürünler bunu miras alır; sapmalar yazılı gerekçe alır. Stüdyo-yapımı ürünlerin yıllar boyunca tutarlı kalmasının sebeplerinden biri bu.

## Sırada ne var

TechChefDelights staging-ready, henüz canlıda değil. Halka açık lansmandan önce:

1. **Görsel üretimi** — 7 tarif hâlâ placeholder'da; AI generation + Cloudinary upload + manifest doğrulaması
2. **Lighthouse + Rich Results** staging URL üzerinde doğrulanacak
3. **Cross-browser smoke** Chrome/Safari/Firefox/Edge/Android Chrome
4. **Production sign-off kapısı** — 24 saat staging soak, paydaş onayı, rollback planı dokümante

Halka açık site canlıya çıkıp ilk 100 organic search impression'ı geldiğinde devam yazısı yazacağız.

Aklında benzer bir build varsa — çok dilli ürün yüzü, bir mobil client'a yönelik JSON API, gerçek üretim gözlemlenebilirliği — stüdyonun yaptığı tam olarak bu. Uyuyorsa [iletişime geç](/tr/contact).

---

*Süreçte gör: [techchefdelights.com](https://techchefdelights.com) (lansman sonrası). Tam iş showcase'i için: [/tr/work](/tr/work).*
