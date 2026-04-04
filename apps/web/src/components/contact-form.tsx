"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type FieldErrors = Record<string, string>;

export default function ContactForm({ idPrefix = "" }: { idPrefix?: string }) {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    setFieldErrors({});

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          const errs: FieldErrors = {};
          for (const err of data.errors) {
            errs[err.field] = err.message;
          }
          setFieldErrors(errs);
        }
        setErrorMessage(data.message || "Please check your input and try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setErrorMessage("Could not reach the server. Please try again later.");
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

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor={id("name")} className="mb-2 block text-sm text-muted">
          Name
        </label>
        <input
          type="text"
          id={id("name")}
          name="name"
          required
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
        <label htmlFor={id("email")} className="mb-2 block text-sm text-muted">
          Email
        </label>
        <input
          type="email"
          id={id("email")}
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
        <label htmlFor={id("message")} className="mb-2 block text-sm text-muted">
          Message
        </label>
        <textarea
          id={id("message")}
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(e) => setFields({ ...fields, message: e.target.value })}
          className="w-full resize-none rounded-lg border border-border bg-surface-light px-4 py-3 text-foreground placeholder-muted/50 outline-none transition-colors focus:border-accent"
          placeholder="Tell us about your project..."
        />
        {fieldErrors.message && (
          <p className="mt-1 text-sm text-red-400">{fieldErrors.message}</p>
        )}
      </div>

      {status === "error" && !Object.keys(fieldErrors).length && (
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
