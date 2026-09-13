import Image from "next/image";
import badge from "@/assets/google-play-badge.png";

/**
 * Google's official badge, used unmodified per their brand guidelines — the
 * artwork is never recoloured, cropped, or redrawn, and the aspect ratio comes
 * from the file's intrinsic dimensions rather than fixed width/height props.
 *
 * The asset is imported rather than referenced from `public/`: a static import
 * is emitted under `_next/static/`, which `proxy.ts` excludes from locale
 * rewriting. A `/public` path would be rewritten to `/<locale>/...` and 404.
 *
 * `label` is the localized accessible name, so it carries the link's meaning
 * for screen readers and when the image fails to load.
 */
export default function GooglePlayBadge({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block shrink-0 transition-opacity hover:opacity-80${className ? ` ${className}` : ""}`}
    >
      <Image src={badge} alt={label} className="h-auto w-[168px]" />
    </a>
  );
}
