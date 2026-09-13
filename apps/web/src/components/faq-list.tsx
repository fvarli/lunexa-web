type FaqItem = { q: string; a: string };

/**
 * Disclosure list built on native `<details>`/`<summary>` — the same markup the
 * homepage FAQ uses. Deliberately not a client component: the element opens and
 * closes, and is keyboard-operable, with no JavaScript at all.
 *
 * `defaultOpenFirst` mirrors the homepage, where the first row starts open to
 * show that the rows expand. Lists that read as a reference (troubleshooting,
 * say) are better left fully collapsed so the symptoms can be scanned.
 */
export default function FaqList({
  items,
  defaultOpenFirst = false,
}: {
  items: readonly FaqItem[];
  defaultOpenFirst?: boolean;
}) {
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <details
          key={i}
          className="group py-6 first:pt-0 last:pb-0"
          {...(defaultOpenFirst && i === 0 ? { open: true } : {})}
        >
          <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            {/* Decorative: the open/closed state is already conveyed by <details> itself */}
            <span
              aria-hidden="true"
              className="ml-4 font-mono text-sm text-accent transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
