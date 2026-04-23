"use client";

import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useT } from "@/i18n/provider";
import { trackEvent } from "@/components/analytics";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 2000 },
};

type FieldErrors = Record<string, string>;

export default function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const { t, locale } = useT();

  function validateFields(fields: { name: string; email: string; message: string }): FieldErrors {
    const errors: FieldErrors = {};
    const name = fields.name.trim();
    const message = fields.message.trim();

    if (name.length < LIMITS.name.min) {
      errors.name = t("form.errors.name_min");
    } else if (name.length > LIMITS.name.max) {
      errors.name = t("form.errors.name_max");
    }

    if (!fields.email.trim()) {
      errors.email = t("form.errors.email_required");
    }

    if (message.length < LIMITS.message.min) {
      errors.message = t("form.errors.message_min");
    } else if (message.length > LIMITS.message.max) {
      errors.message = t("form.errors.message_max");
    }

    return errors;
  }

  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const fieldId = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const clientErrors = validateFields(fields);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      setErrorMessage("");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setStatus("error");
      setErrorMessage(t("form.errors.captcha_required"));
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    let res: Response;
    try {
      res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: honeypot, turnstileToken, locale }),
      });
    } catch {
      setErrorMessage(t("form.errors.network"));
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken("");
      return;
    }

    try {
      const data = await res.json();

      if (res.status === 429) {
        setErrorMessage(data.message || t("form.errors.rate_limit"));
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errs: FieldErrors = {};
          for (const err of data.errors) {
            errs[err.field] = err.message;
          }
          setFieldErrors(errs);
          setErrorMessage(t("form.errors.fix_above"));
        } else {
          setErrorMessage(data.message || t("form.errors.generic"));
        }
        setStatus("error");
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }

      setStatus("success");
      setFields({ name: "", email: "", message: "" });
      turnstileRef.current?.reset();
      setTurnstileToken("");
      trackEvent("contact_form_submit", { locale });
    } catch {
      setErrorMessage(t("form.errors.unexpected"));
      setStatus("error");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-light p-8 text-center">
        <div className="mb-4 text-3xl">&#10003;</div>
        <h3 className="text-lg font-semibold">{t("form.success_title")}</h3>
        <p className="mt-2 text-sm text-muted">{t("form.success_body")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-accent hover:underline"
        >
          {t("form.send_another")}
        </button>
      </div>
    );
  }

  const messageLen = fields.message.trim().length;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from humans, visible to bots */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}
      >
        <label htmlFor={fieldId("company")}>Company</label>
        <input
          type="text"
          id={fieldId("company")}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={fieldId("name")} className="mb-2 block text-sm text-muted">
          {t("form.name_label")}
        </label>
        <input
          type="text"
          id={fieldId("name")}
          name="name"
          required
          maxLength={LIMITS.name.max}
          value={fields.name}
          onChange={(e) => setFields({ ...fields, name: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
          placeholder={t("form.name_placeholder")}
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor={fieldId("email")} className="mb-2 block text-sm text-muted">
          {t("form.email_label")}
        </label>
        <input
          type="email"
          id={fieldId("email")}
          name="email"
          required
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
          placeholder={t("form.email_placeholder")}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor={fieldId("message")} className="text-sm text-muted">
            {t("form.message_label")}
          </label>
          <span
            className={`text-xs ${messageLen > LIMITS.message.max ? "text-red-400" : "text-muted"}`}
          >
            {messageLen} / {LIMITS.message.max}
          </span>
        </div>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          required
          maxLength={LIMITS.message.max}
          value={fields.message}
          onChange={(e) => setFields({ ...fields, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
          placeholder={t("form.message_placeholder")}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      {TURNSTILE_SITE_KEY && (
        <Turnstile
          ref={turnstileRef}
          siteKey={TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
          onExpire={() => setTurnstileToken("")}
          onError={() => setTurnstileToken("")}
          options={{ theme: "dark", size: "flexible" }}
        />
      )}

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
        {status === "loading" ? t("form.submitting") : t("form.submit")}
      </button>
    </form>
  );
}
