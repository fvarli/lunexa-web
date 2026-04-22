/**
 * Localized email strings.
 * Keep HTML structure in one place (app.ts) and inject translated strings from here.
 * Admin-facing notifications stay English — we are the admin.
 */

export type EmailLocale = "en" | "tr" | "es";

export function resolveEmailLocale(value: unknown): EmailLocale {
  if (value === "tr" || value === "es") return value;
  return "en";
}

type AutoReplyStrings = {
  subject: string;
  body: (name: string) => string;
};

type NewsletterConfirmStrings = {
  subject: string;
  htmlTitle: string;
  heading: string;
  description: (safeEmail: string) => string;
  confirmButton: string;
  orPasteLabel: string;
  ignore: string;
  unsubscribePrefix: string;
  unsubscribeLink: string;
  textIntro: string;
  textInstruction: string;
  textIgnore: string;
  textUnsubscribe: string;
};

const strings: Record<
  EmailLocale,
  {
    autoreply: AutoReplyStrings;
    newsletter: NewsletterConfirmStrings;
  }
> = {
  en: {
    autoreply: {
      subject: "Thank you for contacting Lunexa",
      body: (name) =>
        [
          `Hi ${name},`,
          "",
          "Thank you for reaching out. We have received your message and will get back to you within one business day.",
          "",
          "Best regards,",
          "Lunexa",
          "https://uselunexa.com",
        ].join("\n"),
    },
    newsletter: {
      subject: "Confirm your Lunexa newsletter subscription",
      htmlTitle: "Confirm your newsletter subscription",
      heading: "Confirm your subscription",
      description: (safeEmail) =>
        `You asked to subscribe to the Lunexa newsletter as <strong style="color:#18181b;">${safeEmail}</strong>. Please confirm within 15 minutes:`,
      confirmButton: "Confirm subscription",
      orPasteLabel: "Or paste this link into your browser:",
      ignore: "If you didn't request this, you can safely ignore this email.",
      unsubscribePrefix: "Don't want these emails?",
      unsubscribeLink: "Unsubscribe",
      textIntro: "Hi,",
      textInstruction:
        "Please confirm your Lunexa newsletter subscription by opening the link below within 15 minutes:",
      textIgnore: "If you did not request this, you can safely ignore this email.",
      textUnsubscribe: "Don't want these emails? Unsubscribe:",
    },
  },
  tr: {
    autoreply: {
      subject: "Lunexa ile iletişime geçtiğiniz için teşekkürler",
      body: (name) =>
        [
          `Merhaba ${name},`,
          "",
          "Bize ulaştığınız için teşekkürler. Mesajınızı aldık ve bir iş günü içinde size geri döneceğiz.",
          "",
          "Saygılarımızla,",
          "Lunexa",
          "https://uselunexa.com",
        ].join("\n"),
    },
    newsletter: {
      subject: "Lunexa bülten aboneliğinizi onaylayın",
      htmlTitle: "Bülten aboneliğinizi onaylayın",
      heading: "Aboneliğinizi onaylayın",
      description: (safeEmail) =>
        `Lunexa bültenine <strong style="color:#18181b;">${safeEmail}</strong> adresiyle abone olmak istediniz. 15 dakika içinde onaylayın:`,
      confirmButton: "Aboneliği onayla",
      orPasteLabel: "Veya bu bağlantıyı tarayıcınıza yapıştırın:",
      ignore: "Eğer bu işlemi siz yapmadıysanız bu e-postayı yok sayabilirsiniz.",
      unsubscribePrefix: "Bu e-postaları istemiyor musunuz?",
      unsubscribeLink: "Abonelikten çık",
      textIntro: "Merhaba,",
      textInstruction:
        "Lunexa bülten aboneliğinizi aşağıdaki bağlantıyı 15 dakika içinde açarak onaylayın:",
      textIgnore: "Eğer bu işlemi siz yapmadıysanız bu e-postayı yok sayabilirsiniz.",
      textUnsubscribe: "Bu e-postaları istemiyor musunuz? Abonelikten çıkın:",
    },
  },
  es: {
    autoreply: {
      subject: "Gracias por contactar a Lunexa",
      body: (name) =>
        [
          `Hola ${name},`,
          "",
          "Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos en un día laborable.",
          "",
          "Saludos,",
          "Lunexa",
          "https://uselunexa.com",
        ].join("\n"),
    },
    newsletter: {
      subject: "Confirma tu suscripción al boletín de Lunexa",
      htmlTitle: "Confirma tu suscripción al boletín",
      heading: "Confirma tu suscripción",
      description: (safeEmail) =>
        `Has solicitado suscribirte al boletín de Lunexa con <strong style="color:#18181b;">${safeEmail}</strong>. Confírmalo en los próximos 15 minutos:`,
      confirmButton: "Confirmar suscripción",
      orPasteLabel: "O pega este enlace en tu navegador:",
      ignore: "Si no solicitaste esto, puedes ignorar este correo sin problema.",
      unsubscribePrefix: "¿No quieres estos correos?",
      unsubscribeLink: "Darse de baja",
      textIntro: "Hola,",
      textInstruction:
        "Confirma tu suscripción al boletín de Lunexa abriendo el siguiente enlace en los próximos 15 minutos:",
      textIgnore: "Si no solicitaste esto, puedes ignorar este correo sin problema.",
      textUnsubscribe: "¿No quieres estos correos? Date de baja:",
    },
  },
};

export function contactAutoReply(
  locale: EmailLocale,
  name: string
): { subject: string; text: string } {
  const tr = strings[locale].autoreply;
  return { subject: tr.subject, text: tr.body(name) };
}

export function newsletterConfirmation(
  locale: EmailLocale,
  opts: { safeEmail: string; confirmUrl: string; unsubscribeUrl: string }
): { subject: string; text: string; html: string } {
  const tr = strings[locale].newsletter;
  const { safeEmail, confirmUrl, unsubscribeUrl } = opts;

  const text = [
    tr.textIntro,
    "",
    tr.textInstruction,
    "",
    confirmUrl,
    "",
    tr.textIgnore,
    "",
    "— Lunexa",
    "https://uselunexa.com",
    "",
    `${tr.textUnsubscribe} ${unsubscribeUrl}`,
  ].join("\n");

  const html = `
<!DOCTYPE html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${tr.htmlTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#18181b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
            <tr>
              <td style="padding:24px 32px;background-color:#0f0f0f;color:#ffffff;">
                <span style="display:inline-block;width:28px;height:28px;border-radius:8px;background-color:#a78bfa;vertical-align:middle;"></span>
                <span style="display:inline-block;margin-left:10px;font-size:16px;font-weight:600;vertical-align:middle;">Lunexa</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px 0;font-size:22px;font-weight:600;color:#18181b;letter-spacing:-0.02em;">${tr.heading}</h1>
                <p style="margin:0 0 24px 0;font-size:14px;line-height:1.65;color:#52525b;">
                  ${tr.description(safeEmail)}
                </p>
                <p style="margin:0 0 24px 0;">
                  <a href="${confirmUrl}" style="display:inline-block;padding:12px 28px;background-color:#18181b;color:#ffffff;font-size:14px;font-weight:500;text-decoration:none;border-radius:9999px;">${tr.confirmButton}</a>
                </p>
                <p style="margin:0 0 12px 0;font-size:12px;color:#71717a;">${tr.orPasteLabel}</p>
                <p style="margin:0 0 24px 0;font-size:12px;word-break:break-all;"><a href="${confirmUrl}" style="color:#7c3aed;text-decoration:none;">${confirmUrl}</a></p>
                <p style="margin:0;font-size:12px;color:#a1a1aa;">${tr.ignore}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 24px 32px;font-size:12px;color:#a1a1aa;text-align:center;border-top:1px solid #e4e4e7;">
                ${tr.unsubscribePrefix} <a href="${unsubscribeUrl}" style="color:#71717a;text-decoration:underline;">${tr.unsubscribeLink}</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject: tr.subject, text, html };
}
