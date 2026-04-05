"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const LIMITS = {
  name: { min: 2, max: 80 },
  message: { min: 10, max: 2000 },
};

type FieldErrors = Record<string, string>;

function validateFields(fields: { name: string; email: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  const name = fields.name.trim();
  const message = fields.message.trim();

  if (name.length < LIMITS.name.min) {
    errors.name = `Name must be at least ${LIMITS.name.min} characters`;
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Name must be at most ${LIMITS.name.max} characters`;
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = `Message must be at least ${LIMITS.message.min} characters`;
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Message must be at most ${LIMITS.message.max} characters`;
  }

  return errors;
}

export default function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const fieldId = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Client-side validation
    const clientErrors = validateFields(fields);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setStatus("error");
      setErrorMessage("");
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
        body: JSON.stringify({ ...fields, company: honeypot }),
      });
    } catch {
      setErrorMessage("Could not reach the server. Please check your connection and try again.");
      setStatus("error");
      return;
    }

    try {
      const data = await res.json();

      if (res.status === 429) {
        setErrorMessage(data.message || "Too many requests. Please wait a few minutes.");
        setStatus("error");
        return;
      }

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errs: FieldErrors = {};
          for (const err of data.errors) {
            errs[err.field] = err.message;
          }
          setFieldErrors(errs);
          setErrorMessage("Please fix the errors above and try again.");
        } else {
          setErrorMessage(data.message || "Something went wrong. Please try again.");
        }
        setStatus("error");
        return;
      }

      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Received an unexpected response from the server.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-light p-8 text-center">
        <div className="mb-4 text-3xl">&#10003;</div>
        <h3 className="text-lg font-semibold">Message sent</h3>
        <p className="mt-2 text-sm text-muted">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-accent hover:underline"
        >
          Send another message
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
          Name
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
          placeholder="Your name"
        />
        {fieldErrors.name && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.name}</p>
        )}
      </div>
      <div>
        <label htmlFor={fieldId("email")} className="mb-2 block text-sm text-muted">
          Email
        </label>
        <input
          type="email"
          id={fieldId("email")}
          name="email"
          required
          value={fields.email}
          onChange={(e) => setFields({ ...fields, email: e.target.value })}
          className="w-full rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
          placeholder="you@example.com"
        />
        {fieldErrors.email && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.email}</p>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor={fieldId("message")} className="text-sm text-muted">
            Message
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
          placeholder="Tell us about your project..."
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>

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
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
