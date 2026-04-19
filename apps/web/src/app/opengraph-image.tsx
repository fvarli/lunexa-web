import { ImageResponse } from "next/og";

export const alt = "Lunexa — Simple, Fast, Intelligent Digital Products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          color: "#e8e8e8",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#0f0f0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="64" height="64" viewBox="0 0 32 32">
            <circle cx="15" cy="16" r="8" fill="#a78bfa" />
            <circle cx="18.5" cy="14.5" r="7" fill="#0f0f0f" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a78bfa",
            marginBottom: 32,
            marginTop: 80,
          }}
        >
          Lunexa
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#e8e8e8",
          }}
        >
          Simple. Fast.
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#a78bfa",
          }}
        >
          Intelligent.
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#888888",
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          Premium digital craftsmanship for mobile and web.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            fontSize: 20,
            color: "#666666",
            fontFamily: "monospace",
          }}
        >
          uselunexa.com
        </div>
      </div>
    ),
    { ...size }
  );
}
