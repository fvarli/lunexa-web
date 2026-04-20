"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const CONSENT_KEY = "lunexa-cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cookie-consent:updated", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cookie-consent:updated", callback);
  };
}

function hasAnalyticsConsent(): "yes" | "no" {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return "no";
    const parsed = JSON.parse(stored) as { analytics?: boolean };
    return parsed?.analytics === true ? "yes" : "no";
  } catch {
    return "no";
  }
}

function getSnapshot(): "yes" | "no" {
  return hasAnalyticsConsent();
}

function getServerSnapshot(): "yes" | "no" {
  return "no";
}

export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!GA_ID || consent !== "yes") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
