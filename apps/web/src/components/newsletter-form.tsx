"use client";

import { useState } from "react";
import Link from "next/link";
import { useT } from "@/i18n/provider";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function NewsletterForm() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!consent) {
      setStatus("error");
      setErrorMessage(t("newsletter.consent_required"));
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      if (res.status === 429) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.message || t("newsletter.rate_limit"));
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setErrorMessage(data.message || t("newsletter.generic_error"));
        return;
      }

      setStatus("sent");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMessage(t("newsletter.network_error"));
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface-light p-6 text-center">
        <div className="mb-3 text-2xl">&#10003;</div>
        <h3 className="text-base font-semibold">{t("newsletter.sent_title")}</h3>
        <p className="mt-2 text-sm text-muted">{t("newsletter.sent_body")}</p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">
          {t("newsletter.email_label")}
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.email_placeholder")}
          className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 accent-accent"
          required
        />
        <span>
          {t("newsletter.consent_prefix")}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-2 decoration-accent/50 hover:decoration-accent"
          >
            {t("newsletter.privacy_link")}
          </Link>
          {t("newsletter.consent_suffix")}
        </span>
      </label>

      {status === "error" && errorMessage && (
        <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-foreground py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? t("newsletter.submitting") : t("newsletter.submit")}
      </button>
    </form>
  );
}
